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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var MonacoSnippetSuggestProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoSnippetSuggestion = exports.JsonSerializedSnippet = exports.MonacoSnippetSuggestProvider = void 0;
const tslib_1 = require("tslib");
const jsoncparser = require("jsonc-parser");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const disposable_1 = require("@theia/core/lib/common/disposable");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const files_1 = require("@theia/filesystem/lib/common/files");
const monaco = require("@theia/monaco-editor-core");
const snippetParser_1 = require("@theia/monaco-editor-core/esm/vs/editor/contrib/snippet/browser/snippetParser");
const common_1 = require("@theia/core/lib/common");
let MonacoSnippetSuggestProvider = MonacoSnippetSuggestProvider_1 = class MonacoSnippetSuggestProvider {
    constructor() {
        this.snippets = new Map();
        this.pendingSnippets = new Map();
    }
    async provideCompletionItems(model, position, context) {
        // copied and modified from https://github.com/microsoft/vscode/blob/master/src/vs/workbench/contrib/snippets/browser/snippetCompletionProvider.ts
        if (position.column >= MonacoSnippetSuggestProvider_1._maxPrefix) {
            return undefined;
        }
        if (context.triggerKind === monaco.languages.CompletionTriggerKind.TriggerCharacter && context.triggerCharacter === ' ') {
            // no snippets when suggestions have been triggered by space
            return undefined;
        }
        const languageId = model.getLanguageId(); // TODO: look up a language id at the position
        await this.loadSnippets(languageId);
        const snippetsForLanguage = this.snippets.get(languageId) || [];
        const pos = { lineNumber: position.lineNumber, column: 1 };
        const lineOffsets = [];
        const linePrefixLow = model.getLineContent(position.lineNumber).substring(0, position.column - 1).toLowerCase();
        const endsInWhitespace = linePrefixLow.match(/\s$/);
        while (pos.column < position.column) {
            const word = model.getWordAtPosition(pos);
            if (word) {
                // at a word
                lineOffsets.push(word.startColumn - 1);
                pos.column = word.endColumn + 1;
                if (word.endColumn - 1 < linePrefixLow.length && !/\s/.test(linePrefixLow[word.endColumn - 1])) {
                    lineOffsets.push(word.endColumn - 1);
                }
            }
            else if (!/\s/.test(linePrefixLow[pos.column - 1])) {
                // at a none-whitespace character
                lineOffsets.push(pos.column - 1);
                pos.column += 1;
            }
            else {
                // always advance!
                pos.column += 1;
            }
        }
        const availableSnippets = new Set();
        snippetsForLanguage.forEach(availableSnippets.add, availableSnippets);
        const suggestions = [];
        for (const start of lineOffsets) {
            availableSnippets.forEach(snippet => {
                if (this.isPatternInWord(linePrefixLow, start, linePrefixLow.length, snippet.prefix.toLowerCase(), 0, snippet.prefix.length)) {
                    suggestions.push(new MonacoSnippetSuggestion(snippet, monaco.Range.fromPositions(position.delta(0, -(linePrefixLow.length - start)), position)));
                    availableSnippets.delete(snippet);
                }
            });
        }
        if (endsInWhitespace || lineOffsets.length === 0) {
            // add remaining snippets when the current prefix ends in whitespace or when no
            // interesting positions have been found
            availableSnippets.forEach(snippet => {
                suggestions.push(new MonacoSnippetSuggestion(snippet, monaco.Range.fromPositions(position)));
            });
        }
        // disambiguate suggestions with same labels
        suggestions.sort(MonacoSnippetSuggestion.compareByLabel);
        return { suggestions };
    }
    resolveCompletionItem(item, token) {
        return item instanceof MonacoSnippetSuggestion ? item.resolve() : item;
    }
    async loadSnippets(scope) {
        const pending = [];
        pending.push(...(this.pendingSnippets.get(scope) || []));
        pending.push(...(this.pendingSnippets.get('*') || []));
        if (pending.length) {
            await Promise.all(pending);
        }
    }
    fromURI(uri, options) {
        const toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(() => { }));
        const pending = this.loadURI(uri, options, toDispose);
        const { language } = options;
        const scopes = Array.isArray(language) ? language : !!language ? [language] : ['*'];
        for (const scope of scopes) {
            const pendingSnippets = this.pendingSnippets.get(scope) || [];
            pendingSnippets.push(pending);
            this.pendingSnippets.set(scope, pendingSnippets);
            toDispose.push(disposable_1.Disposable.create(() => {
                const index = pendingSnippets.indexOf(pending);
                if (index !== -1) {
                    pendingSnippets.splice(index, 1);
                }
            }));
        }
        return toDispose;
    }
    /**
     * should NOT throw to prevent load errors on suggest
     */
    async loadURI(uri, options, toDispose) {
        try {
            const resource = typeof uri === 'string' ? new uri_1.default(uri) : uri;
            const { value } = await this.fileService.read(resource);
            if (toDispose.disposed) {
                return;
            }
            const snippets = value && jsoncparser.parse(value, undefined, { disallowComments: false });
            toDispose.push(this.fromJSON(snippets, options));
        }
        catch (e) {
            if (!(e instanceof files_1.FileOperationError)) {
                console.error(e);
            }
        }
    }
    fromJSON(snippets, { language, source }) {
        const toDispose = new disposable_1.DisposableCollection();
        this.parseSnippets(snippets, (name, snippet) => {
            const { isFileTemplate, prefix, body, description } = snippet;
            const parsedBody = Array.isArray(body) ? body.join('\n') : body;
            const parsedPrefixes = !prefix ? [''] : Array.isArray(prefix) ? prefix : [prefix];
            if (typeof parsedBody !== 'string') {
                return;
            }
            const scopes = [];
            if (language) {
                if (Array.isArray(language)) {
                    scopes.push(...language);
                }
                else {
                    scopes.push(language);
                }
            }
            else if (typeof snippet.scope === 'string') {
                for (const rawScope of snippet.scope.split(',')) {
                    const scope = rawScope.trim();
                    if (scope) {
                        scopes.push(scope);
                    }
                }
            }
            parsedPrefixes.forEach(parsedPrefix => toDispose.push(this.push({
                isFileTemplate: Boolean(isFileTemplate),
                scopes,
                name,
                prefix: parsedPrefix,
                description,
                body: parsedBody,
                source
            })));
        });
        return toDispose;
    }
    parseSnippets(snippets, accept) {
        for (const [name, scopeOrTemplate] of Object.entries(snippets !== null && snippets !== void 0 ? snippets : {})) {
            if (JsonSerializedSnippet.is(scopeOrTemplate)) {
                accept(name, scopeOrTemplate);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                for (const [name, template] of Object.entries(scopeOrTemplate)) {
                    accept(name, template);
                }
            }
        }
    }
    push(...snippets) {
        const toDispose = new disposable_1.DisposableCollection();
        for (const snippet of snippets) {
            for (const scope of snippet.scopes) {
                const languageSnippets = this.snippets.get(scope) || [];
                languageSnippets.push(snippet);
                this.snippets.set(scope, languageSnippets);
                toDispose.push(disposable_1.Disposable.create(() => {
                    const index = languageSnippets.indexOf(snippet);
                    if (index !== -1) {
                        languageSnippets.splice(index, 1);
                    }
                }));
            }
        }
        return toDispose;
    }
    isPatternInWord(patternLow, patternPos, patternLen, wordLow, wordPos, wordLen) {
        while (patternPos < patternLen && wordPos < wordLen) {
            if (patternLow[patternPos] === wordLow[wordPos]) {
                patternPos += 1;
            }
            wordPos += 1;
        }
        return patternPos === patternLen; // pattern must be exhausted
    }
};
exports.MonacoSnippetSuggestProvider = MonacoSnippetSuggestProvider;
MonacoSnippetSuggestProvider._maxPrefix = 10000;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], MonacoSnippetSuggestProvider.prototype, "fileService", void 0);
exports.MonacoSnippetSuggestProvider = MonacoSnippetSuggestProvider = MonacoSnippetSuggestProvider_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoSnippetSuggestProvider);
var JsonSerializedSnippet;
(function (JsonSerializedSnippet) {
    function is(obj) {
        return (0, common_1.isObject)(obj) && 'body' in obj;
    }
    JsonSerializedSnippet.is = is;
})(JsonSerializedSnippet || (exports.JsonSerializedSnippet = JsonSerializedSnippet = {}));
class MonacoSnippetSuggestion {
    constructor(snippet, range) {
        this.snippet = snippet;
        this.range = range;
        this.noAutoAccept = true;
        this.kind = monaco.languages.CompletionItemKind.Snippet;
        this.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
        this.resolved = false;
        this.label = snippet.prefix;
        this.detail = `${snippet.description || snippet.name} (${snippet.source})`;
        this.insertText = snippet.body;
        this.sortText = `z-${snippet.prefix}`;
        this.range = range;
    }
    resolve() {
        if (!this.resolved) {
            const codeSnippet = new snippetParser_1.SnippetParser().parse(this.snippet.body).toString();
            this.documentation = { value: '```\n' + codeSnippet + '```' };
            this.resolved = true;
        }
        return this;
    }
    static compareByLabel(a, b) {
        return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
    }
}
exports.MonacoSnippetSuggestion = MonacoSnippetSuggestion;
//# sourceMappingURL=monaco-snippet-suggest-provider.js.map