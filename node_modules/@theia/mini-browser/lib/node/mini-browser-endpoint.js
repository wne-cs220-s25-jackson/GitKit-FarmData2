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
exports.SvgHandler = exports.PdfHandler = exports.ImageHandler = exports.HtmlHandler = exports.MiniBrowserEndpoint = exports.MiniBrowserEndpointHandler = void 0;
const tslib_1 = require("tslib");
const vhost = require('vhost');
const express = require("@theia/core/shared/express");
const fs = require("@theia/core/shared/fs-extra");
const mime_types_1 = require("mime-types");
const inversify_1 = require("@theia/core/shared/inversify");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
const logger_1 = require("@theia/core/lib/common/logger");
const contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
const mini_browser_endpoint_1 = require("../common/mini-browser-endpoint");
/**
 * Endpoint handler contribution for the `MiniBrowserEndpoint`.
 */
exports.MiniBrowserEndpointHandler = Symbol('MiniBrowserEndpointHandler');
let MiniBrowserEndpoint = class MiniBrowserEndpoint {
    constructor() {
        this.handlers = new Map();
    }
    configure(app) {
        this.attachRequestHandlerPromise = this.attachRequestHandler(app);
    }
    async onStart() {
        await Promise.all(Array.from(this.getContributions(), async (handler) => {
            const extensions = await handler.supportedExtensions();
            for (const extension of (Array.isArray(extensions) ? extensions : [extensions]).map(e => e.toLocaleLowerCase())) {
                const existingHandler = this.handlers.get(extension);
                if (!existingHandler || handler.priority > existingHandler.priority) {
                    this.handlers.set(extension, handler);
                }
            }
        }));
        await this.attachRequestHandlerPromise;
    }
    async supportedFileExtensions() {
        return Array.from(this.handlers.entries(), ([extension, handler]) => ({ extension, priority: handler.priority() }));
    }
    async attachRequestHandler(app) {
        const miniBrowserApp = express();
        miniBrowserApp.get('*', async (request, response) => this.response(await this.getUri(request), response));
        app.use(mini_browser_endpoint_1.MiniBrowserEndpoint.PATH, vhost(await this.getVirtualHostRegExp(), miniBrowserApp));
    }
    async response(uri, response) {
        const exists = await fs.pathExists(file_uri_1.FileUri.fsPath(uri));
        if (!exists) {
            return this.missingResourceHandler()(uri, response);
        }
        const statWithContent = await this.readContent(uri);
        try {
            if (!statWithContent.stat.isDirectory()) {
                const extension = uri.split('.').pop();
                if (!extension) {
                    return this.defaultHandler()(statWithContent, response);
                }
                const handler = this.handlers.get(extension.toString().toLocaleLowerCase());
                if (!handler) {
                    return this.defaultHandler()(statWithContent, response);
                }
                return handler.respond(statWithContent, response);
            }
        }
        catch (e) {
            return this.errorHandler()(e, uri, response);
        }
        return this.defaultHandler()(statWithContent, response);
    }
    getContributions() {
        return this.contributions.getContributions();
    }
    getUri(request) {
        return file_uri_1.FileUri.create(request.path).toString(true);
    }
    async readContent(uri) {
        const fsPath = file_uri_1.FileUri.fsPath(uri);
        const [stat, content] = await Promise.all([fs.stat(fsPath), fs.readFile(fsPath, 'utf8')]);
        return { stat: Object.assign(stat, { uri }), content };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorHandler() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return async (error, uri, response) => {
            const details = error.toString ? error.toString() : error;
            this.logger.error(`Error occurred while handling request for ${uri}. Details: ${details}`);
            if (error instanceof Error) {
                let message = error.message;
                if (error.stack) {
                    message += `\n${error.stack}`;
                }
                this.logger.error(message);
            }
            else if (typeof error === 'string') {
                this.logger.error(error);
            }
            else {
                this.logger.error(`${error}`);
            }
            return response.send(500);
        };
    }
    missingResourceHandler() {
        return async (uri, response) => {
            this.logger.error(`Cannot handle missing resource. URI: ${uri}.`);
            return response.sendStatus(404);
        };
    }
    defaultHandler() {
        return async (statWithContent, response) => {
            const { content } = statWithContent;
            const mimeType = (0, mime_types_1.lookup)(file_uri_1.FileUri.fsPath(statWithContent.stat.uri));
            if (!mimeType) {
                this.logger.warn(`Cannot handle unexpected resource. URI: ${statWithContent.stat.uri}.`);
                response.contentType('application/octet-stream');
            }
            else {
                response.contentType(mimeType);
            }
            return response.send(content);
        };
    }
    async getVirtualHostRegExp() {
        const pattern = process.env[mini_browser_endpoint_1.MiniBrowserEndpoint.HOST_PATTERN_ENV] || mini_browser_endpoint_1.MiniBrowserEndpoint.HOST_PATTERN_DEFAULT;
        const vhostRe = pattern
            .replace(/\./g, '\\.')
            .replace('{{uuid}}', '.+')
            .replace('{{hostname}}', '.+');
        return new RegExp(vhostRe, 'i');
    }
};
exports.MiniBrowserEndpoint = MiniBrowserEndpoint;
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], MiniBrowserEndpoint.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(contribution_provider_1.ContributionProvider),
    (0, inversify_1.named)(exports.MiniBrowserEndpointHandler),
    tslib_1.__metadata("design:type", Object)
], MiniBrowserEndpoint.prototype, "contributions", void 0);
exports.MiniBrowserEndpoint = MiniBrowserEndpoint = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MiniBrowserEndpoint);
// See `EditorManager#canHandle`.
const CODE_EDITOR_PRIORITY = 100;
/**
 * Endpoint handler contribution for HTML files.
 */
let HtmlHandler = class HtmlHandler {
    supportedExtensions() {
        return ['html', 'xhtml', 'htm'];
    }
    priority() {
        // Prefer Code Editor over Mini Browser
        // https://github.com/eclipse-theia/theia/issues/2051
        return 1;
    }
    respond(statWithContent, response) {
        response.contentType('text/html');
        return response.send(statWithContent.content);
    }
};
exports.HtmlHandler = HtmlHandler;
exports.HtmlHandler = HtmlHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HtmlHandler);
/**
 * Handler for JPG resources.
 */
let ImageHandler = class ImageHandler {
    supportedExtensions() {
        return ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    }
    priority() {
        return CODE_EDITOR_PRIORITY + 1;
    }
    respond(statWithContent, response) {
        fs.readFile(file_uri_1.FileUri.fsPath(statWithContent.stat.uri), (error, data) => {
            if (error) {
                throw error;
            }
            response.contentType('image/jpeg');
            response.send(data);
        });
        return response;
    }
};
exports.ImageHandler = ImageHandler;
exports.ImageHandler = ImageHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ImageHandler);
/**
 * PDF endpoint handler.
 */
let PdfHandler = class PdfHandler {
    supportedExtensions() {
        return 'pdf';
    }
    priority() {
        return CODE_EDITOR_PRIORITY + 1;
    }
    respond(statWithContent, response) {
        // https://stackoverflow.com/questions/11598274/display-pdf-in-browser-using-express-js
        const encodeRFC5987ValueChars = (input) => encodeURIComponent(input).
            // Note that although RFC3986 reserves "!", RFC5987 does not, so we do not need to escape it.
            replace(/['()]/g, escape). // i.e., %27 %28 %29
            replace(/\*/g, '%2A').
            // The following are not required for percent-encoding per RFC5987, so we can allow for a little better readability over the wire: |`^.
            replace(/%(?:7C|60|5E)/g, unescape);
        const fileName = file_uri_1.FileUri.create(statWithContent.stat.uri).path.base;
        fs.readFile(file_uri_1.FileUri.fsPath(statWithContent.stat.uri), (error, data) => {
            if (error) {
                throw error;
            }
            // Change `inline` to `attachment` if you would like to force downloading the PDF instead of previewing in the browser.
            response.setHeader('Content-disposition', `inline; filename*=UTF-8''${encodeRFC5987ValueChars(fileName)}`);
            response.contentType('application/pdf');
            response.send(data);
        });
        return response;
    }
};
exports.PdfHandler = PdfHandler;
exports.PdfHandler = PdfHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PdfHandler);
/**
 * Endpoint contribution for SVG resources.
 */
let SvgHandler = class SvgHandler {
    supportedExtensions() {
        return 'svg';
    }
    priority() {
        return 1;
    }
    respond(statWithContent, response) {
        response.contentType('image/svg+xml');
        return response.send(statWithContent.content);
    }
};
exports.SvgHandler = SvgHandler;
exports.SvgHandler = SvgHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SvgHandler);
//# sourceMappingURL=mini-browser-endpoint.js.map