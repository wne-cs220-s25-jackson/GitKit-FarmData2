"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
var ExternalAppOpenHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalAppOpenHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const http_open_handler_1 = require("../../browser/http-open-handler");
let ExternalAppOpenHandler = ExternalAppOpenHandler_1 = class ExternalAppOpenHandler {
    constructor() {
        this.id = 'external-app';
    }
    canHandle(uri, options) {
        return (options && options.openExternalApp) ? ExternalAppOpenHandler_1.PRIORITY : -1;
    }
    async open(uri) {
        // For files 'file:' scheme, system accepts only the path.
        // For other protocols e.g. 'vscode:' we use the full URI to propagate target app information.
        window.electronTheiaCore.openWithSystemApp(uri.toString(true));
        return undefined;
    }
};
exports.ExternalAppOpenHandler = ExternalAppOpenHandler;
ExternalAppOpenHandler.PRIORITY = http_open_handler_1.HttpOpenHandler.PRIORITY + 100;
exports.ExternalAppOpenHandler = ExternalAppOpenHandler = ExternalAppOpenHandler_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ExternalAppOpenHandler);
//# sourceMappingURL=external-app-open-handler.js.map