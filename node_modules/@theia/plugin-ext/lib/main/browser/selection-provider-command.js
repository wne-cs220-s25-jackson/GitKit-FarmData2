"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.SelectionProviderCommandContribution = exports.SelectionProviderCommands = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
const core_1 = require("@theia/core");
var SelectionProviderCommands;
(function (SelectionProviderCommands) {
    SelectionProviderCommands.GET_SELECTED_CONTEXT = {
        id: 'theia.plugin.workspace.selectedContext'
    };
})(SelectionProviderCommands || (exports.SelectionProviderCommands = SelectionProviderCommands = {}));
let SelectionProviderCommandContribution = class SelectionProviderCommandContribution {
    registerCommands(commands) {
        commands.registerCommand(SelectionProviderCommands.GET_SELECTED_CONTEXT, this.newMultiUriAwareCommandHandler({
            isEnabled: () => true,
            isVisible: () => false,
            execute: (selectedUris) => selectedUris.map(uri => uri.toComponents())
        }));
    }
    newMultiUriAwareCommandHandler(handler) {
        return uri_command_handler_1.UriAwareCommandHandler.MultiSelect(this.selectionService, handler);
    }
};
exports.SelectionProviderCommandContribution = SelectionProviderCommandContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.SelectionService),
    tslib_1.__metadata("design:type", core_1.SelectionService)
], SelectionProviderCommandContribution.prototype, "selectionService", void 0);
exports.SelectionProviderCommandContribution = SelectionProviderCommandContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SelectionProviderCommandContribution);
//# sourceMappingURL=selection-provider-command.js.map