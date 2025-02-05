"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
exports.bindNotificationPreferences = exports.createNotificationPreferences = exports.NotificationPreferences = exports.NotificationPreferenceContribution = exports.NotificationConfigSchema = void 0;
const preferences_1 = require("@theia/core/lib/browser/preferences");
const nls_1 = require("@theia/core/lib/common/nls");
exports.NotificationConfigSchema = {
    'type': 'object',
    'properties': {
        'notification.timeout': {
            'type': 'number',
            'description': nls_1.nls.localize('theia/messages/notificationTimeout', 'Informative notifications will be hidden after this timeout.'),
            'default': 30 * 1000 // `0` and negative values are treated as no timeout.
        }
    }
};
exports.NotificationPreferenceContribution = Symbol('NotificationPreferenceContribution');
exports.NotificationPreferences = Symbol('NotificationPreferences');
function createNotificationPreferences(preferences, schema = exports.NotificationConfigSchema) {
    return (0, preferences_1.createPreferenceProxy)(preferences, schema);
}
exports.createNotificationPreferences = createNotificationPreferences;
function bindNotificationPreferences(bind) {
    bind(exports.NotificationPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(preferences_1.PreferenceService);
        const contribution = ctx.container.get(exports.NotificationPreferenceContribution);
        return createNotificationPreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.NotificationPreferenceContribution).toConstantValue({ schema: exports.NotificationConfigSchema });
    bind(preferences_1.PreferenceContribution).toService(exports.NotificationPreferenceContribution);
}
exports.bindNotificationPreferences = bindNotificationPreferences;
//# sourceMappingURL=notification-preferences.js.map