"use strict";
// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics, Ericsson, ARM, EclipseSource and others.
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
exports.ExtractableWidget = void 0;
const widget_1 = require("./widget");
var ExtractableWidget;
(function (ExtractableWidget) {
    function is(widget) {
        return widget instanceof widget_1.Widget && 'isExtractable' in widget && widget.isExtractable === true;
    }
    ExtractableWidget.is = is;
})(ExtractableWidget || (exports.ExtractableWidget = ExtractableWidget = {}));
//# sourceMappingURL=extractable-widget.js.map