"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.LabelProvider = exports.DefaultUriLabelProviderContribution = exports.URIIconReference = exports.LabelProviderContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const fileIcons = require("file-icons-js");
const uri_1 = require("../common/uri");
const contribution_provider_1 = require("../common/contribution-provider");
const common_1 = require("../common");
const env_variables_protocol_1 = require("../common/env-variables/env-variables-protocol");
const widgets_1 = require("./widgets");
/**
 * @internal don't export it, use `LabelProvider.folderIcon` instead.
 */
const DEFAULT_FOLDER_ICON = `${(0, widgets_1.codicon)('folder')} default-folder-icon`;
/**
 * @internal don't export it, use `LabelProvider.fileIcon` instead.
 */
const DEFAULT_FILE_ICON = `${(0, widgets_1.codicon)('file')} default-file-icon`;
exports.LabelProviderContribution = Symbol('LabelProviderContribution');
var URIIconReference;
(function (URIIconReference) {
    function is(element) {
        return (0, common_1.isObject)(element) && element.kind === 'uriIconReference';
    }
    URIIconReference.is = is;
    function create(id, uri) {
        return { kind: 'uriIconReference', id, uri };
    }
    URIIconReference.create = create;
})(URIIconReference || (exports.URIIconReference = URIIconReference = {}));
let DefaultUriLabelProviderContribution = class DefaultUriLabelProviderContribution {
    constructor() {
        this.formatters = [];
        this.onDidChangeEmitter = new common_1.Emitter();
        // copied and modified from https://github.com/microsoft/vscode/blob/1.44.2/src/vs/workbench/services/label/common/labelService.ts
        /*---------------------------------------------------------------------------------------------
        *  Copyright (c) Microsoft Corporation. All rights reserved.
        *  Licensed under the MIT License. See License.txt in the project root for license information.
        *--------------------------------------------------------------------------------------------*/
        this.labelMatchingRegexp = /\${(scheme|authority|path|query)}/g;
    }
    init() {
        this.envVariablesServer.getHomeDirUri().then(result => {
            this.homePath = result;
            this.fireOnDidChange();
        });
    }
    canHandle(element) {
        if (element instanceof uri_1.default || URIIconReference.is(element)) {
            return 1;
        }
        return 0;
    }
    getIcon(element) {
        if (URIIconReference.is(element) && element.id === 'folder') {
            return this.defaultFolderIcon;
        }
        const uri = URIIconReference.is(element) ? element.uri : element;
        if (uri) {
            const iconClass = uri && this.getFileIcon(uri);
            return iconClass || this.defaultFileIcon;
        }
        return '';
    }
    get defaultFolderIcon() {
        return DEFAULT_FOLDER_ICON;
    }
    get defaultFileIcon() {
        return DEFAULT_FILE_ICON;
    }
    getFileIcon(uri) {
        const fileIcon = fileIcons.getClassWithColor(uri.displayName);
        if (!fileIcon) {
            return undefined;
        }
        return fileIcon + ' theia-file-icons-js';
    }
    getName(element) {
        const uri = this.getUri(element);
        return uri && uri.displayName;
    }
    getLongName(element) {
        const uri = this.getUri(element);
        if (uri) {
            const formatting = this.findFormatting(uri);
            if (formatting) {
                return this.formatUri(uri, formatting);
            }
        }
        return uri && uri.path.fsPath();
    }
    getDetails(element) {
        const uri = this.getUri(element);
        if (uri) {
            return this.getLongName(uri.parent);
        }
        return this.getLongName(element);
    }
    getUri(element) {
        return URIIconReference.is(element) ? element.uri : element;
    }
    registerFormatter(formatter) {
        this.formatters.push(formatter);
        this.fireOnDidChange();
        return common_1.Disposable.create(() => {
            this.formatters = this.formatters.filter(f => f !== formatter);
            this.fireOnDidChange();
        });
    }
    get onDidChange() {
        return this.onDidChangeEmitter.event;
    }
    fireOnDidChange() {
        this.onDidChangeEmitter.fire({
            affects: (element) => this.canHandle(element) > 0
        });
    }
    formatUri(resource, formatting) {
        let label = formatting.label.replace(this.labelMatchingRegexp, (match, token) => {
            switch (token) {
                case 'scheme': return resource.scheme;
                case 'authority': return resource.authority;
                case 'path': return resource.path.toString();
                case 'query': return resource.query;
                default: return '';
            }
        });
        // convert \c:\something => C:\something
        if (formatting.normalizeDriveLetter && this.hasDriveLetter(label)) {
            label = label.charAt(1).toUpperCase() + label.substring(2);
        }
        if (formatting.tildify) {
            label = common_1.Path.tildify(label, this.homePath ? this.homePath : '');
        }
        if (formatting.authorityPrefix && resource.authority) {
            label = formatting.authorityPrefix + label;
        }
        return label.replace(/\//g, formatting.separator);
    }
    hasDriveLetter(path) {
        return !!(path && path[2] === ':');
    }
    findFormatting(resource) {
        let bestResult;
        this.formatters.forEach(formatter => {
            if (formatter.scheme === resource.scheme) {
                if (!bestResult && !formatter.authority) {
                    bestResult = formatter;
                    return;
                }
                if (!formatter.authority) {
                    return;
                }
                if ((formatter.authority.toLowerCase() === resource.authority.toLowerCase()) &&
                    (!bestResult || !bestResult.authority || formatter.authority.length > bestResult.authority.length ||
                        ((formatter.authority.length === bestResult.authority.length) && formatter.priority))) {
                    bestResult = formatter;
                }
            }
        });
        return bestResult ? bestResult.formatting : undefined;
    }
};
exports.DefaultUriLabelProviderContribution = DefaultUriLabelProviderContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_protocol_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], DefaultUriLabelProviderContribution.prototype, "envVariablesServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DefaultUriLabelProviderContribution.prototype, "init", null);
exports.DefaultUriLabelProviderContribution = DefaultUriLabelProviderContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultUriLabelProviderContribution);
/**
 * The {@link LabelProvider} determines how elements/nodes are displayed in the workbench. For any element, it can determine a short label, a long label
 * and an icon. The {@link LabelProvider} is to be used in lists, trees and tables, but also view specific locations like headers.
 * The common {@link LabelProvider} can be extended/adapted via {@link LabelProviderContribution}s. For every element, the {@links LabelProvider} will determine the
 * {@link LabelProviderContribution} with the hightest priority and delegate to it. Theia registers default {@link LabelProviderContribution} for common types, e.g.
 * the {@link DefaultUriLabelProviderContribution} for elements that have a URI.
 * Using the {@link LabelProvider} across the workbench ensures a common look and feel for elements across multiple views. To adapt the way how specific
 * elements/nodes are rendered, use a {@link LabelProviderContribution} rather than adapting or sub classing the {@link LabelProvider}. This way, your adaptation
 * is applied to all views in Theia that use the {@link LabelProvider}
 */
let LabelProvider = class LabelProvider {
    constructor() {
        this.onDidChangeEmitter = new common_1.Emitter();
    }
    /**
     * Start listening to contributions.
     *
     * Don't call this method directly!
     * It's called by the frontend application during initialization.
     */
    initialize() {
        const contributions = this.contributionProvider.getContributions();
        for (const eventContribution of contributions) {
            if (eventContribution.onDidChange) {
                eventContribution.onDidChange(event => {
                    this.onDidChangeEmitter.fire({
                        // TODO check eventContribution.canHandle as well
                        affects: element => this.affects(element, event)
                    });
                });
            }
        }
    }
    affects(element, event) {
        if (event.affects(element)) {
            return true;
        }
        for (const contribution of this.findContribution(element)) {
            if (contribution.affects && contribution.affects(element, event)) {
                return true;
            }
        }
        return false;
    }
    get onDidChange() {
        return this.onDidChangeEmitter.event;
    }
    /**
     * Return a default file icon for the current icon theme.
     */
    get fileIcon() {
        return this.getIcon(URIIconReference.create('file'));
    }
    /**
     * Return a default folder icon for the current icon theme.
     */
    get folderIcon() {
        return this.getIcon(URIIconReference.create('folder'));
    }
    /**
     * Get the icon class from the list of available {@link LabelProviderContribution} for the given element.
     * @return the icon class
     */
    getIcon(element) {
        var _a;
        return (_a = this.handleRequest(element, 'getIcon')) !== null && _a !== void 0 ? _a : '';
    }
    /**
     * Get a short name from the list of available {@link LabelProviderContribution} for the given element.
     * @return the short name
     */
    getName(element) {
        var _a;
        return (_a = this.handleRequest(element, 'getName')) !== null && _a !== void 0 ? _a : '<unknown>';
    }
    /**
     * Get a long name from the list of available {@link LabelProviderContribution} for the given element.
     * @return the long name
     */
    getLongName(element) {
        var _a;
        return (_a = this.handleRequest(element, 'getLongName')) !== null && _a !== void 0 ? _a : '';
    }
    /**
     * Get details from the list of available {@link LabelProviderContribution} for the given element.
     * @return the details
     * Can be used to supplement {@link getName} in contexts that allow both a primary display field and extra detail.
     */
    getDetails(element) {
        var _a;
        return (_a = this.handleRequest(element, 'getDetails')) !== null && _a !== void 0 ? _a : '';
    }
    handleRequest(element, method) {
        var _a;
        for (const contribution of this.findContribution(element, method)) {
            const value = (_a = contribution[method]) === null || _a === void 0 ? void 0 : _a.call(contribution, element);
            if (value !== undefined) {
                return value;
            }
        }
    }
    findContribution(element, method) {
        const candidates = method
            ? this.contributionProvider.getContributions().filter(candidate => candidate[method])
            : this.contributionProvider.getContributions();
        return common_1.Prioritizeable.prioritizeAllSync(candidates, contrib => contrib.canHandle(element)).map(entry => entry.value);
    }
};
exports.LabelProvider = LabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(contribution_provider_1.ContributionProvider),
    (0, inversify_1.named)(exports.LabelProviderContribution),
    tslib_1.__metadata("design:type", Object)
], LabelProvider.prototype, "contributionProvider", void 0);
exports.LabelProvider = LabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LabelProvider);
//# sourceMappingURL=label-provider.js.map