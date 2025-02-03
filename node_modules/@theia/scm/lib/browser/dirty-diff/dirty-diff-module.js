"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.bindDirtyDiff = void 0;
const dirty_diff_decorator_1 = require("./dirty-diff-decorator");
const dirty_diff_navigator_1 = require("./dirty-diff-navigator");
const dirty_diff_widget_1 = require("./dirty-diff-widget");
require("../../../src/browser/style/dirty-diff.css");
function bindDirtyDiff(bind) {
    bind(dirty_diff_decorator_1.DirtyDiffDecorator).toSelf().inSingletonScope();
    bind(dirty_diff_navigator_1.DirtyDiffNavigator).toSelf().inSingletonScope();
    bind(dirty_diff_widget_1.DirtyDiffWidgetFactory).toFactory(({ container }) => props => {
        const child = container.createChild();
        child.bind(dirty_diff_widget_1.DirtyDiffWidgetProps).toConstantValue(props);
        child.bind(dirty_diff_widget_1.DirtyDiffWidget).toSelf();
        return child.get(dirty_diff_widget_1.DirtyDiffWidget);
    });
}
exports.bindDirtyDiff = bindDirtyDiff;
//# sourceMappingURL=dirty-diff-module.js.map