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
var MonacoThemingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoThemingService = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("@theia/core/shared/inversify");
const jsoncparser = require("jsonc-parser");
const plistparser = require("fast-plist");
const uri_1 = require("@theia/core/lib/common/uri");
const disposable_1 = require("@theia/core/lib/common/disposable");
const monaco_theme_registry_1 = require("./textmate/monaco-theme-registry");
const monaco_indexed_db_1 = require("./monaco-indexed-db");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
let MonacoThemingService = MonacoThemingService_1 = class MonacoThemingService {
    constructor() {
        this.toUpdateUiTheme = new disposable_1.DisposableCollection();
    }
    /** Register themes whose configuration needs to be loaded */
    register(theme, pending = {}) {
        const toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(() => { }));
        this.doRegister(theme, pending, toDispose);
        return toDispose;
    }
    async doRegister(theme, pending, toDispose) {
        try {
            const includes = {};
            const json = await this.loadTheme(theme.uri, includes, pending, toDispose);
            if (toDispose.disposed) {
                return;
            }
            const label = theme.label || new uri_1.default(theme.uri).path.base;
            const { id, description, uiTheme } = theme;
            toDispose.push(this.registerParsedTheme({ id, label, description, uiTheme: uiTheme, json, includes }));
        }
        catch (e) {
            console.error('Failed to load theme from ' + theme.uri, e);
        }
    }
    async loadTheme(uri, includes, pending, toDispose) {
        const result = await this.fileService.read(new uri_1.default(uri));
        const content = result.value;
        if (toDispose.disposed) {
            return;
        }
        const themeUri = new uri_1.default(uri);
        if (themeUri.path.ext !== '.json') {
            const value = plistparser.parse(content);
            if (value && 'settings' in value && Array.isArray(value.settings)) {
                return { tokenColors: value.settings };
            }
            throw new Error(`Problem parsing tmTheme file: ${uri}. 'settings' is not array.`);
        }
        const json = jsoncparser.parse(content, undefined, { disallowComments: false });
        if ('tokenColors' in json && typeof json.tokenColors === 'string') {
            const value = await this.doLoadTheme(themeUri, json.tokenColors, includes, pending, toDispose);
            if (toDispose.disposed) {
                return;
            }
            json.tokenColors = value.tokenColors;
        }
        if (json.include) {
            includes[json.include] = await this.doLoadTheme(themeUri, json.include, includes, pending, toDispose);
            if (toDispose.disposed) {
                return;
            }
        }
        this.clean(json.colors);
        return json;
    }
    doLoadTheme(themeUri, referencedPath, includes, pending, toDispose) {
        const referencedUri = themeUri.parent.resolve(referencedPath).toString();
        if (!pending[referencedUri]) {
            pending[referencedUri] = this.loadTheme(referencedUri, includes, pending, toDispose);
        }
        return pending[referencedUri];
    }
    initialize() {
        this.monacoThemeRegistry.initializeDefaultThemes();
        this.updateBodyUiTheme();
        this.themeService.onDidColorThemeChange(() => this.updateBodyUiTheme());
        this.themeService.onDidRetrieveTheme(theme => this.monacoThemeRegistry.setTheme(MonacoThemingService_1.toCssSelector(theme.id), theme.data));
        this.restore();
    }
    /** register a theme whose configuration has already been loaded */
    registerParsedTheme(theme) {
        const uiTheme = theme.uiTheme || 'vs-dark';
        const { label, description, json, includes } = theme;
        const id = theme.id || label;
        const cssSelector = MonacoThemingService_1.toCssSelector(id);
        const data = this.monacoThemeRegistry.register(json, includes, cssSelector, uiTheme);
        return this.doRegisterParsedTheme({ id, label, description, uiTheme, data });
    }
    updateBodyUiTheme() {
        this.toUpdateUiTheme.dispose();
        const type = this.themeService.getCurrentTheme().type;
        const uiTheme = type === 'hc' ? 'hc-black' : type === 'light' ? 'vs' : 'vs-dark';
        document.body.classList.add(uiTheme);
        this.toUpdateUiTheme.push(disposable_1.Disposable.create(() => document.body.classList.remove(uiTheme)));
    }
    doRegisterParsedTheme(state) {
        return new disposable_1.DisposableCollection(this.themeService.register((0, monaco_indexed_db_1.stateToTheme)(state)), (0, monaco_indexed_db_1.putTheme)(state));
    }
    async restore() {
        try {
            const themes = await (0, monaco_indexed_db_1.getThemes)();
            for (const state of themes) {
                this.monacoThemeRegistry.setTheme(state.data.name, state.data);
                this.doRegisterParsedTheme(state);
            }
        }
        catch (e) {
            console.error('Failed to restore monaco themes', e);
        }
    }
    /* remove all characters that are not allowed in css */
    static toCssSelector(str) {
        str = str.replace(/[^\-a-zA-Z0-9]/g, '-');
        if (str.charAt(0).match(/[0-9\-]/)) {
            str = '-' + str;
        }
        return str;
    }
    /** removes all invalid theming values */
    clean(obj) {
        for (const key in obj) {
            if (typeof obj[key] !== 'string') {
                delete obj[key];
            }
        }
    }
};
exports.MonacoThemingService = MonacoThemingService;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], MonacoThemingService.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_theme_registry_1.MonacoThemeRegistry),
    tslib_1.__metadata("design:type", monaco_theme_registry_1.MonacoThemeRegistry)
], MonacoThemingService.prototype, "monacoThemeRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_indexed_db_1.ThemeServiceWithDB),
    tslib_1.__metadata("design:type", monaco_indexed_db_1.ThemeServiceWithDB)
], MonacoThemingService.prototype, "themeService", void 0);
exports.MonacoThemingService = MonacoThemingService = MonacoThemingService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoThemingService);
//# sourceMappingURL=monaco-theming-service.js.map