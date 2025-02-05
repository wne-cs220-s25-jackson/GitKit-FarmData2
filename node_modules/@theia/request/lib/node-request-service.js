"use strict";
/********************************************************************************
 * Copyright (C) 2022 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRequestService = void 0;
const http = require("http");
const https = require("https");
const proxy_1 = require("./proxy");
const zlib_1 = require("zlib");
;
class NodeRequestService {
    getNodeRequest(options) {
        const endpoint = new URL(options.url);
        const module = endpoint.protocol === 'https:' ? https : http;
        return module.request;
    }
    async getProxyUrl(url) {
        return this.proxyUrl;
    }
    async configure(config) {
        if (config.proxyUrl !== undefined) {
            this.proxyUrl = config.proxyUrl;
        }
        if (config.strictSSL !== undefined) {
            this.strictSSL = config.strictSSL;
        }
        if (config.proxyAuthorization !== undefined) {
            this.authorization = config.proxyAuthorization;
        }
    }
    async processOptions(options) {
        var _a;
        const { strictSSL } = this;
        options.strictSSL = (_a = options.strictSSL) !== null && _a !== void 0 ? _a : strictSSL;
        const agent = options.agent ? options.agent : (0, proxy_1.getProxyAgent)(options.url || '', process.env, {
            proxyUrl: await this.getProxyUrl(options.url),
            strictSSL: options.strictSSL
        });
        options.agent = agent;
        const authorization = options.proxyAuthorization || this.authorization;
        if (authorization) {
            options.headers = {
                ...(options.headers || {}),
                'Proxy-Authorization': authorization
            };
        }
        options.headers = {
            'Accept-Encoding': 'gzip',
            ...(options.headers || {}),
        };
        return options;
    }
    request(options, token) {
        return new Promise(async (resolve, reject) => {
            options = await this.processOptions(options);
            const endpoint = new URL(options.url);
            const rawRequest = options.getRawRequest
                ? options.getRawRequest(options)
                : this.getNodeRequest(options);
            const opts = {
                hostname: endpoint.hostname,
                port: endpoint.port ? parseInt(endpoint.port) : (endpoint.protocol === 'https:' ? 443 : 80),
                protocol: endpoint.protocol,
                path: endpoint.pathname + endpoint.search,
                method: options.type || 'GET',
                headers: options.headers,
                agent: options.agent,
                rejectUnauthorized: !!options.strictSSL
            };
            if (options.user && options.password) {
                opts.auth = options.user + ':' + options.password;
            }
            const timeoutHandler = () => {
                reject('timeout');
            };
            const req = rawRequest(opts, async (res) => {
                var _a;
                const followRedirects = (_a = options.followRedirects) !== null && _a !== void 0 ? _a : 3;
                if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && followRedirects > 0 && res.headers.location) {
                    req.off('timeout', timeoutHandler);
                    this.request({
                        ...options,
                        url: res.headers.location,
                        followRedirects: followRedirects - 1
                    }, token).then(resolve, reject);
                }
                else {
                    const chunks = [];
                    const stream = res.headers['content-encoding'] === 'gzip' ? res.pipe((0, zlib_1.createGunzip)()) : res;
                    stream.on('data', chunk => {
                        chunks.push(chunk);
                    });
                    stream.on('end', () => {
                        req.off('timeout', timeoutHandler);
                        const buffer = Buffer.concat(chunks);
                        resolve({
                            url: options.url,
                            res: {
                                headers: res.headers,
                                statusCode: res.statusCode
                            },
                            buffer
                        });
                    });
                    stream.on('error', err => {
                        reject(err);
                    });
                }
            });
            req.on('error', err => {
                reject(err);
            });
            req.on('timeout', timeoutHandler);
            if (options.timeout) {
                req.setTimeout(options.timeout);
            }
            if (options.data) {
                req.write(options.data);
            }
            req.end();
            token === null || token === void 0 ? void 0 : token.onCancellationRequested(() => {
                req.destroy();
                reject();
            });
        });
    }
    async resolveProxy(url) {
        return undefined;
    }
}
exports.NodeRequestService = NodeRequestService;
//# sourceMappingURL=node-request-service.js.map