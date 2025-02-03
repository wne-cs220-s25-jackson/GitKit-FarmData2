"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.ScmService = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = require("@theia/core/lib/common");
const inversify_1 = require("@theia/core/shared/inversify");
const scm_context_key_service_1 = require("./scm-context-key-service");
const scm_repository_1 = require("./scm-repository");
const uri_1 = require("@theia/core/lib/common/uri");
let ScmService = class ScmService {
    constructor() {
        this._repositories = new Map();
        this.onDidChangeSelectedRepositoryEmitter = new common_1.Emitter();
        this.onDidChangeSelectedRepository = this.onDidChangeSelectedRepositoryEmitter.event;
        this.onDidAddRepositoryEmitter = new common_1.Emitter();
        this.onDidAddRepository = this.onDidAddRepositoryEmitter.event;
        this.onDidRemoveRepositoryEmitter = new common_1.Emitter();
        this.onDidRemoveRepository = this.onDidAddRepositoryEmitter.event;
        this.onDidChangeStatusBarCommandsEmitter = new common_1.Emitter();
        this.onDidChangeStatusBarCommands = this.onDidChangeStatusBarCommandsEmitter.event;
        this.toDisposeOnSelected = new common_1.DisposableCollection();
    }
    fireDidChangeStatusBarCommands() {
        this.onDidChangeStatusBarCommandsEmitter.fire(this.statusBarCommands);
    }
    get statusBarCommands() {
        const repository = this.selectedRepository;
        return repository && repository.provider.statusBarCommands || [];
    }
    get repositories() {
        return [...this._repositories.values()];
    }
    get selectedRepository() {
        return this._selectedRepository;
    }
    set selectedRepository(repository) {
        if (this._selectedRepository === repository) {
            return;
        }
        this.toDisposeOnSelected.dispose();
        this._selectedRepository = repository;
        if (this._selectedRepository) {
            if (this._selectedRepository.provider.onDidChangeStatusBarCommands) {
                this.toDisposeOnSelected.push(this._selectedRepository.provider.onDidChangeStatusBarCommands(() => this.fireDidChangeStatusBarCommands()));
            }
        }
        this.onDidChangeSelectedRepositoryEmitter.fire(this._selectedRepository);
        this.fireDidChangeStatusBarCommands();
    }
    findRepository(uri) {
        const reposSorted = this.repositories.sort((ra, rb) => rb.provider.rootUri.length - ra.provider.rootUri.length);
        return reposSorted.find(repo => new uri_1.default(repo.provider.rootUri).isEqualOrParent(uri));
    }
    registerScmProvider(provider, options = {}) {
        const key = provider.id + ':' + provider.rootUri;
        if (this._repositories.has(key)) {
            throw new Error(`${provider.label} provider for '${provider.rootUri}' already exists.`);
        }
        const repository = new scm_repository_1.ScmRepository(provider, options);
        const dispose = repository.dispose;
        repository.dispose = () => {
            this._repositories.delete(key);
            dispose.bind(repository)();
            this.onDidRemoveRepositoryEmitter.fire(repository);
            if (this._selectedRepository === repository) {
                this.selectedRepository = this._repositories.values().next().value;
            }
        };
        this._repositories.set(key, repository);
        this.onDidAddRepositoryEmitter.fire(repository);
        if (this._repositories.size === 1) {
            this.selectedRepository = repository;
        }
        return repository;
    }
};
exports.ScmService = ScmService;
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_context_key_service_1.ScmContextKeyService),
    tslib_1.__metadata("design:type", scm_context_key_service_1.ScmContextKeyService)
], ScmService.prototype, "contextKeys", void 0);
exports.ScmService = ScmService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ScmService);
//# sourceMappingURL=scm-service.js.map