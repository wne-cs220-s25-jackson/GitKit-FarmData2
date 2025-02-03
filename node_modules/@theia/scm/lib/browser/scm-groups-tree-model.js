"use strict";
// *****************************************************************************
// Copyright (C) 2020 Arm and others.
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
exports.ScmGroupsTreeModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const disposable_1 = require("@theia/core/lib/common/disposable");
const scm_service_1 = require("./scm-service");
const scm_tree_model_1 = require("./scm-tree-model");
let ScmGroupsTreeModel = class ScmGroupsTreeModel extends scm_tree_model_1.ScmTreeModel {
    constructor() {
        super(...arguments);
        this.toDisposeOnRepositoryChange = new disposable_1.DisposableCollection();
    }
    init() {
        super.init();
        this.refreshOnRepositoryChange();
        this.toDispose.push(this.scmService.onDidChangeSelectedRepository(() => {
            this.refreshOnRepositoryChange();
        }));
    }
    refreshOnRepositoryChange() {
        const repository = this.scmService.selectedRepository;
        if (repository) {
            this.changeRepository(repository.provider);
        }
        else {
            this.changeRepository(undefined);
        }
    }
    changeRepository(provider) {
        this.toDisposeOnRepositoryChange.dispose();
        this.contextKeys.scmProvider.set(provider ? provider.id : undefined);
        this.provider = provider;
        if (provider) {
            this.toDisposeOnRepositoryChange.push(provider.onDidChange(() => this.root = this.createTree()));
            if (provider.onDidChangeResources) {
                this.toDisposeOnRepositoryChange.push(provider.onDidChangeResources(() => this.root = this.createTree()));
            }
            this.root = this.createTree();
        }
    }
    get rootUri() {
        if (this.provider) {
            return this.provider.rootUri;
        }
    }
    ;
    get groups() {
        if (this.provider) {
            return this.provider.groups;
        }
        else {
            return [];
        }
    }
    ;
    canTabToWidget() {
        return !!this.provider;
    }
};
exports.ScmGroupsTreeModel = ScmGroupsTreeModel;
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_service_1.ScmService),
    tslib_1.__metadata("design:type", scm_service_1.ScmService)
], ScmGroupsTreeModel.prototype, "scmService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ScmGroupsTreeModel.prototype, "init", null);
exports.ScmGroupsTreeModel = ScmGroupsTreeModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ScmGroupsTreeModel);
//# sourceMappingURL=scm-groups-tree-model.js.map