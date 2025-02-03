"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockWorkspaceServer = void 0;
const tslib_1 = require("tslib");
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
let MockWorkspaceServer = class MockWorkspaceServer {
    getRecentWorkspaces() { return Promise.resolve([]); }
    getMostRecentlyUsedWorkspace() { return Promise.resolve(''); }
    setMostRecentlyUsedWorkspace(uri) { return Promise.resolve(); }
    removeRecentWorkspace(uri) { return Promise.resolve(); }
};
exports.MockWorkspaceServer = MockWorkspaceServer;
exports.MockWorkspaceServer = MockWorkspaceServer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MockWorkspaceServer);
//# sourceMappingURL=mock-workspace-server.js.map