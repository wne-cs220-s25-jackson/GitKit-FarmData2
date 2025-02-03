"use strict";
/********************************************************************************
 * Copyright (C) 2024 STMicroelectronics and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronCliContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
let ElectronCliContribution = class ElectronCliContribution {
    configure(conf) {
        conf.option('electronUserData', {
            type: 'string',
            describe: 'The area where the electron main process puts its data'
        });
    }
    setArguments(args) {
    }
};
exports.ElectronCliContribution = ElectronCliContribution;
exports.ElectronCliContribution = ElectronCliContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronCliContribution);
//# sourceMappingURL=electron-cli-contribution.js.map