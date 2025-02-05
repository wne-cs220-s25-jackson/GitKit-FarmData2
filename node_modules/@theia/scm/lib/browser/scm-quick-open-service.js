"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.ScmQuickOpenService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const message_service_1 = require("@theia/core/lib/common/message-service");
const uri_1 = require("@theia/core/lib/common/uri");
const scm_service_1 = require("./scm-service");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const browser_1 = require("@theia/core/lib/browser");
let ScmQuickOpenService = class ScmQuickOpenService {
    async changeRepository() {
        var _a;
        const repositories = this.scmService.repositories;
        if (repositories.length > 1) {
            const items = await Promise.all(repositories.map(async (repository) => {
                const uri = new uri_1.default(repository.provider.rootUri);
                return {
                    label: this.labelProvider.getName(uri),
                    description: this.labelProvider.getLongName(uri),
                    execute: () => {
                        this.scmService.selectedRepository = repository;
                    }
                };
            }));
            (_a = this.quickInputService) === null || _a === void 0 ? void 0 : _a.showQuickPick(items, { placeholder: 'Select repository to work with:' });
        }
    }
};
exports.ScmQuickOpenService = ScmQuickOpenService;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.QuickInputService),
    (0, inversify_1.optional)(),
    tslib_1.__metadata("design:type", Object)
], ScmQuickOpenService.prototype, "quickInputService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], ScmQuickOpenService.prototype, "messageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], ScmQuickOpenService.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_service_1.ScmService),
    tslib_1.__metadata("design:type", scm_service_1.ScmService)
], ScmQuickOpenService.prototype, "scmService", void 0);
exports.ScmQuickOpenService = ScmQuickOpenService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ScmQuickOpenService);
//# sourceMappingURL=scm-quick-open-service.js.map