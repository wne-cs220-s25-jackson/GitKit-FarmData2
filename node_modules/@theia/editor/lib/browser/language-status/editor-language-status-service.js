"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
var EditorLanguageStatusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorLanguageStatusService = exports.LanguageStatusSeverity = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const language_service_1 = require("@theia/core/lib/browser/language-service");
const core_1 = require("@theia/core");
const editor_command_1 = require("../editor-command");
const language_selector_1 = require("../../common/language-selector");
const uri_1 = require("@theia/core/lib/common/uri");
const editor_manager_1 = require("../editor-manager");
const severity_1 = require("@theia/core/lib/common/severity");
const label_parser_1 = require("@theia/core/lib/browser/label-parser");
/**
 * Represents the severity of a language status item.
 */
var LanguageStatusSeverity;
(function (LanguageStatusSeverity) {
    LanguageStatusSeverity[LanguageStatusSeverity["Information"] = 0] = "Information";
    LanguageStatusSeverity[LanguageStatusSeverity["Warning"] = 1] = "Warning";
    LanguageStatusSeverity[LanguageStatusSeverity["Error"] = 2] = "Error";
})(LanguageStatusSeverity || (exports.LanguageStatusSeverity = LanguageStatusSeverity = {}));
let EditorLanguageStatusService = EditorLanguageStatusService_1 = class EditorLanguageStatusService {
    constructor() {
        this.status = new Map();
        this.pinnedCommands = new Set();
    }
    setLanguageStatusItem(handle, item) {
        this.status.set(handle, item);
        this.updateLanguageStatusItems();
    }
    removeLanguageStatusItem(handle) {
        this.status.delete(handle);
        this.updateLanguageStatusItems();
    }
    updateLanguageStatus(editor) {
        if (!editor) {
            this.statusBar.removeElement(EditorLanguageStatusService_1.LANGUAGE_MODE_ID);
            return;
        }
        const language = this.languages.getLanguage(editor.document.languageId);
        const languageName = language ? language.name : '';
        this.statusBar.setElement(EditorLanguageStatusService_1.LANGUAGE_MODE_ID, {
            text: languageName,
            alignment: browser_1.StatusBarAlignment.RIGHT,
            priority: 1,
            command: editor_command_1.EditorCommands.CHANGE_LANGUAGE.id,
            tooltip: core_1.nls.localizeByDefault('Select Language Mode')
        });
        this.updateLanguageStatusItems(editor);
    }
    updateLanguageStatusItems(editor = this.editorAccess.editor) {
        if (!editor) {
            this.statusBar.removeElement(EditorLanguageStatusService_1.LANGUAGE_STATUS_ID);
            this.updatePinnedItems();
            return;
        }
        const uri = new uri_1.default(editor.document.uri);
        const items = Array.from(this.status.values())
            .filter(item => (0, language_selector_1.score)(item.selector, uri.scheme, uri.path.toString(), editor.document.languageId, true))
            .sort((left, right) => right.severity - left.severity);
        if (!items.length) {
            this.statusBar.removeElement(EditorLanguageStatusService_1.LANGUAGE_STATUS_ID);
            return;
        }
        const severityText = items[0].severity === severity_1.Severity.Info
            ? '$(bracket)'
            : items[0].severity === severity_1.Severity.Warning
                ? '$(bracket-dot)'
                : '$(bracket-error)';
        this.statusBar.setElement(EditorLanguageStatusService_1.LANGUAGE_STATUS_ID, {
            text: severityText,
            alignment: browser_1.StatusBarAlignment.RIGHT,
            priority: 2,
            tooltip: this.createTooltip(items),
            affinity: { id: EditorLanguageStatusService_1.LANGUAGE_MODE_ID, alignment: browser_1.StatusBarAlignment.LEFT, compact: true },
        });
        this.updatePinnedItems(items);
    }
    updatePinnedItems(items) {
        const toRemoveFromStatusBar = new Set(this.pinnedCommands);
        items === null || items === void 0 ? void 0 : items.forEach(item => {
            if (toRemoveFromStatusBar.has(item.id)) {
                toRemoveFromStatusBar.delete(item.id);
                this.statusBar.setElement(item.id, this.toPinnedItem(item));
            }
        });
        toRemoveFromStatusBar.forEach(id => this.statusBar.removeElement(id));
    }
    toPinnedItem(item) {
        return {
            text: item.label,
            affinity: { id: EditorLanguageStatusService_1.LANGUAGE_MODE_ID, alignment: browser_1.StatusBarAlignment.RIGHT, compact: false },
            alignment: browser_1.StatusBarAlignment.RIGHT,
            onclick: item.command && (e => { var _a, _b; e.preventDefault(); this.commandRegistry.executeCommand(item.command.id, ...((_b = (_a = item.command) === null || _a === void 0 ? void 0 : _a.arguments) !== null && _b !== void 0 ? _b : [])); }),
        };
    }
    createTooltip(items) {
        var _a, _b;
        const hoverContainer = document.createElement('div');
        hoverContainer.classList.add('hover-row');
        for (const item of items) {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('hover-language-status');
            {
                const severityContainer = document.createElement('div');
                severityContainer.classList.add('severity', `sev${item.severity}`);
                severityContainer.classList.toggle('show', item.severity === severity_1.Severity.Error || item.severity === severity_1.Severity.Warning);
                {
                    const severityIcon = document.createElement('span');
                    severityIcon.className = this.getSeverityIconClasses(item.severity);
                    severityContainer.appendChild(severityIcon);
                }
                itemContainer.appendChild(severityContainer);
            }
            const textContainer = document.createElement('div');
            textContainer.className = 'element';
            const labelContainer = document.createElement('div');
            labelContainer.className = 'left';
            const label = document.createElement('span');
            label.classList.add('label');
            this.renderWithIcons(label, item.busy ? `$(sync~spin)\u00A0\u00A0${item.label}` : item.label);
            labelContainer.appendChild(label);
            const detail = document.createElement('span');
            detail.classList.add('detail');
            this.renderWithIcons(detail, item.detail);
            labelContainer.appendChild(detail);
            textContainer.appendChild(labelContainer);
            const commandContainer = document.createElement('div');
            commandContainer.classList.add('right');
            if (item.command) {
                const link = document.createElement('a');
                link.classList.add('language-status-link');
                link.href = new uri_1.default()
                    .withScheme('command')
                    .withPath(item.command.id)
                    .withQuery(item.command.arguments ? encodeURIComponent(JSON.stringify(item.command.arguments)) : '')
                    .toString(false);
                link.onclick = e => { var _a, _b; e.preventDefault(); this.commandRegistry.executeCommand(item.command.id, ...((_b = (_a = item.command) === null || _a === void 0 ? void 0 : _a.arguments) !== null && _b !== void 0 ? _b : [])); };
                link.textContent = (_a = item.command.title) !== null && _a !== void 0 ? _a : item.command.id;
                link.title = (_b = item.command.tooltip) !== null && _b !== void 0 ? _b : '';
                link.ariaRoleDescription = 'button';
                link.ariaDisabled = 'false';
                commandContainer.appendChild(link);
                const pinContainer = document.createElement('div');
                pinContainer.classList.add('language-status-action-bar');
                const pin = document.createElement('a');
                this.setPinProperties(pin, item.id);
                pin.onclick = e => { e.preventDefault(); this.togglePinned(item); this.setPinProperties(pin, item.id); };
                pinContainer.appendChild(pin);
                commandContainer.appendChild(pinContainer);
            }
            textContainer.appendChild(commandContainer);
            itemContainer.append(textContainer);
            hoverContainer.appendChild(itemContainer);
        }
        return hoverContainer;
    }
    setPinProperties(pin, id) {
        pin.className = this.pinnedCommands.has(id) ? (0, browser_1.codicon)('pinned', true) : (0, browser_1.codicon)('pin', true);
        pin.ariaRoleDescription = 'button';
        const pinText = this.pinnedCommands.has(id)
            ? core_1.nls.localizeByDefault('Remove from Status Bar')
            : core_1.nls.localizeByDefault('Add to Status Bar');
        pin.ariaLabel = pinText;
        pin.title = pinText;
    }
    togglePinned(item) {
        if (this.pinnedCommands.has(item.id)) {
            this.pinnedCommands.delete(item.id);
            this.statusBar.removeElement(item.id);
        }
        else {
            this.pinnedCommands.add(item.id);
            this.statusBar.setElement(item.id, this.toPinnedItem(item));
        }
    }
    getSeverityIconClasses(severity) {
        switch (severity) {
            case severity_1.Severity.Error: return (0, browser_1.codicon)('error');
            case severity_1.Severity.Warning: return (0, browser_1.codicon)('info');
            default: return (0, browser_1.codicon)('check');
        }
    }
    renderWithIcons(host, text) {
        if (text) {
            for (const chunk of this.labelParser.parse(text)) {
                if (typeof chunk === 'string') {
                    host.append(chunk);
                }
                else {
                    const iconSpan = document.createElement('span');
                    const className = (0, browser_1.codicon)(chunk.name) + (chunk.animation ? ` fa-${chunk.animation}` : '');
                    iconSpan.className = className;
                    host.append(iconSpan);
                }
            }
        }
    }
};
exports.EditorLanguageStatusService = EditorLanguageStatusService;
EditorLanguageStatusService.LANGUAGE_MODE_ID = 'editor-status-language';
EditorLanguageStatusService.LANGUAGE_STATUS_ID = 'editor-language-status-items';
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.StatusBar),
    tslib_1.__metadata("design:type", Object)
], EditorLanguageStatusService.prototype, "statusBar", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(language_service_1.LanguageService),
    tslib_1.__metadata("design:type", language_service_1.LanguageService)
], EditorLanguageStatusService.prototype, "languages", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(editor_manager_1.CurrentEditorAccess),
    tslib_1.__metadata("design:type", editor_manager_1.CurrentEditorAccess)
], EditorLanguageStatusService.prototype, "editorAccess", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.CommandRegistry),
    tslib_1.__metadata("design:type", core_1.CommandRegistry)
], EditorLanguageStatusService.prototype, "commandRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(label_parser_1.LabelParser),
    tslib_1.__metadata("design:type", label_parser_1.LabelParser)
], EditorLanguageStatusService.prototype, "labelParser", void 0);
exports.EditorLanguageStatusService = EditorLanguageStatusService = EditorLanguageStatusService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], EditorLanguageStatusService);
//# sourceMappingURL=editor-language-status-service.js.map