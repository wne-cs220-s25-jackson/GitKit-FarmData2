"use strict";
// *****************************************************************************
// Copyright (C) 2023 TypeFox and others.
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
exports.OSPreloadContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
let OSPreloadContribution = class OSPreloadContribution {
    async initialize() {
        const osType = await this.osBackendProvider.getBackendOS();
        const isWindows = osType === 'Windows';
        const isOSX = osType === 'OSX';
        common_1.OS.backend.isOSX = isOSX;
        common_1.OS.backend.isWindows = isWindows;
        common_1.OS.backend.type = () => osType;
        common_1.OS.backend.EOL = isWindows ? '\r\n' : '\n';
    }
};
exports.OSPreloadContribution = OSPreloadContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.OSBackendProvider),
    tslib_1.__metadata("design:type", Object)
], OSPreloadContribution.prototype, "osBackendProvider", void 0);
exports.OSPreloadContribution = OSPreloadContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], OSPreloadContribution);
//# sourceMappingURL=os-preload-contribution.js.map