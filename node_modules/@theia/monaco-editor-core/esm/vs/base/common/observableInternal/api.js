"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.observableValueOpts = observableValueOpts;
const base_js_1 = require("./base.js");
const debugName_js_1 = require("./debugName.js");
const deps_js_1 = require("./commonFacade/deps.js");
const lazyObservableValue_js_1 = require("./lazyObservableValue.js");
function observableValueOpts(options, initialValue) {
    if (options.lazy) {
        return new lazyObservableValue_js_1.LazyObservableValue(new debugName_js_1.DebugNameData(options.owner, options.debugName, undefined), initialValue, options.equalsFn ?? deps_js_1.strictEquals);
    }
    return new base_js_1.ObservableValue(new debugName_js_1.DebugNameData(options.owner, options.debugName, undefined), initialValue, options.equalsFn ?? deps_js_1.strictEquals);
}
//# sourceMappingURL=api.js.map