"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
exports.ApplicationServerImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const application_package_1 = require("@theia/application-package");
const os_1 = require("../common/os");
let ApplicationServerImpl = class ApplicationServerImpl {
    getExtensionsInfos() {
        // @ts-expect-error
        const appInfo = globalThis.extensionInfo;
        return Promise.resolve(appInfo);
    }
    getApplicationInfo() {
        const pck = this.applicationPackage.pck;
        if (pck.name && pck.version) {
            const name = pck.name;
            const version = pck.version;
            return Promise.resolve({
                name,
                version
            });
        }
        return Promise.resolve(undefined);
    }
    getApplicationRoot() {
        return Promise.resolve(this.applicationPackage.projectPath);
    }
    getApplicationPlatform() {
        return Promise.resolve(`${process.platform}-${process.arch}`);
    }
    async getBackendOS() {
        return os_1.OS.type();
    }
};
exports.ApplicationServerImpl = ApplicationServerImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(application_package_1.ApplicationPackage),
    tslib_1.__metadata("design:type", application_package_1.ApplicationPackage)
], ApplicationServerImpl.prototype, "applicationPackage", void 0);
exports.ApplicationServerImpl = ApplicationServerImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ApplicationServerImpl);
//# sourceMappingURL=application-server.js.map