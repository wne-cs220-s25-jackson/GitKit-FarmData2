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
exports.EditorDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
let EditorDecorator = class EditorDecorator {
    constructor() {
        this.appliedDecorations = new Map();
    }
    setDecorations(editor, newDecorations) {
        const uri = editor.uri.toString();
        const oldDecorations = this.appliedDecorations.get(uri) || [];
        if (oldDecorations.length === 0 && newDecorations.length === 0) {
            return;
        }
        const decorationIds = editor.deltaDecorations({ oldDecorations, newDecorations });
        this.appliedDecorations.set(uri, decorationIds);
    }
};
exports.EditorDecorator = EditorDecorator;
exports.EditorDecorator = EditorDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], EditorDecorator);
//# sourceMappingURL=editor-decorator.js.map