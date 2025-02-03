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
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsdom_1 = require("@theia/core/lib/browser/test/jsdom");
const disableJSDOM = (0, jsdom_1.enableJSDOM)();
const frontend_application_config_provider_1 = require("@theia/core/lib/browser/frontend-application-config-provider");
frontend_application_config_provider_1.FrontendApplicationConfigProvider.set({});
const chai_1 = require("chai");
const inversify_1 = require("@theia/core/shared/inversify");
const preference_tree_generator_1 = require("./preference-tree-generator");
const preference_tree_label_provider_1 = require("./preference-tree-label-provider");
const preference_layout_1 = require("./preference-layout");
disableJSDOM();
describe('preference-tree-label-provider', () => {
    let preferenceTreeLabelProvider;
    beforeEach(() => {
        const container = new inversify_1.Container();
        container.bind(preference_layout_1.PreferenceLayoutProvider).toSelf().inSingletonScope();
        container.bind(preference_tree_generator_1.PreferenceTreeGenerator).toConstantValue({ getCustomLabelFor: () => { } });
        preferenceTreeLabelProvider = container.resolve(preference_tree_label_provider_1.PreferenceTreeLabelProvider);
    });
    it('PreferenceTreeLabelProvider.format', () => {
        const testString = 'aaaBbbCcc Dddd eee';
        (0, chai_1.expect)(preferenceTreeLabelProvider['formatString'](testString)).eq('Aaa Bbb Ccc Dddd eee');
    });
    it('PreferenceTreeLabelProvider.format.Chinese', () => {
        const testString = '某個設定/某个设定';
        (0, chai_1.expect)(preferenceTreeLabelProvider['formatString'](testString)).eq('某個設定/某个设定');
    });
    it('PreferenceTreeLabelProvider.format.Danish', () => {
        const testString = 'indstillingPåEnØ';
        (0, chai_1.expect)(preferenceTreeLabelProvider['formatString'](testString)).eq('Indstilling På En Ø');
    });
    it('PreferenceTreeLabelProvider.format.Greek', () => {
        const testString = 'κάποιαΡύθμιση';
        (0, chai_1.expect)(preferenceTreeLabelProvider['formatString'](testString)).eq('Κάποια Ρύθμιση');
    });
    it('PreferenceTreeLabelProvider.format.Russian', () => {
        const testString = 'некоторыеНастройки';
        (0, chai_1.expect)(preferenceTreeLabelProvider['formatString'](testString)).eq('Некоторые Настройки');
    });
    it('PreferenceTreeLabelProvider.format.Armenian', () => {
        const testString = 'ինչ-որՊարամետր';
        (0, chai_1.expect)(preferenceTreeLabelProvider['formatString'](testString)).eq('Ինչ-որ Պարամետր');
    });
    it('PreferenceTreeLabelProvider.format.specialCharacters', () => {
        const testString = 'hyphenated-wordC++Setting';
        (0, chai_1.expect)(preferenceTreeLabelProvider['formatString'](testString)).eq('Hyphenated-word C++ Setting');
    });
    describe('PreferenceTreeLabelProvider.createLeafNode', () => {
        it('when property constructs of three parts the third part is the leaf', () => {
            const property = 'category-name.subcategory.leaf';
            const expectedName = 'Leaf';
            testLeafName(property, expectedName);
        });
        it('when property constructs of two parts the second part is the leaf', () => {
            const property = 'category-name.leaf';
            const expectedName = 'Leaf';
            testLeafName(property, expectedName);
        });
        function testLeafName(property, expectedName) {
            const expectedSelectableTreeNode = {
                id: `group@${property}`,
                parent: undefined,
                visible: true,
                selected: false,
                depth: 2,
                preferenceId: property,
                preference: { data: {} }
            };
            (0, chai_1.expect)(preferenceTreeLabelProvider['getName'](expectedSelectableTreeNode)).deep.eq(expectedName);
        }
    });
});
//# sourceMappingURL=preference-tree-label-provider.spec.js.map