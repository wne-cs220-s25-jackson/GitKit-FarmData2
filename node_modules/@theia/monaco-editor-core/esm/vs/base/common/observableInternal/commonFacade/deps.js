"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackDisposable = exports.toDisposable = exports.markAsDisposed = exports.DisposableStore = exports.Event = exports.onBugIndicatingError = exports.BugIndicatingError = exports.strictEquals = exports.assertFn = void 0;
var assert_js_1 = require("../../assert.js");
Object.defineProperty(exports, "assertFn", { enumerable: true, get: function () { return assert_js_1.assertFn; } });
var equals_js_1 = require("../../equals.js");
Object.defineProperty(exports, "strictEquals", { enumerable: true, get: function () { return equals_js_1.strictEquals; } });
var errors_js_1 = require("../../errors.js");
Object.defineProperty(exports, "BugIndicatingError", { enumerable: true, get: function () { return errors_js_1.BugIndicatingError; } });
Object.defineProperty(exports, "onBugIndicatingError", { enumerable: true, get: function () { return errors_js_1.onBugIndicatingError; } });
var event_js_1 = require("../../event.js");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return event_js_1.Event; } });
var lifecycle_js_1 = require("../../lifecycle.js");
Object.defineProperty(exports, "DisposableStore", { enumerable: true, get: function () { return lifecycle_js_1.DisposableStore; } });
Object.defineProperty(exports, "markAsDisposed", { enumerable: true, get: function () { return lifecycle_js_1.markAsDisposed; } });
Object.defineProperty(exports, "toDisposable", { enumerable: true, get: function () { return lifecycle_js_1.toDisposable; } });
Object.defineProperty(exports, "trackDisposable", { enumerable: true, get: function () { return lifecycle_js_1.trackDisposable; } });
//# sourceMappingURL=deps.js.map