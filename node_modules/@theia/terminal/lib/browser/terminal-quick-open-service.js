"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
var TerminalQuickOpenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalQuickOpenContribution = exports.TerminalQuickOpenService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const terminal_service_1 = require("./base/terminal-service");
const terminal_frontend_contribution_1 = require("./terminal-frontend-contribution");
const quick_input_service_1 = require("@theia/core/lib/browser/quick-input/quick-input-service");
let TerminalQuickOpenService = TerminalQuickOpenService_1 = class TerminalQuickOpenService {
    open() {
        var _a;
        (_a = this.quickInputService) === null || _a === void 0 ? void 0 : _a.open(TerminalQuickOpenService_1.PREFIX);
    }
    async getPicks(filter, token) {
        const items = [];
        // Get the sorted list of currently opened terminal widgets that aren't hidden from users
        const widgets = this.terminalService.all.filter(widget => !widget.hiddenFromUser)
            .sort((a, b) => this.compareItems(a, b));
        for (const widget of widgets) {
            items.push(this.toItem(widget));
        }
        // Append a quick open item to create a new terminal.
        items.push({
            label: common_1.nls.localizeByDefault('Create New Terminal'),
            iconClasses: (0, browser_1.codiconArray)('add'),
            execute: () => this.doCreateNewTerminal()
        });
        return (0, quick_input_service_1.filterItems)(items, filter);
    }
    registerQuickAccessProvider() {
        this.quickAccessRegistry.registerQuickAccessProvider({
            getInstance: () => this,
            prefix: TerminalQuickOpenService_1.PREFIX,
            placeholder: '',
            helpEntries: [{ description: common_1.nls.localizeByDefault('Show All Opened Terminals'), needsEditor: false }]
        });
    }
    /**
     * Compare two terminal widgets by label. If labels are identical, compare by the widget id.
     * @param a `TerminalWidget` for comparison
     * @param b `TerminalWidget` for comparison
     */
    compareItems(a, b) {
        const normalize = (str) => str.trim().toLowerCase();
        if (normalize(a.title.label) !== normalize(b.title.label)) {
            return normalize(a.title.label).localeCompare(normalize(b.title.label));
        }
        else {
            return normalize(a.id).localeCompare(normalize(b.id));
        }
    }
    doCreateNewTerminal() {
        this.commandService.executeCommand(terminal_frontend_contribution_1.TerminalCommands.NEW.id);
    }
    /**
     * Convert the terminal widget to the quick pick item.
     * @param {TerminalWidget} widget - the terminal widget.
     * @returns quick pick item.
     */
    toItem(widget) {
        return {
            label: widget.title.label,
            description: widget.id,
            ariaLabel: widget.title.label,
            execute: () => this.terminalService.open(widget)
        };
    }
};
exports.TerminalQuickOpenService = TerminalQuickOpenService;
TerminalQuickOpenService.PREFIX = 'term ';
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.QuickInputService),
    (0, inversify_1.optional)(),
    tslib_1.__metadata("design:type", Object)
], TerminalQuickOpenService.prototype, "quickInputService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.QuickAccessRegistry),
    tslib_1.__metadata("design:type", Object)
], TerminalQuickOpenService.prototype, "quickAccessRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.CommandService),
    tslib_1.__metadata("design:type", Object)
], TerminalQuickOpenService.prototype, "commandService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(terminal_service_1.TerminalService),
    tslib_1.__metadata("design:type", Object)
], TerminalQuickOpenService.prototype, "terminalService", void 0);
exports.TerminalQuickOpenService = TerminalQuickOpenService = TerminalQuickOpenService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TerminalQuickOpenService);
/**
 * TODO: merge it to TerminalFrontendContribution.
 */
let TerminalQuickOpenContribution = class TerminalQuickOpenContribution {
    registerQuickAccessProvider() {
        this.terminalQuickOpenService.registerQuickAccessProvider();
    }
    registerCommands(commands) {
        commands.registerCommand(terminal_frontend_contribution_1.TerminalCommands.SHOW_ALL_OPENED_TERMINALS, {
            execute: () => this.terminalQuickOpenService.open()
        });
    }
};
exports.TerminalQuickOpenContribution = TerminalQuickOpenContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(TerminalQuickOpenService),
    tslib_1.__metadata("design:type", TerminalQuickOpenService)
], TerminalQuickOpenContribution.prototype, "terminalQuickOpenService", void 0);
exports.TerminalQuickOpenContribution = TerminalQuickOpenContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TerminalQuickOpenContribution);
//# sourceMappingURL=terminal-quick-open-service.js.map