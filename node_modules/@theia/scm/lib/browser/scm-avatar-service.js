"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.ScmAvatarService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const ts_md5_1 = require("ts-md5");
let ScmAvatarService = class ScmAvatarService {
    async getAvatar(email) {
        const hash = ts_md5_1.Md5.hashStr(email);
        return `https://www.gravatar.com/avatar/${hash}?d=robohash`;
    }
};
exports.ScmAvatarService = ScmAvatarService;
exports.ScmAvatarService = ScmAvatarService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ScmAvatarService);
//# sourceMappingURL=scm-avatar-service.js.map