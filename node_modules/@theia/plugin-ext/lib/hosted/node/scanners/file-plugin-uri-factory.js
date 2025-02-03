"use strict";
// *****************************************************************************
// Copyright (C) 2021 Red Hat, Inc.
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
exports.FilePluginUriFactory = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const path = require("path");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
/**
 * The default implementation of PluginUriFactory simply returns a File URI from the concatenated
 * package path and relative path.
 */
let FilePluginUriFactory = class FilePluginUriFactory {
    createUri(pkg, pkgRelativePath) {
        return file_uri_1.FileUri.create(pkgRelativePath ? path.join(pkg.packagePath, pkgRelativePath) : pkg.packagePath);
    }
};
exports.FilePluginUriFactory = FilePluginUriFactory;
exports.FilePluginUriFactory = FilePluginUriFactory = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FilePluginUriFactory);
//# sourceMappingURL=file-plugin-uri-factory.js.map