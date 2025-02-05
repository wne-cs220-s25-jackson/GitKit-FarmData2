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
exports.DebugStackFrame = exports.DebugStackFrameData = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Based on https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/workbench/contrib/debug/common/debugModel.ts
const React = require("@theia/core/shared/react");
const browser_1 = require("@theia/core/lib/browser");
const browser_2 = require("@theia/editor/lib/browser");
const debug_console_items_1 = require("../console/debug-console-items");
const monaco = require("@theia/monaco-editor-core");
class DebugStackFrameData {
}
exports.DebugStackFrameData = DebugStackFrameData;
class DebugStackFrame extends DebugStackFrameData {
    constructor(thread, session) {
        super();
        this.thread = thread;
        this.session = session;
    }
    get id() {
        return this.session.id + ':' + this.thread.id + ':' + this.raw.id;
    }
    /**
     * Returns the frame identifier from the debug protocol.
     */
    get frameId() {
        return this.raw.id;
    }
    get source() {
        return this._source;
    }
    update(data) {
        Object.assign(this, data);
        this._source = this.raw.source && this.session.getSource(this.raw.source);
    }
    async restart() {
        await this.session.sendRequest('restartFrame', this.toArgs({
            threadId: this.thread.id
        }));
    }
    async open(options) {
        if (!this.source) {
            return undefined;
        }
        const { line, column, endLine, endColumn } = this.raw;
        const selection = {
            start: browser_2.Position.create(this.clampPositive(line - 1), this.clampPositive(column - 1))
        };
        if (typeof endLine === 'number') {
            selection.end = {
                line: this.clampPositive(endLine - 1),
                character: typeof endColumn === 'number' ? this.clampPositive(endColumn - 1) : undefined
            };
        }
        this.source.open({
            mode: 'reveal',
            ...options,
            selection
        });
    }
    /**
     * Debugger can send `column: 0` value despite of initializing the debug session with `columnsStartAt1: true`.
     * This method can be used to ensure that neither `column` nor `column` are negative numbers.
     * See https://github.com/microsoft/vscode-mock-debug/issues/85.
     */
    clampPositive(value) {
        return Math.max(value, 0);
    }
    getScopes() {
        return this.scopes || (this.scopes = this.doGetScopes());
    }
    async doGetScopes() {
        let response;
        try {
            response = await this.session.sendRequest('scopes', this.toArgs());
        }
        catch {
            // no-op: ignore debug adapter errors
        }
        if (!response) {
            return [];
        }
        return response.body.scopes.map(raw => new debug_console_items_1.DebugScope(raw, () => this.session));
    }
    // https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/workbench/contrib/debug/common/debugModel.ts#L324-L335
    async getMostSpecificScopes(range) {
        const scopes = await this.getScopes();
        const nonExpensiveScopes = scopes.filter(s => !s.expensive);
        const haveRangeInfo = nonExpensiveScopes.some(s => !!s.range);
        if (!haveRangeInfo) {
            return nonExpensiveScopes;
        }
        const scopesContainingRange = nonExpensiveScopes.filter(scope => scope.range && monaco.Range.containsRange(scope.range, range))
            .sort((first, second) => (first.range.endLineNumber - first.range.startLineNumber) - (second.range.endLineNumber - second.range.startLineNumber));
        return scopesContainingRange.length ? scopesContainingRange : nonExpensiveScopes;
    }
    toArgs(arg) {
        return Object.assign({}, arg, {
            frameId: this.raw.id
        });
    }
    render() {
        const classNames = ['theia-debug-stack-frame'];
        if (this.raw.presentationHint === 'label') {
            classNames.push('label');
        }
        if (this.raw.presentationHint === 'subtle') {
            classNames.push('subtle');
        }
        if (!this.source || this.source.raw.presentationHint === 'deemphasize') {
            classNames.push(browser_1.DISABLED_CLASS);
        }
        return React.createElement("div", { className: classNames.join(' ') },
            React.createElement("span", { className: 'expression', title: this.raw.name }, this.raw.name),
            this.renderFile());
    }
    renderFile() {
        const { source } = this;
        if (!source) {
            return undefined;
        }
        const origin = source.raw.origin && `\n${source.raw.origin}` || '';
        return React.createElement("span", { className: 'file', title: source.longName + origin },
            React.createElement("span", { className: 'name' }, source.name),
            React.createElement("span", { className: 'line' },
                this.raw.line,
                ":",
                this.raw.column));
    }
    get range() {
        const { source, line: startLine, column: startColumn, endLine, endColumn } = this.raw;
        if (source) {
            return new monaco.Range(startLine, startColumn, endLine || startLine, endColumn || startColumn);
        }
        return undefined;
    }
}
exports.DebugStackFrame = DebugStackFrame;
//# sourceMappingURL=debug-stack-frame.js.map