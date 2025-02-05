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
exports.ConsoleSession = exports.ConsoleItem = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const event_1 = require("@theia/core/lib/common/event");
var ConsoleItem;
(function (ConsoleItem) {
    ConsoleItem.errorClassName = 'theia-console-error';
    ConsoleItem.warningClassName = 'theia-console-warning';
    ConsoleItem.infoClassName = 'theia-console-info';
    ConsoleItem.logClassName = 'theia-console-log';
})(ConsoleItem || (exports.ConsoleItem = ConsoleItem = {}));
let ConsoleSession = class ConsoleSession extends source_tree_1.TreeSource {
    constructor() {
        super(...arguments);
        this.selectionEmitter = new event_1.Emitter();
        this.onSelectionChange = this.selectionEmitter.event;
    }
    get severity() {
        return this.selectedSeverity;
    }
    set severity(severity) {
        if (severity === this.selectedSeverity) {
            return;
        }
        this.selectedSeverity = severity;
        this.selectionEmitter.fire(undefined);
        this.fireDidChange();
    }
};
exports.ConsoleSession = ConsoleSession;
exports.ConsoleSession = ConsoleSession = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ConsoleSession);
//# sourceMappingURL=console-session.js.map