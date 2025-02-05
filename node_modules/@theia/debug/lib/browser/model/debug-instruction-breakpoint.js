"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.DebugInstructionBreakpoint = void 0;
const core_1 = require("@theia/core");
const React = require("@theia/core/shared/react");
const breakpoint_manager_1 = require("../breakpoint/breakpoint-manager");
const debug_breakpoint_1 = require("./debug-breakpoint");
class DebugInstructionBreakpoint extends debug_breakpoint_1.DebugBreakpoint {
    constructor(origin, options) {
        super(breakpoint_manager_1.BreakpointManager.INSTRUCTION_URI, options);
        this.origin = origin;
    }
    setEnabled(enabled) {
        if (enabled !== this.origin.enabled) {
            this.breakpoints.updateInstructionBreakpoint(this.origin.id, { enabled });
        }
    }
    isEnabled() {
        return super.isEnabled() && this.isSupported();
    }
    isSupported() {
        var _a;
        return Boolean((_a = this.session) === null || _a === void 0 ? void 0 : _a.capabilities.supportsInstructionBreakpoints);
    }
    remove() {
        this.breakpoints.removeInstructionBreakpoint(this.origin.instructionReference);
    }
    doRender() {
        return React.createElement("span", { className: "line-info" }, this.origin.instructionReference);
    }
    getBreakpointDecoration(message) {
        if (!this.isSupported()) {
            return {
                className: 'codicon-debug-breakpoint-unsupported',
                message: message !== null && message !== void 0 ? message : [core_1.nls.localize('theia/debug/instruction-breakpoint', 'Instruction Breakpoint')],
            };
        }
        if (this.origin.condition || this.origin.hitCondition) {
            return {
                className: 'codicon-debug-breakpoint-conditional',
                message: message || [core_1.nls.localizeByDefault('Conditional Breakpoint...')]
            };
        }
        return {
            className: 'codicon-debug-breakpoint',
            message: message || [core_1.nls.localize('theia/debug/instruction-breakpoint', 'Instruction Breakpoint')]
        };
    }
}
exports.DebugInstructionBreakpoint = DebugInstructionBreakpoint;
//# sourceMappingURL=debug-instruction-breakpoint.js.map