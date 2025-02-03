"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.assertNever = assertNever;
exports.assert = assert;
exports.softAssert = softAssert;
exports.assertFn = assertFn;
exports.checkAdjacentItems = checkAdjacentItems;
const errors_js_1 = require("./errors.js");
/**
 * Throws an error with the provided message if the provided value does not evaluate to a true Javascript value.
 *
 * @deprecated Use `assert(...)` instead.
 * This method is usually used like this:
 * ```ts
 * import * as assert from 'vs/base/common/assert';
 * assert.ok(...);
 * ```
 *
 * However, `assert` in that example is a user chosen name.
 * There is no tooling for generating such an import statement.
 * Thus, the `assert(...)` function should be used instead.
 */
function ok(value, message) {
    if (!value) {
        throw new Error(message ? `Assertion failed (${message})` : 'Assertion Failed');
    }
}
function assertNever(value, message = 'Unreachable') {
    throw new Error(message);
}
function assert(condition, message = 'unexpected state') {
    if (!condition) {
        throw new errors_js_1.BugIndicatingError(`Assertion Failed: ${message}`);
    }
}
/**
 * Like assert, but doesn't throw.
 */
function softAssert(condition) {
    if (!condition) {
        (0, errors_js_1.onUnexpectedError)(new errors_js_1.BugIndicatingError('Soft Assertion Failed'));
    }
}
/**
 * condition must be side-effect free!
 */
function assertFn(condition) {
    if (!condition()) {
        // eslint-disable-next-line no-debugger
        debugger;
        // Reevaluate `condition` again to make debugging easier
        condition();
        (0, errors_js_1.onUnexpectedError)(new errors_js_1.BugIndicatingError('Assertion Failed'));
    }
}
function checkAdjacentItems(items, predicate) {
    let i = 0;
    while (i < items.length - 1) {
        const a = items[i];
        const b = items[i + 1];
        if (!predicate(a, b)) {
            return false;
        }
        i++;
    }
    return true;
}
//# sourceMappingURL=assert.js.map