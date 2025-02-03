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
exports.isSame = exports.startsAfter = exports.filterUnique = exports.comparePosition = exports.filterSame = exports.containsPosition = exports.containsRange = void 0;
/**
 * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
 */
function containsRange(range, otherRange) {
    if (otherRange.start.line < range.start.line || otherRange.end.line < range.start.line) {
        return false;
    }
    if (otherRange.start.line > range.end.line || otherRange.end.line > range.end.line) {
        return false;
    }
    if (otherRange.start.line === range.start.line && otherRange.start.character < range.start.character) {
        return false;
    }
    if (otherRange.end.line === range.end.line && otherRange.end.character > range.end.character) {
        return false;
    }
    return true;
}
exports.containsRange = containsRange;
function containsPosition(range, position) {
    return comparePosition(range.start, position) >= 0 && comparePosition(range.end, position) <= 0;
}
exports.containsPosition = containsPosition;
function sameStart(a, b) {
    const pos1 = a.start;
    const pos2 = b.start;
    return pos1.line === pos2.line
        && pos1.character === pos2.character;
}
function filterSame(locations, definition) {
    return locations.filter(candidate => candidate.uri !== definition.uri
        || !sameStart(candidate.range, definition.range));
}
exports.filterSame = filterSame;
function comparePosition(left, right) {
    const diff = right.line - left.line;
    if (diff !== 0) {
        return diff;
    }
    return right.character - left.character;
}
exports.comparePosition = comparePosition;
function filterUnique(locations) {
    if (!locations) {
        return [];
    }
    const result = [];
    const set = new Set();
    for (const location of locations) {
        const json = JSON.stringify(location);
        if (!set.has(json)) {
            set.add(json);
            result.push(location);
        }
    }
    return result;
}
exports.filterUnique = filterUnique;
function startsAfter(a, b) {
    if (a.start.line > b.start.line) {
        return true;
    }
    if (a.start.line === b.start.line) {
        if (a.start.character > b.start.character) {
            return true;
        }
        if (a.start.character === b.start.character) {
            if (a.end.line > b.end.line) {
                return true;
            }
        }
    }
    return false;
}
exports.startsAfter = startsAfter;
function isSame(a, b) {
    return a.uri === b.uri
        && a.range.start.line === b.range.start.line
        && a.range.end.line === b.range.end.line
        && a.range.start.character === b.range.start.character
        && a.range.end.character === b.range.end.character;
}
exports.isSame = isSame;
//# sourceMappingURL=utils.js.map