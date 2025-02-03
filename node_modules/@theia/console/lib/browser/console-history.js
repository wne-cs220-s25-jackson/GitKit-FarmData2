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
var ConsoleHistory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleHistory = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
let ConsoleHistory = ConsoleHistory_1 = class ConsoleHistory {
    constructor() {
        this.values = [];
        this.index = -1;
    }
    push(value) {
        this.delete(value);
        this.values.push(value);
        this.trim();
        this.index = this.values.length;
    }
    delete(value) {
        const index = this.values.indexOf(value);
        if (index !== -1) {
            this.values.splice(index, 1);
        }
    }
    trim() {
        const index = this.values.length - ConsoleHistory_1.limit;
        if (index > 0) {
            this.values = this.values.slice(index);
        }
    }
    get current() {
        return this.values[this.index];
    }
    get previous() {
        this.index = Math.max(this.index - 1, -1);
        return this.current;
    }
    get next() {
        this.index = Math.min(this.index + 1, this.values.length);
        return this.current;
    }
    store() {
        const { values, index } = this;
        return { values, index };
    }
    restore(object) {
        this.values = object.values;
        this.index = object.index;
    }
};
exports.ConsoleHistory = ConsoleHistory;
ConsoleHistory.limit = 50;
exports.ConsoleHistory = ConsoleHistory = ConsoleHistory_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ConsoleHistory);
//# sourceMappingURL=console-history.js.map