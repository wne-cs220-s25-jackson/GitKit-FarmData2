"use strict";
// *****************************************************************************
// Copyright (C) 2021 MayStreet Inc. and others
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
exports.MessagingListener = exports.MessagingListenerContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
/**
 * Bind components to this symbol to subscribe to WebSocket events.
 */
exports.MessagingListenerContribution = Symbol('MessagingListenerContribution');
/**
 * Handler of Theia messaging system events, dispatching to MessagingListenerContribution instances.
 */
let MessagingListener = class MessagingListener {
    /**
     * Notify all the subscribed `MessagingListenerContribution`s that the Websocket was upgraded.
     */
    async onDidWebSocketUpgrade(request, socket) {
        await Promise.all(Array.from(this.messagingListenerContributions.getContributions(), async (messagingListener) => messagingListener.onDidWebSocketUpgrade(request, socket)));
    }
};
exports.MessagingListener = MessagingListener;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(exports.MessagingListenerContribution),
    tslib_1.__metadata("design:type", Object)
], MessagingListener.prototype, "messagingListenerContributions", void 0);
exports.MessagingListener = MessagingListener = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MessagingListener);
//# sourceMappingURL=messaging-listeners.js.map