"use strict";
// *****************************************************************************
// Copyright (C) 2023 TypeFox and others.
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
exports.ThemePreloadContribution = void 0;
const tslib_1 = require("tslib");
const frontend_application_config_provider_1 = require("../frontend-application-config-provider");
const inversify_1 = require("inversify");
const application_props_1 = require("@theia/application-package/lib/application-props");
let ThemePreloadContribution = class ThemePreloadContribution {
    initialize() {
        var _a;
        const dark = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme: dark)').matches;
        const value = window.localStorage.getItem(frontend_application_config_provider_1.DEFAULT_BACKGROUND_COLOR_STORAGE_KEY) || application_props_1.DefaultTheme.defaultBackgroundColor(dark);
        document.documentElement.style.setProperty('--theia-editor-background', value);
    }
};
exports.ThemePreloadContribution = ThemePreloadContribution;
exports.ThemePreloadContribution = ThemePreloadContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ThemePreloadContribution);
//# sourceMappingURL=theme-preload-contribution.js.map