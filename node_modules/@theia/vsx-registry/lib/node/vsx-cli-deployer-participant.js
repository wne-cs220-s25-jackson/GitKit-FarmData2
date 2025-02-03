"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
exports.VsxCliDeployerParticipant = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const vsx_cli_1 = require("./vsx-cli");
const common_1 = require("../common");
const fs = require("fs");
const node_1 = require("@theia/core/lib/node");
const path = require("path");
let VsxCliDeployerParticipant = class VsxCliDeployerParticipant {
    async onWillStart(context) {
        const pluginUris = await Promise.all(this.vsxCli.pluginsToInstall.map(async (id) => {
            try {
                const resolvedPath = path.resolve(id);
                const stat = await fs.promises.stat(resolvedPath);
                if (stat.isFile()) {
                    return node_1.FileUri.create(resolvedPath).withScheme('local-file').toString();
                }
            }
            catch (e) {
                // expected if file does not exist
            }
            return common_1.VSXExtensionUri.fromVersionedId(id).toString();
        }));
        context.userEntries.push(...pluginUris);
    }
};
exports.VsxCliDeployerParticipant = VsxCliDeployerParticipant;
tslib_1.__decorate([
    (0, inversify_1.inject)(vsx_cli_1.VsxCli),
    tslib_1.__metadata("design:type", vsx_cli_1.VsxCli)
], VsxCliDeployerParticipant.prototype, "vsxCli", void 0);
exports.VsxCliDeployerParticipant = VsxCliDeployerParticipant = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VsxCliDeployerParticipant);
//# sourceMappingURL=vsx-cli-deployer-participant.js.map