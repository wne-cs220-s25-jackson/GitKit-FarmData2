"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.WorkerEnvExtImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const env_1 = require("../../../plugin/env");
/**
 * Worker specific implementation not returning any FileSystem details
 * Extending the common class
 */
let WorkerEnvExtImpl = class WorkerEnvExtImpl extends env_1.EnvExtImpl {
    constructor() {
        super();
    }
    get appRoot() {
        // The documentation indicates that this should be an empty string
        return '';
    }
    get isNewAppInstall() {
        return false;
    }
};
exports.WorkerEnvExtImpl = WorkerEnvExtImpl;
exports.WorkerEnvExtImpl = WorkerEnvExtImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], WorkerEnvExtImpl);
//# sourceMappingURL=worker-env-ext.js.map