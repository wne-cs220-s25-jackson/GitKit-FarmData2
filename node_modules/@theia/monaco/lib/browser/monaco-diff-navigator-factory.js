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
exports.MonacoDiffNavigatorFactory = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
let MonacoDiffNavigatorFactory = class MonacoDiffNavigatorFactory {
    createdDiffNavigator(editor) {
        return {
            hasNext: () => true,
            hasPrevious: () => true,
            next: () => editor.goToDiff('next'),
            previous: () => editor.goToDiff('previous')
        };
    }
};
exports.MonacoDiffNavigatorFactory = MonacoDiffNavigatorFactory;
MonacoDiffNavigatorFactory.nullNavigator = {
    hasNext: () => false,
    hasPrevious: () => false,
    next: () => { },
    previous: () => { },
};
exports.MonacoDiffNavigatorFactory = MonacoDiffNavigatorFactory = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoDiffNavigatorFactory);
//# sourceMappingURL=monaco-diff-navigator-factory.js.map