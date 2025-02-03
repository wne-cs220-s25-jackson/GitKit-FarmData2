"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskTestContainer = void 0;
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
const terminal_backend_module_1 = require("@theia/terminal/lib/node/terminal-backend-module");
const task_backend_module_1 = require("../task-backend-module");
const filesystem_backend_module_1 = require("@theia/filesystem/lib/node/filesystem-backend-module");
const workspace_backend_module_1 = require("@theia/workspace/lib/node/workspace-backend-module");
const messaging_backend_module_1 = require("@theia/core/lib/node/messaging/messaging-backend-module");
const application_package_1 = require("@theia/core/shared/@theia/application-package");
const node_1 = require("@theia/process/lib/node");
const process_utils_1 = require("@theia/core/lib/node/process-utils");
function createTaskTestContainer() {
    const testContainer = new inversify_1.Container();
    testContainer.load(backend_application_module_1.backendApplicationModule);
    testContainer.rebind(application_package_1.ApplicationPackage).toConstantValue({});
    (0, logger_backend_module_1.bindLogger)(testContainer.bind.bind(testContainer));
    testContainer.load(messaging_backend_module_1.messagingBackendModule);
    testContainer.load(process_backend_module_1.default);
    testContainer.load(task_backend_module_1.default);
    testContainer.load(filesystem_backend_module_1.default);
    testContainer.load(workspace_backend_module_1.default);
    testContainer.load(terminal_backend_module_1.default);
    // Make it easier to debug processes.
    testContainer.rebind(node_1.TerminalProcess).to(TestTerminalProcess);
    testContainer.rebind(process_utils_1.ProcessUtils).toConstantValue(new class extends process_utils_1.ProcessUtils {
        terminateProcessTree() { } // don't actually kill the tree, it breaks the tests.
    });
    return testContainer;
}
exports.createTaskTestContainer = createTaskTestContainer;
class TestTerminalProcess extends node_1.TerminalProcess {
    emitOnStarted() {
        if (process.env['THEIA_TASK_TEST_DEBUG']) {
            console.log(`START ${this.id} ${JSON.stringify([this.executable, this.options.commandLine, ...this.arguments])}`);
            this.outputStream.on('data', data => console.debug(`${this.id} OUTPUT: ${data.toString().trim()}`));
        }
        super.emitOnStarted();
    }
}
//# sourceMappingURL=task-test-container.js.map