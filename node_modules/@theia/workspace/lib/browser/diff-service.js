"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.DiffService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const diff_uris_1 = require("@theia/core/lib/browser/diff-uris");
const browser_1 = require("@theia/core/lib/browser");
const message_service_1 = require("@theia/core/lib/common/message-service");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
let DiffService = class DiffService {
    async openDiffEditor(left, right, label, options) {
        if (left.scheme === 'file' && right.scheme === 'file') {
            const [resolvedLeft, resolvedRight] = await this.fileService.resolveAll([{ resource: left }, { resource: right }]);
            if (resolvedLeft.success && resolvedRight.success) {
                const leftStat = resolvedLeft.stat;
                const rightStat = resolvedRight.stat;
                if (leftStat && rightStat) {
                    if (!leftStat.isDirectory && !rightStat.isDirectory) {
                        const uri = diff_uris_1.DiffUris.encode(left, right, label);
                        await (0, browser_1.open)(this.openerService, uri, options);
                    }
                    else {
                        const details = (() => {
                            if (leftStat.isDirectory && rightStat.isDirectory) {
                                return 'Both resource were a directory.';
                            }
                            else {
                                if (leftStat.isDirectory) {
                                    return `'${left.path.base}' was a directory.`;
                                }
                                else {
                                    return `'${right.path.base}' was a directory.`;
                                }
                            }
                        });
                        this.messageService.warn(`Directories cannot be compared. ${details()}`);
                    }
                }
            }
        }
        else {
            const uri = diff_uris_1.DiffUris.encode(left, right, label);
            await (0, browser_1.open)(this.openerService, uri, options);
        }
    }
};
exports.DiffService = DiffService;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], DiffService.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], DiffService.prototype, "openerService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], DiffService.prototype, "messageService", void 0);
exports.DiffService = DiffService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DiffService);
//# sourceMappingURL=diff-service.js.map