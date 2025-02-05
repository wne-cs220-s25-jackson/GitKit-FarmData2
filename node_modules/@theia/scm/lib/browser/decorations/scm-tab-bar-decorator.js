"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmTabBarDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const event_1 = require("@theia/core/lib/common/event");
const scm_service_1 = require("../scm-service");
const browser_1 = require("@theia/core/lib/browser");
const disposable_1 = require("@theia/core/lib/common/disposable");
const scm_widget_1 = require("../scm-widget");
let ScmTabBarDecorator = class ScmTabBarDecorator {
    constructor() {
        this.id = 'theia-scm-tabbar-decorator';
        this.emitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection();
        this.toDisposeOnDidChange = new disposable_1.DisposableCollection();
    }
    init() {
        this.toDispose.push(this.scmService.onDidChangeSelectedRepository(repository => {
            this.toDisposeOnDidChange.dispose();
            if (repository) {
                this.toDisposeOnDidChange.push(repository.provider.onDidChange(() => this.fireDidChangeDecorations()));
            }
            this.fireDidChangeDecorations();
        }));
    }
    decorate(title) {
        const { owner } = title;
        if (owner instanceof browser_1.ViewContainer && owner.getParts().find(part => part.wrapped instanceof scm_widget_1.ScmWidget)) {
            const changes = this.collectChangesCount();
            return changes > 0 ? [{ badge: changes }] : [];
        }
        else {
            return [];
        }
    }
    collectChangesCount() {
        const repository = this.scmService.selectedRepository;
        let changes = 0;
        if (!repository) {
            return 0;
        }
        repository.provider.groups.map(group => {
            if (group.id === 'index' || group.id === 'workingTree') {
                changes += group.resources.length;
            }
        });
        return changes;
    }
    get onDidChangeDecorations() {
        return this.emitter.event;
    }
    fireDidChangeDecorations() {
        this.emitter.fire(undefined);
    }
};
exports.ScmTabBarDecorator = ScmTabBarDecorator;
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_service_1.ScmService),
    tslib_1.__metadata("design:type", scm_service_1.ScmService)
], ScmTabBarDecorator.prototype, "scmService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ScmTabBarDecorator.prototype, "init", null);
exports.ScmTabBarDecorator = ScmTabBarDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ScmTabBarDecorator);
//# sourceMappingURL=scm-tab-bar-decorator.js.map