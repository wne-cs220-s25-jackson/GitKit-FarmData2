"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const event_1 = require("../common/event");
/**
 * Singleton service that is used to share the current selection globally in a Theia application.
 * On each change of selection, subscribers are notified and receive the updated selection object.
 */
let SelectionService = class SelectionService {
    constructor() {
        this.onSelectionChangedEmitter = new event_1.Emitter();
        this.onSelectionChanged = this.onSelectionChangedEmitter.event;
    }
    get selection() {
        return this.currentSelection;
    }
    set selection(selection) {
        this.currentSelection = selection;
        this.onSelectionChangedEmitter.fire(this.currentSelection);
    }
};
exports.SelectionService = SelectionService;
exports.SelectionService = SelectionService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SelectionService);
//# sourceMappingURL=selection-service.js.map