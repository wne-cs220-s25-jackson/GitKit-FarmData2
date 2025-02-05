"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.ConsoleManager = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const console_widget_1 = require("./console-widget");
let ConsoleManager = class ConsoleManager {
    get activeConsole() {
        const widget = this.shell.activeWidget;
        return widget instanceof console_widget_1.ConsoleWidget ? widget : undefined;
    }
    get currentConsole() {
        const widget = this.shell.currentWidget;
        return widget instanceof console_widget_1.ConsoleWidget ? widget : undefined;
    }
};
exports.ConsoleManager = ConsoleManager;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ApplicationShell),
    tslib_1.__metadata("design:type", browser_1.ApplicationShell)
], ConsoleManager.prototype, "shell", void 0);
exports.ConsoleManager = ConsoleManager = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ConsoleManager);
//# sourceMappingURL=console-manager.js.map