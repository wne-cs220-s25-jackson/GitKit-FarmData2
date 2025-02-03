"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.TaskProviderRegistry = exports.TaskResolverRegistry = exports.TaskContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const event_1 = require("@theia/core/lib/common/event");
exports.TaskContribution = Symbol('TaskContribution');
/**
 * The {@link TaskResolverRegistry} is the common component for registration and provision of
 * {@link TaskResolver}s. Theia will collect all {@link TaskContribution}s and invoke {@link TaskContribution#registerResolvers}
 * for each contribution.
 */
let TaskResolverRegistry = class TaskResolverRegistry {
    constructor() {
        this.onWillProvideTaskResolverEmitter = new event_1.Emitter();
        /**
         * Emit when the registry provides a registered resolver. i.e. when the {@link TaskResolverRegistry#getResolver}
         * function is called.
         */
        this.onWillProvideTaskResolver = this.onWillProvideTaskResolverEmitter.event;
        this.taskResolvers = new Map();
        this.executionResolvers = new Map();
    }
    /**
     * Registers the given {@link TaskResolver} to resolve the `TaskConfiguration` of the specified type.
     * If there is already a `TaskResolver` registered for the specified type the registration will
     * be overwritten with the new value.
     *
     * @deprecated since 1.12.0 use `registerTaskResolver` instead.
     *
     * @param type the task configuration type for which the given resolver should be registered.
     * @param resolver the task resolver that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver
     */
    register(type, resolver) {
        return this.registerTaskResolver(type, resolver);
    }
    /**
     * Registers the given {@link TaskResolver} to resolve the `TaskConfiguration` of the specified type.
     * If there is already a `TaskResolver` registered for the specified type the registration will
     * be overwritten with the new value.
     *
     * @param type the task configuration type for which the given resolver should be registered.
     * @param resolver the task resolver that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver
     */
    registerTaskResolver(type, resolver) {
        if (this.taskResolvers.has(type)) {
            console.warn(`Overriding task resolver for ${type}`);
        }
        this.taskResolvers.set(type, resolver);
        return {
            dispose: () => this.taskResolvers.delete(type)
        };
    }
    /**
     * Retrieves the {@link TaskResolver} registered for the given type task configuration type.
     *
     * @deprecated since 1.12.0 use `getTaskResolver()` instead.
     *
     * @param type the task configuration type
     *
     * @returns a promise of the registered `TaskResolver` or `undefined` if no resolver is registered for the given type.
     */
    async getResolver(type) {
        return this.getTaskResolver(type);
    }
    /**
     * Retrieves the {@link TaskResolver} registered for the given type task configuration type.
     * @param type the task configuration type
     *
     * @returns a promise of the registered `TaskResolver` or `undefined` if no resolver is registered for the given type.
     */
    async getTaskResolver(type) {
        await event_1.WaitUntilEvent.fire(this.onWillProvideTaskResolverEmitter, { taskType: type });
        return this.taskResolvers.get(type);
    }
    /**
     * Registers the given {@link TaskResolver} to resolve the `TaskConfiguration` for the
     * specified type of execution ('shell', 'process' or 'customExecution').
     * If there is already a `TaskResolver` registered for the specified type the registration will
     * be overwritten with the new value.
     *
     * @param type the task execution type for which the given resolver should be registered.
     * @param resolver the task resolver that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver
     */
    registerExecutionResolver(type, resolver) {
        if (this.executionResolvers.has(type)) {
            console.warn(`Overriding execution resolver for ${type}`);
        }
        this.executionResolvers.set(type, resolver);
        return {
            dispose: () => this.executionResolvers.delete(type)
        };
    }
    /**
     * Retrieves the {@link TaskResolver} registered for the given type of execution ('shell', 'process' or 'customExecution')..
     * @param type the task configuration type
     *
     * @returns a promise of the registered `TaskResolver` or `undefined` if no resolver is registered for the given type.
     */
    getExecutionResolver(executionType) {
        return this.executionResolvers.get(executionType);
    }
};
exports.TaskResolverRegistry = TaskResolverRegistry;
exports.TaskResolverRegistry = TaskResolverRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TaskResolverRegistry);
/**
 * The {@link TaskProviderRegistry} is the common component for registration and provision of
 * {@link TaskProvider}s. Theia will collect all {@link TaskContribution}s and invoke {@link TaskContribution#registerProviders}
 * for each contribution.
 */
let TaskProviderRegistry = class TaskProviderRegistry {
    constructor() {
        this.onWillProvideTaskProviderEmitter = new event_1.Emitter();
        /**
         * Emit when the registry provides a registered task provider. i.e. when the {@link TaskProviderRegistry#getProvider}
         * function is called.
         */
        this.onWillProvideTaskProvider = this.onWillProvideTaskProviderEmitter.event;
    }
    init() {
        this.providers = new Map();
    }
    /**
     * Registers the given {@link TaskProvider} for task configurations of the specified type
     * @param type the task configuration type for which the given provider should be registered.
     * @param provider the `TaskProvider` that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver.
     */
    register(type, provider, handle) {
        const key = handle === undefined ? type : `${type}::${handle}`;
        this.providers.set(key, provider);
        return {
            dispose: () => this.providers.delete(key)
        };
    }
    /**
     * Initiates activation of a TaskProvider with the given type
     * @param type the task configuration type, '*' indicates, all providers.
     */
    async activateProvider(type) {
        await event_1.WaitUntilEvent.fire(this.onWillProvideTaskProviderEmitter, { taskType: type });
    }
    /**
     * Retrieves the {@link TaskProvider} registered for the given type task configuration type.
     * If there is already a `TaskProvider` registered for the specified type the registration will
     * be overwritten with the new value.
     * @param type the task configuration type.
     *
     * @returns a promise of the registered `TaskProvider`` or `undefined` if no provider is registered for the given type.
     */
    async getProvider(type) {
        await this.activateProvider(type);
        return this.providers.get(type);
    }
    /**
     * Retrieve all registered {@link TaskProvider}s.
     *
     * Use {@link activateProvider} to control registration of providers as needed.
     * @returns a promise of all registered {@link TaskProvider}s.
     */
    async getProviders() {
        return [...this.providers.values()];
    }
};
exports.TaskProviderRegistry = TaskProviderRegistry;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TaskProviderRegistry.prototype, "init", null);
exports.TaskProviderRegistry = TaskProviderRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TaskProviderRegistry);
//# sourceMappingURL=task-contribution.js.map