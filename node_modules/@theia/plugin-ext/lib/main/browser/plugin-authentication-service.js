"use strict";
// *****************************************************************************
// Copyright (C) 2022 EclipseSource and others.
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
exports.PluginAuthenticationServiceImpl = exports.getAuthenticationProviderActivationEvent = void 0;
const tslib_1 = require("tslib");
const authentication_service_1 = require("@theia/core/lib/browser/authentication-service");
const inversify_1 = require("@theia/core/shared/inversify");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const hosted_plugin_1 = require("../../hosted/browser/hosted-plugin");
function getAuthenticationProviderActivationEvent(id) { return `onAuthenticationRequest:${id}`; }
exports.getAuthenticationProviderActivationEvent = getAuthenticationProviderActivationEvent;
/**
 * Plugin authentication service that aims to activate additional plugins if sessions are created or queried.
 */
class PluginAuthenticationServiceImpl extends authentication_service_1.AuthenticationServiceImpl {
    async getSessions(id, scopes) {
        await this.tryActivateProvider(id);
        return super.getSessions(id, scopes);
    }
    async login(id, scopes) {
        await this.tryActivateProvider(id);
        return super.login(id, scopes);
    }
    async tryActivateProvider(providerId) {
        this.pluginService.activateByEvent(getAuthenticationProviderActivationEvent(providerId));
        const provider = this.authenticationProviders.get(providerId);
        if (provider) {
            return provider;
        }
        // When activate has completed, the extension has made the call to `registerAuthenticationProvider`.
        // However, activate cannot block on this, so the renderer may not have gotten the event yet.
        return Promise.race([
            this.waitForProviderRegistration(providerId),
            (0, promise_util_1.timeoutReject)(5000, 'Timed out waiting for authentication provider to register')
        ]);
    }
    async waitForProviderRegistration(providerId) {
        const waitForRegistration = new promise_util_1.Deferred();
        const registration = this.onDidRegisterAuthenticationProvider(info => {
            if (info.id === providerId) {
                registration.dispose();
                const provider = this.authenticationProviders.get(providerId);
                if (provider) {
                    waitForRegistration.resolve(provider);
                }
                else {
                    waitForRegistration.reject(new Error(`No authentication provider '${providerId}' is currently registered.`));
                }
            }
        });
        return waitForRegistration.promise;
    }
}
exports.PluginAuthenticationServiceImpl = PluginAuthenticationServiceImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(hosted_plugin_1.HostedPluginSupport),
    tslib_1.__metadata("design:type", hosted_plugin_1.HostedPluginSupport)
], PluginAuthenticationServiceImpl.prototype, "pluginService", void 0);
//# sourceMappingURL=plugin-authentication-service.js.map