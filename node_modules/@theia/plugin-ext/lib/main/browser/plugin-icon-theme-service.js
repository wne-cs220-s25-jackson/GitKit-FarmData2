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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// some code is copied and modified from:
// https://github.com/microsoft/vscode/blob/7cf4cca47aa025a590fc939af54932042302be63/src/vs/workbench/services/themes/browser/fileIconThemeData.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginIconThemeService = exports.PluginIconTheme = exports.PluginIconThemeDefinition = exports.PluginIconThemeFactory = void 0;
const tslib_1 = require("tslib");
const debounce = require("@theia/core/shared/lodash.debounce");
const jsoncparser = require("jsonc-parser");
const inversify_1 = require("@theia/core/shared/inversify");
const icon_theme_service_1 = require("@theia/core/lib/browser/icon-theme-service");
const plugin_protocol_1 = require("../../common/plugin-protocol");
const uri_1 = require("@theia/core/lib/common/uri");
const disposable_1 = require("@theia/core/lib/common/disposable");
const event_1 = require("@theia/core/lib/common/event");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const browser_1 = require("@theia/filesystem/lib/browser");
const navigator_tree_1 = require("@theia/navigator/lib/browser/navigator-tree");
const endpoint_1 = require("@theia/core/lib/browser/endpoint");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const files_1 = require("@theia/filesystem/lib/common/files");
const browser_2 = require("@theia/workspace/lib/browser");
const standaloneServices_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices");
const language_1 = require("@theia/monaco-editor-core/esm/vs/editor/common/languages/language");
const language_service_1 = require("@theia/core/lib/browser/language-service");
const plugin_shared_style_1 = require("./plugin-shared-style");
exports.PluginIconThemeFactory = Symbol('PluginIconThemeFactory');
let PluginIconThemeDefinition = class PluginIconThemeDefinition {
};
exports.PluginIconThemeDefinition = PluginIconThemeDefinition;
exports.PluginIconThemeDefinition = PluginIconThemeDefinition = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginIconThemeDefinition);
class PluginLanguageIconInfo {
    constructor() {
        this.hasSpecificFileIcons = false;
        this.coveredLanguages = {};
    }
}
;
let PluginIconTheme = class PluginIconTheme extends PluginIconThemeDefinition {
    constructor() {
        super(...arguments);
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.toDeactivate = new disposable_1.DisposableCollection();
        this.toUnload = new disposable_1.DisposableCollection();
        this.toDisposeStyleElement = new disposable_1.DisposableCollection();
        this.toDispose = new disposable_1.DisposableCollection(this.toDeactivate, this.toDisposeStyleElement, this.toUnload, this.onDidChangeEmitter);
        this.icons = new Set();
        this.reload = debounce(() => {
            this.toUnload.dispose();
            this.doActivate();
        }, 50);
        this.fileIcon = plugin_shared_style_1.PLUGIN_FILE_ICON_CLASS;
        this.folderIcon = 'theia-plugin-folder-icon';
        this.folderExpandedIcon = 'theia-plugin-folder-expanded-icon';
        this.rootFolderIcon = 'theia-plugin-root-folder-icon';
        this.rootFolderExpandedIcon = 'theia-plugin-root-folder-expanded-icon';
    }
    init() {
        Object.assign(this, this.definition);
        this.packageRootUri = new uri_1.default(this.packageUri);
        this.locationUri = new uri_1.default(this.uri).parent;
    }
    dispose() {
        this.toDispose.dispose();
    }
    fireDidChange() {
        this.onDidChangeEmitter.fire({ affects: () => true });
    }
    activate() {
        if (!this.toDeactivate.disposed) {
            return this.toDeactivate;
        }
        this.toDeactivate.push(disposable_1.Disposable.create(() => this.fireDidChange()));
        this.doActivate();
        return this.toDeactivate;
    }
    async doActivate() {
        await this.load();
        this.updateStyleElement();
    }
    updateStyleElement() {
        this.toDisposeStyleElement.dispose();
        if (this.toDeactivate.disposed || !this.styleSheetContent) {
            return;
        }
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.className = 'theia-icon-theme';
        styleElement.innerText = this.styleSheetContent;
        document.head.appendChild(styleElement);
        const toRemoveStyleElement = disposable_1.Disposable.create(() => styleElement.remove());
        this.toDisposeStyleElement.push(toRemoveStyleElement);
        this.toDeactivate.push(toRemoveStyleElement);
        this.fireDidChange();
    }
    /**
     * This should be aligned with
     * https://github.com/microsoft/vscode/blob/7cf4cca47aa025a590fc939af54932042302be63/src/vs/workbench/services/themes/browser/fileIconThemeData.ts#L201
     */
    async load() {
        if (this.styleSheetContent !== undefined) {
            return;
        }
        this.styleSheetContent = '';
        this.toUnload.push(disposable_1.Disposable.create(() => {
            this.styleSheetContent = undefined;
            this.hasFileIcons = undefined;
            this.hasFolderIcons = undefined;
            this.hidesExplorerArrows = undefined;
            this.icons.clear();
        }));
        const uri = new uri_1.default(this.uri);
        const result = await this.fileService.read(uri);
        const content = result.value;
        const json = jsoncparser.parse(content, undefined, { disallowComments: false });
        this.hidesExplorerArrows = !!json.hidesExplorerArrows;
        const toUnwatch = this.fileService.watch(uri);
        if (this.toUnload.disposed) {
            toUnwatch.dispose();
        }
        else {
            this.toUnload.push(toUnwatch);
            this.toUnload.push(this.fileService.onDidFilesChange(e => {
                if (e.contains(uri, 1 /* FileChangeType.ADDED */) || e.contains(uri, 0 /* FileChangeType.UPDATED */)) {
                    this.reload();
                }
            }));
        }
        const iconDefinitions = json.iconDefinitions;
        if (!iconDefinitions) {
            return;
        }
        const definitionSelectors = new Map();
        const acceptSelector = (themeType, definitionId, ...icons) => {
            if (!iconDefinitions[definitionId]) {
                return;
            }
            let selector = '';
            for (const icon of icons) {
                if (icon) {
                    selector += '.' + icon;
                    this.icons.add(icon);
                }
            }
            if (!selector) {
                return;
            }
            const selectors = definitionSelectors.get(definitionId) || [];
            if (themeType !== 'dark') {
                selector = '.theia-' + themeType + ' ' + selector;
            }
            selectors.push(selector + '::before');
            definitionSelectors.set(definitionId, selectors);
        };
        let iconInfo = this.collectSelectors(json, acceptSelector.bind(undefined, 'dark'));
        if (json.light) {
            iconInfo = this.collectSelectors(json.light, acceptSelector.bind(undefined, 'light'));
        }
        if (json.highContrast) {
            iconInfo = this.collectSelectors(json.highContrast, acceptSelector.bind(undefined, 'hc'));
        }
        const showLanguageModeIcons = this.showLanguageModeIcons === true
            || json.showLanguageModeIcons === true
            || (iconInfo.hasSpecificFileIcons && json.showLanguageModeIcons !== false);
        const fonts = json.fonts;
        if (Array.isArray(fonts)) {
            for (const font of fonts) {
                if (font) {
                    let src = '';
                    if (Array.isArray(font.src)) {
                        for (const srcLocation of font.src) {
                            if (srcLocation && srcLocation.path) {
                                const cssUrl = this.toCSSUrl(srcLocation.path);
                                if (cssUrl) {
                                    if (src) {
                                        src += ', ';
                                    }
                                    src += `${cssUrl} format('${srcLocation.format}')`;
                                }
                            }
                        }
                    }
                    if (src) {
                        this.styleSheetContent += `@font-face {
    src: ${src};
    font-family: '${font.id}';
    font-weight: ${font.weight};
    font-style: ${font.style};
}
`;
                    }
                }
            }
            const firstFont = fonts[0];
            if (firstFont && firstFont.id) {
                this.styleSheetContent += `.${this.fileIcon}::before, .${this.folderIcon}::before, .${this.rootFolderIcon}::before {
    font-family: '${firstFont.id}';
    font-size: ${firstFont.size || '150%'};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: top;
}
`;
            }
        }
        for (const definitionId of definitionSelectors.keys()) {
            const iconDefinition = iconDefinitions[definitionId];
            const selectors = definitionSelectors.get(definitionId);
            if (selectors && iconDefinition) {
                const cssUrl = this.toCSSUrl(iconDefinition.iconPath);
                if (cssUrl) {
                    this.styleSheetContent += `${selectors.join(', ')} {
    content: ' ';
    background-image: ${cssUrl};
    background-size: ${plugin_shared_style_1.DEFAULT_ICON_SIZE}px;
    background-position: left center;
    background-repeat: no-repeat;
}
`;
                }
                if (iconDefinition.fontCharacter || iconDefinition.fontColor) {
                    let body = '';
                    if (iconDefinition.fontColor) {
                        body += ` color: ${iconDefinition.fontColor};`;
                    }
                    if (iconDefinition.fontCharacter) {
                        body += ` content: '${iconDefinition.fontCharacter}';`;
                    }
                    if (iconDefinition.fontSize) {
                        body += ` font-size: ${iconDefinition.fontSize};`;
                    }
                    if (iconDefinition.fontId) {
                        body += ` font-family: ${iconDefinition.fontId};`;
                    }
                    this.styleSheetContent += `${selectors.join(', ')} {${body} }\n`;
                }
            }
        }
        if (showLanguageModeIcons) {
            for (const language of this.languageService.languages) {
                // only show language icons if there are no more specific icons in the style document
                if (!iconInfo.coveredLanguages[language.id]) {
                    const icon = this.languageService.getIcon(language.id);
                    if (icon) {
                        this.icons.add(this.fileIcon);
                        this.icons.add(this.languageIcon(language.id));
                        this.icons.add(icon);
                    }
                }
            }
        }
    }
    toCSSUrl(iconPath) {
        if (!iconPath) {
            return undefined;
        }
        const iconUri = this.locationUri.resolve(iconPath);
        const relativePath = this.packageRootUri.path.relative(iconUri.path.normalize());
        return relativePath && `url('${new endpoint_1.Endpoint({
            path: `hostedPlugin/${this.pluginId}/${encodeURIComponent(relativePath.normalize().toString())}`
        }).getRestUrl().toString()}')`;
    }
    escapeCSS(value) {
        value = value.replace(/[^\-a-zA-Z0-9]/g, '-');
        if (value.charAt(0).match(/[0-9\-]/)) {
            value = '-' + value;
        }
        return value;
    }
    folderNameIcon(folderName) {
        return 'theia-plugin-' + this.escapeCSS(folderName.toLowerCase()) + '-folder-name-icon';
    }
    expandedFolderNameIcon(folderName) {
        return 'theia-plugin-' + this.escapeCSS(folderName.toLowerCase()) + '-expanded-folder-name-icon';
    }
    fileNameIcon(fileName) {
        fileName = fileName.toLowerCase();
        const extIndex = fileName.indexOf('.');
        const icons = extIndex !== -1 ? this.fileExtensionIcon(fileName.substring(extIndex + 1)) : [];
        icons.unshift('theia-plugin-' + this.escapeCSS(fileName) + '-file-name-icon');
        return icons;
    }
    fileExtensionIcon(fileExtension) {
        fileExtension = fileExtension.toString();
        const icons = [];
        const segments = fileExtension.split('.');
        if (segments.length) {
            if (segments.length) {
                for (let i = 0; i < segments.length; i++) {
                    icons.push('theia-plugin-' + this.escapeCSS(segments.slice(i).join('.')) + '-ext-file-icon');
                }
                icons.push('theia-plugin-ext-file-icon'); // extra segment to increase file-ext score
            }
        }
        return icons;
    }
    languageIcon(languageId) {
        return 'theia-plugin-' + this.escapeCSS(languageId) + '-lang-file-icon';
    }
    collectSelectors(associations, accept) {
        const iconInfo = new PluginLanguageIconInfo();
        if (associations.folder) {
            accept(associations.folder, this.folderIcon);
            if (associations.folderExpanded === undefined) {
                // Use the same icon for expanded state (issue #12727). Check for
                // undefined folderExpanded property to allow for
                // "folderExpanded": null in case a developer really wants that
                accept(associations.folder, this.folderExpandedIcon);
            }
            this.hasFolderIcons = true;
        }
        if (associations.folderExpanded) {
            accept(associations.folderExpanded, this.folderExpandedIcon);
            this.hasFolderIcons = true;
        }
        const rootFolder = associations.rootFolder || associations.folder;
        if (rootFolder) {
            accept(rootFolder, this.rootFolderIcon);
            this.hasFolderIcons = true;
        }
        const rootFolderExpanded = associations.rootFolderExpanded || associations.folderExpanded;
        if (rootFolderExpanded) {
            accept(rootFolderExpanded, this.rootFolderExpandedIcon);
            this.hasFolderIcons = true;
        }
        if (associations.file) {
            accept(associations.file, this.fileIcon);
            this.hasFileIcons = true;
        }
        const folderNames = associations.folderNames;
        if (folderNames) {
            // eslint-disable-next-line guard-for-in
            for (const folderName in folderNames) {
                accept(folderNames[folderName], this.folderNameIcon(folderName), this.folderIcon);
                this.hasFolderIcons = true;
            }
        }
        const folderNamesExpanded = associations.folderNamesExpanded;
        if (folderNamesExpanded) {
            // eslint-disable-next-line guard-for-in
            for (const folderName in folderNamesExpanded) {
                accept(folderNamesExpanded[folderName], this.expandedFolderNameIcon(folderName), this.folderExpandedIcon);
                this.hasFolderIcons = true;
            }
        }
        const languageIds = associations.languageIds;
        if (languageIds) {
            if (!languageIds.jsonc && languageIds.json) {
                languageIds.jsonc = languageIds.json;
            }
            // eslint-disable-next-line guard-for-in
            for (const languageId in languageIds) {
                accept(languageIds[languageId], this.languageIcon(languageId), this.fileIcon);
                this.hasFileIcons = true;
                iconInfo.hasSpecificFileIcons = true;
                iconInfo.coveredLanguages[languageId] = true;
            }
        }
        const fileExtensions = associations.fileExtensions;
        if (fileExtensions) {
            // eslint-disable-next-line guard-for-in
            for (const fileExtension in fileExtensions) {
                accept(fileExtensions[fileExtension], ...this.fileExtensionIcon(fileExtension), this.fileIcon);
                this.hasFileIcons = true;
                iconInfo.hasSpecificFileIcons = true;
            }
        }
        const fileNames = associations.fileNames;
        if (fileNames) {
            // eslint-disable-next-line guard-for-in
            for (const fileName in fileNames) {
                accept(fileNames[fileName], ...this.fileNameIcon(fileName), this.fileIcon);
                this.hasFileIcons = true;
                iconInfo.hasSpecificFileIcons = true;
            }
        }
        return iconInfo;
    }
    /**
     * This should be aligned with
     * https://github.com/microsoft/vscode/blob/7cf4cca47aa025a590fc939af54932042302be63/src/vs/editor/common/services/getIconClasses.ts#L5
     */
    getIcon(element) {
        let icon = '';
        for (const className of this.getClassNames(element)) {
            if (this.icons.has(className)) {
                if (icon) {
                    icon += ' ';
                }
                icon += className;
            }
        }
        return icon;
    }
    getClassNames(element) {
        if (navigator_tree_1.WorkspaceRootNode.is(element)) {
            const name = this.labelProvider.getName(element);
            if (element.expanded) {
                return [this.rootFolderExpandedIcon, this.expandedFolderNameIcon(name)];
            }
            return [this.rootFolderIcon, this.folderNameIcon(name)];
        }
        if (browser_1.DirNode.is(element)) {
            if (element.expanded) {
                const name = this.labelProvider.getName(element);
                return [this.folderExpandedIcon, this.expandedFolderNameIcon(name)];
            }
            return this.getFolderClassNames(element);
        }
        if (browser_1.FileStatNode.is(element)) {
            return this.getFileClassNames(element, element.fileStat.resource.toString());
        }
        if (files_1.FileStat.is(element)) {
            if (element.isDirectory) {
                return this.getFolderClassNames(element);
            }
            return this.getFileClassNames(element, element.resource.toString());
        }
        if (label_provider_1.URIIconReference.is(element)) {
            if (element.id === 'folder') {
                return this.getFolderClassNames(element);
            }
            return this.getFileClassNames(element, element.uri && element.uri.toString());
        }
        return this.getFileClassNames(element, element.toString());
    }
    getFolderClassNames(element) {
        const name = this.labelProvider.getName(element);
        return [this.folderIcon, this.folderNameIcon(name)];
    }
    getFileClassNames(element, uri) {
        var _a;
        const name = this.labelProvider.getName(element);
        const classNames = this.fileNameIcon(name);
        if (uri) {
            const parsedURI = new uri_1.default(uri);
            const isRoot = (_a = this.workspaceService.getWorkspaceRootUri(new uri_1.default(uri))) === null || _a === void 0 ? void 0 : _a.isEqual(parsedURI);
            if (isRoot) {
                classNames.unshift(this.rootFolderIcon);
            }
            else {
                classNames.unshift(this.fileIcon);
            }
            const language = standaloneServices_1.StandaloneServices.get(language_1.ILanguageService).createByFilepathOrFirstLine(parsedURI['codeUri']);
            classNames.push(this.languageIcon(language.languageId));
            const defaultLanguageIcon = this.languageService.getIcon(language.languageId);
            if (defaultLanguageIcon) {
                classNames.push(defaultLanguageIcon);
            }
        }
        return classNames;
    }
};
exports.PluginIconTheme = PluginIconTheme;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], PluginIconTheme.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], PluginIconTheme.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(PluginIconThemeDefinition),
    tslib_1.__metadata("design:type", PluginIconThemeDefinition)
], PluginIconTheme.prototype, "definition", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_2.WorkspaceService),
    tslib_1.__metadata("design:type", browser_2.WorkspaceService)
], PluginIconTheme.prototype, "workspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(language_service_1.LanguageService),
    tslib_1.__metadata("design:type", language_service_1.LanguageService)
], PluginIconTheme.prototype, "languageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PluginIconTheme.prototype, "init", null);
exports.PluginIconTheme = PluginIconTheme = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginIconTheme);
let PluginIconThemeService = class PluginIconThemeService {
    constructor() {
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    fireDidChange() {
        this.onDidChangeEmitter.fire({ affects: () => true });
    }
    register(contribution, plugin) {
        const pluginId = (0, plugin_protocol_1.getPluginId)(plugin.metadata.model);
        const packageUri = plugin.metadata.model.packageUri;
        const iconTheme = this.iconThemeFactory({
            id: contribution.id,
            label: contribution.label || new uri_1.default(contribution.uri).path.base,
            description: contribution.description,
            uri: contribution.uri,
            uiTheme: contribution.uiTheme,
            pluginId,
            packageUri
        });
        return new disposable_1.DisposableCollection(iconTheme, iconTheme.onDidChange(() => this.fireDidChange()), this.iconThemeService.register(iconTheme));
    }
    canHandle(element) {
        const current = this.iconThemeService.getDefinition(this.iconThemeService.current);
        if (current instanceof PluginIconTheme && ((element instanceof uri_1.default && element.scheme === 'file') || label_provider_1.URIIconReference.is(element) || files_1.FileStat.is(element) || browser_1.FileStatNode.is(element))) {
            return Number.MAX_SAFE_INTEGER;
        }
        return 0;
    }
    getIcon(element) {
        const current = this.iconThemeService.getDefinition(this.iconThemeService.current);
        if (current instanceof PluginIconTheme) {
            return current.getIcon(element);
        }
        return undefined;
    }
};
exports.PluginIconThemeService = PluginIconThemeService;
tslib_1.__decorate([
    (0, inversify_1.inject)(icon_theme_service_1.IconThemeService),
    tslib_1.__metadata("design:type", icon_theme_service_1.IconThemeService)
], PluginIconThemeService.prototype, "iconThemeService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(exports.PluginIconThemeFactory),
    tslib_1.__metadata("design:type", Function)
], PluginIconThemeService.prototype, "iconThemeFactory", void 0);
exports.PluginIconThemeService = PluginIconThemeService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginIconThemeService);
//# sourceMappingURL=plugin-icon-theme-service.js.map