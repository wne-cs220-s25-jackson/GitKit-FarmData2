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
const request_1 = require("@theia/request");
const node_request_service_1 = require("@theia/request/lib/node-request-service");
(0, inversify_1.decorate)((0, inversify_1.injectable)(), node_request_service_1.NodeRequestService);
exports.default = new inversify_1.ContainerModule(bind => {
    bind(request_1.RequestService).to(node_request_service_1.NodeRequestService).inSingletonScope();
});
//# sourceMappingURL=backend-request-module.js.map