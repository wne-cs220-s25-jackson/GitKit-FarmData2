"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.EnvMainImpl = void 0;
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const core_1 = require("@theia/core");
const types_impl_1 = require("../../plugin/types-impl");
class EnvMainImpl {
    constructor(rpc, container) {
        this.envVariableServer = container.get(env_variables_1.EnvVariablesServer);
    }
    $getEnvVariable(envVarName) {
        return this.envVariableServer.getValue(envVarName).then(result => result ? result.value : undefined);
    }
    async $getClientOperatingSystem() {
        if (core_1.isWindows) {
            return types_impl_1.OperatingSystem.Windows;
        }
        if (core_1.isOSX) {
            return types_impl_1.OperatingSystem.OSX;
        }
        return types_impl_1.OperatingSystem.Linux;
    }
}
exports.EnvMainImpl = EnvMainImpl;
//# sourceMappingURL=env-main.js.map