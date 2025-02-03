"use strict";
// *****************************************************************************
// Copyright (C) 2022 TypeFox and others.
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
exports.PreferenceOpenHandler = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const preferences_contribution_1 = require("./preferences-contribution");
let PreferenceOpenHandler = class PreferenceOpenHandler {
    constructor() {
        this.id = 'preference';
    }
    canHandle(uri) {
        return uri.scheme === this.id ? 500 : -1;
    }
    async open(uri) {
        const preferencesWidget = await this.preferencesContribution.openView();
        const selector = `li[data-pref-id="${uri.path.toString()}"]:not([data-node-id^="commonly-used@"])`;
        const element = document.querySelector(selector);
        if (element instanceof HTMLElement) {
            if (element.classList.contains('hidden')) {
                // We clear the search term as we have clicked on a hidden preference
                await preferencesWidget.setSearchTerm('');
                await (0, browser_1.animationFrame)();
            }
            element.scrollIntoView({
                block: 'center'
            });
            element.focus();
            return true;
        }
        return false;
    }
};
exports.PreferenceOpenHandler = PreferenceOpenHandler;
tslib_1.__decorate([
    (0, inversify_1.inject)(preferences_contribution_1.PreferencesContribution),
    tslib_1.__metadata("design:type", preferences_contribution_1.PreferencesContribution)
], PreferenceOpenHandler.prototype, "preferencesContribution", void 0);
exports.PreferenceOpenHandler = PreferenceOpenHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceOpenHandler);
//# sourceMappingURL=preference-open-handler.js.map