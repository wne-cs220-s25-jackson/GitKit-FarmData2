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
exports.TextmateSnippetCompletionProvider = void 0;
const monaco = require("@theia/monaco-editor-core");
const snippetParser_1 = require("@theia/monaco-editor-core/esm/vs/editor/contrib/snippet/browser/snippetParser");
/**
 * @deprecated use MonacoSnippetSuggestProvider instead
 */
class TextmateSnippetCompletionProvider {
    constructor(config, mdLanguage = '') {
        this.config = config;
        this.mdLanguage = mdLanguage;
        this.items = [];
        for (const name of Object.keys(config)) {
            const textmateSnippet = config[name];
            const insertText = Array.isArray(textmateSnippet.body) ? textmateSnippet.body.join('\n') : textmateSnippet.body;
            this.items.push({
                label: textmateSnippet.prefix,
                detail: textmateSnippet.description,
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: {
                    value: '```' + this.mdLanguage + '\n' + this.replaceVariables(insertText) + '```'
                },
                insertText: insertText,
                range: undefined
            });
        }
    }
    replaceVariables(textmateSnippet) {
        return new snippetParser_1.SnippetParser().parse(textmateSnippet).toString();
    }
    provideCompletionItems(document, position, context, token) {
        return {
            suggestions: this.items
        };
    }
}
exports.TextmateSnippetCompletionProvider = TextmateSnippetCompletionProvider;
//# sourceMappingURL=textmate-snippet-completion-provider.js.map