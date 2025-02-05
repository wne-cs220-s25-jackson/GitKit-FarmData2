"use strict";
// *****************************************************************************
// Copyright (C) 2022 Texas Instruments and others.
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
const files_1 = require("./files");
const chai_1 = require("chai");
const uri_1 = require("@theia/core/lib/common/uri");
describe('FileChangesEvent', () => {
    it('deleting parent folder - event contains child', () => {
        const parent = new uri_1.default('file:///grandparent/parent');
        const child = new uri_1.default('file:///grandparent/parent/child');
        const event = new files_1.FileChangesEvent([{ resource: parent, type: 2 /* FileChangeType.DELETED */ }]);
        (0, chai_1.expect)(event.contains(child, 2 /* FileChangeType.DELETED */)).to.eq(true);
    });
    it('deleting grandparent folder - event contains grandchild', () => {
        const grandparent = new uri_1.default('file:///grandparent');
        const grandchild = new uri_1.default('file:///grandparent/parent/child');
        const event = new files_1.FileChangesEvent([{ resource: grandparent, type: 2 /* FileChangeType.DELETED */ }]);
        (0, chai_1.expect)(event.contains(grandchild, 2 /* FileChangeType.DELETED */)).to.eq(true);
    });
    it('deleting child file - event does not contain parent', () => {
        const parent = new uri_1.default('file:///grandparent/parent');
        const child = new uri_1.default('file:///grandparent/parent/child');
        const event = new files_1.FileChangesEvent([{ resource: child, type: 2 /* FileChangeType.DELETED */ }]);
        (0, chai_1.expect)(event.contains(parent, 2 /* FileChangeType.DELETED */)).to.eq(false);
    });
    it('deleting grandchild file - event does not contain grandchild', () => {
        const grandparent = new uri_1.default('file:///grandparent');
        const grandchild = new uri_1.default('file:///grandparent/parent/child');
        const event = new files_1.FileChangesEvent([{ resource: grandchild, type: 2 /* FileChangeType.DELETED */ }]);
        (0, chai_1.expect)(event.contains(grandparent, 2 /* FileChangeType.DELETED */)).to.eq(false);
    });
    it('deleting self - event contains self', () => {
        const self = new uri_1.default('file:///grandparent/parent/self');
        const event = new files_1.FileChangesEvent([{ resource: self, type: 2 /* FileChangeType.DELETED */ }]);
        (0, chai_1.expect)(event.contains(self, 2 /* FileChangeType.DELETED */)).to.eq(true);
    });
});
//# sourceMappingURL=files.spec.js.map