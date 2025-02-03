"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
exports.PluginIconService = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const disposable_1 = require("@theia/core/lib/common/disposable");
const inversify_1 = require("@theia/core/shared/inversify");
const vscode_uri_1 = require("@theia/core/shared/vscode-uri");
const monaco_icon_registry_1 = require("@theia/monaco/lib/browser/monaco-icon-registry");
const path = require("path");
const plugin_protocol_1 = require("../../common/plugin-protocol");
let PluginIconService = class PluginIconService {
    constructor() {
        this.toDispose = new disposable_1.DisposableCollection();
        this.styleSheet = '';
    }
    register(contribution, plugin) {
        const defaultIcon = contribution.defaults;
        if (plugin_protocol_1.IconContribution.isIconDefinition(defaultIcon)) {
            this.registerFontIcon(contribution, defaultIcon);
        }
        else {
            this.registerRegularIcon(contribution, defaultIcon.id);
        }
        return disposable_1.Disposable.NULL;
    }
    dispose() {
        this.toDispose.dispose();
    }
    registerFontIcon(contribution, defaultIcon) {
        const location = this.toPluginUrl(contribution.extensionId, getIconRelativePath(vscode_uri_1.URI.parse(defaultIcon.location).path));
        const format = getFileExtension(location.path);
        const fontId = getFontId(contribution.extensionId, location.path);
        const definition = this.iconRegistry.registerIconFont(fontId, { src: [{ location: location, format }] });
        this.iconRegistry.registerIcon(contribution.id, {
            fontCharacter: defaultIcon.fontCharacter,
            font: {
                id: fontId,
                definition
            }
        }, contribution.description);
    }
    registerRegularIcon(contribution, defaultIconId) {
        this.iconRegistry.registerIcon(contribution.id, { id: defaultIconId }, contribution.description);
    }
    toPluginUrl(id, relativePath) {
        return vscode_uri_1.URI.from(new browser_1.Endpoint({
            path: `hostedPlugin/${this.formatExtensionId(id)}/${encodeURIComponent(relativePath)}`
        }).getRestUrl().toComponents());
    }
    formatExtensionId(id) {
        return id.replace(/\W/g, '_');
    }
};
exports.PluginIconService = PluginIconService;
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_icon_registry_1.MonacoIconRegistry),
    tslib_1.__metadata("design:type", monaco_icon_registry_1.MonacoIconRegistry)
], PluginIconService.prototype, "iconRegistry", void 0);
exports.PluginIconService = PluginIconService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginIconService);
function getIconRelativePath(iconPath) {
    const index = iconPath.indexOf('extension');
    return index === -1 ? '' : iconPath.substring(index + 'extension'.length + 1);
}
function getFontId(extensionId, fontPath) {
    return path.join(extensionId, fontPath);
}
function getFileExtension(filePath) {
    const index = filePath.lastIndexOf('.');
    return index === -1 ? '' : filePath.substring(index + 1);
}
//# sourceMappingURL=plugin-icon-service.js.map