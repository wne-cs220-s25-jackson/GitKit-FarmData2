"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.INativeEnvironmentService = exports.IEnvironmentService = void 0;
const instantiation_js_1 = require("../../instantiation/common/instantiation.js");
exports.IEnvironmentService = (0, instantiation_js_1.createDecorator)('environmentService');
exports.INativeEnvironmentService = (0, instantiation_js_1.refineServiceDecorator)(exports.IEnvironmentService);
//# sourceMappingURL=environment.js.map