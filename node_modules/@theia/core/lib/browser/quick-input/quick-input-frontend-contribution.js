"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
exports.QuickInputFrontendContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const quick_access_1 = require("./quick-access");
let QuickInputFrontendContribution = class QuickInputFrontendContribution {
    onStart() {
        this.contributionProvider.getContributions().forEach(contrib => {
            contrib.registerQuickAccessProvider();
        });
    }
};
exports.QuickInputFrontendContribution = QuickInputFrontendContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(quick_access_1.QuickAccessContribution),
    tslib_1.__metadata("design:type", Object)
], QuickInputFrontendContribution.prototype, "contributionProvider", void 0);
exports.QuickInputFrontendContribution = QuickInputFrontendContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], QuickInputFrontendContribution);
//# sourceMappingURL=quick-input-frontend-contribution.js.map