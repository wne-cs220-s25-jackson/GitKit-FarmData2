"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
exports.ExtensionIdMatchesFilter = exports.ExtensionIdMatchesFilterFactory = void 0;
const ovsx_router_client_1 = require("../ovsx-router-client");
const ovsx_types_1 = require("../ovsx-types");
const abstract_reg_exp_filter_1 = require("./abstract-reg-exp-filter");
exports.ExtensionIdMatchesFilterFactory = (0, ovsx_router_client_1.createFilterFactory)('ifExtensionIdMatches', ifExtensionIdMatches => {
    if (typeof ifExtensionIdMatches !== 'string') {
        throw new TypeError(`expected a string, got: ${typeof ifExtensionIdMatches}`);
    }
    return new ExtensionIdMatchesFilter(new RegExp(ifExtensionIdMatches, 'i'));
});
class ExtensionIdMatchesFilter extends abstract_reg_exp_filter_1.AbstractRegExpFilter {
    filterExtension(extension) {
        return this.test(ovsx_types_1.ExtensionLike.id(extension));
    }
}
exports.ExtensionIdMatchesFilter = ExtensionIdMatchesFilter;
//# sourceMappingURL=extension-id-matches-filter.js.map