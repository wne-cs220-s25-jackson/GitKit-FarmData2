"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTempDirPathAsync = exports.getTempDir = void 0;
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
const os = require("os");
const path = require("path");
const fs_1 = require("fs");
function getTempDir(name) {
    let tempDir = os.tmpdir();
    // for mac os 'os.tmpdir()' return symlink, but we need real path
    if (process.platform === 'darwin') {
        tempDir = (0, fs_1.realpathSync)(tempDir);
    }
    return path.resolve(tempDir, name);
}
exports.getTempDir = getTempDir;
async function getTempDirPathAsync(name) {
    let tempDir = os.tmpdir();
    // for mac os 'os.tmpdir()' return symlink, but we need real path
    if (process.platform === 'darwin') {
        tempDir = await fs_1.promises.realpath(tempDir);
    }
    return path.resolve(tempDir, name);
}
exports.getTempDirPathAsync = getTempDirPathAsync;
//# sourceMappingURL=temp-dir-util.js.map