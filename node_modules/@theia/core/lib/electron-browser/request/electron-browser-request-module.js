"use strict";
/********************************************************************************
 * Copyright (C) 2022 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const browser_request_service_1 = require("../../browser/request/browser-request-service");
const request_1 = require("@theia/request");
exports.default = new inversify_1.ContainerModule(bind => {
    // This version of the request service will always proxy every request through the backend.
    // We do this since the backend currently cannot automatically resolve proxies, but the frontend can.
    // We try to avoid confusion with this where some (frontend) requests successfully go through the proxy, but some others (backend) don't.
    bind(request_1.RequestService).to(browser_request_service_1.ProxyingBrowserRequestService).inSingletonScope();
});
//# sourceMappingURL=electron-browser-request-module.js.map