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
exports.MockDirectoryArchiver = void 0;
const directory_archiver_1 = require("../directory-archiver");
class MockDirectoryArchiver extends directory_archiver_1.DirectoryArchiver {
    constructor(folders) {
        super();
        this.folders = folders;
    }
    async isDir(uri) {
        return !!this.folders && this.folders.map(u => u.toString()).indexOf(uri.toString()) !== -1;
    }
}
exports.MockDirectoryArchiver = MockDirectoryArchiver;
//# sourceMappingURL=mock-directory-archiver.js.map