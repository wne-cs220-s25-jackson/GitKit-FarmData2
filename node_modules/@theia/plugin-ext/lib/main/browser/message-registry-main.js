"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.MessageRegistryMainImpl = void 0;
const plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
const modal_notification_1 = require("./dialogs/modal-notification");
const basic_message_registry_main_1 = require("../common/basic-message-registry-main");
/**
 * Message registry implementation that adds support for the model option via dialog in the browser.
 */
class MessageRegistryMainImpl extends basic_message_registry_main_1.BasicMessageRegistryMainImpl {
    constructor(container) {
        super(container);
    }
    async doShowMessage(type, message, options, actions) {
        if (options.modal) {
            const messageType = type === plugin_api_rpc_1.MainMessageType.Error ? modal_notification_1.MessageType.Error :
                type === plugin_api_rpc_1.MainMessageType.Warning ? modal_notification_1.MessageType.Warning :
                    modal_notification_1.MessageType.Info;
            const modalNotification = new modal_notification_1.ModalNotification();
            return modalNotification.showDialog(messageType, message, options, actions);
        }
        return super.doShowMessage(type, message, options, actions);
    }
}
exports.MessageRegistryMainImpl = MessageRegistryMainImpl;
//# sourceMappingURL=message-registry-main.js.map