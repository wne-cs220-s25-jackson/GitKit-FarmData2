"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
exports.workspaceSchema = exports.workspaceSchemaId = exports.WorkspaceSchema = exports.WorkspaceSchemaUpdater = exports.AddKeyMessage = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const json_schema_store_1 = require("@theia/core/lib/browser/json-schema-store");
const common_1 = require("@theia/core/lib/common");
const uri_1 = require("@theia/core/lib/common/uri");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const common_2 = require("../common");
var AddKeyMessage;
(function (AddKeyMessage) {
    AddKeyMessage.is = (message) => !!message && message.schema !== undefined;
})(AddKeyMessage || (exports.AddKeyMessage = AddKeyMessage = {}));
let WorkspaceSchemaUpdater = class WorkspaceSchemaUpdater {
    constructor() {
        this.uri = new uri_1.default(exports.workspaceSchemaId);
        this.editQueue = [];
        this.safeToHandleQueue = new promise_util_1.Deferred();
    }
    init() {
        this.jsonSchemaData.setSchema(this.uri, exports.workspaceSchema);
        this.safeToHandleQueue.resolve();
    }
    registerSchemas(context) {
        context.registerSchema({
            fileMatch: this.workspaceFileService.getWorkspaceFileExtensions(true),
            url: this.uri.toString()
        });
    }
    async retrieveCurrent() {
        const current = this.jsonSchemaData.getSchema(this.uri);
        const content = JSON.parse(current || '');
        if (!WorkspaceSchema.is(content)) {
            throw new Error('Failed to retrieve current workspace schema.');
        }
        return content;
    }
    async updateSchema(message) {
        const doHandle = this.editQueue.length === 0;
        const deferred = new promise_util_1.Deferred();
        this.editQueue.push({ ...message, deferred });
        if (doHandle) {
            this.handleQueue();
        }
        return deferred.promise;
    }
    async handleQueue() {
        await this.safeToHandleQueue.promise;
        this.safeToHandleQueue = new promise_util_1.Deferred();
        const cache = await this.retrieveCurrent();
        while (this.editQueue.length) {
            const nextMessage = this.editQueue.shift();
            if (AddKeyMessage.is(nextMessage)) {
                this.addKey(nextMessage, cache);
            }
            else if (nextMessage) {
                this.removeKey(nextMessage, cache);
            }
        }
        this.jsonSchemaData.setSchema(this.uri, cache);
        this.safeToHandleQueue.resolve();
    }
    addKey({ key, schema, deferred }, cache) {
        if (key in cache.properties) {
            return deferred.resolve(false);
        }
        cache.properties[key] = schema;
        deferred.resolve(true);
    }
    removeKey({ key, deferred }, cache) {
        const canDelete = !cache.required.includes(key);
        if (!canDelete) {
            return deferred.resolve(false);
        }
        const keyPresent = delete cache.properties[key];
        deferred.resolve(keyPresent);
    }
};
exports.WorkspaceSchemaUpdater = WorkspaceSchemaUpdater;
tslib_1.__decorate([
    (0, inversify_1.inject)(json_schema_store_1.JsonSchemaDataStore),
    tslib_1.__metadata("design:type", json_schema_store_1.JsonSchemaDataStore)
], WorkspaceSchemaUpdater.prototype, "jsonSchemaData", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_2.WorkspaceFileService),
    tslib_1.__metadata("design:type", common_2.WorkspaceFileService)
], WorkspaceSchemaUpdater.prototype, "workspaceFileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], WorkspaceSchemaUpdater.prototype, "init", null);
exports.WorkspaceSchemaUpdater = WorkspaceSchemaUpdater = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WorkspaceSchemaUpdater);
var WorkspaceSchema;
(function (WorkspaceSchema) {
    function is(candidate) {
        return (0, common_1.isObject)(candidate)
            && typeof candidate.properties === 'object'
            && (0, common_1.isArray)(candidate.required);
    }
    WorkspaceSchema.is = is;
})(WorkspaceSchema || (exports.WorkspaceSchema = WorkspaceSchema = {}));
exports.workspaceSchemaId = 'vscode://schemas/workspace';
exports.workspaceSchema = {
    $id: exports.workspaceSchemaId,
    type: 'object',
    title: 'Workspace File',
    required: ['folders'],
    default: { folders: [{ path: '' }], settings: {} },
    properties: {
        folders: {
            description: 'Root folders in the workspace',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                    }
                },
                required: ['path']
            }
        }
    },
    allowComments: true,
    allowTrailingCommas: true,
};
//# sourceMappingURL=workspace-schema-updater.js.map