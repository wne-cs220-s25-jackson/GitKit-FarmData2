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
var FileDownloadEndpoint_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDownloadEndpoint = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const url = require("url");
const inversify_1 = require("@theia/core/shared/inversify");
const body_parser_1 = require("body-parser");
const express_1 = require("@theia/core/shared/express");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
const file_download_handler_1 = require("./file-download-handler");
let FileDownloadEndpoint = FileDownloadEndpoint_1 = class FileDownloadEndpoint {
    configure(app) {
        const router = (0, express_1.Router)();
        router.get('/download', (request, response) => this.downloadLinkHandler.handle(request, response));
        router.get('/', (request, response) => this.singleFileDownloadHandler.handle(request, response));
        router.put('/', (request, response) => this.multiFileDownloadHandler.handle(request, response));
        // Content-Type: application/json
        app.use((0, body_parser_1.json)());
        app.use(FileDownloadEndpoint_1.PATH, router);
        app.get('/file', (request, response) => {
            const uri = url.parse(request.url).query;
            if (!uri) {
                response.status(400).send('invalid uri');
                return;
            }
            const fsPath = file_uri_1.FileUri.fsPath(decodeURIComponent(uri));
            response.sendFile(fsPath);
        });
    }
};
exports.FileDownloadEndpoint = FileDownloadEndpoint;
FileDownloadEndpoint.PATH = '/files';
tslib_1.__decorate([
    (0, inversify_1.inject)(file_download_handler_1.FileDownloadHandler),
    (0, inversify_1.named)(file_download_handler_1.FileDownloadHandler.SINGLE),
    tslib_1.__metadata("design:type", file_download_handler_1.FileDownloadHandler)
], FileDownloadEndpoint.prototype, "singleFileDownloadHandler", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_download_handler_1.FileDownloadHandler),
    (0, inversify_1.named)(file_download_handler_1.FileDownloadHandler.MULTI),
    tslib_1.__metadata("design:type", file_download_handler_1.FileDownloadHandler)
], FileDownloadEndpoint.prototype, "multiFileDownloadHandler", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_download_handler_1.FileDownloadHandler),
    (0, inversify_1.named)(file_download_handler_1.FileDownloadHandler.DOWNLOAD_LINK),
    tslib_1.__metadata("design:type", file_download_handler_1.FileDownloadHandler)
], FileDownloadEndpoint.prototype, "downloadLinkHandler", void 0);
exports.FileDownloadEndpoint = FileDownloadEndpoint = FileDownloadEndpoint_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileDownloadEndpoint);
//# sourceMappingURL=file-download-endpoint.js.map