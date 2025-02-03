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
exports.NotebookRendererMessagingService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const notebook_editor_widget_service_1 = require("./notebook-editor-widget-service");
;
let NotebookRendererMessagingService = class NotebookRendererMessagingService {
    constructor() {
        this.postMessageEmitter = new core_1.Emitter();
        this.onPostMessage = this.postMessageEmitter.event;
        this.willActivateRendererEmitter = new core_1.Emitter();
        this.onWillActivateRenderer = this.willActivateRendererEmitter.event;
        this.activations = new Map();
        this.scopedMessaging = new Map();
    }
    receiveMessage(editorId, rendererId, message) {
        var _a, _b, _c;
        if (editorId === undefined) {
            const sends = [...this.scopedMessaging.values()].map(e => { var _a; return (_a = e.receiveMessage) === null || _a === void 0 ? void 0 : _a.call(e, rendererId, message); });
            return Promise.all(sends).then(values => values.some(value => !!value));
        }
        return (_c = (_b = (_a = this.scopedMessaging.get(editorId)) === null || _a === void 0 ? void 0 : _a.receiveMessage) === null || _b === void 0 ? void 0 : _b.call(_a, rendererId, message)) !== null && _c !== void 0 ? _c : Promise.resolve(false);
    }
    prepare(rendererId) {
        if (this.activations.has(rendererId)) {
            return;
        }
        const queue = [];
        this.activations.set(rendererId, queue);
        Promise.all(this.willActivateRendererEmitter.fire(rendererId)).then(() => {
            for (const message of queue) {
                this.postMessageEmitter.fire(message);
            }
            this.activations.set(rendererId, undefined);
        });
    }
    getScoped(editorId) {
        const existing = this.scopedMessaging.get(editorId);
        if (existing) {
            return existing;
        }
        const messaging = {
            postMessage: (rendererId, message) => this.postMessage(editorId, rendererId, message),
            receiveMessage: async (rendererId, message) => {
                var _a;
                (_a = this.editorWidgetService.getNotebookEditor(editorId)) === null || _a === void 0 ? void 0 : _a.postRendererMessage(rendererId, message);
                return true;
            },
            dispose: () => this.scopedMessaging.delete(editorId),
        };
        this.scopedMessaging.set(editorId, messaging);
        return messaging;
    }
    postMessage(editorId, rendererId, message) {
        if (!this.activations.has(rendererId)) {
            this.prepare(rendererId);
        }
        const activation = this.activations.get(rendererId);
        const toSend = { rendererId, editorId, message };
        if (activation === undefined) {
            this.postMessageEmitter.fire(toSend);
        }
        else {
            activation.push(toSend);
        }
    }
    dispose() {
        this.postMessageEmitter.dispose();
    }
};
exports.NotebookRendererMessagingService = NotebookRendererMessagingService;
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_editor_widget_service_1.NotebookEditorWidgetService),
    tslib_1.__metadata("design:type", notebook_editor_widget_service_1.NotebookEditorWidgetService)
], NotebookRendererMessagingService.prototype, "editorWidgetService", void 0);
exports.NotebookRendererMessagingService = NotebookRendererMessagingService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookRendererMessagingService);
//# sourceMappingURL=notebook-renderer-messaging-service.js.map