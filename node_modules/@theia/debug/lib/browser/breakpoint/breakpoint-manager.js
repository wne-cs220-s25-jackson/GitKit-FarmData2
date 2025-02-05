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
var BreakpointManager_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakpointManager = void 0;
const tslib_1 = require("tslib");
const deepEqual = require("fast-deep-equal");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const marker_manager_1 = require("@theia/markers/lib/browser/marker-manager");
const uri_1 = require("@theia/core/lib/common/uri");
const breakpoint_marker_1 = require("./breakpoint-marker");
let BreakpointManager = BreakpointManager_1 = class BreakpointManager extends marker_manager_1.MarkerManager {
    constructor() {
        super(...arguments);
        this.owner = 'breakpoint';
        this.onDidChangeBreakpointsEmitter = new common_1.Emitter();
        this.onDidChangeBreakpoints = this.onDidChangeBreakpointsEmitter.event;
        this.onDidChangeFunctionBreakpointsEmitter = new common_1.Emitter();
        this.onDidChangeFunctionBreakpoints = this.onDidChangeFunctionBreakpointsEmitter.event;
        this.onDidChangeInstructionBreakpointsEmitter = new common_1.Emitter();
        this.onDidChangeInstructionBreakpoints = this.onDidChangeInstructionBreakpointsEmitter.event;
        this._breakpointsEnabled = true;
        this.exceptionBreakpoints = new Map();
        this.functionBreakpoints = [];
        this.instructionBreakpoints = [];
    }
    getKind() {
        return breakpoint_marker_1.BREAKPOINT_KIND;
    }
    setMarkers(uri, owner, newMarkers) {
        const result = this.findMarkers({ uri, owner });
        const added = [];
        const removed = [];
        const changed = [];
        const oldMarkers = new Map(result.map(({ data }) => [data.id, data]));
        const ids = new Set();
        let didChangeMarkers = false;
        for (const newMarker of newMarkers) {
            ids.add(newMarker.id);
            const oldMarker = oldMarkers.get(newMarker.id);
            if (!oldMarker) {
                added.push(newMarker);
            }
            else {
                // We emit all existing markers as 'changed', but we only fire an event if something really did change.
                // We also fire an event if oldMarker === newMarker, as we cannot actually detect a change in this case
                // (https://github.com/eclipse-theia/theia/issues/12546).
                didChangeMarkers || (didChangeMarkers = !!added.length || oldMarker === newMarker || !deepEqual(oldMarker, newMarker));
                changed.push(newMarker);
            }
        }
        for (const [id, data] of oldMarkers.entries()) {
            if (!ids.has(id)) {
                removed.push(data);
            }
        }
        if (added.length || removed.length || didChangeMarkers) {
            super.setMarkers(uri, owner, newMarkers);
            this.onDidChangeBreakpointsEmitter.fire({ uri, added, removed, changed });
        }
        return result;
    }
    getLineBreakpoints(uri, line) {
        return this.findMarkers({
            uri,
            dataFilter: breakpoint => breakpoint.raw.line === line
        }).map(({ data }) => data);
    }
    getInlineBreakpoint(uri, line, column) {
        const marker = this.findMarkers({
            uri,
            dataFilter: breakpoint => breakpoint.raw.line === line && breakpoint.raw.column === column
        })[0];
        return marker && marker.data;
    }
    getBreakpoints(uri) {
        return this.findMarkers({ uri }).map(marker => marker.data);
    }
    setBreakpoints(uri, breakpoints) {
        this.setMarkers(uri, this.owner, breakpoints.sort((a, b) => (a.raw.line - b.raw.line) || ((a.raw.column || 0) - (b.raw.column || 0))));
    }
    addBreakpoint(breakpoint) {
        const uri = new uri_1.default(breakpoint.uri);
        const breakpoints = this.getBreakpoints(uri);
        const newBreakpoints = breakpoints.filter(({ raw }) => !(raw.line === breakpoint.raw.line && raw.column === breakpoint.raw.column));
        if (breakpoints.length === newBreakpoints.length) {
            newBreakpoints.push(breakpoint);
            this.setBreakpoints(uri, newBreakpoints);
            return true;
        }
        return false;
    }
    enableAllBreakpoints(enabled) {
        for (const uriString of this.getUris()) {
            let didChange = false;
            const uri = new uri_1.default(uriString);
            const markers = this.findMarkers({ uri });
            for (const marker of markers) {
                if (marker.data.enabled !== enabled) {
                    marker.data.enabled = enabled;
                    didChange = true;
                }
            }
            if (didChange) {
                this.fireOnDidChangeMarkers(uri);
            }
        }
        let didChangeFunction = false;
        for (const breakpoint of this.getFunctionBreakpoints().concat(this.getInstructionBreakpoints())) {
            if (breakpoint.enabled !== enabled) {
                breakpoint.enabled = enabled;
                didChangeFunction = true;
            }
        }
        if (didChangeFunction) {
            this.fireOnDidChangeMarkers(BreakpointManager_1.FUNCTION_URI);
        }
    }
    get breakpointsEnabled() {
        return this._breakpointsEnabled;
    }
    set breakpointsEnabled(breakpointsEnabled) {
        if (this._breakpointsEnabled !== breakpointsEnabled) {
            this._breakpointsEnabled = breakpointsEnabled;
            for (const uri of this.getUris()) {
                this.fireOnDidChangeMarkers(new uri_1.default(uri));
            }
            this.fireOnDidChangeMarkers(BreakpointManager_1.FUNCTION_URI);
        }
    }
    getExceptionBreakpoint(filter) {
        return this.exceptionBreakpoints.get(filter);
    }
    getExceptionBreakpoints() {
        return this.exceptionBreakpoints.values();
    }
    setExceptionBreakpoints(exceptionBreakpoints) {
        const toRemove = new Set(this.exceptionBreakpoints.keys());
        for (const exceptionBreakpoint of exceptionBreakpoints) {
            const filter = exceptionBreakpoint.raw.filter;
            toRemove.delete(filter);
            this.exceptionBreakpoints.set(filter, exceptionBreakpoint);
        }
        for (const filter of toRemove) {
            this.exceptionBreakpoints.delete(filter);
        }
        if (toRemove.size || exceptionBreakpoints.length) {
            this.fireOnDidChangeMarkers(BreakpointManager_1.EXCEPTION_URI);
        }
    }
    toggleExceptionBreakpoint(filter) {
        const breakpoint = this.getExceptionBreakpoint(filter);
        if (breakpoint) {
            breakpoint.enabled = !breakpoint.enabled;
            this.fireOnDidChangeMarkers(BreakpointManager_1.EXCEPTION_URI);
        }
    }
    updateExceptionBreakpoint(filter, options) {
        const breakpoint = this.getExceptionBreakpoint(filter);
        if (breakpoint) {
            Object.assign(breakpoint, options);
            this.fireOnDidChangeMarkers(BreakpointManager_1.EXCEPTION_URI);
        }
    }
    getFunctionBreakpoints() {
        return this.functionBreakpoints;
    }
    setFunctionBreakpoints(functionBreakpoints) {
        const oldBreakpoints = new Map(this.functionBreakpoints.map(b => [b.id, b]));
        this.functionBreakpoints = functionBreakpoints;
        this.fireOnDidChangeMarkers(BreakpointManager_1.FUNCTION_URI);
        const added = [];
        const removed = [];
        const changed = [];
        const ids = new Set();
        for (const newBreakpoint of functionBreakpoints) {
            ids.add(newBreakpoint.id);
            if (oldBreakpoints.has(newBreakpoint.id)) {
                changed.push(newBreakpoint);
            }
            else {
                added.push(newBreakpoint);
            }
        }
        for (const [id, breakpoint] of oldBreakpoints.entries()) {
            if (!ids.has(id)) {
                removed.push(breakpoint);
            }
        }
        this.onDidChangeFunctionBreakpointsEmitter.fire({ uri: BreakpointManager_1.FUNCTION_URI, added, removed, changed });
    }
    getInstructionBreakpoints() {
        return Object.freeze(this.instructionBreakpoints.slice());
    }
    hasBreakpoints() {
        return Boolean(this.getUris().next().value || this.functionBreakpoints.length || this.instructionBreakpoints.length);
    }
    setInstructionBreakpoints(newBreakpoints) {
        const oldBreakpoints = new Map(this.instructionBreakpoints.map(breakpoint => [breakpoint.id, breakpoint]));
        const currentBreakpoints = new Map(newBreakpoints.map(breakpoint => [breakpoint.id, breakpoint]));
        const added = [];
        const changed = [];
        for (const [id, breakpoint] of currentBreakpoints.entries()) {
            const old = oldBreakpoints.get(id);
            if (old) {
                changed.push(old);
            }
            else {
                added.push(breakpoint);
            }
            oldBreakpoints.delete(id);
        }
        const removed = Array.from(oldBreakpoints.values());
        this.instructionBreakpoints = Array.from(currentBreakpoints.values());
        this.fireOnDidChangeMarkers(BreakpointManager_1.INSTRUCTION_URI);
        this.onDidChangeInstructionBreakpointsEmitter.fire({ uri: BreakpointManager_1.INSTRUCTION_URI, added, removed, changed });
    }
    addInstructionBreakpoint(address, offset, condition, hitCondition) {
        this.setInstructionBreakpoints(this.instructionBreakpoints.concat(breakpoint_marker_1.InstructionBreakpoint.create({
            instructionReference: address,
            offset,
            condition,
            hitCondition,
        })));
    }
    updateInstructionBreakpoint(id, options) {
        const breakpoint = this.instructionBreakpoints.find(candidate => id === candidate.id);
        if (breakpoint) {
            Object.assign(breakpoint, options);
            this.fireOnDidChangeMarkers(BreakpointManager_1.INSTRUCTION_URI);
            this.onDidChangeInstructionBreakpointsEmitter.fire({ uri: BreakpointManager_1.INSTRUCTION_URI, changed: [breakpoint], added: [], removed: [] });
        }
    }
    removeInstructionBreakpoint(address) {
        if (!address) {
            this.clearInstructionBreakpoints();
        }
        const breakpointIndex = this.instructionBreakpoints.findIndex(breakpoint => breakpoint.instructionReference === address);
        if (breakpointIndex !== -1) {
            const removed = this.instructionBreakpoints.splice(breakpointIndex, 1);
            this.fireOnDidChangeMarkers(BreakpointManager_1.INSTRUCTION_URI);
            this.onDidChangeInstructionBreakpointsEmitter.fire({ uri: BreakpointManager_1.INSTRUCTION_URI, added: [], changed: [], removed });
        }
    }
    clearInstructionBreakpoints() {
        this.setInstructionBreakpoints([]);
    }
    removeBreakpoints() {
        this.cleanAllMarkers();
        this.setFunctionBreakpoints([]);
        this.setInstructionBreakpoints([]);
    }
    async load() {
        const data = await this.storage.getData('breakpoints', {
            breakpointsEnabled: true,
            breakpoints: {}
        });
        this._breakpointsEnabled = data.breakpointsEnabled;
        // eslint-disable-next-line guard-for-in
        for (const uri in data.breakpoints) {
            this.setBreakpoints(new uri_1.default(uri), data.breakpoints[uri]);
        }
        if (data.functionBreakpoints) {
            this.setFunctionBreakpoints(data.functionBreakpoints);
        }
        if (data.exceptionBreakpoints) {
            this.setExceptionBreakpoints(data.exceptionBreakpoints);
        }
        if (data.instructionBreakpoints) {
            this.setInstructionBreakpoints(data.instructionBreakpoints);
        }
    }
    save() {
        const data = {
            breakpointsEnabled: this._breakpointsEnabled,
            breakpoints: {}
        };
        const uris = this.getUris();
        for (const uri of uris) {
            data.breakpoints[uri] = this.findMarkers({ uri: new uri_1.default(uri) }).map(marker => marker.data);
        }
        if (this.functionBreakpoints.length) {
            data.functionBreakpoints = this.functionBreakpoints;
        }
        if (this.exceptionBreakpoints.size) {
            data.exceptionBreakpoints = [...this.exceptionBreakpoints.values()];
        }
        if (this.instructionBreakpoints.length) {
            data.instructionBreakpoints = this.instructionBreakpoints;
        }
        this.storage.setData('breakpoints', data);
    }
};
exports.BreakpointManager = BreakpointManager;
BreakpointManager.EXCEPTION_URI = new uri_1.default('debug:exception://');
BreakpointManager.FUNCTION_URI = new uri_1.default('debug:function://');
BreakpointManager.INSTRUCTION_URI = new uri_1.default('debug:instruction://');
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.StorageService),
    tslib_1.__metadata("design:type", Object)
], BreakpointManager.prototype, "storage", void 0);
exports.BreakpointManager = BreakpointManager = BreakpointManager_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], BreakpointManager);
//# sourceMappingURL=breakpoint-manager.js.map