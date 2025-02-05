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
exports.MonacoCommandService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const command_1 = require("@theia/core/lib/common/command");
const event_1 = require("@theia/core/lib/common/event");
const disposable_1 = require("@theia/core/lib/common/disposable");
const standaloneServices_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices");
const instantiation_1 = require("@theia/monaco-editor-core/esm/vs/platform/instantiation/common/instantiation");
let MonacoCommandService = class MonacoCommandService {
    constructor(commandRegistry) {
        this.commandRegistry = commandRegistry;
        this.onWillExecuteCommandEmitter = new event_1.Emitter();
        this.onDidExecuteCommandEmitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection(this.onWillExecuteCommandEmitter, this.onDidExecuteCommandEmitter);
        this.toDispose.push(this.commandRegistry.onWillExecuteCommand(e => this.onWillExecuteCommandEmitter.fire(e)));
        this.toDispose.push(this.commandRegistry.onDidExecuteCommand(e => this.onDidExecuteCommandEmitter.fire(e)));
    }
    init() {
        this.delegate = new standaloneServices_1.StandaloneCommandService(standaloneServices_1.StandaloneServices.get(instantiation_1.IInstantiationService));
        if (this.delegate) {
            this.toDispose.push(this.delegate.onWillExecuteCommand(event => this.onWillExecuteCommandEmitter.fire(event)));
            this.toDispose.push(this.delegate.onDidExecuteCommand(event => this.onDidExecuteCommandEmitter.fire(event)));
        }
    }
    dispose() {
        this.toDispose.dispose();
    }
    get onWillExecuteCommand() {
        return this.onWillExecuteCommandEmitter.event;
    }
    get onDidExecuteCommand() {
        return this.onDidExecuteCommandEmitter.event;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async executeCommand(commandId, ...args) {
        try {
            await this.commandRegistry.executeCommand(commandId, ...args);
        }
        catch (e) {
            if (e.code === 'NO_ACTIVE_HANDLER') {
                return this.executeMonacoCommand(commandId, ...args);
            }
            throw e;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async executeMonacoCommand(commandId, ...args) {
        if (this.delegate) {
            return this.delegate.executeCommand(commandId, ...args);
        }
        throw new Error(`command '${commandId}' not found`);
    }
};
exports.MonacoCommandService = MonacoCommandService;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonacoCommandService.prototype, "init", null);
exports.MonacoCommandService = MonacoCommandService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(command_1.CommandRegistry)),
    tslib_1.__metadata("design:paramtypes", [command_1.CommandRegistry])
], MonacoCommandService);
//# sourceMappingURL=monaco-command-service.js.map