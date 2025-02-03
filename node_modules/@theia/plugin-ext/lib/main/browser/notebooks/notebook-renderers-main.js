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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookRenderersMainImpl = void 0;
const core_1 = require("@theia/core");
const browser_1 = require("@theia/notebook/lib/browser");
const common_1 = require("../../../common");
class NotebookRenderersMainImpl {
    constructor(rpc, container) {
        this.disposables = new core_1.DisposableCollection();
        this.proxy = rpc.getProxy(common_1.MAIN_RPC_CONTEXT.NOTEBOOK_RENDERERS_EXT);
        this.rendererMessagingService = container.get(browser_1.NotebookRendererMessagingService);
        this.rendererMessagingService.onPostMessage(e => {
            this.proxy.$postRendererMessage(e.editorId, e.rendererId, e.message);
        });
    }
    $postMessage(editorId, rendererId, message) {
        return this.rendererMessagingService.receiveMessage(editorId, rendererId, message);
    }
    dispose() {
        this.disposables.dispose();
    }
}
exports.NotebookRenderersMainImpl = NotebookRenderersMainImpl;
//# sourceMappingURL=notebook-renderers-main.js.map