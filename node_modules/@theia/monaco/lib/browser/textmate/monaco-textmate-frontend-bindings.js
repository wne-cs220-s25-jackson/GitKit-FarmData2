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
exports.fetchOnigasm = exports.createOnigasmLib = exports.OnigasmLib = void 0;
const browser_1 = require("@theia/core/lib/browser");
const core_1 = require("@theia/core");
const textmate_registry_1 = require("./textmate-registry");
const textmate_contribution_1 = require("./textmate-contribution");
const monaco_textmate_service_1 = require("./monaco-textmate-service");
const monaco_theme_registry_1 = require("./monaco-theme-registry");
const vscode_oniguruma_1 = require("vscode-oniguruma");
const vscode_textmate_1 = require("vscode-textmate");
const monaco_theme_types_1 = require("./monaco-theme-types");
class OnigasmLib {
    createOnigScanner(sources) {
        return (0, vscode_oniguruma_1.createOnigScanner)(sources);
    }
    createOnigString(sources) {
        return (0, vscode_oniguruma_1.createOnigString)(sources);
    }
}
exports.OnigasmLib = OnigasmLib;
exports.default = (bind, unbind, isBound, rebind) => {
    const onigLib = createOnigasmLib();
    bind(monaco_theme_types_1.OnigasmProvider).toConstantValue(() => onigLib);
    bind(monaco_textmate_service_1.MonacoTextmateService).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(monaco_textmate_service_1.MonacoTextmateService);
    (0, core_1.bindContributionProvider)(bind, textmate_contribution_1.LanguageGrammarDefinitionContribution);
    bind(textmate_registry_1.TextmateRegistry).toSelf().inSingletonScope();
    bind(monaco_theme_registry_1.MonacoThemeRegistry).toSelf().inSingletonScope();
    bind(monaco_theme_types_1.TextmateRegistryFactory).toFactory(({ container }) => (theme) => {
        const onigProvider = container.get(monaco_theme_types_1.OnigasmProvider);
        const textmateRegistry = container.get(textmate_registry_1.TextmateRegistry);
        return new vscode_textmate_1.Registry({
            onigLib: onigProvider(),
            theme,
            loadGrammar: async (scopeName) => {
                const provider = textmateRegistry.getProvider(scopeName);
                if (provider) {
                    const definition = await provider.getGrammarDefinition();
                    let rawGrammar;
                    if (typeof definition.content === 'string') {
                        rawGrammar = (0, vscode_textmate_1.parseRawGrammar)(definition.content, definition.format === 'json' ? 'grammar.json' : 'grammar.plist');
                    }
                    else {
                        rawGrammar = definition.content;
                    }
                    return rawGrammar;
                }
                return undefined;
            },
            getInjections: (scopeName) => {
                const provider = textmateRegistry.getProvider(scopeName);
                if (provider && provider.getInjections) {
                    return provider.getInjections(scopeName);
                }
                return [];
            }
        });
    });
};
async function createOnigasmLib() {
    if (!browser_1.isBasicWasmSupported) {
        throw new Error('wasm not supported');
    }
    const wasm = await fetchOnigasm();
    await (0, vscode_oniguruma_1.loadWASM)(wasm);
    return new OnigasmLib();
}
exports.createOnigasmLib = createOnigasmLib;
async function fetchOnigasm() {
    // Using Webpack's wasm loader should give us a URL to fetch the resource from:
    const onigasmPath = require('vscode-oniguruma/release/onig.wasm');
    const response = await fetch(onigasmPath, { method: 'GET' });
    return response.arrayBuffer();
}
exports.fetchOnigasm = fetchOnigasm;
//# sourceMappingURL=monaco-textmate-frontend-bindings.js.map