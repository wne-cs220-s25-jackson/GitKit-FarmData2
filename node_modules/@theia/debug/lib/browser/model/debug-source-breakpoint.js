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
exports.DebugSourceBreakpoint = exports.DebugSourceBreakpointData = void 0;
const React = require("@theia/core/shared/react");
const uri_1 = require("@theia/core/lib/common/uri");
const browser_1 = require("@theia/core/lib/browser");
const debug_breakpoint_1 = require("./debug-breakpoint");
class DebugSourceBreakpointData extends debug_breakpoint_1.DebugBreakpointData {
}
exports.DebugSourceBreakpointData = DebugSourceBreakpointData;
class DebugSourceBreakpoint extends debug_breakpoint_1.DebugBreakpoint {
    constructor(origin, options) {
        super(new uri_1.default(origin.uri), options);
        this.setBreakpointEnabled = (event) => {
            this.setEnabled(event.target.checked);
        };
        this.origins = [origin];
    }
    update(data) {
        super.update(data);
    }
    get origin() {
        return this.origins[0];
    }
    setEnabled(enabled) {
        const { uri, raw } = this;
        let shouldUpdate = false;
        let breakpoints = raw && this.doRemove(this.origins.filter(origin => !(origin.raw.line === raw.line && origin.raw.column === raw.column)));
        // Check for breakpoints array with at least one entry
        if (breakpoints && breakpoints.length) {
            shouldUpdate = true;
        }
        else {
            breakpoints = this.breakpoints.getBreakpoints(uri);
        }
        for (const breakpoint of breakpoints) {
            if (breakpoint.raw.line === this.origin.raw.line && breakpoint.raw.column === this.origin.raw.column && breakpoint.enabled !== enabled) {
                breakpoint.enabled = enabled;
                shouldUpdate = true;
            }
        }
        if (shouldUpdate) {
            this.breakpoints.setBreakpoints(this.uri, breakpoints);
        }
    }
    updateOrigins(data) {
        const breakpoints = this.breakpoints.getBreakpoints(this.uri);
        let shouldUpdate = false;
        const originPositions = new Set();
        this.origins.forEach(origin => originPositions.add(origin.raw.line + ':' + origin.raw.column));
        for (const breakpoint of breakpoints) {
            if (originPositions.has(breakpoint.raw.line + ':' + breakpoint.raw.column)) {
                Object.assign(breakpoint.raw, data);
                shouldUpdate = true;
            }
        }
        if (shouldUpdate) {
            this.breakpoints.setBreakpoints(this.uri, breakpoints);
        }
    }
    /** 1-based */
    get line() {
        return this.raw && this.raw.line || this.origins[0].raw.line;
    }
    get column() {
        return this.raw && this.raw.column || this.origins[0].raw.column;
    }
    get endLine() {
        return this.raw && this.raw.endLine;
    }
    get endColumn() {
        return this.raw && this.raw.endColumn;
    }
    get condition() {
        return this.origin.raw.condition;
    }
    get hitCondition() {
        return this.origin.raw.hitCondition;
    }
    get logMessage() {
        return this.origin.raw.logMessage;
    }
    get source() {
        return this.raw && this.raw.source && this.session && this.session.getSource(this.raw.source);
    }
    async open(options = {
        mode: 'reveal'
    }) {
        const { line, column, endLine, endColumn } = this;
        const selection = {
            start: {
                line: line - 1,
                character: typeof column === 'number' ? column - 1 : undefined
            }
        };
        if (typeof endLine === 'number') {
            selection.end = {
                line: endLine - 1,
                character: typeof endColumn === 'number' ? endColumn - 1 : undefined
            };
        }
        if (this.source) {
            await this.source.open({
                ...options,
                selection
            });
        }
        else {
            await this.editorManager.open(this.uri, {
                ...options,
                selection
            });
        }
    }
    doRender() {
        return React.createElement(React.Fragment, null,
            React.createElement("span", { className: 'line-info', title: this.labelProvider.getLongName(this.uri) },
                React.createElement("span", { className: 'name' },
                    this.labelProvider.getName(this.uri),
                    " "),
                React.createElement("span", { className: 'path ' + browser_1.TREE_NODE_INFO_CLASS },
                    this.labelProvider.getLongName(this.uri.parent),
                    " ")),
            React.createElement("span", { className: 'line' }, this.renderPosition()));
    }
    renderPosition() {
        return this.line + (typeof this.column === 'number' ? ':' + this.column : '');
    }
    doGetDecoration(messages = []) {
        if (this.logMessage || this.condition || this.hitCondition) {
            const { session } = this;
            if (this.logMessage) {
                if (session && !session.capabilities.supportsLogPoints) {
                    return this.getUnsupportedBreakpointDecoration('Logpoints not supported by this debug type');
                }
                messages.push('Log Message: ' + this.logMessage);
            }
            if (this.condition) {
                if (session && !session.capabilities.supportsConditionalBreakpoints) {
                    return this.getUnsupportedBreakpointDecoration('Conditional breakpoints not supported by this debug type');
                }
                messages.push('Expression: ' + this.condition);
            }
            if (this.hitCondition) {
                if (session && !session.capabilities.supportsHitConditionalBreakpoints) {
                    return this.getUnsupportedBreakpointDecoration('Hit conditional breakpoints not supported by this debug type');
                }
                messages.push('Hit Count: ' + this.hitCondition);
            }
        }
        return super.doGetDecoration(messages);
    }
    getUnsupportedBreakpointDecoration(message) {
        return {
            className: 'codicon-debug-breakpoint-unsupported',
            message: [message]
        };
    }
    getBreakpointDecoration(message) {
        if (this.logMessage) {
            return {
                className: 'codicon-debug-breakpoint-log',
                message: message || ['Logpoint']
            };
        }
        if (this.condition || this.hitCondition) {
            return {
                className: 'codicon-debug-breakpoint-conditional',
                message: message || ['Conditional Breakpoint']
            };
        }
        return {
            className: 'codicon-debug-breakpoint',
            message: message || ['Breakpoint']
        };
    }
    remove() {
        const breakpoints = this.doRemove(this.origins);
        if (breakpoints) {
            this.breakpoints.setBreakpoints(this.uri, breakpoints);
        }
    }
    doRemove(origins) {
        if (!origins.length) {
            return undefined;
        }
        const { uri } = this;
        const toRemove = new Set();
        origins.forEach(origin => toRemove.add(origin.raw.line + ':' + origin.raw.column));
        let shouldUpdate = false;
        const breakpoints = this.breakpoints.findMarkers({
            uri,
            dataFilter: data => {
                const result = !toRemove.has(data.raw.line + ':' + data.raw.column);
                shouldUpdate = shouldUpdate || !result;
                return result;
            }
        }).map(({ data }) => data);
        return shouldUpdate && breakpoints || undefined;
    }
}
exports.DebugSourceBreakpoint = DebugSourceBreakpoint;
//# sourceMappingURL=debug-source-breakpoint.js.map