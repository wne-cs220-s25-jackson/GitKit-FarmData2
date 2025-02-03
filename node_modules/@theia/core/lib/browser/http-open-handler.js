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
var HttpOpenHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpOpenHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const window_service_1 = require("./window/window-service");
const external_uri_service_1 = require("./external-uri-service");
let HttpOpenHandler = HttpOpenHandler_1 = class HttpOpenHandler {
    constructor() {
        this.id = 'http';
    }
    canHandle(uri, options) {
        return ((options && options.openExternal) || uri.scheme.startsWith('http') || uri.scheme.startsWith('mailto')) ? HttpOpenHandler_1.PRIORITY : 0;
    }
    async open(uri) {
        const resolvedUri = await this.externalUriService.resolve(uri);
        return this.windowService.openNewWindow(resolvedUri.toString(true), { external: true });
    }
};
exports.HttpOpenHandler = HttpOpenHandler;
HttpOpenHandler.PRIORITY = 500;
tslib_1.__decorate([
    (0, inversify_1.inject)(window_service_1.WindowService),
    tslib_1.__metadata("design:type", Object)
], HttpOpenHandler.prototype, "windowService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(external_uri_service_1.ExternalUriService),
    tslib_1.__metadata("design:type", external_uri_service_1.ExternalUriService)
], HttpOpenHandler.prototype, "externalUriService", void 0);
exports.HttpOpenHandler = HttpOpenHandler = HttpOpenHandler_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HttpOpenHandler);
//# sourceMappingURL=http-open-handler.js.map