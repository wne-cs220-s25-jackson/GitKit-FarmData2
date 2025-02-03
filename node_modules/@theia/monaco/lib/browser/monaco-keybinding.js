"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.MonacoKeybindingContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const monaco_command_1 = require("./monaco-command");
const monaco_command_registry_1 = require("./monaco-command-registry");
const core_1 = require("@theia/core");
const monaco_resolved_keybinding_1 = require("./monaco-resolved-keybinding");
const keybindingsRegistry_1 = require("@theia/monaco-editor-core/esm/vs/platform/keybinding/common/keybindingsRegistry");
const standaloneServices_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices");
const keybinding_1 = require("@theia/monaco-editor-core/esm/vs/platform/keybinding/common/keybinding");
const monaco_context_key_service_1 = require("./monaco-context-key-service");
const monaco_keycode_map_1 = require("./monaco-keycode-map");
const monaco = require("@theia/monaco-editor-core");
let MonacoKeybindingContribution = class MonacoKeybindingContribution {
    constructor() {
        this.toDisposeOnKeybindingChange = new core_1.DisposableCollection();
    }
    init() {
        this.keybindings.onKeybindingsChanged(() => this.updateMonacoKeybindings());
    }
    registerKeybindings(registry) {
        var _a;
        const defaultKeybindings = keybindingsRegistry_1.KeybindingsRegistry.getDefaultKeybindings();
        for (const item of defaultKeybindings) {
            const command = this.commands.validate(item.command || undefined);
            if (command && item.keybinding) {
                const when = (_a = (item.when && item.when.serialize())) !== null && _a !== void 0 ? _a : undefined;
                let keybinding;
                if (item.command === monaco_command_1.MonacoCommands.GO_TO_DEFINITION && !core_1.environment.electron.is()) {
                    keybinding = 'ctrlcmd+f11';
                }
                else {
                    keybinding = monaco_resolved_keybinding_1.MonacoResolvedKeybinding.toKeybinding(item.keybinding.chords);
                }
                registry.registerKeybinding({ command, keybinding, when });
            }
        }
    }
    updateMonacoKeybindings() {
        const monacoKeybindingRegistry = standaloneServices_1.StandaloneServices.get(keybinding_1.IKeybindingService);
        if (monacoKeybindingRegistry instanceof standaloneServices_1.StandaloneKeybindingService) {
            this.toDisposeOnKeybindingChange.dispose();
            for (const binding of this.keybindings.getKeybindingsByScope(browser_1.KeybindingScope.USER).concat(this.keybindings.getKeybindingsByScope(browser_1.KeybindingScope.WORKSPACE))) {
                const resolved = this.keybindings.resolveKeybinding(binding);
                const command = binding.command;
                const when = binding.when
                    ? this.contextKeyService.parse(binding.when)
                    : binding.context
                        ? this.contextKeyService.parse(binding.context)
                        : undefined;
                this.toDisposeOnKeybindingChange.push(monacoKeybindingRegistry.addDynamicKeybinding(binding.command, this.toMonacoKeybindingNumber(resolved), (_, ...args) => this.theiaCommandRegistry.executeCommand(command, ...args), when));
            }
        }
    }
    toMonacoKeybindingNumber(codes) {
        const [firstPart, secondPart] = codes;
        if (codes.length > 2) {
            console.warn('Key chords should not consist of more than two parts; got ', codes);
        }
        const encodedFirstPart = this.toSingleMonacoKeybindingNumber(firstPart);
        const encodedSecondPart = secondPart ? this.toSingleMonacoKeybindingNumber(secondPart) << 16 : 0;
        return monaco.KeyMod.chord(encodedFirstPart, encodedSecondPart);
    }
    toSingleMonacoKeybindingNumber(code) {
        var _a;
        const keyCode = ((_a = code.key) === null || _a === void 0 ? void 0 : _a.keyCode) !== undefined ? monaco_keycode_map_1.KEY_CODE_MAP[code.key.keyCode] : 0;
        let encoded = (keyCode >>> 0) & 0x000000FF;
        if (code.alt) {
            encoded |= monaco.KeyMod.Alt;
        }
        if (code.shift) {
            encoded |= monaco.KeyMod.Shift;
        }
        if (code.ctrl) {
            encoded |= monaco.KeyMod.WinCtrl;
        }
        if (code.meta && core_1.isOSX) {
            encoded |= monaco.KeyMod.CtrlCmd;
        }
        return encoded;
    }
};
exports.MonacoKeybindingContribution = MonacoKeybindingContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_command_registry_1.MonacoCommandRegistry),
    tslib_1.__metadata("design:type", monaco_command_registry_1.MonacoCommandRegistry)
], MonacoKeybindingContribution.prototype, "commands", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.KeybindingRegistry),
    tslib_1.__metadata("design:type", browser_1.KeybindingRegistry)
], MonacoKeybindingContribution.prototype, "keybindings", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.CommandRegistry),
    tslib_1.__metadata("design:type", core_1.CommandRegistry)
], MonacoKeybindingContribution.prototype, "theiaCommandRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_context_key_service_1.MonacoContextKeyService),
    tslib_1.__metadata("design:type", monaco_context_key_service_1.MonacoContextKeyService)
], MonacoKeybindingContribution.prototype, "contextKeyService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonacoKeybindingContribution.prototype, "init", null);
exports.MonacoKeybindingContribution = MonacoKeybindingContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoKeybindingContribution);
//# sourceMappingURL=monaco-keybinding.js.map