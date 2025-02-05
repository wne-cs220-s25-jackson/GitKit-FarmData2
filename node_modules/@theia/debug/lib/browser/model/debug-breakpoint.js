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
exports.DebugBreakpoint = exports.DebugBreakpointDecoration = exports.DebugBreakpointOptions = exports.DebugBreakpointData = void 0;
const React = require("@theia/core/shared/react");
const browser_1 = require("@theia/core/lib/browser");
class DebugBreakpointData {
}
exports.DebugBreakpointData = DebugBreakpointData;
class DebugBreakpointOptions {
}
exports.DebugBreakpointOptions = DebugBreakpointOptions;
class DebugBreakpointDecoration {
}
exports.DebugBreakpointDecoration = DebugBreakpointDecoration;
class DebugBreakpoint extends DebugBreakpointOptions {
    constructor(uri, options) {
        super();
        this.uri = uri;
        this.setBreakpointEnabled = (event) => {
            this.setEnabled(event.target.checked);
        };
        Object.assign(this, options);
    }
    update(data) {
        Object.assign(this, data);
    }
    get idFromAdapter() {
        return this.raw && this.raw.id;
    }
    get id() {
        return this.origin.id;
    }
    get enabled() {
        return this.breakpoints.breakpointsEnabled && this.origin.enabled;
    }
    get installed() {
        return !!this.raw;
    }
    get verified() {
        return !!this.raw ? this.raw.verified : true;
    }
    get message() {
        return this.raw && this.raw.message || '';
    }
    render() {
        const classNames = ['theia-source-breakpoint'];
        if (!this.isEnabled()) {
            classNames.push(browser_1.DISABLED_CLASS);
        }
        const decoration = this.getDecoration();
        return React.createElement("div", { title: decoration.message.join('\n'), className: classNames.join(' ') },
            React.createElement("span", { className: 'theia-debug-breakpoint-icon codicon ' + decoration.className }),
            React.createElement("input", { className: 'theia-input', type: 'checkbox', checked: this.origin.enabled, onChange: this.setBreakpointEnabled }),
            this.doRender());
    }
    isEnabled() {
        return this.breakpoints.breakpointsEnabled && this.verified;
    }
    getDecoration() {
        if (!this.enabled) {
            return this.getDisabledBreakpointDecoration();
        }
        if (this.installed && !this.verified) {
            return this.getUnverifiedBreakpointDecoration();
        }
        return this.doGetDecoration();
    }
    getUnverifiedBreakpointDecoration() {
        const decoration = this.getBreakpointDecoration();
        return {
            className: decoration.className + '-unverified',
            message: [this.message || 'Unverified ' + decoration.message[0]]
        };
    }
    getDisabledBreakpointDecoration(message) {
        const decoration = this.getBreakpointDecoration();
        return {
            className: decoration.className + '-disabled',
            message: [message || ('Disabled ' + decoration.message[0])]
        };
    }
    doGetDecoration(messages = []) {
        if (this.message) {
            if (messages.length) {
                messages[messages.length - 1].concat(', ' + this.message);
            }
            else {
                messages.push(this.message);
            }
        }
        return this.getBreakpointDecoration(messages);
    }
}
exports.DebugBreakpoint = DebugBreakpoint;
//# sourceMappingURL=debug-breakpoint.js.map