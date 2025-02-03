"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
exports.Marker = void 0;
const types_1 = require("@theia/core/lib/common/types");
var Marker;
(function (Marker) {
    function is(value, subTypeCheck) {
        subTypeCheck !== null && subTypeCheck !== void 0 ? subTypeCheck : (subTypeCheck = types_1.isObject);
        return (0, types_1.isObject)(value)
            && !Array.isArray(value)
            && subTypeCheck(value.data)
            && (0, types_1.isString)(value.uri)
            && (0, types_1.isString)(value.owner);
    }
    Marker.is = is;
})(Marker || (exports.Marker = Marker = {}));
//# sourceMappingURL=marker.js.map