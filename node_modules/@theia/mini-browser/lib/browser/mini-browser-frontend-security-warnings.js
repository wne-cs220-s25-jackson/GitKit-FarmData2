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
exports.MiniBrowserFrontendSecurityWarnings = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const frontend_application_config_provider_1 = require("@theia/core/lib/browser/frontend-application-config-provider");
const nls_1 = require("@theia/core/lib/common/nls");
const window_service_1 = require("@theia/core/lib/browser/window/window-service");
const inversify_1 = require("@theia/core/shared/inversify");
const mini_browser_endpoint_1 = require("../common/mini-browser-endpoint");
const mini_browser_environment_1 = require("./environment/mini-browser-environment");
let MiniBrowserFrontendSecurityWarnings = class MiniBrowserFrontendSecurityWarnings {
    initialize() {
        this.checkHostPattern();
    }
    async checkHostPattern() {
        if (frontend_application_config_provider_1.FrontendApplicationConfigProvider.get()['warnOnPotentiallyInsecureHostPattern'] === false) {
            return;
        }
        const hostPattern = await this.miniBrowserEnvironment.hostPatternPromise;
        if (hostPattern !== mini_browser_endpoint_1.MiniBrowserEndpoint.HOST_PATTERN_DEFAULT) {
            const goToReadme = nls_1.nls.localize('theia/webview/goToReadme', 'Go To README');
            const message = nls_1.nls.localize('theia/webview/messageWarning', '\
            The {0} endpoint\'s host pattern has been changed to `{1}`; changing the pattern can lead to security vulnerabilities. \
            See `{2}` for more information.', 'mini-browser', hostPattern, '@theia/mini-browser/README.md');
            this.messageService.warn(message, browser_1.Dialog.OK, goToReadme).then(action => {
                if (action === goToReadme) {
                    this.windowService.openNewWindow('https://www.npmjs.com/package/@theia/mini-browser', { external: true });
                }
            });
        }
    }
};
exports.MiniBrowserFrontendSecurityWarnings = MiniBrowserFrontendSecurityWarnings;
tslib_1.__decorate([
    (0, inversify_1.inject)(window_service_1.WindowService),
    tslib_1.__metadata("design:type", Object)
], MiniBrowserFrontendSecurityWarnings.prototype, "windowService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.MessageService),
    tslib_1.__metadata("design:type", core_1.MessageService)
], MiniBrowserFrontendSecurityWarnings.prototype, "messageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(mini_browser_environment_1.MiniBrowserEnvironment),
    tslib_1.__metadata("design:type", mini_browser_environment_1.MiniBrowserEnvironment)
], MiniBrowserFrontendSecurityWarnings.prototype, "miniBrowserEnvironment", void 0);
exports.MiniBrowserFrontendSecurityWarnings = MiniBrowserFrontendSecurityWarnings = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MiniBrowserFrontendSecurityWarnings);
//# sourceMappingURL=mini-browser-frontend-security-warnings.js.map