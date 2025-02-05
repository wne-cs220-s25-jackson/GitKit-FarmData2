"use strict";
// *****************************************************************************
// Copyright (C) 2023 EclipseSource and others.
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
exports.loggerFrontendOnlyModule = void 0;
const inversify_1 = require("inversify");
const logger_protocol_1 = require("../common/logger-protocol");
const logger_1 = require("../common/logger");
// is loaded directly after the regular logger frontend module
exports.loggerFrontendOnlyModule = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    const logger = {
        setLogLevel: async (_name, _logLevel) => { },
        getLogLevel: async (_name) => logger_protocol_1.LogLevel.INFO,
        log: async (name, logLevel, message, params) => {
            logger_protocol_1.ConsoleLogger.log(name, logLevel, message, params);
        },
        child: async (_name) => { },
        dispose: () => {
        },
        setClient: (_client) => {
        }
    };
    if (isBound(logger_protocol_1.ILoggerServer)) {
        rebind(logger_protocol_1.ILoggerServer).toConstantValue(logger);
    }
    else {
        bind(logger_protocol_1.ILoggerServer).toConstantValue(logger);
    }
    if (isBound(logger_protocol_1.ILoggerServer)) {
        rebind(logger_1.LoggerFactory).toFactory(ctx => (name) => {
            const child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            child.bind(logger_1.ILogger).to(logger_1.Logger).inTransientScope();
            child.bind(logger_1.LoggerName).toConstantValue(name);
            return child.get(logger_1.ILogger);
        });
    }
    else {
        bind(logger_1.LoggerFactory).toFactory(ctx => (name) => {
            const child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            child.bind(logger_1.ILogger).to(logger_1.Logger).inTransientScope();
            child.bind(logger_1.LoggerName).toConstantValue(name);
            return child.get(logger_1.ILogger);
        });
    }
});
//# sourceMappingURL=logger-frontend-only-module.js.map