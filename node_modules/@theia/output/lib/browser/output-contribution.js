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
exports.OutputContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const widget_1 = require("@theia/core/lib/browser/widgets/widget");
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
const output_widget_1 = require("./output-widget");
const output_context_menu_1 = require("./output-context-menu");
const output_uri_1 = require("../common/output-uri");
const clipboard_service_1 = require("@theia/core/lib/browser/clipboard-service");
const output_channel_1 = require("./output-channel");
const output_commands_1 = require("./output-commands");
const quick_pick_service_1 = require("@theia/core/lib/common/quick-pick-service");
const nls_1 = require("@theia/core/lib/common/nls");
let OutputContribution = class OutputContribution extends view_contribution_1.AbstractViewContribution {
    constructor() {
        super({
            widgetId: output_widget_1.OutputWidget.ID,
            widgetName: output_widget_1.OutputWidget.LABEL,
            defaultWidgetOptions: {
                area: 'bottom'
            },
            toggleCommandId: 'output:toggle',
            toggleKeybinding: 'CtrlCmd+Shift+U'
        });
        this.id = `${output_widget_1.OutputWidget.ID}-opener`;
    }
    init() {
        this.outputChannelManager.onChannelWasShown(({ name, preserveFocus }) => (0, browser_1.open)(this.openerService, output_uri_1.OutputUri.create(name), { activate: !preserveFocus, reveal: true }));
    }
    registerCommands(registry) {
        super.registerCommands(registry);
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR__WIDGET, {
            isEnabled: arg => {
                if (arg instanceof widget_1.Widget) {
                    return arg instanceof output_widget_1.OutputWidget;
                }
                return this.shell.currentWidget instanceof output_widget_1.OutputWidget;
            },
            isVisible: arg => {
                if (arg instanceof widget_1.Widget) {
                    return arg instanceof output_widget_1.OutputWidget;
                }
                return this.shell.currentWidget instanceof output_widget_1.OutputWidget;
            },
            execute: () => {
                this.widget.then(widget => {
                    this.withWidget(widget, output => {
                        output.clear();
                        return true;
                    });
                });
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.LOCK__WIDGET, {
            isEnabled: widget => this.withWidget(widget, output => !output.isLocked),
            isVisible: widget => this.withWidget(widget, output => !output.isLocked),
            execute: widget => this.withWidget(widget, output => {
                output.lock();
                return true;
            })
        });
        registry.registerCommand(output_commands_1.OutputCommands.UNLOCK__WIDGET, {
            isEnabled: widget => this.withWidget(widget, output => output.isLocked),
            isVisible: widget => this.withWidget(widget, output => output.isLocked),
            execute: widget => this.withWidget(widget, output => {
                output.unlock();
                return true;
            })
        });
        registry.registerCommand(output_commands_1.OutputCommands.COPY_ALL, {
            execute: () => {
                var _a;
                const textToCopy = (_a = this.tryGetWidget()) === null || _a === void 0 ? void 0 : _a.getText();
                if (textToCopy) {
                    this.clipboardService.writeText(textToCopy);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.APPEND, {
            execute: ({ name, text }) => {
                if (name && text) {
                    this.outputChannelManager.getChannel(name).append(text);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.APPEND_LINE, {
            execute: ({ name, text }) => {
                if (name && text) {
                    this.outputChannelManager.getChannel(name).appendLine(text);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR, {
            execute: ({ name }) => {
                if (name) {
                    this.outputChannelManager.getChannel(name).clear();
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.DISPOSE, {
            execute: ({ name }) => {
                if (name) {
                    this.outputChannelManager.deleteChannel(name);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.SHOW, {
            execute: ({ name, options }) => {
                if (name) {
                    const preserveFocus = options && options.preserveFocus || false;
                    this.outputChannelManager.getChannel(name).show({ preserveFocus });
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.HIDE, {
            execute: ({ name }) => {
                if (name) {
                    this.outputChannelManager.getChannel(name).hide();
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR__QUICK_PICK, {
            execute: async () => {
                const channel = await this.pick({
                    placeholder: output_commands_1.OutputCommands.CLEAR__QUICK_PICK.label,
                    channels: this.outputChannelManager.getChannels().slice()
                });
                if (channel) {
                    channel.clear();
                }
            },
            isEnabled: () => !!this.outputChannelManager.getChannels().length,
            isVisible: () => !!this.outputChannelManager.getChannels().length
        });
        registry.registerCommand(output_commands_1.OutputCommands.SHOW__QUICK_PICK, {
            execute: async () => {
                const channel = await this.pick({
                    placeholder: output_commands_1.OutputCommands.SHOW__QUICK_PICK.label,
                    channels: this.outputChannelManager.getChannels().slice()
                });
                if (channel) {
                    const { name } = channel;
                    registry.executeCommand(output_commands_1.OutputCommands.SHOW.id, { name, options: { preserveFocus: false } });
                }
            },
            isEnabled: () => !!this.outputChannelManager.getChannels().length,
            isVisible: () => !!this.outputChannelManager.getChannels().length
        });
        registry.registerCommand(output_commands_1.OutputCommands.HIDE__QUICK_PICK, {
            execute: async () => {
                const channel = await this.pick({
                    placeholder: output_commands_1.OutputCommands.HIDE__QUICK_PICK.label,
                    channels: this.outputChannelManager.getVisibleChannels().slice()
                });
                if (channel) {
                    const { name } = channel;
                    registry.executeCommand(output_commands_1.OutputCommands.HIDE.id, { name });
                }
            },
            isEnabled: () => !!this.outputChannelManager.getVisibleChannels().length,
            isVisible: () => !!this.outputChannelManager.getVisibleChannels().length
        });
        registry.registerCommand(output_commands_1.OutputCommands.DISPOSE__QUICK_PICK, {
            execute: async () => {
                const channel = await this.pick({
                    placeholder: output_commands_1.OutputCommands.DISPOSE__QUICK_PICK.label,
                    channels: this.outputChannelManager.getChannels().slice()
                });
                if (channel) {
                    const { name } = channel;
                    registry.executeCommand(output_commands_1.OutputCommands.DISPOSE.id, { name });
                }
            },
            isEnabled: () => !!this.outputChannelManager.getChannels().length,
            isVisible: () => !!this.outputChannelManager.getChannels().length
        });
    }
    registerMenus(registry) {
        super.registerMenus(registry);
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.TEXT_EDIT_GROUP, {
            commandId: browser_1.CommonCommands.COPY.id
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.TEXT_EDIT_GROUP, {
            commandId: output_commands_1.OutputCommands.COPY_ALL.id,
            label: nls_1.nls.localizeByDefault('Copy All')
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.COMMAND_GROUP, {
            commandId: browser_1.quickCommand.id,
            label: nls_1.nls.localizeByDefault('Command Palette...')
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.WIDGET_GROUP, {
            commandId: output_commands_1.OutputCommands.CLEAR__WIDGET.id,
            label: nls_1.nls.localizeByDefault('Clear Output')
        });
    }
    canHandle(uri) {
        return output_uri_1.OutputUri.is(uri) ? 200 : 0;
    }
    async open(uri, options) {
        if (!output_uri_1.OutputUri.is(uri)) {
            throw new Error(`Expected '${output_uri_1.OutputUri.SCHEME}' URI scheme. Got: ${uri} instead.`);
        }
        const widget = await this.openView(options);
        return widget;
    }
    withWidget(widget = this.tryGetWidget(), predicate = () => true) {
        return widget instanceof output_widget_1.OutputWidget ? predicate(widget) : false;
    }
    async pick({ channels, placeholder }) {
        const items = [];
        const outputChannels = nls_1.nls.localize('theia/output/outputChannels', 'Output Channels');
        const hiddenChannels = nls_1.nls.localize('theia/output/hiddenChannels', 'Hidden Channels');
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i];
            if (i === 0) {
                items.push({ label: channel.isVisible ? outputChannels : hiddenChannels, type: 'separator' });
            }
            else if (!channel.isVisible && channels[i - 1].isVisible) {
                items.push({ label: hiddenChannels, type: 'separator' });
            }
            items.push({ label: channel.name, value: channel });
        }
        const selectedItem = await this.quickPickService.show(items, { placeholder });
        return selectedItem && ('value' in selectedItem) ? selectedItem.value : undefined;
    }
};
exports.OutputContribution = OutputContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(clipboard_service_1.ClipboardService),
    tslib_1.__metadata("design:type", Object)
], OutputContribution.prototype, "clipboardService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.CommandService),
    tslib_1.__metadata("design:type", Object)
], OutputContribution.prototype, "commandService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(output_channel_1.OutputChannelManager),
    tslib_1.__metadata("design:type", output_channel_1.OutputChannelManager)
], OutputContribution.prototype, "outputChannelManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], OutputContribution.prototype, "openerService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(quick_pick_service_1.QuickPickService),
    tslib_1.__metadata("design:type", Object)
], OutputContribution.prototype, "quickPickService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OutputContribution.prototype, "init", null);
exports.OutputContribution = OutputContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], OutputContribution);
//# sourceMappingURL=output-contribution.js.map