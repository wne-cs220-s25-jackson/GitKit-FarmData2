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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookRendererRegistry = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
let NotebookRendererRegistry = class NotebookRendererRegistry {
    constructor() {
        this._notebookRenderers = [];
        this._staticNotebookPreloads = [];
    }
    get notebookRenderers() {
        return this._notebookRenderers;
    }
    get staticNotebookPreloads() {
        return this._staticNotebookPreloads;
    }
    registerNotebookRenderer(type, basePath) {
        let entrypoint;
        if (typeof type.entrypoint === 'string') {
            entrypoint = {
                uri: new core_1.Path(basePath).join(type.entrypoint).toString()
            };
        }
        else {
            entrypoint = {
                uri: new core_1.Path(basePath).join(type.entrypoint.path).toString(),
                extends: type.entrypoint.extends
            };
        }
        this._notebookRenderers.push({
            ...type,
            mimeTypes: type.mimeTypes || [],
            requiresMessaging: type.requiresMessaging === 'always' || type.requiresMessaging === 'optional',
            entrypoint
        });
        return core_1.Disposable.create(() => {
            this._notebookRenderers.splice(this._notebookRenderers.findIndex(renderer => renderer.id === type.id), 1);
        });
    }
    registerStaticNotebookPreload(type, entrypoint, basePath) {
        const staticPreload = { type, entrypoint: new core_1.Path(basePath).join(entrypoint).toString() };
        this._staticNotebookPreloads.push(staticPreload);
        return core_1.Disposable.create(() => {
            this._staticNotebookPreloads.splice(this._staticNotebookPreloads.indexOf(staticPreload), 1);
        });
    }
};
exports.NotebookRendererRegistry = NotebookRendererRegistry;
exports.NotebookRendererRegistry = NotebookRendererRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookRendererRegistry);
//# sourceMappingURL=notebook-renderer-registry.js.map