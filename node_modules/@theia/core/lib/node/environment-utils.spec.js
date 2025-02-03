"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
const chai = require("chai");
const environment_utils_1 = require("./environment-utils");
const expect = chai.expect;
describe('EnvironmentUtils', function () {
    describe('#mergeProcessEnv', function () {
        this.timeout(5000);
        let utils;
        const PATH = 'PATH';
        beforeEach(function () {
            utils = new environment_utils_1.EnvironmentUtils();
        });
        it('should validate the presence of a known process variable', function () {
            const mergedEnv = utils.mergeProcessEnv({});
            expect(mergedEnv[PATH]).length.greaterThan(0);
        });
        for (const platform of ['linux', 'darwin']) {
            it(`should conserve case for keys on "${platform}"`, function () {
                utils['getPlatform'] = () => platform;
                process.env['TestKey'] = 'test_value';
                const mergedEnv = utils.mergeProcessEnv({});
                expect(mergedEnv['TestKey']).equal('test_value');
                expect(mergedEnv['TESTKEY']).equal(undefined);
            });
        }
        it('should uppercase keys on "win32"', function () {
            utils['getPlatform'] = () => 'win32';
            process.env['TestKey'] = 'test_value';
            const mergedEnv = utils.mergeProcessEnv({});
            expect(mergedEnv['TestKey']).equal(undefined);
            expect(mergedEnv['TESTKEY']).equal('test_value');
        });
        it('should be possible to remove a known process variable', function () {
            // eslint-disable-next-line no-null/no-null
            const customizedEnv = { [PATH]: null };
            const mergedEnv = utils.mergeProcessEnv(customizedEnv);
            expect(mergedEnv[PATH]).equal(undefined);
        });
        it('should be possible to override the value of a known process variable', function () {
            const expectedValue = '/path/to/one';
            const customizedEnv = { [PATH]: expectedValue };
            const mergedEnv = utils.mergeProcessEnv(customizedEnv);
            expect(mergedEnv[PATH]).equals(expectedValue);
        });
        it('should not produce a different result when merging a previous result', function () {
            const variableName = 'NEW_VARIABLE';
            const expectedValue = 'true';
            const customizedEnv = { [variableName]: expectedValue };
            const mergedEnv = utils.mergeProcessEnv(customizedEnv);
            expect(mergedEnv[variableName]).equals(expectedValue);
        });
        it('should not produce a different result when performing multiple merges', function () {
            const variableName = 'NEW_VARIABLE';
            const expectedValue = 'true';
            const customizedEnv = { [variableName]: expectedValue };
            const mergedEnv = utils.mergeProcessEnv(customizedEnv);
            const mergedSecondPass = utils.mergeProcessEnv(mergedEnv);
            expect(mergedEnv).to.deep.equal(mergedSecondPass);
        });
    });
});
//# sourceMappingURL=environment-utils.spec.js.map