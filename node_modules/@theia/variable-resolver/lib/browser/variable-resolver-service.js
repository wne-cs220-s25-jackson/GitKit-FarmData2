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
var VariableResolverService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableResolverService = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("@theia/core/shared/inversify");
const variable_1 = require("./variable");
const core_1 = require("@theia/core");
/**
 * The variable resolver service should be used to resolve variables in strings.
 */
let VariableResolverService = VariableResolverService_1 = class VariableResolverService {
    /**
     * Resolve the variables in the given string array.
     * @param value The array of data to resolve variables in.
     * @param options Options of the variable resolution.
     * @returns Promise to array with variables resolved. Never rejects.
     *
     * @deprecated since 1.28.0 use {@link resolve} instead.
     */
    resolveArray(value, options = {}) {
        return this.resolve(value, options);
    }
    /**
     * Resolve the variables for all strings found in the object and nested objects.
     * @param value Data to resolve variables in.
     * @param options Options of the variable resolution
     * @returns Promise to object with variables resolved. Returns `undefined` if a variable resolution was cancelled.
     */
    async resolve(value, options = {}) {
        const context = new VariableResolverService_1.Context(this.variableRegistry, options);
        try {
            return await this.doResolve(value, context);
        }
        catch (error) {
            if ((0, core_1.isCancelled)(error)) {
                return undefined;
            }
            throw error;
        }
    }
    async doResolve(value, context) {
        // eslint-disable-next-line no-null/no-null
        if (value === undefined || value === null) {
            return value;
        }
        if (typeof value === 'string') {
            return this.doResolveString(value, context);
        }
        if (Array.isArray(value)) {
            return this.doResolveArray(value, context);
        }
        if (typeof value === 'object') {
            return this.doResolveObject(value, context);
        }
        return value;
    }
    async doResolveObject(obj, context) {
        const result = {};
        for (const name of Object.keys(obj)) {
            const value = obj[name];
            const resolved = await this.doResolve(value, context);
            result[name] = resolved;
        }
        return result;
    }
    async doResolveArray(values, context) {
        const result = [];
        for (const value of values) {
            const resolved = await this.doResolve(value, context);
            result.push(resolved);
        }
        return result;
    }
    async doResolveString(value, context) {
        await this.resolveVariables(value, context);
        return value.replace(VariableResolverService_1.VAR_REGEXP, (match, varName) => {
            const varValue = context.get(varName);
            return varValue !== undefined ? varValue : match;
        });
    }
    async resolveVariables(value, context) {
        const variableRegExp = new RegExp(VariableResolverService_1.VAR_REGEXP);
        let match;
        // eslint-disable-next-line no-null/no-null
        while ((match = variableRegExp.exec(value)) !== null) {
            const variableName = match[1];
            await context.resolve(variableName);
        }
    }
};
exports.VariableResolverService = VariableResolverService;
VariableResolverService.VAR_REGEXP = /\$\{(.*?)\}/g;
tslib_1.__decorate([
    (0, inversify_1.inject)(variable_1.VariableRegistry),
    tslib_1.__metadata("design:type", variable_1.VariableRegistry)
], VariableResolverService.prototype, "variableRegistry", void 0);
exports.VariableResolverService = VariableResolverService = VariableResolverService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VariableResolverService);
(function (VariableResolverService) {
    class Context {
        constructor(variableRegistry, options) {
            this.variableRegistry = variableRegistry;
            this.options = options;
            this.resolved = new Map();
        }
        get(name) {
            return this.resolved.get(name);
        }
        async resolve(name) {
            if (this.resolved.has(name)) {
                return;
            }
            try {
                let variableName = name;
                let argument;
                const parts = name.split(':', 2);
                if (parts.length > 1) {
                    variableName = parts[0];
                    argument = parts[1];
                }
                const variable = this.variableRegistry.getVariable(variableName);
                const resolved = await (variable === null || variable === void 0 ? void 0 : variable.resolve(this.options.context, argument, this.options.configurationSection, this.options.commandIdVariables, this.options.configuration));
                if (typeof resolved === 'bigint' ||
                    typeof resolved === 'boolean' ||
                    typeof resolved === 'number' ||
                    typeof resolved === 'string') {
                    this.resolved.set(name, `${resolved}`);
                }
                else {
                    this.resolved.set(name, undefined);
                }
            }
            catch (e) {
                if ((0, core_1.isCancelled)(e)) {
                    throw e;
                }
                this.resolved.set(name, undefined);
                console.error(`Failed to resolve '${name}' variable:`, e);
            }
        }
    }
    VariableResolverService.Context = Context;
})(VariableResolverService || (exports.VariableResolverService = VariableResolverService = {}));
//# sourceMappingURL=variable-resolver-service.js.map