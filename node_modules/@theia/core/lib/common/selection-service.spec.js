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
Object.defineProperty(exports, "__esModule", { value: true });
const selection_service_1 = require("./selection-service");
const chai = require("chai");
const expect = chai.expect;
describe('selection-service', () => {
    describe('01 #addListener and dispose', () => {
        it('Should be rejected when path argument is undefined.', () => {
            const service = createSelectionService();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const events = [];
            const disposable = service.onSelectionChanged(e => events.push(e));
            service.selection = 'foo';
            disposable.dispose();
            service.selection = 'bar';
            expect(events.length).equals(1);
            expect(events[0]).equals('foo');
        });
    });
});
function createSelectionService() {
    return new selection_service_1.SelectionService();
}
//# sourceMappingURL=selection-service.spec.js.map