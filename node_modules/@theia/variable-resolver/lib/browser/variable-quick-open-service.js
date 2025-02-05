"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.VariableQuickOpenService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const message_service_1 = require("@theia/core/lib/common/message-service");
const variable_1 = require("./variable");
const variable_resolver_service_1 = require("./variable-resolver-service");
const browser_1 = require("@theia/core/lib/browser");
let VariableQuickOpenService = class VariableQuickOpenService {
    constructor(variableRegistry) {
        this.variableRegistry = variableRegistry;
    }
    open() {
        var _a;
        this.items = this.variableRegistry.getVariables().map(v => ({
            label: '${' + v.name + '}',
            detail: v.description,
            execute: () => {
                setTimeout(() => this.showValue(v));
            }
        }));
        (_a = this.quickInputService) === null || _a === void 0 ? void 0 : _a.showQuickPick(this.items, { placeholder: 'Registered variables' });
    }
    async showValue(variable) {
        var _a;
        const argument = await ((_a = this.quickInputService) === null || _a === void 0 ? void 0 : _a.input({
            placeHolder: 'Type a variable argument'
        }));
        const value = await this.variableResolver.resolve('${' + variable.name + ':' + argument + '}');
        if (typeof value === 'string') {
            this.messages.info(value);
        }
    }
};
exports.VariableQuickOpenService = VariableQuickOpenService;
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], VariableQuickOpenService.prototype, "messages", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.QuickInputService),
    (0, inversify_1.optional)(),
    tslib_1.__metadata("design:type", Object)
], VariableQuickOpenService.prototype, "quickInputService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(variable_resolver_service_1.VariableResolverService),
    tslib_1.__metadata("design:type", variable_resolver_service_1.VariableResolverService)
], VariableQuickOpenService.prototype, "variableResolver", void 0);
exports.VariableQuickOpenService = VariableQuickOpenService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(variable_1.VariableRegistry)),
    tslib_1.__metadata("design:paramtypes", [variable_1.VariableRegistry])
], VariableQuickOpenService);
//# sourceMappingURL=variable-quick-open-service.js.map