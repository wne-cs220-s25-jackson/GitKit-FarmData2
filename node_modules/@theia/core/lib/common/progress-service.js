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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const message_service_protocol_1 = require("./message-service-protocol");
const cancellation_1 = require("./cancellation");
const progress_service_protocol_1 = require("./progress-service-protocol");
const message_service_1 = require("./message-service");
let ProgressService = class ProgressService {
    constructor() {
        this.progressIdPrefix = Math.random().toString(36).substring(5);
        this.counter = 0;
    }
    async showProgress(message, onDidCancel) {
        if (this.shouldDelegate(message)) {
            return this.messageService.showProgress(message, onDidCancel);
        }
        const id = this.newProgressId();
        const cancellationSource = new cancellation_1.CancellationTokenSource();
        const report = (update) => {
            this.client.reportProgress(id, update, message, cancellationSource.token);
        };
        const actions = new Set(message.actions);
        if (message_service_protocol_1.ProgressMessage.isCancelable(message)) {
            actions.delete(message_service_protocol_1.ProgressMessage.Cancel);
            actions.add(message_service_protocol_1.ProgressMessage.Cancel);
        }
        const clientMessage = { ...message, actions: Array.from(actions) };
        const result = this.client.showProgress(id, clientMessage, cancellationSource.token);
        if (message_service_protocol_1.ProgressMessage.isCancelable(message) && typeof onDidCancel === 'function') {
            result.then(value => {
                if (value === message_service_protocol_1.ProgressMessage.Cancel) {
                    onDidCancel();
                }
            });
        }
        return {
            id,
            cancel: () => cancellationSource.cancel(),
            result,
            report
        };
    }
    shouldDelegate(message) {
        const location = message.options && message.options.location;
        return location === 'notification';
    }
    newProgressId() {
        return `${this.progressIdPrefix}-${++this.counter}`;
    }
    async withProgress(text, locationId, task, onDidCancel) {
        const progress = await this.showProgress({ text, options: { cancelable: true, location: locationId } }, onDidCancel);
        try {
            return await task();
        }
        finally {
            progress.cancel();
        }
    }
};
exports.ProgressService = ProgressService;
tslib_1.__decorate([
    (0, inversify_1.inject)(progress_service_protocol_1.ProgressClient),
    tslib_1.__metadata("design:type", Object)
], ProgressService.prototype, "client", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], ProgressService.prototype, "messageService", void 0);
exports.ProgressService = ProgressService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ProgressService);
//# sourceMappingURL=progress-service.js.map