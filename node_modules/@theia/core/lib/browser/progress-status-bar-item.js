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
exports.ProgressStatusBarItem = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../common");
const status_bar_1 = require("./status-bar");
const promise_util_1 = require("../common/promise-util");
const throttle = require("lodash.throttle");
let ProgressStatusBarItem = class ProgressStatusBarItem {
    constructor() {
        this.id = 'theia-progress-status-bar-item';
        this.messagesByProgress = new Map();
        this.incomingQueue = new Array();
        this.triggerUpdate = throttle(() => this.update(this.currentProgress), 250, { leading: true, trailing: true });
    }
    get currentProgress() {
        return this.incomingQueue.slice(-1)[0];
    }
    showProgress(progressId, message, cancellationToken) {
        const result = new promise_util_1.Deferred();
        cancellationToken.onCancellationRequested(() => {
            this.processEvent(progressId, 'done');
            result.resolve(common_1.ProgressMessage.Cancel);
        });
        this.processEvent(progressId, 'start', message.text);
        return result.promise;
    }
    processEvent(progressId, event, message) {
        if (event === 'start') {
            this.incomingQueue.push(progressId);
            this.messagesByProgress.set(progressId, message);
        }
        else {
            this.incomingQueue = this.incomingQueue.filter(id => id !== progressId);
            this.messagesByProgress.delete(progressId);
        }
        this.triggerUpdate();
    }
    async reportProgress(progressId, update, originalMessage, _cancellationToken) {
        const newMessage = update.message ? `${originalMessage.text}: ${update.message}` : originalMessage.text;
        this.messagesByProgress.set(progressId, newMessage);
        this.triggerUpdate();
    }
    update(progressId) {
        const message = progressId && this.messagesByProgress.get(progressId);
        if (!progressId || !message) {
            this.statusBar.removeElement(this.id);
            return;
        }
        const text = `$(codicon-sync~spin) ${message}`;
        this.statusBar.setElement(this.id, {
            text,
            alignment: status_bar_1.StatusBarAlignment.LEFT,
            priority: 1
        });
    }
};
exports.ProgressStatusBarItem = ProgressStatusBarItem;
tslib_1.__decorate([
    (0, inversify_1.inject)(status_bar_1.StatusBar),
    tslib_1.__metadata("design:type", Object)
], ProgressStatusBarItem.prototype, "statusBar", void 0);
exports.ProgressStatusBarItem = ProgressStatusBarItem = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ProgressStatusBarItem);
//# sourceMappingURL=progress-status-bar-item.js.map