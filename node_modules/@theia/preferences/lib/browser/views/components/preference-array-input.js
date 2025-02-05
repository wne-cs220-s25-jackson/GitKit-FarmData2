"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
var PreferenceArrayInputRendererContribution_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceArrayInputRendererContribution = exports.PreferenceArrayInputRenderer = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const preference_types_1 = require("../../util/preference-types");
const preference_node_renderer_1 = require("./preference-node-renderer");
const preference_node_renderer_creator_1 = require("./preference-node-renderer-creator");
let PreferenceArrayInputRenderer = class PreferenceArrayInputRenderer extends preference_node_renderer_1.PreferenceLeafNodeRenderer {
    constructor() {
        super(...arguments);
        this.existingValues = new Map();
    }
    createInteractable(parent) {
        const wrapper = document.createElement('ul');
        wrapper.classList.add('preference-array');
        this.wrapper = wrapper;
        const currentValue = this.getValue();
        if (Array.isArray(currentValue)) {
            for (const [index, value] of currentValue.entries()) {
                const node = this.createExistingValue(value);
                wrapper.appendChild(node);
                this.existingValues.set(value, { node, index });
            }
        }
        const inputWrapper = this.createInput();
        wrapper.appendChild(inputWrapper);
        parent.appendChild(wrapper);
    }
    getFallbackValue() {
        return [];
    }
    createExistingValue(value) {
        const existingValue = document.createElement('li');
        existingValue.classList.add('preference-array-element');
        const valueWrapper = document.createElement('span');
        valueWrapper.classList.add('preference-array-element-val');
        valueWrapper.textContent = value;
        existingValue.appendChild(valueWrapper);
        const iconWrapper = document.createElement('span');
        iconWrapper.classList.add('preference-array-element-btn', 'remove-btn');
        const handler = this.removeItem.bind(this, value);
        iconWrapper.onclick = handler;
        iconWrapper.onkeydown = handler;
        iconWrapper.setAttribute('role', 'button');
        iconWrapper.tabIndex = 0;
        existingValue.appendChild(iconWrapper);
        const icon = document.createElement('i');
        icon.classList.add(...(0, browser_1.codiconArray)('close'));
        iconWrapper.appendChild(icon);
        return existingValue;
    }
    createInput() {
        const inputWrapper = document.createElement('li');
        this.inputWrapper = inputWrapper;
        const input = document.createElement('input');
        inputWrapper.appendChild(input);
        this.interactable = input;
        input.classList.add('preference-array-input', 'theia-input');
        input.type = 'text';
        input.placeholder = 'Add Value...';
        input.spellcheck = false;
        input.onkeydown = this.handleEnter.bind(this);
        input.setAttribute('aria-label', 'Preference String Input');
        const iconWrapper = document.createElement('span');
        inputWrapper.appendChild(iconWrapper);
        iconWrapper.classList.add('preference-array-element-btn', ...(0, browser_1.codiconArray)('add'));
        iconWrapper.setAttribute('role', 'button');
        const handler = this.addItem.bind(this);
        iconWrapper.onclick = handler;
        iconWrapper.onkeydown = handler;
        iconWrapper.tabIndex = 0;
        iconWrapper.setAttribute('aria-label', 'Submit Preference Input');
        return inputWrapper;
    }
    doHandleValueChange() {
        var _a;
        this.updateInspection();
        const values = (_a = this.getValue()) !== null && _a !== void 0 ? _a : [];
        const newValues = new Set(...values);
        for (const [value, row] of this.existingValues.entries()) {
            if (!newValues.has(value)) {
                row.node.remove();
                this.existingValues.delete(value);
            }
        }
        for (const [index, value] of values.entries()) {
            let row = this.existingValues.get(value);
            if (row) {
                row.index = index;
            }
            else {
                row = { node: this.createExistingValue(value), index };
                this.existingValues.set(value, row);
            }
            if (this.wrapper.children[index] !== row.node) {
                this.wrapper.children[index].insertAdjacentElement('beforebegin', row.node);
            }
        }
        this.updateModificationStatus();
    }
    removeItem(value) {
        const row = this.existingValues.get(value);
        if (row) {
            row.node.remove();
            this.existingValues.delete(value);
            this.setPreferenceImmediately(this.getOrderedValues());
        }
    }
    handleEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.addItem();
        }
    }
    addItem() {
        const newItem = this.interactable.value;
        if (newItem && !this.existingValues.has(newItem)) {
            const node = this.createExistingValue(newItem);
            this.inputWrapper.insertAdjacentElement('beforebegin', node);
            this.existingValues.set(newItem, { node, index: this.existingValues.size });
            this.setPreferenceImmediately(this.getOrderedValues());
        }
        this.interactable.value = '';
    }
    getOrderedValues() {
        return Array.from(this.existingValues.entries())
            .sort(([, a], [, b]) => a.index - b.index)
            .map(([value]) => value);
    }
    dispose() {
        this.existingValues.clear();
        super.dispose();
    }
};
exports.PreferenceArrayInputRenderer = PreferenceArrayInputRenderer;
exports.PreferenceArrayInputRenderer = PreferenceArrayInputRenderer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceArrayInputRenderer);
let PreferenceArrayInputRendererContribution = PreferenceArrayInputRendererContribution_1 = class PreferenceArrayInputRendererContribution extends preference_node_renderer_creator_1.PreferenceLeafNodeRendererContribution {
    constructor() {
        super(...arguments);
        this.id = PreferenceArrayInputRendererContribution_1.ID;
    }
    canHandleLeafNode(node) {
        var _a;
        const type = preference_types_1.Preference.LeafNode.getType(node);
        return type === 'array' && ((_a = node.preference.data.items) === null || _a === void 0 ? void 0 : _a.type) === 'string' ? 2 : 0;
    }
    createLeafNodeRenderer(container) {
        return container.get(PreferenceArrayInputRenderer);
    }
};
exports.PreferenceArrayInputRendererContribution = PreferenceArrayInputRendererContribution;
PreferenceArrayInputRendererContribution.ID = 'preference-array-input-renderer';
exports.PreferenceArrayInputRendererContribution = PreferenceArrayInputRendererContribution = PreferenceArrayInputRendererContribution_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceArrayInputRendererContribution);
//# sourceMappingURL=preference-array-input.js.map