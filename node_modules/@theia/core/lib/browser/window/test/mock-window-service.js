"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockWindowService = void 0;
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
const inversify_1 = require("inversify");
const event_1 = require("../../../common/event");
let MockWindowService = class MockWindowService {
    openNewWindow() { return undefined; }
    openNewDefaultWindow() { }
    focus() { }
    reload() { }
    isSafeToShutDown() { return Promise.resolve(true); }
    setSafeToShutDown() { }
    get onUnload() { return event_1.Event.None; }
};
exports.MockWindowService = MockWindowService;
exports.MockWindowService = MockWindowService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MockWindowService);
//# sourceMappingURL=mock-window-service.js.map