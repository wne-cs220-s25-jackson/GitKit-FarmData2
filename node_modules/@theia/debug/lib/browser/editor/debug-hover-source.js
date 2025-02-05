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
exports.DebugHoverSource = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const debug_console_items_1 = require("../console/debug-console-items");
const debug_session_manager_1 = require("../debug-session-manager");
const inversify_1 = require("@theia/core/shared/inversify");
let DebugHoverSource = class DebugHoverSource extends source_tree_1.TreeSource {
    constructor() {
        super(...arguments);
        this.elements = [];
    }
    get expression() {
        return this._expression;
    }
    getElements() {
        return this.elements[Symbol.iterator]();
    }
    renderTitle(element) {
        return React.createElement("div", { className: 'theia-debug-hover-title', title: element.value }, element.value);
    }
    reset() {
        this._expression = undefined;
        this.elements = [];
        this.fireDidChange();
    }
    async evaluate(expression) {
        const evaluated = await this.doEvaluate(expression);
        const elements = evaluated && await evaluated.getElements();
        this._expression = evaluated;
        this.elements = elements ? [...elements] : [];
        this.fireDidChange();
        return evaluated;
    }
    async doEvaluate(expression) {
        const { currentSession } = this.sessions;
        if (!currentSession) {
            return undefined;
        }
        if (currentSession.capabilities.supportsEvaluateForHovers) {
            const item = new debug_console_items_1.ExpressionItem(expression, () => currentSession);
            await item.evaluate('hover');
            return item.available && item || undefined;
        }
        return this.findVariable(expression.split('.').map(word => word.trim()).filter(word => !!word));
    }
    async findVariable(namesToFind) {
        const { currentFrame } = this.sessions;
        if (!currentFrame) {
            return undefined;
        }
        let variable;
        const scopes = await currentFrame.getScopes();
        for (const scope of scopes) {
            const found = await this.doFindVariable(scope, namesToFind);
            if (!variable) {
                variable = found;
            }
            else if (found && found.value !== variable.value) {
                // only show if all expressions found have the same value
                return undefined;
            }
        }
        return variable;
    }
    async doFindVariable(owner, namesToFind) {
        const elements = await owner.getElements();
        const variables = [];
        for (const element of elements) {
            if (element instanceof debug_console_items_1.DebugVariable && element.name === namesToFind[0]) {
                variables.push(element);
            }
        }
        if (variables.length !== 1) {
            return undefined;
        }
        if (namesToFind.length === 1) {
            return variables[0];
        }
        else {
            return this.doFindVariable(variables[0], namesToFind.slice(1));
        }
    }
};
exports.DebugHoverSource = DebugHoverSource;
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_session_manager_1.DebugSessionManager),
    tslib_1.__metadata("design:type", debug_session_manager_1.DebugSessionManager)
], DebugHoverSource.prototype, "sessions", void 0);
exports.DebugHoverSource = DebugHoverSource = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugHoverSource);
//# sourceMappingURL=debug-hover-source.js.map