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
var DebugWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const debug_session_widget_1 = require("./debug-session-widget");
const debug_configuration_widget_1 = require("./debug-configuration-widget");
const debug_view_model_1 = require("./debug-view-model");
const debug_session_manager_1 = require("../debug-session-manager");
const progress_bar_factory_1 = require("@theia/core/lib/browser/progress-bar-factory");
const nls_1 = require("@theia/core/lib/common/nls");
let DebugWidget = DebugWidget_1 = class DebugWidget extends browser_1.BaseWidget {
    static createContainer(parent) {
        const child = debug_session_widget_1.DebugSessionWidget.createContainer(parent);
        child.bind(debug_configuration_widget_1.DebugConfigurationWidget).toSelf();
        child.bind(DebugWidget_1).toSelf();
        return child;
    }
    static createWidget(parent) {
        return DebugWidget_1.createContainer(parent).get(DebugWidget_1);
    }
    init() {
        this.id = DebugWidget_1.ID;
        this.title.label = DebugWidget_1.LABEL;
        this.title.caption = DebugWidget_1.LABEL;
        this.title.closable = true;
        this.title.iconClass = (0, browser_1.codicon)('debug-alt');
        this.addClass('theia-debug-container');
        this.toDispose.pushAll([
            this.toolbar,
            this.sessionWidget,
        ]);
        const layout = this.layout = new browser_1.PanelLayout();
        layout.addWidget(this.toolbar);
        layout.addWidget(this.sessionWidget);
        this.toDispose.push(this.progressBarFactory({ container: this.node, insertMode: 'prepend', locationId: 'debug' }));
    }
    onActivateRequest(msg) {
        super.onActivateRequest(msg);
        this.toolbar.focus();
    }
    getTrackableWidgets() {
        return [this.sessionWidget];
    }
    storeState() {
        return this.sessionWidget.storeState();
    }
    restoreState(oldState) {
        this.sessionWidget.restoreState(oldState);
    }
};
exports.DebugWidget = DebugWidget;
DebugWidget.ID = 'debug';
DebugWidget.LABEL = nls_1.nls.localizeByDefault('Debug');
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugWidget.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_session_manager_1.DebugSessionManager),
    tslib_1.__metadata("design:type", debug_session_manager_1.DebugSessionManager)
], DebugWidget.prototype, "sessionManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_configuration_widget_1.DebugConfigurationWidget),
    tslib_1.__metadata("design:type", debug_configuration_widget_1.DebugConfigurationWidget)
], DebugWidget.prototype, "toolbar", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_session_widget_1.DebugSessionWidget),
    tslib_1.__metadata("design:type", debug_session_widget_1.DebugSessionWidget)
], DebugWidget.prototype, "sessionWidget", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(progress_bar_factory_1.ProgressBarFactory),
    tslib_1.__metadata("design:type", Function)
], DebugWidget.prototype, "progressBarFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugWidget.prototype, "init", null);
exports.DebugWidget = DebugWidget = DebugWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugWidget);
//# sourceMappingURL=debug-widget.js.map