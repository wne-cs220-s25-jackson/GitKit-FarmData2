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
exports.MessageClient = exports.ProgressMessage = exports.MessageType = exports.messageServicePath = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const nls_1 = require("./nls");
exports.messageServicePath = '/services/messageService';
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Error"] = 1] = "Error";
    MessageType[MessageType["Warning"] = 2] = "Warning";
    MessageType[MessageType["Info"] = 3] = "Info";
    MessageType[MessageType["Log"] = 4] = "Log";
    MessageType[MessageType["Progress"] = 5] = "Progress";
})(MessageType || (exports.MessageType = MessageType = {}));
var ProgressMessage;
(function (ProgressMessage) {
    ProgressMessage.Cancel = nls_1.nls.localizeByDefault('Cancel');
    function isCancelable(message) {
        var _a;
        return !!((_a = message.options) === null || _a === void 0 ? void 0 : _a.cancelable);
    }
    ProgressMessage.isCancelable = isCancelable;
})(ProgressMessage || (exports.ProgressMessage = ProgressMessage = {}));
let MessageClient = class MessageClient {
    /**
     * Show a message of the given type and possible actions to the user.
     * Resolve to a chosen action.
     * Never reject.
     *
     * To be implemented by an extension, e.g. by the messages extension.
     */
    showMessage(message) {
        console.info(message.text);
        return Promise.resolve(undefined);
    }
    /**
     * Show a progress message with possible actions to user.
     *
     * To be implemented by an extension, e.g. by the messages extension.
     */
    showProgress(progressId, message, cancellationToken) {
        console.info(message.text);
        return Promise.resolve(undefined);
    }
    /**
     * Update a previously created progress message.
     *
     * To be implemented by an extension, e.g. by the messages extension.
     */
    reportProgress(progressId, update, message, cancellationToken) {
        return Promise.resolve(undefined);
    }
};
exports.MessageClient = MessageClient;
exports.MessageClient = MessageClient = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MessageClient);
//# sourceMappingURL=message-service-protocol.js.map