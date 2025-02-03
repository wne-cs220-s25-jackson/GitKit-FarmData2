"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
const lib_1 = require("@theia/application-package/lib/");
const chai_1 = require("chai");
const backend_application_config_provider_1 = require("./backend-application-config-provider");
const { DEFAULT } = lib_1.BackendApplicationConfig;
describe('BackendApplicationConfigProvider', function () {
    it('should use defaults when calling `set`', function () {
        backend_application_config_provider_1.BackendApplicationConfigProvider.set({});
        const config = backend_application_config_provider_1.BackendApplicationConfigProvider.get();
        (0, chai_1.expect)(config.singleInstance).equal(DEFAULT.singleInstance);
    });
});
//# sourceMappingURL=backend-application-config-provider.spec.js.map