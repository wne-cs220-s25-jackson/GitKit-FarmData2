"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
const chai_1 = require("chai");
const event_1 = require("./event");
describe('Event Objects', () => {
    it('Emitter firing should be synchronous', () => {
        const emitter = new event_1.Emitter();
        let counter = 0;
        emitter.event(() => counter++);
        (0, chai_1.expect)(counter).eq(0);
        emitter.fire(undefined);
        (0, chai_1.expect)(counter).eq(1);
    });
});
//# sourceMappingURL=event.spec.js.map