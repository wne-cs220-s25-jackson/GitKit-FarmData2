"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
exports.TextmateRegistry = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const disposable_1 = require("@theia/core/lib/common/disposable");
let TextmateRegistry = class TextmateRegistry {
    constructor() {
        this.scopeToProvider = new Map();
        this.languageToConfig = new Map();
        this.languageIdToScope = new Map();
    }
    get languages() {
        return this.languageIdToScope.keys();
    }
    registerTextmateGrammarScope(scope, provider) {
        const providers = this.scopeToProvider.get(scope) || [];
        const existingProvider = providers[0];
        if (existingProvider) {
            Promise.all([existingProvider.getGrammarDefinition(), provider.getGrammarDefinition()]).then(([a, b]) => {
                if (a.location !== b.location || !a.location && !b.location) {
                    console.warn(`a registered grammar provider for '${scope}' scope is overridden`);
                }
            });
        }
        providers.unshift(provider);
        this.scopeToProvider.set(scope, providers);
        return disposable_1.Disposable.create(() => {
            const index = providers.indexOf(provider);
            if (index !== -1) {
                providers.splice(index, 1);
            }
        });
    }
    getProvider(scope) {
        const providers = this.scopeToProvider.get(scope);
        return providers && providers[0];
    }
    mapLanguageIdToTextmateGrammar(languageId, scope) {
        const scopes = this.languageIdToScope.get(languageId) || [];
        const existingScope = scopes[0];
        if (typeof existingScope === 'string') {
            console.warn(`'${languageId}' language is remapped from '${existingScope}' to '${scope}' scope`);
        }
        scopes.unshift(scope);
        this.languageIdToScope.set(languageId, scopes);
        return disposable_1.Disposable.create(() => {
            const index = scopes.indexOf(scope);
            if (index !== -1) {
                scopes.splice(index, 1);
            }
        });
    }
    getScope(languageId) {
        const scopes = this.languageIdToScope.get(languageId);
        return scopes && scopes[0];
    }
    getLanguageId(scope) {
        for (const languageId of this.languageIdToScope.keys()) {
            if (this.getScope(languageId) === scope) {
                return languageId;
            }
        }
        return undefined;
    }
    registerGrammarConfiguration(languageId, config) {
        const configs = this.languageToConfig.get(languageId) || [];
        const existingConfig = configs[0];
        if (existingConfig) {
            console.warn(`a registered grammar configuration for '${languageId}' language is overridden`);
        }
        configs.unshift(config);
        this.languageToConfig.set(languageId, configs);
        return disposable_1.Disposable.create(() => {
            const index = configs.indexOf(config);
            if (index !== -1) {
                configs.splice(index, 1);
            }
        });
    }
    getGrammarConfiguration(languageId) {
        const configs = this.languageToConfig.get(languageId);
        return configs && configs[0] || {};
    }
};
exports.TextmateRegistry = TextmateRegistry;
exports.TextmateRegistry = TextmateRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TextmateRegistry);
//# sourceMappingURL=textmate-registry.js.map