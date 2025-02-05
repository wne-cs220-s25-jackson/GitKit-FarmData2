"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
exports.SearchInWorkspaceFactory = exports.SEARCH_VIEW_CONTAINER_TITLE_OPTIONS = exports.SEARCH_VIEW_CONTAINER_ID = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const search_in_workspace_widget_1 = require("./search-in-workspace-widget");
const nls_1 = require("@theia/core/lib/common/nls");
exports.SEARCH_VIEW_CONTAINER_ID = 'search-view-container';
exports.SEARCH_VIEW_CONTAINER_TITLE_OPTIONS = {
    label: nls_1.nls.localizeByDefault('Search'),
    iconClass: (0, browser_1.codicon)('search'),
    closeable: true
};
let SearchInWorkspaceFactory = class SearchInWorkspaceFactory {
    constructor() {
        this.id = exports.SEARCH_VIEW_CONTAINER_ID;
        this.searchWidgetOptions = {
            canHide: false,
            initiallyCollapsed: false
        };
    }
    async createWidget() {
        const viewContainer = this.viewContainerFactory({
            id: exports.SEARCH_VIEW_CONTAINER_ID,
            progressLocationId: 'search'
        });
        viewContainer.setTitleOptions(exports.SEARCH_VIEW_CONTAINER_TITLE_OPTIONS);
        const widget = await this.widgetManager.getOrCreateWidget(search_in_workspace_widget_1.SearchInWorkspaceWidget.ID);
        viewContainer.addWidget(widget, this.searchWidgetOptions);
        return viewContainer;
    }
};
exports.SearchInWorkspaceFactory = SearchInWorkspaceFactory;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ViewContainer.Factory),
    tslib_1.__metadata("design:type", Function)
], SearchInWorkspaceFactory.prototype, "viewContainerFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.WidgetManager),
    tslib_1.__metadata("design:type", browser_1.WidgetManager)
], SearchInWorkspaceFactory.prototype, "widgetManager", void 0);
exports.SearchInWorkspaceFactory = SearchInWorkspaceFactory = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SearchInWorkspaceFactory);
//# sourceMappingURL=search-in-workspace-factory.js.map