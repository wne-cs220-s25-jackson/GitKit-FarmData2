"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.wasEventTriggeredRecently = exports.ValueWithChangeEventFromObservable = exports.signalFromObservable = exports.runOnChangeWithStore = exports.runOnChange = exports.recomputeInitiallyAndOnChange = exports.observableSignalFromEvent = exports.observableSignal = exports.observableFromValueWithChangeEvent = exports.observableFromPromise = exports.observableFromEventOpts = exports.observableFromEvent = exports.mapObservableArrayCached = exports.latestChangedValue = exports.keepObserved = exports.derivedObservableWithWritableCache = exports.derivedObservableWithCache = exports.derivedConstOnceDefined = exports.debouncedObservable = exports.constObservable = exports.waitForState = exports.derivedWithCancellationToken = exports.PromiseResult = exports.ObservablePromise = exports.ObservableLazyPromise = exports.ObservableLazy = exports.derivedWithStore = exports.derivedWithSetter = exports.derivedOpts = exports.derivedHandleChanges = exports.derivedDisposable = exports.derived = exports.TransactionImpl = exports.transaction = exports.subtransaction = exports.observableValue = exports.globalTransaction = exports.disposableObservableValue = exports.asyncTransaction = exports.autorunWithStoreHandleChanges = exports.autorunWithStore = exports.autorunOpts = exports.autorunHandleChanges = exports.autorunDelta = exports.autorun = exports.observableValueOpts = void 0;
// This is a facade for the observable implementation. Only import from here!
var api_js_1 = require("./api.js");
Object.defineProperty(exports, "observableValueOpts", { enumerable: true, get: function () { return api_js_1.observableValueOpts; } });
var autorun_js_1 = require("./autorun.js");
Object.defineProperty(exports, "autorun", { enumerable: true, get: function () { return autorun_js_1.autorun; } });
Object.defineProperty(exports, "autorunDelta", { enumerable: true, get: function () { return autorun_js_1.autorunDelta; } });
Object.defineProperty(exports, "autorunHandleChanges", { enumerable: true, get: function () { return autorun_js_1.autorunHandleChanges; } });
Object.defineProperty(exports, "autorunOpts", { enumerable: true, get: function () { return autorun_js_1.autorunOpts; } });
Object.defineProperty(exports, "autorunWithStore", { enumerable: true, get: function () { return autorun_js_1.autorunWithStore; } });
Object.defineProperty(exports, "autorunWithStoreHandleChanges", { enumerable: true, get: function () { return autorun_js_1.autorunWithStoreHandleChanges; } });
var base_js_1 = require("./base.js");
Object.defineProperty(exports, "asyncTransaction", { enumerable: true, get: function () { return base_js_1.asyncTransaction; } });
Object.defineProperty(exports, "disposableObservableValue", { enumerable: true, get: function () { return base_js_1.disposableObservableValue; } });
Object.defineProperty(exports, "globalTransaction", { enumerable: true, get: function () { return base_js_1.globalTransaction; } });
Object.defineProperty(exports, "observableValue", { enumerable: true, get: function () { return base_js_1.observableValue; } });
Object.defineProperty(exports, "subtransaction", { enumerable: true, get: function () { return base_js_1.subtransaction; } });
Object.defineProperty(exports, "transaction", { enumerable: true, get: function () { return base_js_1.transaction; } });
Object.defineProperty(exports, "TransactionImpl", { enumerable: true, get: function () { return base_js_1.TransactionImpl; } });
var derived_js_1 = require("./derived.js");
Object.defineProperty(exports, "derived", { enumerable: true, get: function () { return derived_js_1.derived; } });
Object.defineProperty(exports, "derivedDisposable", { enumerable: true, get: function () { return derived_js_1.derivedDisposable; } });
Object.defineProperty(exports, "derivedHandleChanges", { enumerable: true, get: function () { return derived_js_1.derivedHandleChanges; } });
Object.defineProperty(exports, "derivedOpts", { enumerable: true, get: function () { return derived_js_1.derivedOpts; } });
Object.defineProperty(exports, "derivedWithSetter", { enumerable: true, get: function () { return derived_js_1.derivedWithSetter; } });
Object.defineProperty(exports, "derivedWithStore", { enumerable: true, get: function () { return derived_js_1.derivedWithStore; } });
var promise_js_1 = require("./promise.js");
Object.defineProperty(exports, "ObservableLazy", { enumerable: true, get: function () { return promise_js_1.ObservableLazy; } });
Object.defineProperty(exports, "ObservableLazyPromise", { enumerable: true, get: function () { return promise_js_1.ObservableLazyPromise; } });
Object.defineProperty(exports, "ObservablePromise", { enumerable: true, get: function () { return promise_js_1.ObservablePromise; } });
Object.defineProperty(exports, "PromiseResult", { enumerable: true, get: function () { return promise_js_1.PromiseResult; } });
var utilsCancellation_js_1 = require("./utilsCancellation.js");
Object.defineProperty(exports, "derivedWithCancellationToken", { enumerable: true, get: function () { return utilsCancellation_js_1.derivedWithCancellationToken; } });
Object.defineProperty(exports, "waitForState", { enumerable: true, get: function () { return utilsCancellation_js_1.waitForState; } });
var utils_js_1 = require("./utils.js");
Object.defineProperty(exports, "constObservable", { enumerable: true, get: function () { return utils_js_1.constObservable; } });
Object.defineProperty(exports, "debouncedObservable", { enumerable: true, get: function () { return utils_js_1.debouncedObservable; } });
Object.defineProperty(exports, "derivedConstOnceDefined", { enumerable: true, get: function () { return utils_js_1.derivedConstOnceDefined; } });
Object.defineProperty(exports, "derivedObservableWithCache", { enumerable: true, get: function () { return utils_js_1.derivedObservableWithCache; } });
Object.defineProperty(exports, "derivedObservableWithWritableCache", { enumerable: true, get: function () { return utils_js_1.derivedObservableWithWritableCache; } });
Object.defineProperty(exports, "keepObserved", { enumerable: true, get: function () { return utils_js_1.keepObserved; } });
Object.defineProperty(exports, "latestChangedValue", { enumerable: true, get: function () { return utils_js_1.latestChangedValue; } });
Object.defineProperty(exports, "mapObservableArrayCached", { enumerable: true, get: function () { return utils_js_1.mapObservableArrayCached; } });
Object.defineProperty(exports, "observableFromEvent", { enumerable: true, get: function () { return utils_js_1.observableFromEvent; } });
Object.defineProperty(exports, "observableFromEventOpts", { enumerable: true, get: function () { return utils_js_1.observableFromEventOpts; } });
Object.defineProperty(exports, "observableFromPromise", { enumerable: true, get: function () { return utils_js_1.observableFromPromise; } });
Object.defineProperty(exports, "observableFromValueWithChangeEvent", { enumerable: true, get: function () { return utils_js_1.observableFromValueWithChangeEvent; } });
Object.defineProperty(exports, "observableSignal", { enumerable: true, get: function () { return utils_js_1.observableSignal; } });
Object.defineProperty(exports, "observableSignalFromEvent", { enumerable: true, get: function () { return utils_js_1.observableSignalFromEvent; } });
Object.defineProperty(exports, "recomputeInitiallyAndOnChange", { enumerable: true, get: function () { return utils_js_1.recomputeInitiallyAndOnChange; } });
Object.defineProperty(exports, "runOnChange", { enumerable: true, get: function () { return utils_js_1.runOnChange; } });
Object.defineProperty(exports, "runOnChangeWithStore", { enumerable: true, get: function () { return utils_js_1.runOnChangeWithStore; } });
Object.defineProperty(exports, "signalFromObservable", { enumerable: true, get: function () { return utils_js_1.signalFromObservable; } });
Object.defineProperty(exports, "ValueWithChangeEventFromObservable", { enumerable: true, get: function () { return utils_js_1.ValueWithChangeEventFromObservable; } });
Object.defineProperty(exports, "wasEventTriggeredRecently", { enumerable: true, get: function () { return utils_js_1.wasEventTriggeredRecently; } });
const logging_js_1 = require("./logging.js");
// Remove "//" in the next line to enable logging
const enableLogging = false;
if (enableLogging) {
    (0, logging_js_1.setLogger)(new logging_js_1.ConsoleObservableLogger());
}
//# sourceMappingURL=index.js.map