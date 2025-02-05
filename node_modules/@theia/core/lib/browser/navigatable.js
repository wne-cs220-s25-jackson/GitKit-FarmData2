"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.NavigatableWidgetOpenHandler = void 0;
const tslib_1 = require("tslib");
const widget_open_handler_1 = require("./widget-open-handler");
tslib_1.__exportStar(require("./navigatable-types"), exports);
class NavigatableWidgetOpenHandler extends widget_open_handler_1.WidgetOpenHandler {
    createWidgetOptions(uri, options) {
        return {
            kind: 'navigatable',
            uri: this.serializeUri(uri)
        };
    }
    serializeUri(uri) {
        if (uri.scheme === 'file') {
            return uri.withoutFragment().normalizePath().toString();
        }
        else {
            return uri.withoutFragment().toString();
        }
    }
}
exports.NavigatableWidgetOpenHandler = NavigatableWidgetOpenHandler;
//# sourceMappingURL=navigatable.js.map