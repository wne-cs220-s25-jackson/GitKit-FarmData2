"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreferencesWidgetContainer = exports.bindPreferencesWidgets = void 0;
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
const browser_1 = require("@theia/core/lib/browser");
const contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
const preference_tree_model_1 = require("../preference-tree-model");
const preference_tree_label_provider_1 = require("../util/preference-tree-label-provider");
const preference_array_input_1 = require("./components/preference-array-input");
const preference_boolean_input_1 = require("./components/preference-boolean-input");
const preference_file_input_1 = require("./components/preference-file-input");
const preference_json_input_1 = require("./components/preference-json-input");
const preference_node_renderer_1 = require("./components/preference-node-renderer");
const preference_node_renderer_creator_1 = require("./components/preference-node-renderer-creator");
const preference_number_input_1 = require("./components/preference-number-input");
const preference_select_input_1 = require("./components/preference-select-input");
const preference_string_input_1 = require("./components/preference-string-input");
const preference_markdown_renderer_1 = require("./components/preference-markdown-renderer");
const preference_editor_widget_1 = require("./preference-editor-widget");
const preference_scope_tabbar_widget_1 = require("./preference-scope-tabbar-widget");
const preference_searchbar_widget_1 = require("./preference-searchbar-widget");
const preference_tree_widget_1 = require("./preference-tree-widget");
const preference_widget_1 = require("./preference-widget");
function bindPreferencesWidgets(bind) {
    bind(preference_tree_label_provider_1.PreferenceTreeLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(preference_tree_label_provider_1.PreferenceTreeLabelProvider);
    bind(preference_widget_1.PreferencesWidget)
        .toDynamicValue(({ container }) => createPreferencesWidgetContainer(container).get(preference_widget_1.PreferencesWidget))
        .inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: preference_widget_1.PreferencesWidget.ID,
        createWidget: () => container.get(preference_widget_1.PreferencesWidget)
    })).inSingletonScope();
    (0, contribution_provider_1.bindContributionProvider)(bind, preference_node_renderer_creator_1.PreferenceNodeRendererContribution);
    bind(preference_select_input_1.PreferenceSelectInputRenderer).toSelf();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererContribution).to(preference_select_input_1.PreferenceSelectInputRendererContribution).inSingletonScope();
    bind(preference_array_input_1.PreferenceArrayInputRenderer).toSelf();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererContribution).to(preference_array_input_1.PreferenceArrayInputRendererContribution).inSingletonScope();
    bind(preference_string_input_1.PreferenceStringInputRenderer).toSelf();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererContribution).to(preference_string_input_1.PreferenceStringInputRendererContribution).inSingletonScope();
    bind(preference_boolean_input_1.PreferenceBooleanInputRenderer).toSelf();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererContribution).to(preference_boolean_input_1.PreferenceBooleanInputRendererContribution).inSingletonScope();
    bind(preference_number_input_1.PreferenceNumberInputRenderer).toSelf();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererContribution).to(preference_number_input_1.PreferenceNumberInputRendererContribution).inSingletonScope();
    bind(preference_json_input_1.PreferenceJSONLinkRenderer).toSelf();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererContribution).to(preference_json_input_1.PreferenceJSONLinkRendererContribution).inSingletonScope();
    bind(preference_node_renderer_1.PreferenceHeaderRenderer).toSelf();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererContribution).to(preference_node_renderer_creator_1.PreferenceHeaderRendererContribution).inSingletonScope();
    bind(preference_file_input_1.PreferenceSingleFilePathInputRenderer).toSelf();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererContribution).to(preference_file_input_1.PreferenceSingleFilePathInputRendererContribution).inSingletonScope();
    bind(preference_node_renderer_creator_1.DefaultPreferenceNodeRendererCreatorRegistry).toSelf().inSingletonScope();
    bind(preference_node_renderer_creator_1.PreferenceNodeRendererCreatorRegistry).toService(preference_node_renderer_creator_1.DefaultPreferenceNodeRendererCreatorRegistry);
}
exports.bindPreferencesWidgets = bindPreferencesWidgets;
function createPreferencesWidgetContainer(parent) {
    const child = (0, browser_1.createTreeContainer)(parent, {
        model: preference_tree_model_1.PreferenceTreeModel,
        widget: preference_tree_widget_1.PreferencesTreeWidget,
        props: { search: false }
    });
    child.bind(preference_editor_widget_1.PreferencesEditorWidget).toSelf();
    child.bind(preference_searchbar_widget_1.PreferencesSearchbarWidget).toSelf();
    child.bind(preference_scope_tabbar_widget_1.PreferencesScopeTabBar).toSelf();
    child.bind(preference_widget_1.PreferencesWidget).toSelf();
    child.bind(preference_node_renderer_1.PreferenceNodeRendererFactory).toFactory(({ container }) => (node) => {
        const registry = container.get(preference_node_renderer_creator_1.PreferenceNodeRendererCreatorRegistry);
        const creator = registry.getPreferenceNodeRendererCreator(node);
        return creator.createRenderer(node, container);
    });
    child.bind(preference_markdown_renderer_1.PreferenceMarkdownRenderer).toSelf().inSingletonScope();
    return child;
}
exports.createPreferencesWidgetContainer = createPreferencesWidgetContainer;
//# sourceMappingURL=preference-widget-bindings.js.map