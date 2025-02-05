"use strict";
// *****************************************************************************
// Copyright (C) 2023 TypeFox and others.
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
exports.PreferenceMarkdownRenderer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const preference_tree_model_1 = require("../../preference-tree-model");
const preference_tree_label_provider_1 = require("../../util/preference-tree-label-provider");
const markdownit = require("@theia/core/shared/markdown-it");
const core_1 = require("@theia/core");
let PreferenceMarkdownRenderer = class PreferenceMarkdownRenderer {
    render(text) {
        return this.getRenderer().render(text);
    }
    renderInline(text) {
        return this.getRenderer().renderInline(text);
    }
    getRenderer() {
        var _a;
        (_a = this._renderer) !== null && _a !== void 0 ? _a : (this._renderer = this.buildMarkdownRenderer());
        return this._renderer;
    }
    buildMarkdownRenderer() {
        const engine = markdownit();
        const inlineCode = engine.renderer.rules.code_inline;
        engine.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const content = token.content;
            if (content.length > 2 && content.startsWith('#') && content.endsWith('#')) {
                const id = content.substring(1, content.length - 1);
                // First check whether there's a preference with the given ID
                const preferenceNode = this.model.getNodeFromPreferenceId(id);
                if (preferenceNode) {
                    let name = this.labelProvider.getName(preferenceNode);
                    const prefix = this.labelProvider.getPrefix(preferenceNode, true);
                    if (prefix) {
                        name = prefix + name;
                    }
                    return `<a title="${id}" href="preference:${id}">${name}</a>`;
                }
                // If no preference was found, check whether there's a command with the given ID
                const command = this.commandRegistry.getCommand(id);
                if (command) {
                    const name = `${command.category ? `${command.category}: ` : ''}${command.label}`;
                    return `<span class="command-link" title="${id}">${name}</span>`;
                }
                // If nothing was found, print a warning
                console.warn(`Linked preference "${id}" not found.`);
            }
            return inlineCode ? inlineCode(tokens, idx, options, env, self) : '';
        };
        return engine;
    }
};
exports.PreferenceMarkdownRenderer = PreferenceMarkdownRenderer;
tslib_1.__decorate([
    (0, inversify_1.inject)(preference_tree_model_1.PreferenceTreeModel),
    tslib_1.__metadata("design:type", preference_tree_model_1.PreferenceTreeModel)
], PreferenceMarkdownRenderer.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(preference_tree_label_provider_1.PreferenceTreeLabelProvider),
    tslib_1.__metadata("design:type", preference_tree_label_provider_1.PreferenceTreeLabelProvider)
], PreferenceMarkdownRenderer.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.CommandRegistry),
    tslib_1.__metadata("design:type", core_1.CommandRegistry)
], PreferenceMarkdownRenderer.prototype, "commandRegistry", void 0);
exports.PreferenceMarkdownRenderer = PreferenceMarkdownRenderer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceMarkdownRenderer);
//# sourceMappingURL=preference-markdown-renderer.js.map