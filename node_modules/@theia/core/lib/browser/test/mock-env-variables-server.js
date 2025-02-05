"use strict";
// *****************************************************************************
// Copyright (C) 2020 Red Hat, Inc. and others.
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
exports.MockEnvVariablesServerImpl = void 0;
class MockEnvVariablesServerImpl {
    constructor(configDirUri) {
        this.configDirUri = configDirUri;
    }
    getHomeDirUri() {
        return Promise.resolve('');
    }
    getDrives() {
        throw new Error('Method not implemented.');
    }
    async getConfigDirUri() {
        return this.configDirUri.toString();
    }
    getExecPath() {
        throw new Error('Method not implemented.');
    }
    getVariables() {
        throw new Error('Method not implemented.');
    }
    getValue(key) {
        throw new Error('Method not implemented.');
    }
}
exports.MockEnvVariablesServerImpl = MockEnvVariablesServerImpl;
//# sourceMappingURL=mock-env-variables-server.js.map