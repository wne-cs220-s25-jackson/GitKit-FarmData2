"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
exports.TaskContextKeyService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
const application_protocol_1 = require("@theia/core/lib/common/application-protocol");
let TaskContextKeyService = class TaskContextKeyService {
    init() {
        this.customExecutionSupported = this.contextKeyService.createKey('customExecutionSupported', true);
        this.shellExecutionSupported = this.contextKeyService.createKey('shellExecutionSupported', true);
        this.processExecutionSupported = this.contextKeyService.createKey('processExecutionSupported', true);
        this.serverlessWebContext = this.contextKeyService.createKey('serverlessWebContext', false);
        this.taskCommandsRegistered = this.contextKeyService.createKey('taskCommandsRegistered', true);
        this.applicationServer.getApplicationPlatform().then(platform => {
            if (platform === 'web') {
                this.setShellExecutionSupported(false);
                this.setProcessExecutionSupported(false);
                this.setServerlessWebContext(true);
            }
        });
    }
    setCustomExecutionSupported(customExecutionSupported) {
        this.customExecutionSupported.set(customExecutionSupported);
    }
    setShellExecutionSupported(shellExecutionSupported) {
        this.shellExecutionSupported.set(shellExecutionSupported);
    }
    setProcessExecutionSupported(processExecutionSupported) {
        this.processExecutionSupported.set(processExecutionSupported);
    }
    setServerlessWebContext(serverlessWebContext) {
        this.serverlessWebContext.set(serverlessWebContext);
    }
    setTaskCommandsRegistered(taskCommandsRegistered) {
        this.taskCommandsRegistered.set(taskCommandsRegistered);
    }
};
exports.TaskContextKeyService = TaskContextKeyService;
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], TaskContextKeyService.prototype, "contextKeyService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(application_protocol_1.ApplicationServer),
    tslib_1.__metadata("design:type", Object)
], TaskContextKeyService.prototype, "applicationServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TaskContextKeyService.prototype, "init", null);
exports.TaskContextKeyService = TaskContextKeyService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TaskContextKeyService);
//# sourceMappingURL=task-context-key-service.js.map