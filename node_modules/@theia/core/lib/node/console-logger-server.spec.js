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
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const console_logger_server_1 = require("./console-logger-server");
const logger_protocol_1 = require("../common/logger-protocol");
const logger_watcher_1 = require("../common/logger-watcher");
const logger_cli_contribution_1 = require("./logger-cli-contribution");
const chai_1 = require("chai");
let server;
let logLevelCliContribution;
let MockLogLevelCliContribution = class MockLogLevelCliContribution extends logger_cli_contribution_1.LogLevelCliContribution {
    init() {
        this._logLevels['test-logger'] = logger_protocol_1.LogLevel.DEBUG;
    }
    changeLogLevel(newLevel) {
        this._logLevels['test-logger'] = newLevel;
    }
};
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MockLogLevelCliContribution.prototype, "init", null);
MockLogLevelCliContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MockLogLevelCliContribution);
beforeEach(() => {
    const container = new inversify_1.Container;
    container.bind(console_logger_server_1.ConsoleLoggerServer).toSelf().inSingletonScope();
    container.bind(logger_watcher_1.LoggerWatcher).toSelf().inSingletonScope();
    container.bind(MockLogLevelCliContribution).toSelf().inSingletonScope();
    container.bind(logger_cli_contribution_1.LogLevelCliContribution).toService(MockLogLevelCliContribution);
    logLevelCliContribution = container.get(MockLogLevelCliContribution);
    server = container.get(console_logger_server_1.ConsoleLoggerServer);
});
describe('ConsoleLoggerServer', function () {
    it('should respect log level config', async function () {
        (0, chai_1.expect)(await server.getLogLevel('test-logger')).eq(logger_protocol_1.LogLevel.DEBUG);
        await server.child('test-logger');
        (0, chai_1.expect)(await server.getLogLevel('test-logger')).eq(logger_protocol_1.LogLevel.DEBUG);
        logLevelCliContribution.changeLogLevel(logger_protocol_1.LogLevel.WARN);
        (0, chai_1.expect)(await server.getLogLevel('test-logger')).eq(logger_protocol_1.LogLevel.WARN);
    });
});
//# sourceMappingURL=console-logger-server.spec.js.map