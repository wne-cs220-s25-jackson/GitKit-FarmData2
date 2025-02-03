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
exports.VariableRegistry = exports.VariableContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
exports.VariableContribution = Symbol('VariableContribution');
/**
 * The variable registry manages variables.
 */
let VariableRegistry = class VariableRegistry {
    constructor() {
        this.variables = new Map();
        this.toDispose = new core_1.DisposableCollection();
    }
    dispose() {
        this.toDispose.dispose();
    }
    /**
     * Register the given variable.
     * Do nothing if a variable is already registered for the given variable name.
     */
    registerVariable(variable) {
        if (this.variables.has(variable.name)) {
            console.warn(`A variables with name ${variable.name} is already registered.`);
            return core_1.Disposable.NULL;
        }
        this.variables.set(variable.name, variable);
        const disposable = {
            dispose: () => this.variables.delete(variable.name)
        };
        this.toDispose.push(disposable);
        return disposable;
    }
    /**
     * Return all registered variables.
     */
    getVariables() {
        return [...this.variables.values()];
    }
    /**
     * Get a variable for the given name or `undefined` if none.
     */
    getVariable(name) {
        return this.variables.get(name);
    }
    /**
     * Register an array of variables.
     * Do nothing if a variable is already registered for the given variable name.
     */
    registerVariables(variables) {
        return variables.map(v => this.registerVariable(v));
    }
};
exports.VariableRegistry = VariableRegistry;
exports.VariableRegistry = VariableRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VariableRegistry);
//# sourceMappingURL=variable.js.map