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
exports.LineRange = exports.Change = exports.DiffComputer = void 0;
const jsdiff = require("diff");
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
class DiffComputer {
    computeDiff(previous, current) {
        const diffResult = diffArrays(previous, current);
        return diffResult;
    }
    computeDirtyDiff(previous, current) {
        const changes = [];
        const diffResult = this.computeDiff(previous, current);
        let currentRevisionLine = -1;
        let previousRevisionLine = -1;
        for (let i = 0; i < diffResult.length; i++) {
            const change = diffResult[i];
            const next = diffResult[i + 1];
            if (change.added) {
                // case: addition
                changes.push({ previousRange: LineRange.createEmptyLineRange(previousRevisionLine + 1), currentRange: toLineRange(change) });
                currentRevisionLine += change.count;
            }
            else if (change.removed && next && next.added) {
                const isFirstChange = i === 0;
                const isLastChange = i === diffResult.length - 2;
                const isNextEmptyLine = next.value.length > 0 && current[next.value[0]].length === 0;
                const isPrevEmptyLine = change.value.length > 0 && previous[change.value[0]].length === 0;
                if (isFirstChange && isNextEmptyLine) {
                    // special case: removing at the beginning
                    changes.push({ previousRange: toLineRange(change), currentRange: LineRange.createEmptyLineRange(0) });
                    previousRevisionLine += change.count;
                }
                else if (isFirstChange && isPrevEmptyLine) {
                    // special case: adding at the beginning
                    changes.push({ previousRange: LineRange.createEmptyLineRange(0), currentRange: toLineRange(next) });
                    currentRevisionLine += next.count;
                }
                else if (isLastChange && isNextEmptyLine) {
                    changes.push({ previousRange: toLineRange(change), currentRange: LineRange.createEmptyLineRange(currentRevisionLine + 2) });
                    previousRevisionLine += change.count;
                }
                else {
                    // default case is a modification
                    changes.push({ previousRange: toLineRange(change), currentRange: toLineRange(next) });
                    currentRevisionLine += next.count;
                    previousRevisionLine += change.count;
                }
                i++; // consume next eagerly
            }
            else if (change.removed && !(next && next.added)) {
                // case: removal
                changes.push({ previousRange: toLineRange(change), currentRange: LineRange.createEmptyLineRange(currentRevisionLine + 1) });
                previousRevisionLine += change.count;
            }
            else {
                // case: unchanged region
                currentRevisionLine += change.count;
                previousRevisionLine += change.count;
            }
        }
        return { changes };
    }
}
exports.DiffComputer = DiffComputer;
class ArrayDiff extends jsdiff.Diff {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tokenize(value) {
        return value;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    join(value) {
        return value;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    removeEmpty(value) {
        return value;
    }
}
const arrayDiff = new ArrayDiff();
/**
 * Computes diff without copying data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function diffArrays(oldArr, newArr) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return arrayDiff.diff(oldArr, newArr);
}
function toLineRange({ value }) {
    const [start, end] = value;
    return LineRange.create(start, end + 1);
}
var Change;
(function (Change) {
    function isAddition(change) {
        return LineRange.isEmpty(change.previousRange);
    }
    Change.isAddition = isAddition;
    function isRemoval(change) {
        return LineRange.isEmpty(change.currentRange);
    }
    Change.isRemoval = isRemoval;
    function isModification(change) {
        return !isAddition(change) && !isRemoval(change);
    }
    Change.isModification = isModification;
})(Change || (exports.Change = Change = {}));
var LineRange;
(function (LineRange) {
    function create(start, end) {
        if (start < 0 || end < 0 || start > end) {
            throw new Error(`Invalid line range: { start: ${start}, end: ${end} }`);
        }
        return { start, end };
    }
    LineRange.create = create;
    function createSingleLineRange(line) {
        return create(line, line + 1);
    }
    LineRange.createSingleLineRange = createSingleLineRange;
    function createEmptyLineRange(line) {
        return create(line, line);
    }
    LineRange.createEmptyLineRange = createEmptyLineRange;
    function isEmpty(range) {
        return range.start === range.end;
    }
    LineRange.isEmpty = isEmpty;
    function getStartPosition(range) {
        if (isEmpty(range)) {
            return getEndPosition(range);
        }
        return vscode_languageserver_protocol_1.Position.create(range.start, 0);
    }
    LineRange.getStartPosition = getStartPosition;
    function getEndPosition(range) {
        if (range.end < 1) {
            return vscode_languageserver_protocol_1.Position.create(0, 0);
        }
        return vscode_languageserver_protocol_1.Position.create(range.end - 1, vscode_languageserver_protocol_1.uinteger.MAX_VALUE);
    }
    LineRange.getEndPosition = getEndPosition;
    function toRange(range) {
        return vscode_languageserver_protocol_1.Range.create(getStartPosition(range), getEndPosition(range));
    }
    LineRange.toRange = toRange;
    function getLineCount(range) {
        return range.end - range.start;
    }
    LineRange.getLineCount = getLineCount;
})(LineRange || (exports.LineRange = LineRange = {}));
//# sourceMappingURL=diff-computer.js.map