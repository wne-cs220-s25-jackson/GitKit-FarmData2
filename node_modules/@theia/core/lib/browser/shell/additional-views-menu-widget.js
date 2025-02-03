"use strict";
// *****************************************************************************
// Copyright (C) 2023 STMicroelectronics and others.
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
var AdditionalViewsMenuWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalViewsMenuWidget = exports.AdditionalViewsMenuPath = exports.AdditionalViewsMenuWidgetFactory = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("../../../shared/inversify");
const common_1 = require("../../common");
const widgets_1 = require("../widgets");
const sidebar_menu_widget_1 = require("./sidebar-menu-widget");
exports.AdditionalViewsMenuWidgetFactory = Symbol('AdditionalViewsMenuWidgetFactory');
exports.AdditionalViewsMenuPath = Symbol('AdditionalViewsMenuPath');
let AdditionalViewsMenuWidget = AdditionalViewsMenuWidget_1 = class AdditionalViewsMenuWidget extends sidebar_menu_widget_1.SidebarMenuWidget {
    constructor() {
        super(...arguments);
        this.menuDisposables = [];
    }
    updateAdditionalViews(sender, event) {
        if (event.startIndex === -1) {
            this.removeMenu(AdditionalViewsMenuWidget_1.ID);
        }
        else {
            this.addMenu({
                title: common_1.nls.localizeByDefault('Additional Views'),
                iconClass: (0, widgets_1.codicon)('ellipsis'),
                id: AdditionalViewsMenuWidget_1.ID,
                menuPath: this.menuPath,
                order: 0
            });
        }
        this.menuDisposables.forEach(disposable => disposable.dispose());
        this.menuDisposables = [];
        event.titles.forEach((title, i) => this.registerMenuAction(sender, title, i));
    }
    registerMenuAction(sender, title, index) {
        const command = { id: `reveal.${title.label}.${index}`, label: title.label };
        this.menuDisposables.push(this.commandRegistry.registerCommand(command, {
            execute: () => {
                window.requestAnimationFrame(() => {
                    sender.currentIndex = sender.titles.indexOf(title);
                });
            }
        }));
        this.menuDisposables.push(this.menuModelRegistry.registerMenuAction(this.menuPath, { commandId: command.id, order: index.toString() }));
    }
};
exports.AdditionalViewsMenuWidget = AdditionalViewsMenuWidget;
AdditionalViewsMenuWidget.ID = 'sidebar.additional.views';
tslib_1.__decorate([
    (0, inversify_1.inject)(exports.AdditionalViewsMenuPath),
    tslib_1.__metadata("design:type", Array)
], AdditionalViewsMenuWidget.prototype, "menuPath", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.CommandRegistry),
    tslib_1.__metadata("design:type", common_1.CommandRegistry)
], AdditionalViewsMenuWidget.prototype, "commandRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.MenuModelRegistry),
    tslib_1.__metadata("design:type", common_1.MenuModelRegistry)
], AdditionalViewsMenuWidget.prototype, "menuModelRegistry", void 0);
exports.AdditionalViewsMenuWidget = AdditionalViewsMenuWidget = AdditionalViewsMenuWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], AdditionalViewsMenuWidget);
//# sourceMappingURL=additional-views-menu-widget.js.map