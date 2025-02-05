"use strict";
// *****************************************************************************
// Copyright (C) 2020 Red Hat, Inc. and others.
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
exports.CommentingRangeDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
let CommentingRangeDecorator = class CommentingRangeDecorator {
    constructor() {
        this.commentingRangeDecorations = [];
        this.decorationOptions = {
            isWholeLine: true,
            linesDecorationsClassName: 'comment-range-glyph comment-diff-added'
        };
    }
    update(editor, commentInfos) {
        const model = editor.getModel();
        if (!model) {
            return;
        }
        const commentingRangeDecorations = [];
        for (const info of commentInfos) {
            info.commentingRanges.ranges.forEach(range => {
                commentingRangeDecorations.push(new CommentingRangeDecoration(editor, info.owner, info.extensionId, info.label, range, this.decorationOptions, info.commentingRanges));
            });
        }
        const oldDecorations = this.commentingRangeDecorations.map(decoration => decoration.id);
        editor.deltaDecorations(oldDecorations, []);
        this.commentingRangeDecorations = commentingRangeDecorations;
    }
    getMatchedCommentAction(line) {
        const result = [];
        for (const decoration of this.commentingRangeDecorations) {
            const range = decoration.getActiveRange();
            if (range && range.startLineNumber <= line && line <= range.endLineNumber) {
                result.push(decoration.getCommentAction());
            }
        }
        return result;
    }
};
exports.CommentingRangeDecorator = CommentingRangeDecorator;
exports.CommentingRangeDecorator = CommentingRangeDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], CommentingRangeDecorator);
class CommentingRangeDecoration {
    get id() {
        return this.decorationId;
    }
    constructor(_editor, _ownerId, _extensionId, _label, _range, commentingOptions, commentingRangesInfo) {
        this._editor = _editor;
        this._ownerId = _ownerId;
        this._extensionId = _extensionId;
        this._label = _label;
        this._range = _range;
        this.commentingRangesInfo = commentingRangesInfo;
        const startLineNumber = _range.startLineNumber;
        const endLineNumber = _range.endLineNumber;
        const commentingRangeDecorations = [{
                range: {
                    startLineNumber: startLineNumber, startColumn: 1,
                    endLineNumber: endLineNumber, endColumn: 1
                },
                options: commentingOptions
            }];
        this.decorationId = this._editor.deltaDecorations([], commentingRangeDecorations)[0];
    }
    getCommentAction() {
        return {
            extensionId: this._extensionId,
            label: this._label,
            ownerId: this._ownerId,
            commentingRangesInfo: this.commentingRangesInfo
        };
    }
    getOriginalRange() {
        return this._range;
    }
    getActiveRange() {
        const range = this._editor.getModel().getDecorationRange(this.decorationId);
        if (range) {
            return range;
        }
    }
}
//# sourceMappingURL=comments-decorator.js.map