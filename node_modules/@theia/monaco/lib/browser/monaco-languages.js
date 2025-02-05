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
exports.MonacoLanguages = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const problem_manager_1 = require("@theia/markers/lib/browser/problem/problem-manager");
const uri_1 = require("@theia/core/lib/common/uri");
const disposable_1 = require("@theia/core/lib/common/disposable");
const language_service_1 = require("@theia/core/lib/browser/language-service");
const monaco_marker_collection_1 = require("./monaco-marker-collection");
const protocol_to_monaco_converter_1 = require("./protocol-to-monaco-converter");
const monaco = require("@theia/monaco-editor-core");
const files_1 = require("@theia/filesystem/lib/common/files");
const browser_1 = require("@theia/filesystem/lib/browser");
const language_1 = require("@theia/monaco-editor-core/esm/vs/editor/common/languages/language");
const standaloneServices_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices");
let MonacoLanguages = class MonacoLanguages extends language_service_1.LanguageService {
    constructor() {
        super(...arguments);
        this.workspaceSymbolProviders = [];
        this.markers = new Map();
        this.icons = new Map();
    }
    init() {
        this.problemManager.onDidChangeMarkers(uri => this.updateMarkers(uri));
        monaco.editor.onDidCreateModel(model => this.updateModelMarkers(model));
    }
    updateMarkers(uri) {
        const markers = this.problemManager.findMarkers({ uri });
        const uriString = uri.toString();
        const collection = this.markers.get(uriString) || new monaco_marker_collection_1.MonacoMarkerCollection(uri, this.p2m);
        this.markers.set(uriString, collection);
        collection.updateMarkers(markers);
    }
    updateModelMarkers(model) {
        const uriString = model.uri.toString();
        const uri = new uri_1.default(uriString);
        const collection = this.markers.get(uriString) || new monaco_marker_collection_1.MonacoMarkerCollection(uri, this.p2m);
        this.markers.set(uriString, collection);
        collection.updateModelMarkers(model);
    }
    registerWorkspaceSymbolProvider(provider) {
        this.workspaceSymbolProviders.push(provider);
        return disposable_1.Disposable.create(() => {
            const index = this.workspaceSymbolProviders.indexOf(provider);
            if (index !== -1) {
                this.workspaceSymbolProviders.splice(index, 1);
            }
        });
    }
    get languages() {
        return [...this.mergeLanguages(monaco.languages.getLanguages()).values()];
    }
    getLanguage(languageId) {
        return this.mergeLanguages(monaco.languages.getLanguages().filter(language => language.id === languageId)).get(languageId);
    }
    detectLanguage(obj) {
        var _a;
        if (obj === undefined) {
            return undefined;
        }
        if (typeof obj === 'string') {
            return (_a = this.detectLanguageByIdOrName(obj)) !== null && _a !== void 0 ? _a : this.detectLanguageByURI(new uri_1.default(obj));
        }
        if (obj instanceof uri_1.default) {
            return this.detectLanguageByURI(obj);
        }
        if (files_1.FileStat.is(obj)) {
            return this.detectLanguageByURI(obj.resource);
        }
        if (browser_1.FileStatNode.is(obj)) {
            return this.detectLanguageByURI(obj.uri);
        }
        return undefined;
    }
    detectLanguageByIdOrName(obj) {
        const languageById = this.getLanguage(obj);
        if (languageById) {
            return languageById;
        }
        const languageId = this.getLanguageIdByLanguageName(obj);
        return languageId ? this.getLanguage(languageId) : undefined;
    }
    detectLanguageByURI(uri) {
        const languageId = standaloneServices_1.StandaloneServices.get(language_1.ILanguageService).guessLanguageIdByFilepathOrFirstLine(uri['codeUri']);
        return languageId ? this.getLanguage(languageId) : undefined;
    }
    getExtension(languageId) {
        var _a;
        return (_a = this.getLanguage(languageId)) === null || _a === void 0 ? void 0 : _a.extensions.values().next().value;
    }
    registerIcon(languageId, iconClass) {
        this.icons.set(languageId, iconClass);
        this.onDidChangeIconEmitter.fire({ languageId });
        return disposable_1.Disposable.create(() => {
            this.icons.delete(languageId);
            this.onDidChangeIconEmitter.fire({ languageId });
        });
    }
    getIcon(obj) {
        const language = this.detectLanguage(obj);
        return language ? this.icons.get(language.id) : undefined;
    }
    getLanguageIdByLanguageName(languageName) {
        var _a;
        return (_a = monaco.languages.getLanguages().find(language => { var _a; return (_a = language.aliases) === null || _a === void 0 ? void 0 : _a.includes(languageName); })) === null || _a === void 0 ? void 0 : _a.id;
    }
    mergeLanguages(registered) {
        const languages = new Map();
        for (const { id, aliases, extensions, filenames } of registered) {
            const merged = languages.get(id) || {
                id,
                name: '',
                extensions: new Set(),
                filenames: new Set()
            };
            if (!merged.name && aliases && aliases.length) {
                merged.name = aliases[0];
            }
            if (extensions && extensions.length) {
                for (const extension of extensions) {
                    merged.extensions.add(extension);
                }
            }
            if (filenames && filenames.length) {
                for (const filename of filenames) {
                    merged.filenames.add(filename);
                }
            }
            languages.set(id, merged);
        }
        for (const [id, language] of languages) {
            if (!language.name) {
                language.name = id;
            }
        }
        return languages;
    }
};
exports.MonacoLanguages = MonacoLanguages;
tslib_1.__decorate([
    (0, inversify_1.inject)(problem_manager_1.ProblemManager),
    tslib_1.__metadata("design:type", problem_manager_1.ProblemManager)
], MonacoLanguages.prototype, "problemManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(protocol_to_monaco_converter_1.ProtocolToMonacoConverter),
    tslib_1.__metadata("design:type", protocol_to_monaco_converter_1.ProtocolToMonacoConverter)
], MonacoLanguages.prototype, "p2m", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonacoLanguages.prototype, "init", null);
exports.MonacoLanguages = MonacoLanguages = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoLanguages);
//# sourceMappingURL=monaco-languages.js.map