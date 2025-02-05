"use strict";
// *****************************************************************************
// Copyright (C) 2023 Mathieu Bussieres and others.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMessageArg = exports.TestItemReference = exports.TestFailureDTO = exports.TestExecutionState = exports.TestRunProfileKind = void 0;
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation and others. All rights reserved.
 *  Licensed under the MIT License. See https://github.com/Microsoft/vscode/blob/master/LICENSE.txt for license information.
 *--------------------------------------------------------------------------------------------*/
// Based on https://github.com/microsoft/vscode/blob/1.72.2/src/vs/workbench/contrib/testing/common/testTypes.ts
/* eslint-disable import/no-extraneous-dependencies */
const markdown_rendering_1 = require("@theia/core/lib/common/markdown-rendering");
const core_1 = require("@theia/core");
var TestRunProfileKind;
(function (TestRunProfileKind) {
    TestRunProfileKind[TestRunProfileKind["Run"] = 1] = "Run";
    TestRunProfileKind[TestRunProfileKind["Debug"] = 2] = "Debug";
    TestRunProfileKind[TestRunProfileKind["Coverage"] = 3] = "Coverage";
})(TestRunProfileKind || (exports.TestRunProfileKind = TestRunProfileKind = {}));
var TestExecutionState;
(function (TestExecutionState) {
    TestExecutionState[TestExecutionState["Queued"] = 1] = "Queued";
    TestExecutionState[TestExecutionState["Running"] = 2] = "Running";
    TestExecutionState[TestExecutionState["Passed"] = 3] = "Passed";
    TestExecutionState[TestExecutionState["Failed"] = 4] = "Failed";
    TestExecutionState[TestExecutionState["Skipped"] = 5] = "Skipped";
    TestExecutionState[TestExecutionState["Errored"] = 6] = "Errored";
})(TestExecutionState || (exports.TestExecutionState = TestExecutionState = {}));
var TestFailureDTO;
(function (TestFailureDTO) {
    function is(ref) {
        return (0, core_1.isObject)(ref)
            && (ref.state === TestExecutionState.Failed || ref.state === TestExecutionState.Errored);
    }
    TestFailureDTO.is = is;
})(TestFailureDTO || (exports.TestFailureDTO = TestFailureDTO = {}));
var TestItemReference;
(function (TestItemReference) {
    function is(ref) {
        return (0, core_1.isObject)(ref)
            && ref.typeTag === '$type_test_item_reference'
            && typeof ref.controllerId === 'string'
            && Array.isArray(ref.testPath);
    }
    TestItemReference.is = is;
    function create(controllerId, testPath) {
        return {
            typeTag: '$type_test_item_reference',
            controllerId,
            testPath
        };
    }
    TestItemReference.create = create;
})(TestItemReference || (exports.TestItemReference = TestItemReference = {}));
var TestMessageArg;
(function (TestMessageArg) {
    function is(arg) {
        return (0, core_1.isObject)(arg)
            && (0, core_1.isObject)(arg.testMessage)
            && (markdown_rendering_1.MarkdownString.is(arg.testMessage.message) || typeof arg.testMessage.message === 'string');
    }
    TestMessageArg.is = is;
    function create(testItemReference, testMessageDTO) {
        return {
            testItemReference: testItemReference,
            testMessage: testMessageDTO
        };
    }
    TestMessageArg.create = create;
})(TestMessageArg || (exports.TestMessageArg = TestMessageArg = {}));
//# sourceMappingURL=test-types.js.map