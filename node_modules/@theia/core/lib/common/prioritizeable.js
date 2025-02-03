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
exports.Prioritizeable = void 0;
var Prioritizeable;
(function (Prioritizeable) {
    async function toPrioritizeable(rawValue, getPriority) {
        if (rawValue instanceof Array) {
            return Promise.all(rawValue.map(v => toPrioritizeable(v, getPriority)));
        }
        const value = await rawValue;
        const priority = await getPriority(value);
        return { priority, value };
    }
    Prioritizeable.toPrioritizeable = toPrioritizeable;
    function toPrioritizeableSync(rawValue, getPriority) {
        return rawValue.map(v => ({
            value: v,
            priority: getPriority(v)
        }));
    }
    Prioritizeable.toPrioritizeableSync = toPrioritizeableSync;
    function prioritizeAllSync(values, getPriority) {
        const prioritizeable = toPrioritizeableSync(values, getPriority);
        return prioritizeable.filter(isValid).sort(compare);
    }
    Prioritizeable.prioritizeAllSync = prioritizeAllSync;
    async function prioritizeAll(values, getPriority) {
        const prioritizeable = await toPrioritizeable(values, getPriority);
        return prioritizeable.filter(isValid).sort(compare);
    }
    Prioritizeable.prioritizeAll = prioritizeAll;
    function isValid(p) {
        return p.priority > 0;
    }
    Prioritizeable.isValid = isValid;
    function compare(p, p2) {
        return p2.priority - p.priority;
    }
    Prioritizeable.compare = compare;
})(Prioritizeable || (exports.Prioritizeable = Prioritizeable = {}));
//# sourceMappingURL=prioritizeable.js.map