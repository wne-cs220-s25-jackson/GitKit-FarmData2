"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
const chai_1 = require("chai");
const shell_quoting_1 = require("./shell-quoting");
describe('Shell arguments escaping:', () => {
    // Procedurally execute tests from this list of data.
    const testData = {
        bash: {
            // https://www.gnu.org/software/bash/manual/html_node/Quoting.html
            quotingFunctions: shell_quoting_1.BashQuotingFunctions,
            data: {
                ["escape" /* ShellQuoting.Escape */]: [
                    { input: 'abc', expected: 'abc' },
                    { input: 'ab c', expected: 'ab\\ c' },
                    { input: 'ab"c', expected: 'ab\\"c' },
                    { input: 'ab\'c', expected: 'ab\\\'c' },
                    { input: 'ab\\ c\\', expected: 'ab\\\\\\ c\\\\' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: 'setTimeout\\(\\(\\)\\ =\\>\\ \\{\\ console.log\\(1,\\ \\"2\\\'3\\"\\)\\;\\ \\},\\ 100\\)',
                    },
                ],
                ["strong" /* ShellQuoting.Strong */]: [
                    { input: 'abc', expected: '\'abc\'' },
                    { input: 'ab c', expected: '\'ab c\'' },
                    { input: 'ab"c', expected: '\'ab"c\'' },
                    { input: 'ab\'c', expected: '\'ab\'"\'"\'c\'' },
                    { input: 'ab\\ c\\', expected: '\'ab\\ c\\\'' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: '\'setTimeout(() => { console.log(1, "2\'"\'"\'3"); }, 100)\'',
                    },
                ],
                ["weak" /* ShellQuoting.Weak */]: [
                    { input: 'abc', expected: '"abc"' },
                    { input: 'ab c', expected: '"ab c"' },
                    { input: 'ab"c', expected: '"ab\\"c"' },
                    { input: 'ab\'c', expected: '"ab\'c"' },
                    { input: 'ab\\ c\\', expected: '"ab\\ c\\\\"' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: '"setTimeout(() => { console.log(1, \\"2\'3\\"); }, 100)"',
                    },
                ]
            },
        },
        cmd: {
            // https://ss64.com/nt/syntax-esc.html
            quotingFunctions: shell_quoting_1.CmdQuotingFunctions,
            data: {
                ["escape" /* ShellQuoting.Escape */]: [
                    { input: 'abc', expected: 'abc' },
                    { input: 'ab c', expected: 'ab" "c' },
                    { input: 'ab"c', expected: 'ab\\"c' },
                    { input: 'ab\'c', expected: 'ab\'c' },
                    { input: 'ab^ c^', expected: 'ab^^" "c^^' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: 'setTimeout^(^(^)" "=^>" "{" "console.log^(1," "\\"2\'3\\"^);" "}," "100^)',
                    },
                    {
                        input: 'console.log("%PATH%")',
                        expected: 'console.log^(\\"^%PATH^%\\"^)',
                    },
                ],
                ["strong" /* ShellQuoting.Strong */]: [
                    { input: 'abc', expected: '"abc"' },
                    { input: 'ab c', expected: '"ab c"' },
                    { input: 'ab"c', expected: '"ab\\"c"' },
                    { input: 'ab\'c', expected: '"ab\'c"' },
                    { input: 'ab^ c^', expected: '"ab^^ c^^"' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: '"setTimeout^(^(^) =^> { console.log^(1, \\"2\'3\\"^); }, 100^)"',
                    },
                    {
                        input: 'console.log("%PATH%")',
                        expected: '"console.log^(\\""%"PATH"%"\\"^)"',
                    },
                ],
                ["weak" /* ShellQuoting.Weak */]: [
                    { input: 'abc', expected: '"abc"' },
                    { input: 'ab c', expected: '"ab c"' },
                    { input: 'ab"c', expected: '"ab\\"c"' },
                    { input: 'ab\'c', expected: '"ab\'c"' },
                    { input: 'ab^ c^', expected: '"ab^^ c^^"' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: '"setTimeout^(^(^) =^> { console.log^(1, \\"2\'3\\"^); }, 100^)"',
                    },
                    {
                        input: 'console.log("%PATH%")',
                        expected: '"console.log^(\\"%PATH%\\"^)"',
                    },
                ]
            },
        },
        powershell: {
            // https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules?view=powershell-6
            quotingFunctions: shell_quoting_1.PowershellQuotingFunctions,
            data: {
                ["escape" /* ShellQuoting.Escape */]: [
                    { input: 'abc', expected: 'abc' },
                    { input: 'ab c', expected: 'ab` c' },
                    { input: 'ab"c', expected: 'ab`"c' },
                    { input: 'ab\'c', expected: 'ab`\'c' },
                    { input: 'ab` c`', expected: 'ab``` c``' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: 'setTimeout`(`(`)` =`>` `{` console.log`(1,` `"2`\'3`"`)`;` `},` 100`)',
                    },
                ],
                ["strong" /* ShellQuoting.Strong */]: [
                    { input: 'abc', expected: '\'abc\'' },
                    { input: 'ab c', expected: '\'ab c\'' },
                    { input: 'ab"c', expected: '\'ab"c\'' },
                    { input: 'ab\'c', expected: '\'ab\'\'c\'' },
                    { input: 'ab` c`', expected: '\'ab` c`\'' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: '\'setTimeout(() => { console.log(1, "2\'\'3"); }, 100)\'',
                    },
                ],
                ["weak" /* ShellQuoting.Weak */]: [
                    { input: 'abc', expected: '"abc"' },
                    { input: 'ab c', expected: '"ab c"' },
                    { input: 'ab"c', expected: '"ab`"c"' },
                    { input: 'ab\'c', expected: '"ab\'c"' },
                    { input: 'ab` c`', expected: '"ab` c``"' },
                    {
                        input: 'setTimeout(() => { console.log(1, "2\'3"); }, 100)',
                        expected: '"setTimeout(() => { console.log(1, `"2\'3`"); }, 100)"',
                    },
                ]
            },
        }
    };
    // Iter through each runtime (bash/cmd/powershell):
    for (const runtime of Object.keys(testData)) {
        const testInfo = testData[runtime];
        // Get all quoting types (escape/strong/weak):
        for (const quotingType of Object.keys(testInfo.data)) {
            const testInput = testInfo.data[quotingType];
            // Run the test for each input:
            it(`${runtime}/${quotingType}`, () => {
                for (const test of testInput) {
                    (0, chai_1.expect)((0, shell_quoting_1.escapeForShell)({
                        quoting: quotingType,
                        value: test.input,
                    }, testInfo.quotingFunctions)).equal(test.expected);
                }
            });
        }
    }
});
//# sourceMappingURL=shell-quoting.spec.js.map