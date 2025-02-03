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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceTreeLabelProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const preference_types_1 = require("./preference-types");
const preference_layout_1 = require("./preference-layout");
let PreferenceTreeLabelProvider = class PreferenceTreeLabelProvider {
    canHandle(element) {
        return browser_1.TreeNode.is(element) && preference_types_1.Preference.TreeNode.is(element) ? 150 : 0;
    }
    getName(node) {
        if (preference_types_1.Preference.TreeNode.is(node) && node.label) {
            return node.label;
        }
        const { id } = preference_types_1.Preference.TreeNode.getGroupAndIdFromNodeId(node.id);
        const labels = id.split('.');
        const groupName = labels[labels.length - 1];
        return this.formatString(groupName);
    }
    getPrefix(node, fullPath = false) {
        const { depth } = node;
        const { id, group } = preference_types_1.Preference.TreeNode.getGroupAndIdFromNodeId(node.id);
        const segments = id.split('.');
        const segmentsHandled = group === segments[0] ? depth : depth - 1;
        segments.pop(); // Ignore the leaf name.
        const prefixSegments = fullPath ? segments : segments.slice(segmentsHandled);
        if (prefixSegments.length) {
            let output = prefixSegments.length > 1 ? `${this.formatString(prefixSegments[0])} › ` : `${this.formatString(prefixSegments[0])}: `;
            for (const segment of prefixSegments.slice(1)) {
                output += `${this.formatString(segment)}: `;
            }
            return output;
        }
    }
    formatString(string) {
        let formattedString = string[0].toLocaleUpperCase();
        for (let i = 1; i < string.length; i++) {
            if (this.isUpperCase(string[i]) && !/\s/.test(string[i - 1]) && !this.isUpperCase(string[i - 1])) {
                formattedString += ' ';
            }
            formattedString += string[i];
        }
        return formattedString.trim();
    }
    isUpperCase(char) {
        return char === char.toLocaleUpperCase() && char.toLocaleLowerCase() !== char.toLocaleUpperCase();
    }
};
exports.PreferenceTreeLabelProvider = PreferenceTreeLabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(preference_layout_1.PreferenceLayoutProvider),
    tslib_1.__metadata("design:type", preference_layout_1.PreferenceLayoutProvider)
], PreferenceTreeLabelProvider.prototype, "layoutProvider", void 0);
exports.PreferenceTreeLabelProvider = PreferenceTreeLabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceTreeLabelProvider);
//# sourceMappingURL=preference-tree-label-provider.js.map