"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.MonacoMimeService = void 0;
const tslib_1 = require("tslib");
const debounce = require("@theia/core/shared/lodash.debounce");
const inversify_1 = require("@theia/core/shared/inversify");
const mime_service_1 = require("@theia/core/lib/browser/mime-service");
const standaloneServices_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices");
const language_1 = require("@theia/monaco-editor-core/esm/vs/editor/common/languages/language");
const monaco = require("@theia/monaco-editor-core");
const languagesAssociations_1 = require("@theia/monaco-editor-core/esm/vs/editor/common/services/languagesAssociations");
let MonacoMimeService = class MonacoMimeService extends mime_service_1.MimeService {
    constructor() {
        super();
        this.associations = [];
        this.updatingAssociations = false;
        this.updateAssociations = debounce(() => {
            this.updatingAssociations = true;
            try {
                (0, languagesAssociations_1.clearConfiguredLanguageAssociations)();
                for (const association of this.associations) {
                    const mimetype = this.getMimeForMode(association.id) || `text/x-${association.id}`;
                    (0, languagesAssociations_1.registerConfiguredLanguageAssociation)({ id: association.id, mime: mimetype, filepattern: association.filepattern });
                }
                standaloneServices_1.StandaloneServices.get(language_1.ILanguageService)['_onDidChange'].fire(undefined);
            }
            finally {
                this.updatingAssociations = false;
            }
        });
        standaloneServices_1.StandaloneServices.get(language_1.ILanguageService).onDidChange(() => {
            if (this.updatingAssociations) {
                return;
            }
            this.updateAssociations();
        });
    }
    setAssociations(associations) {
        this.associations = associations;
        this.updateAssociations();
    }
    getMimeForMode(langId) {
        for (const language of monaco.languages.getLanguages()) {
            if (language.id === langId && language.mimetypes) {
                return language.mimetypes[0];
            }
        }
        return undefined;
    }
};
exports.MonacoMimeService = MonacoMimeService;
exports.MonacoMimeService = MonacoMimeService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], MonacoMimeService);
//# sourceMappingURL=monaco-mime-service.js.map