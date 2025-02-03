"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.NavigatorLayoutVersion5Migration = exports.NavigatorLayoutVersion3Migration = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const navigator_widget_factory_1 = require("./navigator-widget-factory");
const navigator_widget_1 = require("./navigator-widget");
let NavigatorLayoutVersion3Migration = class NavigatorLayoutVersion3Migration {
    constructor() {
        this.layoutVersion = 3.0;
    }
    onWillInflateWidget(desc, { parent }) {
        if (desc.constructionOptions.factoryId === navigator_widget_1.FILE_NAVIGATOR_ID && !parent) {
            return {
                constructionOptions: {
                    factoryId: navigator_widget_factory_1.EXPLORER_VIEW_CONTAINER_ID
                },
                innerWidgetState: {
                    parts: [
                        {
                            widget: {
                                constructionOptions: {
                                    factoryId: navigator_widget_1.FILE_NAVIGATOR_ID
                                },
                                innerWidgetState: desc.innerWidgetState
                            },
                            partId: {
                                factoryId: navigator_widget_1.FILE_NAVIGATOR_ID
                            },
                            collapsed: false,
                            hidden: false
                        }
                    ],
                    title: navigator_widget_factory_1.EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS
                }
            };
        }
        return undefined;
    }
};
exports.NavigatorLayoutVersion3Migration = NavigatorLayoutVersion3Migration;
exports.NavigatorLayoutVersion3Migration = NavigatorLayoutVersion3Migration = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NavigatorLayoutVersion3Migration);
let NavigatorLayoutVersion5Migration = class NavigatorLayoutVersion5Migration {
    constructor() {
        this.layoutVersion = 5.0;
    }
    onWillInflateWidget(desc) {
        if (desc.constructionOptions.factoryId === navigator_widget_factory_1.EXPLORER_VIEW_CONTAINER_ID && typeof desc.innerWidgetState === 'string') {
            desc.innerWidgetState = desc.innerWidgetState.replace(/navigator-tab-icon/g, navigator_widget_factory_1.EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS.iconClass);
            return desc;
        }
        return undefined;
    }
};
exports.NavigatorLayoutVersion5Migration = NavigatorLayoutVersion5Migration;
exports.NavigatorLayoutVersion5Migration = NavigatorLayoutVersion5Migration = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NavigatorLayoutVersion5Migration);
//# sourceMappingURL=navigator-layout-migrations.js.map