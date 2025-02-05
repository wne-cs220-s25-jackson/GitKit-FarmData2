"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDownloadCache = void 0;
const tslib_1 = require("tslib");
// *****************************************************************************
// Copyright (C) 2019 Bitsler and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const logger_1 = require("@theia/core/lib/common/logger");
const rimraf_1 = require("rimraf");
let FileDownloadCache = class FileDownloadCache {
    constructor() {
        this.downloads = new Map();
        this.expireTimeInMinutes = 1;
    }
    addDownload(id, downloadInfo) {
        downloadInfo.file = encodeURIComponent(downloadInfo.file);
        if (downloadInfo.root) {
            downloadInfo.root = encodeURIComponent(downloadInfo.root);
        }
        // expires in 1 minute enough for parallel connections to be connected.
        downloadInfo.expire = Date.now() + (this.expireTimeInMinutes * 600000);
        this.downloads.set(id, downloadInfo);
    }
    getDownload(id) {
        this.expireDownloads();
        const downloadInfo = this.downloads.get(id);
        if (downloadInfo) {
            downloadInfo.file = decodeURIComponent(downloadInfo.file);
            if (downloadInfo.root) {
                downloadInfo.root = decodeURIComponent(downloadInfo.root);
            }
        }
        return downloadInfo;
    }
    deleteDownload(id) {
        const downloadInfo = this.downloads.get(id);
        if (downloadInfo && downloadInfo.remove) {
            this.deleteRecursively(downloadInfo.root || downloadInfo.file);
        }
        this.downloads.delete(id);
    }
    values() {
        this.expireDownloads();
        return [...this.downloads.entries()].reduce((downloads, [key, value]) => ({ ...downloads, [key]: value }), {});
    }
    deleteRecursively(pathToDelete) {
        (0, rimraf_1.rimraf)(pathToDelete).catch(error => {
            this.logger.warn(`An error occurred while deleting the temporary data from the disk. Cannot clean up: ${pathToDelete}.`, error);
        });
    }
    expireDownloads() {
        const time = Date.now();
        for (const [id, download] of this.downloads.entries()) {
            if (download.expire && download.expire <= time) {
                this.deleteDownload(id);
            }
        }
    }
};
exports.FileDownloadCache = FileDownloadCache;
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], FileDownloadCache.prototype, "logger", void 0);
exports.FileDownloadCache = FileDownloadCache = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileDownloadCache);
//# sourceMappingURL=file-download-cache.js.map