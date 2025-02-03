"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
exports.VSXExtensionUri = exports.VSXEnvironment = exports.OVSXUrlResolver = exports.OVSXClientProvider = void 0;
var ovsx_client_provider_1 = require("./ovsx-client-provider");
Object.defineProperty(exports, "OVSXClientProvider", { enumerable: true, get: function () { return ovsx_client_provider_1.OVSXClientProvider; } });
Object.defineProperty(exports, "OVSXUrlResolver", { enumerable: true, get: function () { return ovsx_client_provider_1.OVSXUrlResolver; } });
var vsx_environment_1 = require("./vsx-environment");
Object.defineProperty(exports, "VSXEnvironment", { enumerable: true, get: function () { return vsx_environment_1.VSXEnvironment; } });
var vsx_extension_uri_1 = require("./vsx-extension-uri");
Object.defineProperty(exports, "VSXExtensionUri", { enumerable: true, get: function () { return vsx_extension_uri_1.VSXExtensionUri; } });
//# sourceMappingURL=index.js.map