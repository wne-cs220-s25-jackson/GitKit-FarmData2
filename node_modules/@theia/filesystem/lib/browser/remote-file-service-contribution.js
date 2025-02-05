"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
exports.RemoteFileServiceContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const remote_file_system_provider_1 = require("../common/remote-file-system-provider");
let RemoteFileServiceContribution = class RemoteFileServiceContribution {
    registerFileSystemProviders(service) {
        const registering = this.provider.ready.then(() => service.registerProvider('file', this.provider));
        service.onWillActivateFileSystemProvider(event => {
            if (event.scheme === 'file') {
                event.waitUntil(registering);
            }
        });
    }
};
exports.RemoteFileServiceContribution = RemoteFileServiceContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(remote_file_system_provider_1.RemoteFileSystemProvider),
    tslib_1.__metadata("design:type", remote_file_system_provider_1.RemoteFileSystemProvider)
], RemoteFileServiceContribution.prototype, "provider", void 0);
exports.RemoteFileServiceContribution = RemoteFileServiceContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], RemoteFileServiceContribution);
//# sourceMappingURL=remote-file-service-contribution.js.map