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
var DebugConsoleSession_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugConsoleSession = exports.DebugConsoleSessionFactory = void 0;
const tslib_1 = require("tslib");
const throttle = require("@theia/core/shared/lodash.throttle");
const console_session_1 = require("@theia/console/lib/browser/console-session");
const ansi_console_item_1 = require("@theia/console/lib/browser/ansi-console-item");
const uri_1 = require("@theia/core/lib/common/uri");
const debug_console_items_1 = require("./debug-console-items");
const severity_1 = require("@theia/core/lib/common/severity");
const inversify_1 = require("@theia/core/shared/inversify");
const debug_session_manager_1 = require("../debug-session-manager");
const monaco = require("@theia/monaco-editor-core");
exports.DebugConsoleSessionFactory = Symbol('DebugConsoleSessionFactory');
let DebugConsoleSession = DebugConsoleSession_1 = class DebugConsoleSession extends console_session_1.ConsoleSession {
    constructor() {
        super(...arguments);
        this.items = [];
        this.completionKinds = new Map();
        this.fireDidChange = throttle(() => super.fireDidChange(), 50);
    }
    get debugSession() {
        return this._debugSession;
    }
    set debugSession(value) {
        this._debugSession = value;
        this.id = value.id;
    }
    init() {
        this.completionKinds.set('method', monaco.languages.CompletionItemKind.Method);
        this.completionKinds.set('function', monaco.languages.CompletionItemKind.Function);
        this.completionKinds.set('constructor', monaco.languages.CompletionItemKind.Constructor);
        this.completionKinds.set('field', monaco.languages.CompletionItemKind.Field);
        this.completionKinds.set('variable', monaco.languages.CompletionItemKind.Variable);
        this.completionKinds.set('class', monaco.languages.CompletionItemKind.Class);
        this.completionKinds.set('interface', monaco.languages.CompletionItemKind.Interface);
        this.completionKinds.set('module', monaco.languages.CompletionItemKind.Module);
        this.completionKinds.set('property', monaco.languages.CompletionItemKind.Property);
        this.completionKinds.set('unit', monaco.languages.CompletionItemKind.Unit);
        this.completionKinds.set('value', monaco.languages.CompletionItemKind.Value);
        this.completionKinds.set('enum', monaco.languages.CompletionItemKind.Enum);
        this.completionKinds.set('keyword', monaco.languages.CompletionItemKind.Keyword);
        this.completionKinds.set('snippet', monaco.languages.CompletionItemKind.Snippet);
        this.completionKinds.set('text', monaco.languages.CompletionItemKind.Text);
        this.completionKinds.set('color', monaco.languages.CompletionItemKind.Color);
        this.completionKinds.set('file', monaco.languages.CompletionItemKind.File);
        this.completionKinds.set('reference', monaco.languages.CompletionItemKind.Reference);
        this.completionKinds.set('customcolor', monaco.languages.CompletionItemKind.Color);
        this.toDispose.push(monaco.languages.registerCompletionItemProvider({
            scheme: DebugConsoleSession_1.uri.scheme,
            hasAccessToAllModels: true
        }, {
            triggerCharacters: ['.'],
            provideCompletionItems: (model, position) => this.completions(model, position),
        }));
    }
    getElements() {
        return this.items.filter(e => !this.severity || e.severity === this.severity)[Symbol.iterator]();
    }
    async completions(model, position) {
        const completionSession = this.findCompletionSession();
        if (completionSession) {
            const column = position.column;
            const lineNumber = position.lineNumber;
            const word = model.getWordAtPosition({ column, lineNumber });
            const overwriteBefore = word ? word.word.length : 0;
            const text = model.getValue();
            const items = await completionSession.completions(text, column, lineNumber);
            const suggestions = items.map(item => this.asCompletionItem(text, position, overwriteBefore, item));
            return { suggestions };
        }
        return undefined;
    }
    findCurrentSession() {
        const currentSession = this.sessionManager.currentSession;
        if (!currentSession) {
            return undefined;
        }
        if (currentSession.id === this.debugSession.id) {
            // perfect match
            return this.debugSession;
        }
        const parentSession = currentSession.findConsoleParent();
        if ((parentSession === null || parentSession === void 0 ? void 0 : parentSession.id) === this.debugSession.id) {
            // child of our session
            return currentSession;
        }
        return undefined;
    }
    findCompletionSession() {
        let completionSession = this.findCurrentSession();
        while (completionSession !== undefined) {
            if (completionSession.capabilities.supportsCompletionsRequest) {
                return completionSession;
            }
            completionSession = completionSession.parentSession;
        }
        return completionSession;
    }
    asCompletionItem(text, position, overwriteBefore, item) {
        return {
            label: item.label,
            insertText: item.text || item.label,
            kind: this.completionKinds.get(item.type) || monaco.languages.CompletionItemKind.Property,
            filterText: (item.start && item.length) ? text.substring(item.start, item.start + item.length).concat(item.label) : undefined,
            range: monaco.Range.fromPositions(position.delta(0, -(item.length || overwriteBefore)), position),
            sortText: item.sortText
        };
    }
    async execute(value) {
        const expression = new debug_console_items_1.ExpressionItem(value, () => this.findCurrentSession());
        this.items.push(expression);
        await expression.evaluate();
        this.fireDidChange();
    }
    clear() {
        this.items = [];
        this.fireDidChange();
    }
    append(value) {
        if (!value) {
            return;
        }
        const lastItem = this.items.slice(-1)[0];
        if (lastItem instanceof ansi_console_item_1.AnsiConsoleItem && lastItem.content === this.uncompletedItemContent) {
            this.items.pop();
            this.uncompletedItemContent += value;
        }
        else {
            this.uncompletedItemContent = value;
        }
        this.items.push(new ansi_console_item_1.AnsiConsoleItem(this.uncompletedItemContent, severity_1.Severity.Info));
        this.fireDidChange();
    }
    appendLine(value) {
        this.items.push(new ansi_console_item_1.AnsiConsoleItem(value, severity_1.Severity.Info));
        this.fireDidChange();
    }
    async logOutput(session, event) {
        const body = event.body;
        const { category, variablesReference } = body;
        if (category === 'telemetry') {
            console.debug(`telemetry/${event.body.output}`, event.body.data);
            return;
        }
        const severity = category === 'stderr' ? severity_1.Severity.Error : event.body.category === 'console' ? severity_1.Severity.Warning : severity_1.Severity.Info;
        if (variablesReference) {
            const items = await new debug_console_items_1.ExpressionContainer({ session: () => session, variablesReference }).getElements();
            for (const item of items) {
                this.items.push(Object.assign(item, { severity }));
            }
        }
        else if (typeof body.output === 'string') {
            for (const line of body.output.split('\n')) {
                this.items.push(new ansi_console_item_1.AnsiConsoleItem(line, severity));
            }
        }
        this.fireDidChange();
    }
};
exports.DebugConsoleSession = DebugConsoleSession;
DebugConsoleSession.uri = new uri_1.default().withScheme('debugconsole');
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_session_manager_1.DebugSessionManager),
    tslib_1.__metadata("design:type", debug_session_manager_1.DebugSessionManager)
], DebugConsoleSession.prototype, "sessionManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugConsoleSession.prototype, "init", null);
exports.DebugConsoleSession = DebugConsoleSession = DebugConsoleSession_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugConsoleSession);
//# sourceMappingURL=debug-console-session.js.map