"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelParser = exports.LabelIcon = void 0;
const tslib_1 = require("tslib");
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
const inversify_1 = require("inversify");
const common_1 = require("../common");
var LabelIcon;
(function (LabelIcon) {
    function is(val) {
        return (0, common_1.isObject)(val) && (0, common_1.isString)(val.name);
    }
    LabelIcon.is = is;
})(LabelIcon || (exports.LabelIcon = LabelIcon = {}));
let LabelParser = class LabelParser {
    /**
     * Returns an array with parts of the given text.
     * These parts are of type LabelPart which can be either a string or a LabelIcon.
     * For splitting up the giving text the parser follows this rule:
     * The text gets parsed for the following pattern: $(iconName~iconAnimation).
     * If the parser finds such pattern a new LabelIcon object
     * { name: 'iconName', animation: 'iconAnimation'} is added to the returned array.
     * iconName can be for instance the name of an icon of e.g. FontAwesome and the (optional) iconAnimation
     * the name of an animation class which must be supported by the particular icon toolkit.
     *
     * Every string before, between or after such icon patterns gets also added to the array
     * before, between or after the related LabelIcon.
     *
     * @param text - the label text to parse
     */
    parse(text) {
        const parserArray = [];
        let arrPointer = 0;
        let potentialIcon = '';
        for (let idx = 0; idx < text.length; idx++) {
            const char = text.charAt(idx);
            parserArray[arrPointer] = parserArray[arrPointer] || '';
            if (potentialIcon === '') {
                if (char === '$') {
                    potentialIcon += char;
                }
                else {
                    parserArray[arrPointer] += char;
                }
            }
            else if (potentialIcon === '$') {
                if (char === '(') {
                    potentialIcon += char;
                }
                else {
                    parserArray[arrPointer] += potentialIcon + char;
                    potentialIcon = '';
                }
            }
            else {
                if (char === ')') {
                    const iconClassArr = potentialIcon.substring(2, potentialIcon.length).split('~');
                    if (parserArray[arrPointer] !== '') {
                        arrPointer++;
                    }
                    parserArray[arrPointer] = { name: iconClassArr[0], animation: iconClassArr[1] };
                    arrPointer++;
                    potentialIcon = '';
                }
                else {
                    potentialIcon += char;
                }
            }
        }
        if (potentialIcon !== '') {
            parserArray[arrPointer] += potentialIcon;
        }
        return parserArray;
    }
    /**
     * Strips icon specifiers from the given `text`, leaving only a
     * space-separated concatenation of the non-icon segments.
     *
     * @param text text to be stripped of icon specifiers
     * @returns the `text` with icon specifiers stripped out
     */
    stripIcons(text) {
        return this.parse(text)
            .filter(item => !LabelIcon.is(item))
            .map(s => s.trim())
            .filter(s => s.length)
            .join(' ');
    }
};
exports.LabelParser = LabelParser;
exports.LabelParser = LabelParser = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LabelParser);
//# sourceMappingURL=label-parser.js.map