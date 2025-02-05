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
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const content_lines_1 = require("./content-lines");
const chai_1 = require("chai");
chai.use(require('chai-string'));
describe('content-lines', () => {
    it('array-like access of lines without splitting', () => {
        const raw = 'abc\ndef\n123\n456';
        const linesArray = content_lines_1.ContentLines.arrayLike(content_lines_1.ContentLines.fromString(raw));
        (0, chai_1.expect)(linesArray[0]).to.be.equal('abc');
        (0, chai_1.expect)(linesArray[1]).to.be.equal('def');
        (0, chai_1.expect)(linesArray[2]).to.be.equal('123');
        (0, chai_1.expect)(linesArray[3]).to.be.equal('456');
    });
    it('works with CRLF', () => {
        const raw = 'abc\ndef\r\n123\r456';
        const linesArray = content_lines_1.ContentLines.arrayLike(content_lines_1.ContentLines.fromString(raw));
        (0, chai_1.expect)(linesArray[0]).to.be.equal('abc');
        (0, chai_1.expect)(linesArray[1]).to.be.equal('def');
        (0, chai_1.expect)(linesArray[2]).to.be.equal('123');
        (0, chai_1.expect)(linesArray[3]).to.be.equal('456');
    });
});
//# sourceMappingURL=content-lines.spec.js.map