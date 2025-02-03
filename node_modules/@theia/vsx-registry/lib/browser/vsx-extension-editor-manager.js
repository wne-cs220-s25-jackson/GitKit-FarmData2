"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
exports.VSXExtensionEditorManager = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const plugin_vscode_uri_1 = require("@theia/plugin-ext-vscode/lib/common/plugin-vscode-uri");
const vsx_extension_editor_1 = require("./vsx-extension-editor");
let VSXExtensionEditorManager = class VSXExtensionEditorManager extends browser_1.WidgetOpenHandler {
    constructor() {
        super(...arguments);
        this.id = vsx_extension_editor_1.VSXExtensionEditor.ID;
    }
    canHandle(uri) {
        const id = plugin_vscode_uri_1.VSCodeExtensionUri.toId(uri);
        return !!id ? 500 : 0;
    }
    createWidgetOptions(uri) {
        const id = plugin_vscode_uri_1.VSCodeExtensionUri.toId(uri);
        if (!id) {
            throw new Error('Invalid URI: ' + uri.toString());
        }
        return id;
    }
};
exports.VSXExtensionEditorManager = VSXExtensionEditorManager;
exports.VSXExtensionEditorManager = VSXExtensionEditorManager = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VSXExtensionEditorManager);
//# sourceMappingURL=vsx-extension-editor-manager.js.map