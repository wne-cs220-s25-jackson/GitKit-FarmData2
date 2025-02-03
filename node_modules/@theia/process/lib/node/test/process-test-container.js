"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProcessTestContainer = void 0;
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
const process_backend_module_1 = require("../process-backend-module");
function createProcessTestContainer() {
    const testContainer = new inversify_1.Container();
    (0, logger_backend_module_1.bindLogger)(testContainer.bind.bind(testContainer));
    testContainer.load(process_backend_module_1.default);
    return testContainer;
}
exports.createProcessTestContainer = createProcessTestContainer;
//# sourceMappingURL=process-test-container.js.map