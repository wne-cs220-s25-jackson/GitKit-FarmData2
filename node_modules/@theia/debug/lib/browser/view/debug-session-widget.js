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
var DebugSessionWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugSessionWidget = exports.DEBUG_VIEW_CONTAINER_TITLE_OPTIONS = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const debug_threads_widget_1 = require("./debug-threads-widget");
const debug_stack_frames_widget_1 = require("./debug-stack-frames-widget");
const debug_breakpoints_widget_1 = require("./debug-breakpoints-widget");
const debug_variables_widget_1 = require("./debug-variables-widget");
const debug_toolbar_widget_1 = require("./debug-toolbar-widget");
const debug_view_model_1 = require("./debug-view-model");
const debug_watch_widget_1 = require("./debug-watch-widget");
const frontend_application_state_1 = require("@theia/core/lib/browser/frontend-application-state");
exports.DEBUG_VIEW_CONTAINER_TITLE_OPTIONS = {
    label: 'debug',
    iconClass: (0, browser_1.codicon)('debug-alt'),
    closeable: true
};
let DebugSessionWidget = DebugSessionWidget_1 = class DebugSessionWidget extends browser_1.BaseWidget {
    static createContainer(parent) {
        const child = new inversify_1.Container({ defaultScope: 'Singleton' });
        child.parent = parent;
        child.bind(debug_view_model_1.DebugViewModel).toSelf();
        child.bind(debug_toolbar_widget_1.DebugToolBar).toSelf();
        child.bind(DebugSessionWidget_1).toSelf();
        return child;
    }
    static createWidget(parent) {
        return DebugSessionWidget_1.createContainer(parent).get(DebugSessionWidget_1);
    }
    init() {
        this.id = 'debug:session:' + this.model.id;
        this.title.label = this.model.label;
        this.title.caption = this.model.label;
        this.title.closable = true;
        this.title.iconClass = (0, browser_1.codicon)('debug-alt');
        this.addClass('theia-session-container');
        this.viewContainer = this.viewContainerFactory({
            id: 'debug:view-container:' + this.model.id
        });
        this.viewContainer.setTitleOptions(exports.DEBUG_VIEW_CONTAINER_TITLE_OPTIONS);
        this.stateService.reachedState('initialized_layout').then(() => {
            for (const subwidget of DebugSessionWidget_1.subwidgets) {
                const widgetPromises = [];
                const existingWidget = this.widgetManager.tryGetPendingWidget(subwidget.FACTORY_ID);
                // No other view container instantiated this widget during startup.
                if (!existingWidget) {
                    widgetPromises.push(this.widgetManager.getOrCreateWidget(subwidget.FACTORY_ID));
                }
                Promise.all(widgetPromises).then(widgets => widgets.forEach(widget => this.viewContainer.addWidget(widget)));
            }
        });
        this.toDispose.pushAll([
            this.toolbar,
            this.viewContainer
        ]);
        const layout = this.layout = new browser_1.PanelLayout();
        layout.addWidget(this.toolbar);
        layout.addWidget(this.viewContainer);
    }
    onActivateRequest(msg) {
        super.onActivateRequest(msg);
        this.toolbar.focus();
    }
    onAfterShow(msg) {
        super.onAfterShow(msg);
        this.getTrackableWidgets().forEach(w => w.update());
    }
    getTrackableWidgets() {
        return [this.viewContainer];
    }
    storeState() {
        return this.viewContainer.storeState();
    }
    restoreState(oldState) {
        this.viewContainer.restoreState(oldState);
    }
};
exports.DebugSessionWidget = DebugSessionWidget;
DebugSessionWidget.subwidgets = [debug_threads_widget_1.DebugThreadsWidget, debug_stack_frames_widget_1.DebugStackFramesWidget, debug_variables_widget_1.DebugVariablesWidget, debug_watch_widget_1.DebugWatchWidget, debug_breakpoints_widget_1.DebugBreakpointsWidget];
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ViewContainer.Factory),
    tslib_1.__metadata("design:type", Function)
], DebugSessionWidget.prototype, "viewContainerFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugSessionWidget.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_toolbar_widget_1.DebugToolBar),
    tslib_1.__metadata("design:type", debug_toolbar_widget_1.DebugToolBar)
], DebugSessionWidget.prototype, "toolbar", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.WidgetManager),
    tslib_1.__metadata("design:type", browser_1.WidgetManager)
], DebugSessionWidget.prototype, "widgetManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(frontend_application_state_1.FrontendApplicationStateService),
    tslib_1.__metadata("design:type", frontend_application_state_1.FrontendApplicationStateService)
], DebugSessionWidget.prototype, "stateService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugSessionWidget.prototype, "init", null);
exports.DebugSessionWidget = DebugSessionWidget = DebugSessionWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugSessionWidget);
//# sourceMappingURL=debug-session-widget.js.map