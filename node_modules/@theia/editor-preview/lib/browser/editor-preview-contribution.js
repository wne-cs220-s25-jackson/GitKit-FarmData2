"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
exports.EditorPreviewContribution = exports.EditorPreviewCommands = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const nls_1 = require("@theia/core/lib/common/nls");
const common_1 = require("@theia/core/lib/common");
const inversify_1 = require("@theia/core/shared/inversify");
const editor_preview_widget_1 = require("./editor-preview-widget");
const current_widget_command_adapter_1 = require("@theia/core/lib/browser/shell/current-widget-command-adapter");
var EditorPreviewCommands;
(function (EditorPreviewCommands) {
    EditorPreviewCommands.PIN_PREVIEW_COMMAND = common_1.Command.toDefaultLocalizedCommand({
        id: 'workbench.action.keepEditor',
        category: browser_1.CommonCommands.VIEW_CATEGORY,
        label: 'Keep Editor',
    });
})(EditorPreviewCommands || (exports.EditorPreviewCommands = EditorPreviewCommands = {}));
let EditorPreviewContribution = class EditorPreviewContribution {
    registerCommands(registry) {
        registry.registerCommand(EditorPreviewCommands.PIN_PREVIEW_COMMAND, new current_widget_command_adapter_1.CurrentWidgetCommandAdapter(this.shell, {
            execute: async (title) => {
                if ((title === null || title === void 0 ? void 0 : title.owner) instanceof editor_preview_widget_1.EditorPreviewWidget) {
                    title.owner.convertToNonPreview();
                    await this.shell.activateWidget(title.owner.id);
                }
            },
            isEnabled: title => (title === null || title === void 0 ? void 0 : title.owner) instanceof editor_preview_widget_1.EditorPreviewWidget && title.owner.isPreview,
            isVisible: title => (title === null || title === void 0 ? void 0 : title.owner) instanceof editor_preview_widget_1.EditorPreviewWidget,
        }));
    }
    registerKeybindings(registry) {
        registry.registerKeybinding({
            command: EditorPreviewCommands.PIN_PREVIEW_COMMAND.id,
            keybinding: 'ctrlcmd+k enter'
        });
    }
    registerMenus(registry) {
        registry.registerMenuAction(browser_1.SHELL_TABBAR_CONTEXT_PIN, {
            commandId: EditorPreviewCommands.PIN_PREVIEW_COMMAND.id,
            label: nls_1.nls.localizeByDefault('Keep Open'),
            order: '6',
        });
    }
    getTargetWidget(event) {
        return event ? this.shell.findTargetedWidget(event) : this.shell.activeWidget;
    }
};
exports.EditorPreviewContribution = EditorPreviewContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ApplicationShell),
    tslib_1.__metadata("design:type", browser_1.ApplicationShell)
], EditorPreviewContribution.prototype, "shell", void 0);
exports.EditorPreviewContribution = EditorPreviewContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], EditorPreviewContribution);
//# sourceMappingURL=editor-preview-contribution.js.map