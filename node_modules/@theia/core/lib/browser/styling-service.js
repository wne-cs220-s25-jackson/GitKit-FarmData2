"use strict";
// *****************************************************************************
// Copyright (C) 2022 TypeFox and others.
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
exports.StylingService = exports.StylingParticipant = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const contribution_provider_1 = require("../common/contribution-provider");
const color_registry_1 = require("./color-registry");
const decoration_style_1 = require("./decoration-style");
const theming_1 = require("./theming");
const secondary_window_handler_1 = require("./secondary-window-handler");
exports.StylingParticipant = Symbol('StylingParticipant');
let StylingService = class StylingService {
    constructor() {
        this.cssElements = new Map();
    }
    onStart() {
        this.registerWindow(window);
        this.secondaryWindowHandler.onWillAddWidget(([widget, window]) => {
            this.registerWindow(window);
        });
        this.secondaryWindowHandler.onWillRemoveWidget(([widget, window]) => {
            this.cssElements.delete(window);
        });
        this.themeService.onDidColorThemeChange(e => this.applyStylingToWindows(e.newTheme));
    }
    registerWindow(win) {
        const cssElement = decoration_style_1.DecorationStyle.createStyleElement('contributedColorTheme', win.document.head);
        this.cssElements.set(win, cssElement);
        this.applyStyling(this.themeService.getCurrentTheme(), cssElement);
    }
    applyStylingToWindows(theme) {
        this.cssElements.forEach(cssElement => this.applyStyling(theme, cssElement));
    }
    applyStyling(theme, cssElement) {
        const rules = [];
        const colorTheme = {
            type: theme.type,
            label: theme.label,
            getColor: color => this.colorRegistry.getCurrentColor(color)
        };
        const styleCollector = {
            addRule: rule => rules.push(rule)
        };
        for (const themingParticipant of this.themingParticipants.getContributions()) {
            themingParticipant.registerThemeStyle(colorTheme, styleCollector);
        }
        const fullCss = rules.join('\n');
        cssElement.innerText = fullCss;
    }
};
exports.StylingService = StylingService;
tslib_1.__decorate([
    (0, inversify_1.inject)(theming_1.ThemeService),
    tslib_1.__metadata("design:type", theming_1.ThemeService)
], StylingService.prototype, "themeService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(color_registry_1.ColorRegistry),
    tslib_1.__metadata("design:type", color_registry_1.ColorRegistry)
], StylingService.prototype, "colorRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(contribution_provider_1.ContributionProvider),
    (0, inversify_1.named)(exports.StylingParticipant),
    tslib_1.__metadata("design:type", Object)
], StylingService.prototype, "themingParticipants", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(secondary_window_handler_1.SecondaryWindowHandler),
    tslib_1.__metadata("design:type", secondary_window_handler_1.SecondaryWindowHandler)
], StylingService.prototype, "secondaryWindowHandler", void 0);
exports.StylingService = StylingService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], StylingService);
//# sourceMappingURL=styling-service.js.map