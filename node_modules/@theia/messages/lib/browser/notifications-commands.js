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
exports.NotificationsCommands = void 0;
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
var NotificationsCommands;
(function (NotificationsCommands) {
    const NOTIFICATIONS_CATEGORY = 'Notifications';
    const NOTIFICATIONS_CATEGORY_KEY = core_1.nls.getDefaultKey(NOTIFICATIONS_CATEGORY);
    NotificationsCommands.TOGGLE = core_1.Command.toLocalizedCommand({
        id: 'notifications.commands.toggle',
        category: NOTIFICATIONS_CATEGORY,
        iconClass: (0, browser_1.codicon)('list-unordered'),
        label: 'Toggle Notifications'
    }, 'theia/messages/toggleNotifications', NOTIFICATIONS_CATEGORY_KEY);
    NotificationsCommands.SHOW = core_1.Command.toDefaultLocalizedCommand({
        id: 'notifications.commands.show',
        category: NOTIFICATIONS_CATEGORY,
        label: 'Show Notifications'
    });
    NotificationsCommands.HIDE = core_1.Command.toDefaultLocalizedCommand({
        id: 'notifications.commands.hide',
        category: NOTIFICATIONS_CATEGORY,
        label: 'Hide Notifications'
    });
    NotificationsCommands.CLEAR_ALL = core_1.Command.toDefaultLocalizedCommand({
        id: 'notifications.commands.clearAll',
        category: NOTIFICATIONS_CATEGORY,
        iconClass: (0, browser_1.codicon)('clear-all'),
        label: 'Clear All Notifications'
    });
})(NotificationsCommands || (exports.NotificationsCommands = NotificationsCommands = {}));
//# sourceMappingURL=notifications-commands.js.map