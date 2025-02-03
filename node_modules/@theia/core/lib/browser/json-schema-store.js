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
exports.DefaultJsonSchemaContribution = exports.JsonSchemaDataStore = exports.JsonSchemaStore = exports.JsonSchemaContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const contribution_provider_1 = require("../common/contribution-provider");
const common_1 = require("../common");
const promise_util_1 = require("../common/promise-util");
exports.JsonSchemaContribution = Symbol('JsonSchemaContribution');
let JsonSchemaStore = class JsonSchemaStore {
    constructor() {
        this._schemas = new promise_util_1.Deferred();
    }
    get schemas() {
        return this._schemas.promise;
    }
    onStart() {
        const pendingRegistrations = [];
        const schemas = [];
        const freeze = () => {
            Object.freeze(schemas);
            this._schemas.resolve(schemas);
        };
        const registerTimeout = this.getRegisterTimeout();
        const frozenErrorCode = 'JsonSchemaRegisterContext.frozen';
        const context = {
            registerSchema: schema => {
                if (Object.isFrozen(schemas)) {
                    throw new Error(frozenErrorCode);
                }
                schemas.push(schema);
            }
        };
        for (const contribution of this.contributions.getContributions()) {
            const result = contribution.registerSchemas(context);
            if (result) {
                pendingRegistrations.push(result.then(() => { }, e => {
                    if (e instanceof Error && e.message === frozenErrorCode) {
                        console.error(`${contribution.constructor.name}.registerSchemas is taking more than ${registerTimeout.toFixed(1)} ms, new schemas are ignored.`);
                    }
                    else {
                        console.error(e);
                    }
                }));
            }
        }
        if (pendingRegistrations.length) {
            let pending = Promise.all(pendingRegistrations).then(() => { });
            if (registerTimeout) {
                pending = Promise.race([pending, (0, promise_util_1.timeout)(registerTimeout)]);
            }
            pending.then(freeze);
        }
        else {
            freeze();
        }
    }
    getRegisterTimeout() {
        return 500;
    }
};
exports.JsonSchemaStore = JsonSchemaStore;
tslib_1.__decorate([
    (0, inversify_1.inject)(contribution_provider_1.ContributionProvider),
    (0, inversify_1.named)(exports.JsonSchemaContribution),
    tslib_1.__metadata("design:type", Object)
], JsonSchemaStore.prototype, "contributions", void 0);
exports.JsonSchemaStore = JsonSchemaStore = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], JsonSchemaStore);
let JsonSchemaDataStore = class JsonSchemaDataStore {
    constructor() {
        this._schemas = new Map();
        this.onDidSchemaUpdateEmitter = new common_1.Emitter();
        this.onDidSchemaUpdate = this.onDidSchemaUpdateEmitter.event;
    }
    hasSchema(uri) {
        return this._schemas.has(uri.toString());
    }
    getSchema(uri) {
        return this._schemas.get(uri.toString());
    }
    setSchema(uri, schema) {
        this._schemas.set(uri.toString(), typeof schema === 'string' ? schema : JSON.stringify(schema));
        this.notifySchemaUpdate(uri);
    }
    deleteSchema(uri) {
        if (this._schemas.delete(uri.toString())) {
            this.notifySchemaUpdate(uri);
        }
    }
    notifySchemaUpdate(uri) {
        this.onDidSchemaUpdateEmitter.fire(uri);
    }
};
exports.JsonSchemaDataStore = JsonSchemaDataStore;
exports.JsonSchemaDataStore = JsonSchemaDataStore = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], JsonSchemaDataStore);
let DefaultJsonSchemaContribution = class DefaultJsonSchemaContribution {
    async registerSchemas(context) {
        const catalog = require('./catalog.json');
        for (const s of catalog.schemas) {
            if (s.fileMatch) {
                context.registerSchema({
                    fileMatch: s.fileMatch,
                    url: s.url
                });
            }
        }
    }
};
exports.DefaultJsonSchemaContribution = DefaultJsonSchemaContribution;
exports.DefaultJsonSchemaContribution = DefaultJsonSchemaContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultJsonSchemaContribution);
//# sourceMappingURL=json-schema-store.js.map