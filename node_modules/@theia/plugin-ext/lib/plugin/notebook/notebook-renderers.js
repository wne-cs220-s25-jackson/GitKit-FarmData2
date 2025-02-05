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
exports.NotebookRenderersExtImpl = void 0;
const common_1 = require("../../common");
const notebook_editor_1 = require("./notebook-editor");
const core_1 = require("@theia/core");
class NotebookRenderersExtImpl {
    constructor(rpc, notebooksExt) {
        this.notebooksExt = notebooksExt;
        this.rendererMessageEmitters = new Map();
        this.proxy = rpc.getProxy(common_1.PLUGIN_RPC_CONTEXT.NOTEBOOK_RENDERERS_MAIN);
    }
    $postRendererMessage(editorId, rendererId, message) {
        var _a;
        const editor = this.notebooksExt.getEditorById(editorId);
        (_a = this.rendererMessageEmitters.get(rendererId)) === null || _a === void 0 ? void 0 : _a.fire({ editor: editor.apiEditor, message });
    }
    createRendererMessaging(rendererId) {
        const messaging = {
            onDidReceiveMessage: (listener, thisArg, disposables) => this.getOrCreateEmitterFor(rendererId).event(listener, thisArg, disposables),
            postMessage: (message, editorOrAlias) => {
                const extHostEditor = editorOrAlias && notebook_editor_1.NotebookEditor.apiEditorsToExtHost.get(editorOrAlias);
                return this.proxy.$postMessage(extHostEditor === null || extHostEditor === void 0 ? void 0 : extHostEditor.id, rendererId, message);
            },
        };
        return messaging;
    }
    getOrCreateEmitterFor(rendererId) {
        let emitter = this.rendererMessageEmitters.get(rendererId);
        if (emitter) {
            return emitter;
        }
        emitter = new core_1.Emitter({
            onLastListenerRemove: () => {
                emitter === null || emitter === void 0 ? void 0 : emitter.dispose();
                this.rendererMessageEmitters.delete(rendererId);
            }
        });
        this.rendererMessageEmitters.set(rendererId, emitter);
        return emitter;
    }
}
exports.NotebookRenderersExtImpl = NotebookRenderersExtImpl;
//# sourceMappingURL=notebook-renderers.js.map