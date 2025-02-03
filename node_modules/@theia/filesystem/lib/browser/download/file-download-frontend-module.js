"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const command_1 = require("@theia/core/lib/common/command");
const file_download_service_1 = require("./file-download-service");
const file_download_command_contribution_1 = require("./file-download-command-contribution");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(file_download_service_1.FileDownloadService).toSelf().inSingletonScope();
    bind(command_1.CommandContribution).to(file_download_command_contribution_1.FileDownloadCommandContribution).inSingletonScope();
});
//# sourceMappingURL=file-download-frontend-module.js.map