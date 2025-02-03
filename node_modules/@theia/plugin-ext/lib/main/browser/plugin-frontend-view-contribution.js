"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
var PluginFrontendViewContribution_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginFrontendViewContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
const plugin_ext_widget_1 = require("./plugin-ext-widget");
let PluginFrontendViewContribution = PluginFrontendViewContribution_1 = class PluginFrontendViewContribution extends view_contribution_1.AbstractViewContribution {
    constructor() {
        super({
            widgetId: PluginFrontendViewContribution_1.PLUGINS_WIDGET_FACTORY_ID,
            widgetName: plugin_ext_widget_1.PLUGINS_LABEL,
            defaultWidgetOptions: {
                area: 'left',
                rank: 400
            },
            toggleCommandId: 'pluginsView:toggle'
        });
    }
};
exports.PluginFrontendViewContribution = PluginFrontendViewContribution;
PluginFrontendViewContribution.PLUGINS_WIDGET_FACTORY_ID = 'plugins';
exports.PluginFrontendViewContribution = PluginFrontendViewContribution = PluginFrontendViewContribution_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], PluginFrontendViewContribution);
//# sourceMappingURL=plugin-frontend-view-contribution.js.map