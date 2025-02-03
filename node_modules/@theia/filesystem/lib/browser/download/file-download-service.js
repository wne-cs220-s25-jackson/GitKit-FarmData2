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
exports.FileDownloadService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const logger_1 = require("@theia/core/lib/common/logger");
const endpoint_1 = require("@theia/core/lib/browser/endpoint");
const message_service_1 = require("@theia/core/lib/common/message-service");
const widgets_1 = require("@theia/core/lib/browser/widgets");
const core_1 = require("@theia/core");
let FileDownloadService = class FileDownloadService {
    constructor() {
        this.downloadCounter = 0;
    }
    handleCopy(event, downloadUrl) {
        if (downloadUrl && event.clipboardData) {
            event.clipboardData.setData('text/plain', downloadUrl);
            event.preventDefault();
            this.messageService.info(core_1.nls.localize('theia/filesystem/copiedToClipboard', 'Copied the download link to the clipboard.'));
        }
    }
    async cancelDownload(id) {
        await fetch(`${this.endpoint()}/download/?id=${id}&cancel=true`);
    }
    async download(uris, options) {
        let cancel = false;
        if (uris.length === 0) {
            return;
        }
        const copyLink = options && options.copyLink ? true : false;
        try {
            const text = copyLink ?
                core_1.nls.localize('theia/filesystem/prepareDownloadLink', 'Preparing download link...') :
                core_1.nls.localize('theia/filesystem/prepareDownload', 'Preparing download...');
            const [progress, result] = await Promise.all([
                this.messageService.showProgress({
                    text: text,
                    options: { cancelable: true }
                }, () => { cancel = true; }),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                new Promise(async (resolve) => {
                    const resp = await fetch(this.request(uris));
                    const jsonResp = await resp.json();
                    resolve({ response: resp, jsonResponse: jsonResp });
                })
            ]);
            const { response, jsonResponse } = result;
            if (cancel) {
                this.cancelDownload(jsonResponse.id);
                return;
            }
            const { status, statusText } = response;
            if (status === 200) {
                progress.cancel();
                const downloadUrl = `${this.endpoint()}/download/?id=${jsonResponse.id}`;
                if (copyLink) {
                    if (document.documentElement) {
                        const toDispose = (0, widgets_1.addClipboardListener)(document.documentElement, 'copy', e => {
                            toDispose.dispose();
                            this.handleCopy(e, downloadUrl);
                        });
                        document.execCommand('copy');
                    }
                }
                else {
                    this.forceDownload(jsonResponse.id, decodeURIComponent(jsonResponse.name));
                }
            }
            else {
                throw new Error(`Received unexpected status code: ${status}. [${statusText}]`);
            }
        }
        catch (e) {
            this.logger.error(`Error occurred when downloading: ${uris.map(u => u.toString(true))}.`, e);
        }
    }
    async forceDownload(id, title) {
        let url;
        try {
            if (this.anchor === undefined) {
                this.anchor = document.createElement('a');
            }
            const endpoint = this.endpoint();
            url = `${endpoint}/download/?id=${id}`;
            this.anchor.href = url;
            this.anchor.style.display = 'none';
            this.anchor.download = title;
            document.body.appendChild(this.anchor);
            this.anchor.click();
        }
        finally {
            // make sure anchor is removed from parent
            if (this.anchor && this.anchor.parentNode) {
                this.anchor.parentNode.removeChild(this.anchor);
            }
            if (url) {
                URL.revokeObjectURL(url);
            }
        }
    }
    request(uris) {
        const url = this.url(uris);
        const init = this.requestInit(uris);
        return new Request(url, init);
    }
    requestInit(uris) {
        if (uris.length === 1) {
            return {
                body: undefined,
                method: 'GET'
            };
        }
        return {
            method: 'PUT',
            body: JSON.stringify(this.body(uris)),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        };
    }
    body(uris) {
        return {
            uris: uris.map(u => u.toString(true))
        };
    }
    url(uris) {
        const endpoint = this.endpoint();
        if (uris.length === 1) {
            // tslint:disable-next-line:whitespace
            const [uri,] = uris;
            return `${endpoint}/?uri=${uri.toString()}`;
        }
        return endpoint;
    }
    endpoint() {
        const url = this.filesUrl();
        return url.endsWith('/') ? url.slice(0, -1) : url;
    }
    filesUrl() {
        return new endpoint_1.Endpoint({ path: 'files' }).getRestUrl().toString();
    }
};
exports.FileDownloadService = FileDownloadService;
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], FileDownloadService.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], FileDownloadService.prototype, "messageService", void 0);
exports.FileDownloadService = FileDownloadService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileDownloadService);
//# sourceMappingURL=file-download-service.js.map