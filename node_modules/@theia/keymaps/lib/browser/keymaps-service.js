"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
exports.KeymapsService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const keybinding_1 = require("@theia/core/lib/browser/keybinding");
const keybinding_2 = require("@theia/core/lib/common/keybinding");
const browser_2 = require("@theia/userstorage/lib/browser");
const jsoncparser = require("jsonc-parser");
const event_1 = require("@theia/core/lib/common/event");
const monaco_text_model_service_1 = require("@theia/monaco/lib/browser/monaco-text-model-service");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const uri_1 = require("@theia/core/lib/common/uri");
const monaco_workspace_1 = require("@theia/monaco/lib/browser/monaco-workspace");
const message_service_1 = require("@theia/core/lib/common/message-service");
const monaco_jsonc_editor_1 = require("@theia/preferences/lib/browser/monaco-jsonc-editor");
let KeymapsService = class KeymapsService {
    constructor() {
        this.changeKeymapEmitter = new event_1.Emitter();
        this.onDidChangeKeymaps = this.changeKeymapEmitter.event;
        this.deferredModel = new promise_util_1.Deferred();
    }
    /**
     * Initialize the keybinding service.
     */
    init() {
        this.doInit();
    }
    async doInit() {
        const reference = await this.textModelService.createModelReference(browser_2.UserStorageUri.resolve('keymaps.json'));
        this.model = reference.object;
        this.deferredModel.resolve(this.model);
        this.reconcile();
        this.model.onDidChangeContent(() => this.reconcile());
        this.model.onDirtyChanged(() => this.reconcile());
        this.model.onDidChangeValid(() => this.reconcile());
        this.keybindingRegistry.onKeybindingsChanged(() => this.changeKeymapEmitter.fire(undefined));
    }
    /**
     * Reconcile all the keybindings, registering them to the registry.
     */
    reconcile() {
        const model = this.model;
        if (!model || model.dirty) {
            return;
        }
        try {
            const keybindings = [];
            if (model.valid) {
                const content = model.getText();
                const json = jsoncparser.parse(content, undefined, { disallowComments: false });
                if (Array.isArray(json)) {
                    for (const value of json) {
                        if (keybinding_2.Keybinding.is(value)) {
                            keybindings.push(value);
                        }
                        else if (keybinding_2.RawKeybinding.is(value)) {
                            keybindings.push(keybinding_2.Keybinding.apiObjectify(value));
                        }
                    }
                }
            }
            this.keybindingRegistry.setKeymap(keybinding_1.KeybindingScope.USER, keybindings);
        }
        catch (e) {
            console.error(`Failed to load keymaps from '${model.uri}'.`, e);
        }
    }
    /**
     * Open the keybindings widget.
     * @param ref the optional reference for opening the widget.
     */
    async open(ref) {
        const model = await this.deferredModel.promise;
        const options = {
            widgetOptions: ref ? { area: 'main', mode: 'split-right', ref } : { area: 'main' },
            mode: 'activate'
        };
        if (!model.valid) {
            await model.save();
        }
        await (0, browser_1.open)(this.opener, new uri_1.default(model.uri), options);
    }
    /**
     * Set the keybinding in the JSON.
     * @param newKeybinding the new JSON keybinding
     * @param oldKeybinding the old JSON keybinding
     */
    async setKeybinding(newKeybinding, oldKeybinding) {
        return this.updateKeymap(() => {
            const keybindings = [...this.keybindingRegistry.getKeybindingsByScope(keybinding_1.KeybindingScope.USER)];
            if (!oldKeybinding) {
                keybinding_2.Keybinding.addKeybinding(keybindings, newKeybinding);
                return keybindings;
            }
            else if (oldKeybinding.scope === keybinding_1.KeybindingScope.DEFAULT) {
                keybinding_2.Keybinding.addKeybinding(keybindings, newKeybinding);
                const disabledBinding = {
                    ...oldKeybinding,
                    command: '-' + oldKeybinding.command
                };
                keybinding_2.Keybinding.addKeybinding(keybindings, disabledBinding);
                return keybindings;
            }
            else if (keybinding_2.Keybinding.replaceKeybinding(keybindings, oldKeybinding, newKeybinding)) {
                return keybindings;
            }
        });
    }
    /**
     * Unset the given keybinding in the JSON.
     * If the given keybinding has a default scope, it will be disabled in the JSON.
     * Otherwise, it will be removed from the JSON.
     * @param keybinding the keybinding to unset
     */
    unsetKeybinding(keybinding) {
        return this.updateKeymap(() => {
            const keybindings = this.keybindingRegistry.getKeybindingsByScope(keybinding_1.KeybindingScope.USER);
            if (keybinding.scope === keybinding_1.KeybindingScope.DEFAULT) {
                const result = [...keybindings];
                const disabledBinding = {
                    ...keybinding,
                    command: '-' + keybinding.command
                };
                keybinding_2.Keybinding.addKeybinding(result, disabledBinding);
                return result;
            }
            else {
                const filtered = keybindings.filter(a => !keybinding_2.Keybinding.equals(a, keybinding, false, true));
                if (filtered.length !== keybindings.length) {
                    return filtered;
                }
            }
        });
    }
    /**
     * Whether there is a keybinding with the given command id in the JSON.
     * @param commandId the keybinding command id
     */
    hasKeybinding(commandId) {
        const keybindings = this.keybindingRegistry.getKeybindingsByScope(keybinding_1.KeybindingScope.USER);
        return keybindings.some(a => a.command === commandId);
    }
    /**
     * Remove the keybindings with the given command id from the JSON.
     * This includes disabled keybindings.
     * @param commandId the keybinding command id.
     */
    removeKeybinding(commandId) {
        return this.updateKeymap(() => {
            const keybindings = this.keybindingRegistry.getKeybindingsByScope(keybinding_1.KeybindingScope.USER);
            const removedCommand = '-' + commandId;
            const filtered = keybindings.filter(a => a.command !== commandId && a.command !== removedCommand);
            if (filtered.length !== keybindings.length) {
                return filtered;
            }
        });
    }
    async updateKeymap(op) {
        const model = await this.deferredModel.promise;
        try {
            const keybindings = op();
            if (keybindings && this.model) {
                await this.jsoncEditor.setValue(this.model, [], keybindings.map(binding => keybinding_2.Keybinding.apiObjectify(binding)));
            }
        }
        catch (e) {
            const message = `Failed to update a keymap in '${model.uri}'.`;
            this.messageService.error(`${message} Please check if it is corrupted.`);
            console.error(`${message}`, e);
        }
    }
};
exports.KeymapsService = KeymapsService;
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_workspace_1.MonacoWorkspace),
    tslib_1.__metadata("design:type", monaco_workspace_1.MonacoWorkspace)
], KeymapsService.prototype, "workspace", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_text_model_service_1.MonacoTextModelService),
    tslib_1.__metadata("design:type", monaco_text_model_service_1.MonacoTextModelService)
], KeymapsService.prototype, "textModelService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(keybinding_1.KeybindingRegistry),
    tslib_1.__metadata("design:type", keybinding_1.KeybindingRegistry)
], KeymapsService.prototype, "keybindingRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], KeymapsService.prototype, "opener", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], KeymapsService.prototype, "messageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_jsonc_editor_1.MonacoJSONCEditor),
    tslib_1.__metadata("design:type", monaco_jsonc_editor_1.MonacoJSONCEditor)
], KeymapsService.prototype, "jsoncEditor", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], KeymapsService.prototype, "init", null);
exports.KeymapsService = KeymapsService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], KeymapsService);
//# sourceMappingURL=keymaps-service.js.map