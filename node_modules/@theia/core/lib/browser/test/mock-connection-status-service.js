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
exports.MockConnectionStatusService = void 0;
const mock_logger_1 = require("../../common/test/mock-logger");
const connection_status_service_1 = require("../connection-status-service");
class MockConnectionStatusService extends connection_status_service_1.AbstractConnectionStatusService {
    constructor() {
        super({
            offlineTimeout: 10
        });
        this.logger = new mock_logger_1.MockLogger();
    }
    set alive(alive) {
        this.updateStatus(alive);
    }
}
exports.MockConnectionStatusService = MockConnectionStatusService;
//# sourceMappingURL=mock-connection-status-service.js.map