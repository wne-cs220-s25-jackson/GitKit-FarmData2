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
exports.DirtyDiffDecorator = exports.DirtyDiffDecorationType = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/editor/lib/browser");
const diff_computer_1 = require("./diff-computer");
var DirtyDiffDecorationType;
(function (DirtyDiffDecorationType) {
    DirtyDiffDecorationType["AddedLine"] = "dirty-diff-added-line";
    DirtyDiffDecorationType["RemovedLine"] = "dirty-diff-removed-line";
    DirtyDiffDecorationType["ModifiedLine"] = "dirty-diff-modified-line";
})(DirtyDiffDecorationType || (exports.DirtyDiffDecorationType = DirtyDiffDecorationType = {}));
const AddedLineDecoration = {
    linesDecorationsClassName: 'dirty-diff-glyph dirty-diff-added-line',
    overviewRuler: {
        color: {
            id: 'editorOverviewRuler.addedForeground'
        },
        position: browser_1.OverviewRulerLane.Left,
    },
    minimap: {
        color: {
            id: 'minimapGutter.addedBackground'
        },
        position: browser_1.MinimapPosition.Gutter
    },
    isWholeLine: true
};
const RemovedLineDecoration = {
    linesDecorationsClassName: 'dirty-diff-glyph dirty-diff-removed-line',
    overviewRuler: {
        color: {
            id: 'editorOverviewRuler.deletedForeground'
        },
        position: browser_1.OverviewRulerLane.Left,
    },
    minimap: {
        color: {
            id: 'minimapGutter.deletedBackground'
        },
        position: browser_1.MinimapPosition.Gutter
    },
    isWholeLine: false
};
const ModifiedLineDecoration = {
    linesDecorationsClassName: 'dirty-diff-glyph dirty-diff-modified-line',
    overviewRuler: {
        color: {
            id: 'editorOverviewRuler.modifiedForeground'
        },
        position: browser_1.OverviewRulerLane.Left,
    },
    minimap: {
        color: {
            id: 'minimapGutter.modifiedBackground'
        },
        position: browser_1.MinimapPosition.Gutter
    },
    isWholeLine: true
};
function getEditorDecorationOptions(change) {
    if (diff_computer_1.Change.isAddition(change)) {
        return AddedLineDecoration;
    }
    if (diff_computer_1.Change.isRemoval(change)) {
        return RemovedLineDecoration;
    }
    return ModifiedLineDecoration;
}
let DirtyDiffDecorator = class DirtyDiffDecorator extends browser_1.EditorDecorator {
    applyDecorations(update) {
        const decorations = update.changes.map(change => this.toDeltaDecoration(change));
        this.setDecorations(update.editor, decorations);
    }
    toDeltaDecoration(change) {
        const range = diff_computer_1.LineRange.toRange(change.currentRange);
        const options = getEditorDecorationOptions(change);
        return { range, options };
    }
};
exports.DirtyDiffDecorator = DirtyDiffDecorator;
exports.DirtyDiffDecorator = DirtyDiffDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DirtyDiffDecorator);
//# sourceMappingURL=dirty-diff-decorator.js.map