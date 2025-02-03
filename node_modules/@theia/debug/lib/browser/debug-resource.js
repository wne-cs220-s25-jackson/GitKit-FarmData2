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
exports.DebugResourceResolver = exports.DebugResource = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const debug_session_manager_1 = require("./debug-session-manager");
const debug_source_1 = require("./model/debug-source");
class DebugResource {
    constructor(uri, manager) {
        this.uri = uri;
        this.manager = manager;
    }
    dispose() { }
    async readContents() {
        const { currentSession } = this.manager;
        if (!currentSession) {
            throw new Error(`There is no active debug session to load content '${this.uri}'`);
        }
        const source = await currentSession.toSource(this.uri);
        if (!source) {
            throw new Error(`There is no source for '${this.uri}'`);
        }
        return source.load();
    }
}
exports.DebugResource = DebugResource;
let DebugResourceResolver = class DebugResourceResolver {
    resolve(uri) {
        if (uri.scheme !== debug_source_1.DebugSource.SCHEME) {
            throw new Error('The given URI is not a valid debug URI: ' + uri);
        }
        return new DebugResource(uri, this.manager);
    }
};
exports.DebugResourceResolver = DebugResourceResolver;
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_session_manager_1.DebugSessionManager),
    tslib_1.__metadata("design:type", debug_session_manager_1.DebugSessionManager)
], DebugResourceResolver.prototype, "manager", void 0);
exports.DebugResourceResolver = DebugResourceResolver = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugResourceResolver);
//# sourceMappingURL=debug-resource.js.map