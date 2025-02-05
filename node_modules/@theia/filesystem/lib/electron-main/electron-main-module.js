"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// *****************************************************************************
// Copyright (C) 2023 STMicroelectronics and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const electron_main_application_1 = require("@theia/core/lib/electron-main/electron-main-application");
const electron_api_main_1 = require("./electron-api-main");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(electron_api_main_1.ElectronApi).toSelf().inSingletonScope();
    bind(electron_main_application_1.ElectronMainApplicationContribution).toService(electron_api_main_1.ElectronApi);
});
//# sourceMappingURL=electron-main-module.js.map