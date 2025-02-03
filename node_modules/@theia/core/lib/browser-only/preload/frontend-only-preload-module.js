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
const inversify_1 = require("inversify");
const localization_server_1 = require("../../common/i18n/localization-server");
const os_1 = require("../../common/os");
// loaded after regular preload module
exports.default = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    const frontendOnlyLocalizationServer = {
        loadLocalization: async (languageId) => ({ translations: {}, languageId })
    };
    if (isBound(localization_server_1.LocalizationServer)) {
        rebind(localization_server_1.LocalizationServer).toConstantValue(frontendOnlyLocalizationServer);
    }
    else {
        bind(localization_server_1.LocalizationServer).toConstantValue(frontendOnlyLocalizationServer);
    }
    const frontendOnlyOSBackendProvider = {
        getBackendOS: async () => {
            if (window.navigator.platform.startsWith('Win')) {
                return os_1.OS.Type.Windows;
            }
            else if (window.navigator.platform.startsWith('Mac')) {
                return os_1.OS.Type.OSX;
            }
            else {
                return os_1.OS.Type.Linux;
            }
        }
    };
    if (isBound(os_1.OSBackendProvider)) {
        rebind(os_1.OSBackendProvider).toConstantValue(frontendOnlyOSBackendProvider);
    }
    else {
        bind(os_1.OSBackendProvider).toConstantValue(frontendOnlyOSBackendProvider);
    }
});
//# sourceMappingURL=frontend-only-preload-module.js.map