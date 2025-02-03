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
exports.ColorApplicationContribution = exports.ColorContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const color_registry_1 = require("./color-registry");
const event_1 = require("../common/event");
const theming_1 = require("./theming");
const contribution_provider_1 = require("../common/contribution-provider");
const disposable_1 = require("../common/disposable");
const frontend_application_config_provider_1 = require("./frontend-application-config-provider");
const secondary_window_handler_1 = require("./secondary-window-handler");
exports.ColorContribution = Symbol('ColorContribution');
let ColorApplicationContribution = class ColorApplicationContribution {
    constructor() {
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.windows = new Set();
        this.toUpdate = new disposable_1.DisposableCollection();
    }
    onStart() {
        for (const contribution of this.colorContributions.getContributions()) {
            contribution.registerColors(this.colors);
        }
        this.themeService.initialized.then(() => this.update());
        this.themeService.onDidColorThemeChange(() => {
            this.update();
            this.updateThemeBackground();
        });
        this.colors.onDidChange(() => this.update());
        this.registerWindow(window);
        this.secondaryWindowHandler.onWillAddWidget(([widget, window]) => {
            this.registerWindow(window);
        });
        this.secondaryWindowHandler.onWillRemoveWidget(([widget, window]) => {
            this.windows.delete(window);
        });
    }
    registerWindow(win) {
        this.windows.add(win);
        this.updateWindow(win);
        this.onDidChangeEmitter.fire();
    }
    update() {
        this.toUpdate.dispose();
        this.windows.forEach(win => this.updateWindow(win));
        this.onDidChangeEmitter.fire();
    }
    updateWindow(win) {
        const theme = 'theia-' + this.themeService.getCurrentTheme().type;
        win.document.body.classList.add(theme);
        this.toUpdate.push(disposable_1.Disposable.create(() => win.document.body.classList.remove(theme)));
        const documentElement = win.document.documentElement;
        if (documentElement) {
            for (const id of this.colors.getColors()) {
                const variable = this.colors.getCurrentCssVariable(id);
                if (variable) {
                    const { name, value } = variable;
                    documentElement.style.setProperty(name, value);
                    this.toUpdate.push(disposable_1.Disposable.create(() => documentElement.style.removeProperty(name)));
                }
            }
        }
    }
    updateThemeBackground() {
        const color = this.colors.getCurrentColor('editor.background');
        if (color) {
            window.localStorage.setItem(frontend_application_config_provider_1.DEFAULT_BACKGROUND_COLOR_STORAGE_KEY, color);
        }
        else {
            window.localStorage.removeItem(frontend_application_config_provider_1.DEFAULT_BACKGROUND_COLOR_STORAGE_KEY);
        }
    }
};
exports.ColorApplicationContribution = ColorApplicationContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(color_registry_1.ColorRegistry),
    tslib_1.__metadata("design:type", color_registry_1.ColorRegistry)
], ColorApplicationContribution.prototype, "colors", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(contribution_provider_1.ContributionProvider),
    (0, inversify_1.named)(exports.ColorContribution),
    tslib_1.__metadata("design:type", Object)
], ColorApplicationContribution.prototype, "colorContributions", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(theming_1.ThemeService),
    tslib_1.__metadata("design:type", theming_1.ThemeService)
], ColorApplicationContribution.prototype, "themeService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(secondary_window_handler_1.SecondaryWindowHandler),
    tslib_1.__metadata("design:type", secondary_window_handler_1.SecondaryWindowHandler)
], ColorApplicationContribution.prototype, "secondaryWindowHandler", void 0);
exports.ColorApplicationContribution = ColorApplicationContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ColorApplicationContribution);
//# sourceMappingURL=color-application-contribution.js.map