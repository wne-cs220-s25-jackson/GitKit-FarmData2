"use strict";
// *****************************************************************************
// Copyright (C) 2024 STMicroelectronics and others.
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
exports.ElectronUriHandlerContribution = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("../browser");
const inversify_1 = require("inversify");
const common_1 = require("../common");
let ElectronUriHandlerContribution = class ElectronUriHandlerContribution {
    initialize() {
        window.electronTheiaCore.setOpenUrlHandler(async (url) => {
            const uri = new common_1.URI(url);
            try {
                const handler = await this.openenerService.getOpener(uri);
                if (handler) {
                    await handler.open(uri);
                    return true;
                }
            }
            catch (e) {
                // no handler
            }
            return false;
        });
    }
};
exports.ElectronUriHandlerContribution = ElectronUriHandlerContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], ElectronUriHandlerContribution.prototype, "openenerService", void 0);
exports.ElectronUriHandlerContribution = ElectronUriHandlerContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronUriHandlerContribution);
//# sourceMappingURL=electron-uri-handler.js.map