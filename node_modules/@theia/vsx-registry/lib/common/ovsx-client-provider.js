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
exports.createOVSXClient = exports.OVSXClientProvider = exports.OVSXUrlResolver = void 0;
const ovsx_client_1 = require("@theia/ovsx-client");
exports.OVSXUrlResolver = Symbol('OVSXUrlResolver');
exports.OVSXClientProvider = Symbol('OVSXClientProvider');
/**
 * @deprecated since 1.32.0
 */
async function createOVSXClient(vsxEnvironment, requestService) {
    const apiUrl = await vsxEnvironment.getRegistryApiUri();
    return new ovsx_client_1.OVSXHttpClient(apiUrl, requestService);
}
exports.createOVSXClient = createOVSXClient;
//# sourceMappingURL=ovsx-client-provider.js.map