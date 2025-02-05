"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTerminalTestContainer = void 0;
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
const logger_backend_module_1 = require("@theia/core/lib/node/logger-backend-module");
const backend_application_module_1 = require("@theia/core/lib/node/backend-application-module");
const process_backend_module_1 = require("@theia/process/lib/node/process-backend-module");
const messaging_backend_module_1 = require("@theia/core/lib/node/messaging/messaging-backend-module");
const terminal_backend_module_1 = require("../terminal-backend-module");
const application_package_1 = require("@theia/core/shared/@theia/application-package");
const process_utils_1 = require("@theia/core/lib/node/process-utils");
function createTerminalTestContainer() {
    const container = new inversify_1.Container();
    container.load(backend_application_module_1.backendApplicationModule);
    container.rebind(application_package_1.ApplicationPackage).toConstantValue({});
    container.rebind(process_utils_1.ProcessUtils).toConstantValue(new class extends process_utils_1.ProcessUtils {
        terminateProcessTree() { }
    });
    (0, logger_backend_module_1.bindLogger)(container.bind.bind(container));
    container.load(messaging_backend_module_1.messagingBackendModule);
    container.load(process_backend_module_1.default);
    container.load(terminal_backend_module_1.default);
    return container;
}
exports.createTerminalTestContainer = createTerminalTestContainer;
//# sourceMappingURL=terminal-test-container.js.map