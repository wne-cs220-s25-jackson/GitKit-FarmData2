"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.LinkedEditingRangeAdapter = void 0;
const arrays_1 = require("../../common/arrays");
const type_converters_1 = require("../type-converters");
const languages_utils_1 = require("../languages-utils");
class LinkedEditingRangeAdapter {
    constructor(documents, provider) {
        this.documents = documents;
        this.provider = provider;
    }
    async provideRanges(resource, position, token) {
        const doc = this.documents.getDocument(resource);
        const pos = (0, type_converters_1.toPosition)(position);
        const value = await this.provider.provideLinkedEditingRanges(doc, pos, token);
        if (value && Array.isArray(value.ranges)) {
            return {
                ranges: (0, arrays_1.coalesce)(value.ranges.map(r => (0, type_converters_1.fromRange)(r))),
                wordPattern: (0, languages_utils_1.serializeRegExp)(value.wordPattern)
            };
        }
        return undefined;
    }
}
exports.LinkedEditingRangeAdapter = LinkedEditingRangeAdapter;
//# sourceMappingURL=linked-editing-range.js.map