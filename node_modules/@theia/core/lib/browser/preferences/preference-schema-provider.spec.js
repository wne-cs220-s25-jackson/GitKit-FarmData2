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
const jsdom_1 = require("../test/jsdom");
let disableJSDOM = (0, jsdom_1.enableJSDOM)();
const assert = require("assert");
const inversify_1 = require("inversify");
const frontend_application_bindings_1 = require("../frontend-application-bindings");
const preference_contribution_1 = require("./preference-contribution");
const frontend_application_config_provider_1 = require("../frontend-application-config-provider");
disableJSDOM();
process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    throw reason;
});
// const { expect } = require('chai');
let testContainer;
function createTestContainer() {
    const result = new inversify_1.Container();
    (0, frontend_application_bindings_1.bindPreferenceService)(result.bind.bind(result));
    return result;
}
const EDITOR_FONT_SIZE_PROPERTIES = {
    'editor.fontSize': {
        type: 'number',
        default: 14,
        overridable: true
    },
};
const EDITOR_INSERT_SPACES_PROPERTIES = {
    'editor.insertSpaces': {
        type: 'boolean',
        default: true,
        overridable: true
    },
};
describe('Preference Schema Provider', () => {
    let prefSchema;
    before(() => {
        disableJSDOM = (0, jsdom_1.enableJSDOM)();
        frontend_application_config_provider_1.FrontendApplicationConfigProvider.set({
            preferences: {
                'editor.fontSize': 20,
                '[typescript]': { 'editor.fontSize': 24 }
            }
        });
    });
    after(() => {
        disableJSDOM();
    });
    beforeEach(async () => {
        testContainer = createTestContainer();
        prefSchema = testContainer.get(preference_contribution_1.PreferenceSchemaProvider);
    });
    it('Should load all preferences specified in the frontend config.', () => {
        assert.strictEqual(prefSchema.get('editor.fontSize'), 20);
        assert.strictEqual(prefSchema.get('[typescript].editor.fontSize'), 24);
    });
    it('Should favor the default specified in the package.json over a default registered by a schema', () => {
        prefSchema.setSchema({
            properties: {
                ...EDITOR_FONT_SIZE_PROPERTIES
            }
        });
        assert.strictEqual(prefSchema.get('editor.fontSize'), 20);
    });
    it('Should merge language-specific overrides from schemas and the package.json', () => {
        prefSchema.setSchema({
            properties: {
                ...EDITOR_FONT_SIZE_PROPERTIES,
                ...EDITOR_INSERT_SPACES_PROPERTIES,
                '[typescript]': {
                    type: 'object',
                    default: {
                        'editor.insertSpaces': false
                    }
                }
            }
        });
        assert.strictEqual(prefSchema.get('editor.insertSpaces'), true);
        assert.strictEqual(prefSchema.get('[typescript].editor.insertSpaces'), false);
        assert.strictEqual(prefSchema.get('[typescript].editor.fontSize'), 24);
    });
    it('Should favor package.json specifications in the merge process', () => {
        prefSchema.setSchema({
            properties: {
                ...EDITOR_FONT_SIZE_PROPERTIES,
                ...EDITOR_INSERT_SPACES_PROPERTIES,
                '[typescript]': {
                    type: 'object',
                    default: {
                        'editor.insertSpaces': false,
                        'editor.fontSize': 36,
                    }
                }
            }
        });
        assert.strictEqual(prefSchema.get('[typescript].editor.insertSpaces'), false);
        assert.strictEqual(prefSchema.get('[typescript].editor.fontSize'), 24);
    });
});
//# sourceMappingURL=preference-schema-provider.spec.js.map