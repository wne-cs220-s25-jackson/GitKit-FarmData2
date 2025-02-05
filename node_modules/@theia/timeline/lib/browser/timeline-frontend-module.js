"use strict";
// *****************************************************************************
// Copyright (C) 2020 RedHat and others.
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
exports.createTimelineTreeContainer = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
const timeline_service_1 = require("./timeline-service");
const timeline_widget_1 = require("./timeline-widget");
const timeline_tree_widget_1 = require("./timeline-tree-widget");
const browser_1 = require("@theia/core/lib/browser");
const timeline_tree_model_1 = require("./timeline-tree-model");
const timeline_empty_widget_1 = require("./timeline-empty-widget");
const timeline_context_key_service_1 = require("./timeline-context-key-service");
const timeline_contribution_1 = require("./timeline-contribution");
require("../../src/browser/style/index.css");
const common_1 = require("@theia/core/lib/common");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(timeline_contribution_1.TimelineContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(timeline_contribution_1.TimelineContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(timeline_contribution_1.TimelineContribution);
    bind(timeline_context_key_service_1.TimelineContextKeyService).toSelf().inSingletonScope();
    bind(timeline_service_1.TimelineService).toSelf().inSingletonScope();
    bind(timeline_widget_1.TimelineWidget).toSelf();
    bind(widget_manager_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: timeline_widget_1.TimelineWidget.ID,
        createWidget: () => container.get(timeline_widget_1.TimelineWidget)
    })).inSingletonScope();
    bind(timeline_tree_widget_1.TimelineTreeWidget).toDynamicValue(ctx => {
        const child = createTimelineTreeContainer(ctx.container);
        return child.get(timeline_tree_widget_1.TimelineTreeWidget);
    });
    bind(widget_manager_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: timeline_tree_widget_1.TimelineTreeWidget.ID,
        createWidget: () => container.get(timeline_tree_widget_1.TimelineTreeWidget)
    })).inSingletonScope();
    bind(timeline_empty_widget_1.TimelineEmptyWidget).toSelf();
    bind(widget_manager_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: timeline_empty_widget_1.TimelineEmptyWidget.ID,
        createWidget: () => container.get(timeline_empty_widget_1.TimelineEmptyWidget)
    })).inSingletonScope();
});
function createTimelineTreeContainer(parent) {
    const child = (0, browser_1.createTreeContainer)(parent, {
        props: {
            virtualized: true,
            search: true
        },
        widget: timeline_tree_widget_1.TimelineTreeWidget,
        model: timeline_tree_model_1.TimelineTreeModel
    });
    return child;
}
exports.createTimelineTreeContainer = createTimelineTreeContainer;
//# sourceMappingURL=timeline-frontend-module.js.map