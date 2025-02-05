"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.ColorRegistry = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const disposable_1 = require("../common/disposable");
const event_1 = require("../common/event");
let ColorRegistry = class ColorRegistry {
    constructor() {
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    fireDidChange() {
        this.onDidChangeEmitter.fire(undefined);
    }
    *getColors() { }
    getCurrentCssVariable(id) {
        const value = this.getCurrentColor(id);
        if (!value) {
            return undefined;
        }
        const name = this.toCssVariableName(id);
        return { name, value };
    }
    toCssVariableName(id, prefix = 'theia') {
        return `--${prefix}-${id.replace(/\./g, '-')}`;
    }
    getCurrentColor(id) {
        return undefined;
    }
    register(...definitions) {
        const result = new disposable_1.DisposableCollection(...definitions.map(definition => this.doRegister(definition)));
        this.fireDidChange();
        return result;
    }
    doRegister(definition) {
        return disposable_1.Disposable.NULL;
    }
};
exports.ColorRegistry = ColorRegistry;
exports.ColorRegistry = ColorRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ColorRegistry);
//# sourceMappingURL=color-registry.js.map