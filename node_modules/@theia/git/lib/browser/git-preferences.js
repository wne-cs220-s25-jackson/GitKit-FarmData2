"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.bindGitPreferences = exports.createGitPreferences = exports.GitPreferences = exports.GitPreferenceContribution = exports.GitConfigSchema = void 0;
const browser_1 = require("@theia/core/lib/browser");
const nls_1 = require("@theia/core/lib/common/nls");
/* eslint-disable max-len */
exports.GitConfigSchema = {
    'type': 'object',
    'properties': {
        'git.decorations.enabled': {
            'type': 'boolean',
            'description': nls_1.nls.localize('vscode.git/package/config.decorations.enabled', 'Show Git file status in the navigator.'),
            'default': true
        },
        'git.decorations.colors': {
            'type': 'boolean',
            'description': nls_1.nls.localize('theia/git/gitDecorationsColors', 'Use color decoration in the navigator.'),
            'default': true
        },
        'git.editor.decorations.enabled': {
            'type': 'boolean',
            'description': nls_1.nls.localize('theia/git/editorDecorationsEnabled', 'Show git decorations in the editor.'),
            'default': true
        },
        'git.editor.dirtyDiff.linesLimit': {
            'type': 'number',
            'description': nls_1.nls.localize('theia/git/dirtyDiffLinesLimit', 'Do not show dirty diff decorations, if editor\'s line count exceeds this limit.'),
            'default': 1000
        },
        'git.alwaysSignOff': {
            'type': 'boolean',
            'description': nls_1.nls.localize('vscode.git/package/config.alwaysSignOff', 'Always sign off commits.'),
            'default': false
        },
        'git.untrackedChanges': {
            type: 'string',
            enum: [
                nls_1.nls.localize('theia/scm/config.untrackedChanges.mixed', 'mixed'),
                nls_1.nls.localize('theia/scm/config.untrackedChanges.separate', 'separate'),
                nls_1.nls.localize('theia/scm/config.untrackedChanges.hidden', 'hidden')
            ],
            enumDescriptions: [
                nls_1.nls.localize('theia/scm/config.untrackedChanges.mixed/description', 'All changes, tracked and untracked, appear together and behave equally.'),
                nls_1.nls.localize('theia/scm/config.untrackedChanges.separate/description', 'Untracked changes appear separately in the Source Control view. They are also excluded from several actions.'),
                nls_1.nls.localize('theia/scm/config.untrackedChanges.hidden/description', 'Untracked changes are hidden and excluded from several actions.'),
            ],
            description: nls_1.nls.localize('theia/scm/config.untrackedChanges', 'Controls how untracked changes behave.'),
            default: 'mixed',
            scope: 'resource',
        }
    }
};
exports.GitPreferenceContribution = Symbol('GitPreferenceContribution');
exports.GitPreferences = Symbol('GitPreferences');
function createGitPreferences(preferences, schema = exports.GitConfigSchema) {
    return (0, browser_1.createPreferenceProxy)(preferences, schema);
}
exports.createGitPreferences = createGitPreferences;
function bindGitPreferences(bind) {
    bind(exports.GitPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(browser_1.PreferenceService);
        const contribution = ctx.container.get(exports.GitPreferenceContribution);
        return createGitPreferences(preferences, contribution.schema);
    }).inSingletonScope();
    bind(exports.GitPreferenceContribution).toConstantValue({ schema: exports.GitConfigSchema });
    bind(browser_1.PreferenceContribution).toService(exports.GitPreferenceContribution);
}
exports.bindGitPreferences = bindGitPreferences;
//# sourceMappingURL=git-preferences.js.map