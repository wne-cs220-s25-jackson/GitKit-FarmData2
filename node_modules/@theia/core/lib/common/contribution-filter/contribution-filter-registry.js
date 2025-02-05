"use strict";
// *****************************************************************************
// Copyright (C) 2021 STMicroelectronics and others.
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
exports.ContributionFilterRegistryImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const contribution_filter_1 = require("./contribution-filter");
/**
 * Registry of contribution filters.
 *
 * Implement/bind to the `FilterContribution` interface/symbol to register your contribution filters.
 */
let ContributionFilterRegistryImpl = class ContributionFilterRegistryImpl {
    constructor(contributions = []) {
        this.initialized = false;
        this.genericFilters = [];
        this.typeToFilters = new Map();
        for (const contribution of contributions) {
            contribution.registerContributionFilters(this);
        }
        this.initialized = true;
    }
    addFilters(types, filters) {
        if (this.initialized) {
            throw new Error('cannot add filters after initialization is done.');
        }
        else if (types === '*') {
            this.genericFilters.push(...filters);
        }
        else {
            for (const type of types) {
                this.getOrCreate(type).push(...filters);
            }
        }
    }
    applyFilters(toFilter, type) {
        const filters = this.getFilters(type);
        if (filters.length === 0) {
            return toFilter;
        }
        return toFilter.filter(object => filters.every(filter => filter(object)));
    }
    getOrCreate(type) {
        let value = this.typeToFilters.get(type);
        if (value === undefined) {
            this.typeToFilters.set(type, value = []);
        }
        return value;
    }
    getFilters(type) {
        return [
            ...this.typeToFilters.get(type) || [],
            ...this.genericFilters
        ];
    }
};
exports.ContributionFilterRegistryImpl = ContributionFilterRegistryImpl;
exports.ContributionFilterRegistryImpl = ContributionFilterRegistryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.multiInject)(contribution_filter_1.FilterContribution)),
    tslib_1.__param(0, (0, inversify_1.optional)()),
    tslib_1.__metadata("design:paramtypes", [Array])
], ContributionFilterRegistryImpl);
//# sourceMappingURL=contribution-filter-registry.js.map