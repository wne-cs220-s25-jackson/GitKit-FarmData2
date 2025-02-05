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
var PreferenceBooleanInputRendererContribution_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceBooleanInputRendererContribution = exports.PreferenceBooleanInputRenderer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const preference_types_1 = require("../../util/preference-types");
const preference_node_renderer_1 = require("./preference-node-renderer");
const preference_node_renderer_creator_1 = require("./preference-node-renderer-creator");
let PreferenceBooleanInputRenderer = class PreferenceBooleanInputRenderer extends preference_node_renderer_1.PreferenceLeafNodeRenderer {
    createInteractable(parent) {
        const interactable = document.createElement('input');
        this.interactable = interactable;
        interactable.type = 'checkbox';
        interactable.classList.add('theia-input');
        interactable.defaultChecked = Boolean(this.getValue());
        interactable.onchange = this.handleUserInteraction.bind(this);
        parent.appendChild(interactable);
    }
    getAdditionalNodeClassnames() {
        return ['boolean'];
    }
    getFallbackValue() {
        return false;
    }
    handleUserInteraction() {
        return this.setPreferenceImmediately(this.interactable.checked);
    }
    doHandleValueChange() {
        const currentValue = this.interactable.checked;
        this.updateInspection();
        const newValue = Boolean(this.getValue());
        this.updateModificationStatus(newValue);
        if (newValue !== currentValue && document.activeElement !== this.interactable) {
            this.interactable.checked = newValue;
        }
    }
};
exports.PreferenceBooleanInputRenderer = PreferenceBooleanInputRenderer;
exports.PreferenceBooleanInputRenderer = PreferenceBooleanInputRenderer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceBooleanInputRenderer);
let PreferenceBooleanInputRendererContribution = PreferenceBooleanInputRendererContribution_1 = class PreferenceBooleanInputRendererContribution extends preference_node_renderer_creator_1.PreferenceLeafNodeRendererContribution {
    constructor() {
        super(...arguments);
        this.id = PreferenceBooleanInputRendererContribution_1.ID;
    }
    canHandleLeafNode(node) {
        return preference_types_1.Preference.LeafNode.getType(node) === 'boolean' ? 2 : 0;
    }
    createLeafNodeRenderer(container) {
        return container.get(PreferenceBooleanInputRenderer);
    }
};
exports.PreferenceBooleanInputRendererContribution = PreferenceBooleanInputRendererContribution;
PreferenceBooleanInputRendererContribution.ID = 'preference-boolean-input-renderer';
exports.PreferenceBooleanInputRendererContribution = PreferenceBooleanInputRendererContribution = PreferenceBooleanInputRendererContribution_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceBooleanInputRendererContribution);
//# sourceMappingURL=preference-boolean-input.js.map