"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.KeybindingsContributionPointHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const keybinding_1 = require("@theia/core/lib/browser/keybinding");
const os_1 = require("@theia/core/lib/common/os");
const disposable_1 = require("@theia/core/lib/common/disposable");
const core_1 = require("@theia/core");
let KeybindingsContributionPointHandler = class KeybindingsContributionPointHandler {
    handle(contributions) {
        if (!contributions || !contributions.keybindings) {
            return disposable_1.Disposable.NULL;
        }
        const toDispose = new core_1.DisposableCollection();
        for (const raw of contributions.keybindings) {
            const keybinding = this.toKeybinding(raw);
            if (keybinding) {
                toDispose.push(this.keybindingRegistry.registerKeybinding(keybinding));
            }
        }
        return toDispose;
    }
    toKeybinding(pluginKeybinding) {
        const keybinding = this.toOSKeybinding(pluginKeybinding);
        if (!keybinding) {
            return undefined;
        }
        const { command, when, args } = pluginKeybinding;
        return { keybinding, command, when, args };
    }
    toOSKeybinding(pluginKeybinding) {
        let keybinding;
        const os = os_1.OS.type();
        if (os === os_1.OS.Type.Windows) {
            keybinding = pluginKeybinding.win;
        }
        else if (os === os_1.OS.Type.OSX) {
            keybinding = pluginKeybinding.mac;
        }
        else {
            keybinding = pluginKeybinding.linux;
        }
        return keybinding || pluginKeybinding.keybinding;
    }
};
exports.KeybindingsContributionPointHandler = KeybindingsContributionPointHandler;
tslib_1.__decorate([
    (0, inversify_1.inject)(keybinding_1.KeybindingRegistry),
    tslib_1.__metadata("design:type", keybinding_1.KeybindingRegistry)
], KeybindingsContributionPointHandler.prototype, "keybindingRegistry", void 0);
exports.KeybindingsContributionPointHandler = KeybindingsContributionPointHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], KeybindingsContributionPointHandler);
//# sourceMappingURL=keybindings-contribution-handler.js.map