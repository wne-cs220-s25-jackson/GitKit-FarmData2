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
exports.StatusBar = exports.STATUSBAR_WIDGET_FACTORY_ID = exports.StatusBarAlignment = void 0;
var StatusBarAlignment;
(function (StatusBarAlignment) {
    StatusBarAlignment[StatusBarAlignment["LEFT"] = 0] = "LEFT";
    StatusBarAlignment[StatusBarAlignment["RIGHT"] = 1] = "RIGHT";
})(StatusBarAlignment || (exports.StatusBarAlignment = StatusBarAlignment = {}));
exports.STATUSBAR_WIDGET_FACTORY_ID = 'statusBar';
exports.StatusBar = Symbol('StatusBar');
//# sourceMappingURL=status-bar-types.js.map