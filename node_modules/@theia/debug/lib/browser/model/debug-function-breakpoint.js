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
exports.DebugFunctionBreakpoint = void 0;
const React = require("@theia/core/shared/react");
const breakpoint_manager_1 = require("../breakpoint/breakpoint-manager");
const debug_breakpoint_1 = require("./debug-breakpoint");
const dialogs_1 = require("@theia/core/lib/browser/dialogs");
const core_1 = require("@theia/core");
class DebugFunctionBreakpoint extends debug_breakpoint_1.DebugBreakpoint {
    constructor(origin, options) {
        super(breakpoint_manager_1.BreakpointManager.FUNCTION_URI, options);
        this.origin = origin;
    }
    setEnabled(enabled) {
        const breakpoints = this.breakpoints.getFunctionBreakpoints();
        const breakpoint = breakpoints.find(b => b.id === this.id);
        if (breakpoint && breakpoint.enabled !== enabled) {
            breakpoint.enabled = enabled;
            this.breakpoints.setFunctionBreakpoints(breakpoints);
        }
    }
    isEnabled() {
        return super.isEnabled() && this.isSupported();
    }
    isSupported() {
        const { session } = this;
        return !session || !!session.capabilities.supportsFunctionBreakpoints;
    }
    remove() {
        const breakpoints = this.breakpoints.getFunctionBreakpoints();
        const newBreakpoints = breakpoints.filter(b => b.id !== this.id);
        if (breakpoints.length !== newBreakpoints.length) {
            this.breakpoints.setFunctionBreakpoints(newBreakpoints);
        }
    }
    get name() {
        return this.origin.raw.name;
    }
    doRender() {
        return React.createElement("span", { className: 'line-info' }, this.name);
    }
    doGetDecoration() {
        if (!this.isSupported()) {
            return this.getDisabledBreakpointDecoration(core_1.nls.localizeByDefault('Function breakpoints are not supported by this debug type'));
        }
        return super.doGetDecoration();
    }
    getBreakpointDecoration(message) {
        return {
            className: 'codicon-debug-breakpoint-function',
            message: message || [core_1.nls.localizeByDefault('Function Breakpoint')]
        };
    }
    async open() {
        const input = new dialogs_1.SingleTextInputDialog({
            title: core_1.nls.localizeByDefault('Add Function Breakpoint'),
            initialValue: this.name
        });
        const newValue = await input.open();
        if (newValue !== undefined && newValue !== this.name) {
            const breakpoints = this.breakpoints.getFunctionBreakpoints();
            const breakpoint = breakpoints.find(b => b.id === this.id);
            if (breakpoint) {
                if (breakpoint.raw.name !== newValue) {
                    breakpoint.raw.name = newValue;
                    this.breakpoints.setFunctionBreakpoints(breakpoints);
                }
            }
            else {
                this.origin.raw.name = newValue;
                breakpoints.push(this.origin);
                this.breakpoints.setFunctionBreakpoints(breakpoints);
            }
        }
    }
}
exports.DebugFunctionBreakpoint = DebugFunctionBreakpoint;
//# sourceMappingURL=debug-function-breakpoint.js.map