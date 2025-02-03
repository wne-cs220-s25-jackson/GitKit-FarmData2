"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsdom_1 = require("../test/jsdom");
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const assert = require("assert");
const inversify_1 = require("inversify");
const frontend_application_bindings_1 = require("../frontend-application-bindings");
const test_1 = require("./test");
const preference_service_1 = require("./preference-service");
const preference_contribution_1 = require("./preference-contribution");
const preference_scope_1 = require("./preference-scope");
const preference_provider_1 = require("./preference-provider");
const frontend_application_config_provider_1 = require("../frontend-application-config-provider");
const preference_proxy_1 = require("./preference-proxy");
disableJSDOM();
process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    throw reason;
});
const { expect } = require('chai');
let testContainer;
function createTestContainer() {
    const result = new inversify_1.Container();
    (0, frontend_application_bindings_1.bindPreferenceService)(result.bind.bind(result));
    (0, test_1.bindMockPreferenceProviders)(result.bind.bind(result), result.unbind.bind(result));
    return result;
}
describe('Preference Service', () => {
    let prefService;
    let prefSchema;
    before(() => {
        disableJSDOM = (0, jsdom_1.enableJSDOM)();
        frontend_application_config_provider_1.FrontendApplicationConfigProvider.set({});
    });
    after(() => {
        disableJSDOM();
    });
    beforeEach(async () => {
        testContainer = createTestContainer();
        prefSchema = testContainer.get(preference_contribution_1.PreferenceSchemaProvider);
        prefService = testContainer.get(preference_service_1.PreferenceService);
        getProvider(preference_scope_1.PreferenceScope.User).markReady();
        getProvider(preference_scope_1.PreferenceScope.Workspace).markReady();
        getProvider(preference_scope_1.PreferenceScope.Folder).markReady();
        console.log('before ready');
        try {
            await prefService.ready;
        }
        catch (e) {
            console.error(e);
        }
        console.log('done');
    });
    afterEach(() => {
    });
    function getProvider(scope) {
        return testContainer.getNamed(preference_provider_1.PreferenceProvider, scope);
    }
    it('should return the preference from the more specific scope (user > workspace)', () => {
        prefSchema.setSchema({
            properties: {
                'test.number': {
                    type: 'number',
                    scope: 'resource'
                }
            }
        });
        const userProvider = getProvider(preference_scope_1.PreferenceScope.User);
        const workspaceProvider = getProvider(preference_scope_1.PreferenceScope.Workspace);
        const folderProvider = getProvider(preference_scope_1.PreferenceScope.Folder);
        userProvider.setPreference('test.number', 1);
        expect(prefService.get('test.number')).equals(1);
        workspaceProvider.setPreference('test.number', 0);
        expect(prefService.get('test.number')).equals(0);
        folderProvider.setPreference('test.number', 2);
        expect(prefService.get('test.number')).equals(2);
        // remove property on lower scope
        folderProvider.setPreference('test.number', undefined);
        expect(prefService.get('test.number')).equals(0);
    });
    it('should throw a TypeError if the preference (reference object) is modified', () => {
        prefSchema.setSchema({
            properties: {
                'test.immutable': {
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                    scope: 'resource'
                }
            }
        });
        const userProvider = getProvider(preference_scope_1.PreferenceScope.User);
        userProvider.setPreference('test.immutable', [
            'test', 'test', 'test'
        ]);
        const immutablePref = prefService.get('test.immutable');
        expect(immutablePref).to.not.be.undefined;
        if (immutablePref !== undefined) {
            expect(() => immutablePref.push('fails')).to.throw(TypeError);
        }
    });
    it('should still report the more specific preference even though the less specific one changed', () => {
        prefSchema.setSchema({
            properties: {
                'test.number': {
                    type: 'number',
                    scope: 'resource'
                }
            }
        });
        const userProvider = getProvider(preference_scope_1.PreferenceScope.User);
        const workspaceProvider = getProvider(preference_scope_1.PreferenceScope.Workspace);
        userProvider.setPreference('test.number', 1);
        workspaceProvider.setPreference('test.number', 0);
        expect(prefService.get('test.number')).equals(0);
        userProvider.setPreference('test.number', 4);
        expect(prefService.get('test.number')).equals(0);
    });
    it('should not fire events if preference schema is unset in the same tick ', async () => {
        const events = [];
        prefService.onPreferenceChanged(event => events.push(event));
        prefSchema.registerOverrideIdentifier('go');
        const toUnset = prefSchema.setSchema({
            properties: {
                'editor.insertSpaces': {
                    type: 'boolean',
                    default: true,
                    overridable: true
                },
                '[go]': {
                    type: 'object',
                    default: {
                        'editor.insertSpaces': false
                    }
                }
            }
        });
        assert.deepStrictEqual([], events.map(e => ({
            preferenceName: e.preferenceName,
            newValue: e.newValue,
            oldValue: e.oldValue
        })), 'events after set in the same tick');
        assert.strictEqual(prefService.get('editor.insertSpaces'), true, 'get before');
        assert.strictEqual(prefService.get('[go].editor.insertSpaces'), false, 'get before overridden');
        toUnset.dispose();
        assert.deepStrictEqual([], events.map(e => ({
            preferenceName: e.preferenceName,
            newValue: e.newValue,
            oldValue: e.oldValue
        })), 'events after unset in the same tick');
        assert.strictEqual(prefService.get('editor.insertSpaces'), undefined, 'get after');
        assert.strictEqual(prefService.get('[go].editor.insertSpaces'), undefined, 'get after overridden');
        assert.deepStrictEqual([], events.map(e => ({
            preferenceName: e.preferenceName,
            newValue: e.newValue,
            oldValue: e.oldValue
        })), 'events in next tick');
    });
    it('should fire events if preference schema is unset in another tick', async () => {
        prefSchema.registerOverrideIdentifier('go');
        let pending = new Promise(resolve => prefService.onPreferencesChanged(resolve));
        const toUnset = prefSchema.setSchema({
            properties: {
                'editor.insertSpaces': {
                    type: 'boolean',
                    default: true,
                    overridable: true
                },
                '[go]': {
                    type: 'object',
                    default: {
                        'editor.insertSpaces': false
                    }
                }
            }
        });
        let changes = await pending;
        assert.deepStrictEqual([{
                preferenceName: 'editor.insertSpaces',
                newValue: true,
                oldValue: undefined
            }, {
                preferenceName: '[go].editor.insertSpaces',
                newValue: false,
                oldValue: undefined
            }], Object.keys(changes).map(key => {
            const { preferenceName, newValue, oldValue } = changes[key];
            return { preferenceName, newValue, oldValue };
        }), 'events before');
        assert.strictEqual(prefService.get('editor.insertSpaces'), true, 'get before');
        assert.strictEqual(prefService.get('[go].editor.insertSpaces'), false, 'get before overridden');
        pending = new Promise(resolve => prefService.onPreferencesChanged(resolve));
        toUnset.dispose();
        changes = await pending;
        assert.deepStrictEqual([{
                preferenceName: 'editor.insertSpaces',
                newValue: undefined,
                oldValue: true
            }, {
                preferenceName: '[go].editor.insertSpaces',
                newValue: undefined,
                oldValue: false
            }], Object.keys(changes).map(key => {
            const { preferenceName, newValue, oldValue } = changes[key];
            return { preferenceName, newValue, oldValue };
        }), 'events after');
        assert.strictEqual(prefService.get('editor.insertSpaces'), undefined, 'get after');
        assert.strictEqual(prefService.get('[go].editor.insertSpaces'), undefined, 'get after overridden');
    });
    function prepareServices(options) {
        prefSchema.setSchema(options && options.schema || {
            properties: {
                'editor.tabSize': {
                    type: 'number',
                    description: '',
                    overridable: true,
                    default: 4
                }
            }
        });
        return { preferences: prefService, schema: prefSchema };
    }
    describe('PreferenceService.updateValues()', () => {
        const TAB_SIZE = 'editor.tabSize';
        const DUMMY_URI = 'dummy_uri';
        async function generateAndCheckValues(preferences, globalValue, workspaceValue, workspaceFolderValue) {
            var _a, _b;
            await preferences.set(TAB_SIZE, globalValue, preference_scope_1.PreferenceScope.User);
            await preferences.set(TAB_SIZE, workspaceValue, preference_scope_1.PreferenceScope.Workspace);
            await preferences.set(TAB_SIZE, workspaceFolderValue, preference_scope_1.PreferenceScope.Folder, DUMMY_URI);
            const expectedValue = (_b = (_a = workspaceFolderValue !== null && workspaceFolderValue !== void 0 ? workspaceFolderValue : workspaceValue) !== null && _a !== void 0 ? _a : globalValue) !== null && _b !== void 0 ? _b : 4;
            checkValues(preferences, globalValue, workspaceValue, workspaceFolderValue, expectedValue);
        }
        function checkValues(preferences, globalValue, workspaceValue, workspaceFolderValue, value = 4) {
            const expected = {
                preferenceName: 'editor.tabSize',
                defaultValue: 4,
                globalValue,
                workspaceValue,
                workspaceFolderValue,
                value,
            };
            const inspection = preferences.inspect(TAB_SIZE, DUMMY_URI);
            assert.deepStrictEqual(inspection, expected);
        }
        it('should modify the narrowest scope.', async () => {
            const { preferences } = prepareServices();
            await generateAndCheckValues(preferences, 1, 2, 3);
            await preferences.updateValue(TAB_SIZE, 8, DUMMY_URI);
            checkValues(preferences, 1, 2, 8, 8);
            await generateAndCheckValues(preferences, 1, 2, undefined);
            await preferences.updateValue(TAB_SIZE, 8, DUMMY_URI);
            checkValues(preferences, 1, 8, undefined, 8);
            await generateAndCheckValues(preferences, 1, undefined, undefined);
            await preferences.updateValue(TAB_SIZE, 8, DUMMY_URI);
            checkValues(preferences, 8, undefined, undefined, 8);
        });
        it('defaults to user scope.', async () => {
            const { preferences } = prepareServices();
            checkValues(preferences, undefined, undefined, undefined);
            await preferences.updateValue(TAB_SIZE, 8, DUMMY_URI);
            checkValues(preferences, 8, undefined, undefined, 8);
        });
        it('clears all settings when input is undefined.', async () => {
            const { preferences } = prepareServices();
            await generateAndCheckValues(preferences, 1, 2, 3);
            await preferences.updateValue(TAB_SIZE, undefined, DUMMY_URI);
            checkValues(preferences, undefined, undefined, undefined);
        });
        it('deletes user setting if user is only defined scope and target is default value', async () => {
            const { preferences } = prepareServices();
            await generateAndCheckValues(preferences, 8, undefined, undefined);
            await preferences.updateValue(TAB_SIZE, 4, DUMMY_URI);
            checkValues(preferences, undefined, undefined, undefined);
        });
        it('does not delete setting in lower scopes, even if target is default', async () => {
            const { preferences } = prepareServices();
            await generateAndCheckValues(preferences, undefined, 2, undefined);
            await preferences.updateValue(TAB_SIZE, 4, DUMMY_URI);
            checkValues(preferences, undefined, 4, undefined);
        });
    });
    describe('overridden preferences', () => {
        it('get #0', () => {
            const { preferences, schema } = prepareServices();
            preferences.set('[json].editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            expect(preferences.get('editor.tabSize')).to.equal(4);
            expect(preferences.get('[json].editor.tabSize')).to.equal(undefined);
            schema.registerOverrideIdentifier('json');
            expect(preferences.get('editor.tabSize')).to.equal(4);
            expect(preferences.get('[json].editor.tabSize')).to.equal(2);
        });
        it('get #1', () => {
            const { preferences, schema } = prepareServices();
            schema.registerOverrideIdentifier('json');
            expect(preferences.get('editor.tabSize')).to.equal(4);
            expect(preferences.get('[json].editor.tabSize')).to.equal(4);
            preferences.set('[json].editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            expect(preferences.get('editor.tabSize')).to.equal(4);
            expect(preferences.get('[json].editor.tabSize')).to.equal(2);
        });
        it('get #2', () => {
            const { preferences, schema } = prepareServices();
            schema.registerOverrideIdentifier('json');
            expect(preferences.get('editor.tabSize')).to.equal(4);
            expect(preferences.get('[json].editor.tabSize')).to.equal(4);
            preferences.set('editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            expect(preferences.get('editor.tabSize')).to.equal(2);
            expect(preferences.get('[json].editor.tabSize')).to.equal(2);
        });
        it('has', () => {
            const { preferences, schema } = prepareServices();
            expect(preferences.has('editor.tabSize')).to.be.true;
            expect(preferences.has('[json].editor.tabSize')).to.be.false;
            schema.registerOverrideIdentifier('json');
            expect(preferences.has('editor.tabSize')).to.be.true;
            expect(preferences.has('[json].editor.tabSize')).to.be.true;
        });
        it('inspect #0', () => {
            const { preferences, schema } = prepareServices();
            const expected = {
                preferenceName: 'editor.tabSize',
                defaultValue: 4,
                globalValue: undefined,
                workspaceValue: undefined,
                workspaceFolderValue: undefined,
                value: 4,
            };
            assert.deepStrictEqual(expected, preferences.inspect('editor.tabSize'));
            assert.ok(!preferences.has('[json].editor.tabSize'));
            schema.registerOverrideIdentifier('json');
            assert.deepStrictEqual(expected, preferences.inspect('editor.tabSize'));
            assert.deepStrictEqual({
                ...expected,
                preferenceName: '[json].editor.tabSize'
            }, preferences.inspect('[json].editor.tabSize'));
        });
        it('inspect #1', () => {
            const { preferences, schema } = prepareServices();
            const expected = {
                preferenceName: 'editor.tabSize',
                defaultValue: 4,
                globalValue: 2,
                workspaceValue: undefined,
                workspaceFolderValue: undefined,
                value: 2
            };
            preferences.set('editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            assert.deepStrictEqual(expected, preferences.inspect('editor.tabSize'));
            assert.ok(!preferences.has('[json].editor.tabSize'));
            schema.registerOverrideIdentifier('json');
            assert.deepStrictEqual(expected, preferences.inspect('editor.tabSize'));
            assert.deepStrictEqual({
                ...expected,
                preferenceName: '[json].editor.tabSize'
            }, preferences.inspect('[json].editor.tabSize'));
        });
        it('inspect #2', () => {
            const { preferences, schema } = prepareServices();
            const expected = {
                preferenceName: 'editor.tabSize',
                defaultValue: 4,
                globalValue: undefined,
                workspaceValue: undefined,
                workspaceFolderValue: undefined,
                value: 4
            };
            assert.deepStrictEqual(expected, preferences.inspect('editor.tabSize'));
            assert.ok(!preferences.has('[json].editor.tabSize'));
            schema.registerOverrideIdentifier('json');
            preferences.set('[json].editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            assert.deepStrictEqual(expected, preferences.inspect('editor.tabSize'));
            assert.deepStrictEqual({
                ...expected,
                preferenceName: '[json].editor.tabSize',
                globalValue: 2,
                value: 2,
            }, preferences.inspect('[json].editor.tabSize'));
        });
        it('onPreferenceChanged #0', async () => {
            const { preferences, schema } = prepareServices();
            const events = [];
            preferences.onPreferenceChanged(event => events.push(event));
            schema.registerOverrideIdentifier('json');
            preferences.set('[json].editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            await preferences.set('editor.tabSize', 3, preference_scope_1.PreferenceScope.User);
            assert.deepStrictEqual([{
                    preferenceName: '[json].editor.tabSize',
                    newValue: 2
                }, {
                    preferenceName: 'editor.tabSize',
                    newValue: 3
                }], events.map(e => ({
                preferenceName: e.preferenceName,
                newValue: e.newValue
            })));
        });
        it('onPreferenceChanged #1', async () => {
            const { preferences, schema } = prepareServices();
            const events = [];
            preferences.onPreferenceChanged(event => events.push(event));
            schema.registerOverrideIdentifier('json');
            await preferences.set('editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            assert.deepStrictEqual([{
                    preferenceName: 'editor.tabSize',
                    newValue: 2
                }, {
                    preferenceName: '[json].editor.tabSize',
                    newValue: 2
                }], events.map(e => ({
                preferenceName: e.preferenceName,
                newValue: e.newValue
            })));
        });
        it('onPreferenceChanged #2', async function () {
            const { preferences, schema } = prepareServices();
            schema.registerOverrideIdentifier('json');
            schema.registerOverrideIdentifier('javascript');
            preferences.set('[json].editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            await preferences.set('editor.tabSize', 3, preference_scope_1.PreferenceScope.User);
            const events = [];
            const proxy = (0, preference_proxy_1.createPreferenceProxy)(preferences, schema.getCombinedSchema(), { overrideIdentifier: 'json' });
            proxy.onPreferenceChanged(event => events.push(event));
            await preferences.set('[javascript].editor.tabSize', 4, preference_scope_1.PreferenceScope.User);
            assert.deepStrictEqual([], events.map(e => ({
                preferenceName: e.preferenceName,
                newValue: e.newValue
            })), 'changes not relevant to json override should be ignored');
        });
        it('onPreferenceChanged #3', async () => {
            const { preferences, schema } = prepareServices();
            schema.registerOverrideIdentifier('json');
            preferences.set('[json].editor.tabSize', 2, preference_scope_1.PreferenceScope.User);
            await preferences.set('editor.tabSize', 3, preference_scope_1.PreferenceScope.User);
            const events = [];
            preferences.onPreferenceChanged(event => events.push(event));
            await preferences.set('[json].editor.tabSize', undefined, preference_scope_1.PreferenceScope.User);
            assert.deepStrictEqual([{
                    preferenceName: '[json].editor.tabSize',
                    newValue: 3
                }], events.map(e => ({
                preferenceName: e.preferenceName,
                newValue: e.newValue
            })));
        });
        it('defaultOverrides [go].editor.formatOnSave', () => {
            const { preferences, schema } = prepareServices({
                schema: {
                    properties: {
                        'editor.insertSpaces': {
                            type: 'boolean',
                            default: true,
                            overridable: true
                        },
                        'editor.formatOnSave': {
                            type: 'boolean',
                            default: false,
                            overridable: true
                        }
                    }
                }
            });
            assert.strictEqual(true, preferences.get('editor.insertSpaces'));
            assert.strictEqual(undefined, preferences.get('[go].editor.insertSpaces'));
            assert.strictEqual(false, preferences.get('editor.formatOnSave'));
            assert.strictEqual(undefined, preferences.get('[go].editor.formatOnSave'));
            schema.registerOverrideIdentifier('go');
            schema.setSchema({
                id: 'defaultOverrides',
                title: 'Default Configuration Overrides',
                properties: {
                    '[go]': {
                        type: 'object',
                        default: {
                            'editor.insertSpaces': false,
                            'editor.formatOnSave': true
                        },
                        description: 'Configure editor settings to be overridden for go language.'
                    }
                }
            });
            assert.strictEqual(true, preferences.get('editor.insertSpaces'));
            assert.strictEqual(false, preferences.get('[go].editor.insertSpaces'));
            assert.strictEqual(false, preferences.get('editor.formatOnSave'));
            assert.strictEqual(true, preferences.get('[go].editor.formatOnSave'));
        });
    });
});
//# sourceMappingURL=preference-service.spec.js.map