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
var PluginSharedStyle_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginSharedStyle = exports.DEFAULT_ICON_SIZE = exports.PLUGIN_FILE_ICON_CLASS = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const disposable_1 = require("@theia/core/lib/common/disposable");
const theming_1 = require("@theia/core/lib/browser/theming");
const reference_1 = require("@theia/core/lib/common/reference");
const endpoint_1 = require("@theia/core/lib/browser/endpoint");
exports.PLUGIN_FILE_ICON_CLASS = 'theia-plugin-file-icon';
exports.DEFAULT_ICON_SIZE = 16;
let PluginSharedStyle = PluginSharedStyle_1 = class PluginSharedStyle {
    constructor() {
        this.rules = [];
        this.toUpdate = new disposable_1.DisposableCollection();
        this.icons = new reference_1.SyncReferenceCollection(key => this.createPluginIcon(key));
        this.iconSequence = 0;
    }
    init() {
        this.update();
        this.themeService.onDidColorThemeChange(() => this.update());
    }
    update() {
        this.toUpdate.dispose();
        const style = this.style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'screen';
        document.getElementsByTagName('head')[0].appendChild(style);
        this.toUpdate.push(disposable_1.Disposable.create(() => document.getElementsByTagName('head')[0].removeChild(style)));
        for (const rule of this.rules) {
            this.doInsertRule(rule);
        }
    }
    insertRule(selector, body) {
        const rule = { selector, body };
        this.rules.push(rule);
        this.doInsertRule(rule);
        return disposable_1.Disposable.create(() => {
            const index = this.rules.indexOf(rule);
            if (index !== -1) {
                this.rules.splice(index, 1);
                this.deleteRule(selector);
            }
        });
    }
    doInsertRule({ selector, body }) {
        const sheet = this.style.sheet;
        const cssBody = body(this.themeService.getCurrentTheme());
        sheet.insertRule(selector + ' {\n' + cssBody + '\n}', 0);
    }
    deleteRule(selector) {
        const sheet = this.style.sheet;
        const rules = sheet.rules || sheet.cssRules || [];
        for (let i = rules.length - 1; i >= 0; i--) {
            const rule = rules[i];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (rule.selectorText.indexOf(selector) !== -1) {
                sheet.deleteRule(i);
            }
        }
    }
    toIconClass(url, { size } = { size: exports.DEFAULT_ICON_SIZE }) {
        return this.icons.acquire({ url, size });
    }
    toFileIconClass(url) {
        return this.icons.acquire({ url, type: 'file' });
    }
    createPluginIcon(key) {
        var _a, _b;
        const iconUrl = key.url;
        const size = (_a = key.size) !== null && _a !== void 0 ? _a : exports.DEFAULT_ICON_SIZE;
        const type = (_b = key.type) !== null && _b !== void 0 ? _b : 'icon';
        const darkIconUrl = PluginSharedStyle_1.toExternalIconUrl(`${typeof iconUrl === 'object' ? iconUrl.dark : iconUrl}`);
        const lightIconUrl = PluginSharedStyle_1.toExternalIconUrl(`${typeof iconUrl === 'object' ? iconUrl.light : iconUrl}`);
        const toDispose = new disposable_1.DisposableCollection();
        let iconClass = 'plugin-icon-' + this.iconSequence++;
        if (type === 'icon') {
            toDispose.push(this.insertRule('.' + iconClass + '::before', theme => `
                    content: "";
                    background-position: 2px;
                    display: block;
                    width: ${size}px;
                    height: ${size}px;
                    background: center no-repeat url("${theme.type === 'light' ? lightIconUrl : darkIconUrl}");
                    background-size: ${size}px;
                `));
        }
        else {
            toDispose.push(this.insertRule('.' + iconClass + '::before', theme => `
                    content: "";
                    background-image: url("${theme.type === 'light' ? lightIconUrl : darkIconUrl}");
                    background-size: ${exports.DEFAULT_ICON_SIZE}px;
                    background-position: left center;
                    background-repeat: no-repeat;
                `));
            iconClass += ' ' + exports.PLUGIN_FILE_ICON_CLASS;
        }
        return { iconClass, dispose: () => toDispose.dispose() };
    }
    static toExternalIconUrl(iconUrl) {
        if (iconUrl.startsWith('hostedPlugin/')) {
            return new endpoint_1.Endpoint({ path: iconUrl }).getRestUrl().toString();
        }
        return iconUrl;
    }
};
exports.PluginSharedStyle = PluginSharedStyle;
tslib_1.__decorate([
    (0, inversify_1.inject)(theming_1.ThemeService),
    tslib_1.__metadata("design:type", theming_1.ThemeService)
], PluginSharedStyle.prototype, "themeService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PluginSharedStyle.prototype, "init", null);
exports.PluginSharedStyle = PluginSharedStyle = PluginSharedStyle_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginSharedStyle);
//# sourceMappingURL=plugin-shared-style.js.map