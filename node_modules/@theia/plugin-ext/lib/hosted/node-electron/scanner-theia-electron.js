"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheiaPluginScannerElectron = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const scanner_theia_1 = require("../node/scanners/scanner-theia");
const inversify_1 = require("@theia/core/shared/inversify");
let TheiaPluginScannerElectron = class TheiaPluginScannerElectron extends scanner_theia_1.TheiaPluginScanner {
    getModel(plugin) {
        const result = super.getModel(plugin);
        if (result.entryPoint.frontend) {
            result.entryPoint.frontend = path.resolve(plugin.packagePath, result.entryPoint.frontend);
        }
        return result;
    }
};
exports.TheiaPluginScannerElectron = TheiaPluginScannerElectron;
exports.TheiaPluginScannerElectron = TheiaPluginScannerElectron = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TheiaPluginScannerElectron);
//# sourceMappingURL=scanner-theia-electron.js.map