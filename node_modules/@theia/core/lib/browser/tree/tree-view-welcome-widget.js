"use strict";
// *****************************************************************************
// Copyright (C) 2020 SAP SE or an SAP affiliate company and others.
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
exports.TreeViewWelcomeWidget = void 0;
const tslib_1 = require("tslib");
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
// some code is copied and modified from: https://github.com/microsoft/vscode/blob/573e5145ae3b50523925a6f6315d373e649d1b06/src/vs/base/common/linkedText.ts
// aligned the API and enablement behavior to https://github.com/microsoft/vscode/blob/c711bc9333ba339fde1a530de0094b3fa32f09de/src/vs/base/common/linkedText.ts
const React = require("react");
const inversify_1 = require("inversify");
const vscode_uri_1 = require("vscode-uri");
const common_1 = require("../../common");
const uri_1 = require("../../common/uri");
const context_key_service_1 = require("../context-key-service");
const label_parser_1 = require("../label-parser");
const opener_service_1 = require("../opener-service");
const widgets_1 = require("../widgets");
const window_service_1 = require("../window/window-service");
const tree_widget_1 = require("./tree-widget");
let TreeViewWelcomeWidget = class TreeViewWelcomeWidget extends tree_widget_1.TreeWidget {
    constructor() {
        super(...arguments);
        this.toDisposeBeforeUpdateViewWelcomeNodes = new common_1.DisposableCollection();
        this.viewWelcomeNodes = [];
        this.items = [];
        this.openLinkOrCommand = (event, value) => {
            event.stopPropagation();
            if (value.startsWith('command:')) {
                const command = value.replace('command:', '');
                this.commands.executeCommand(command);
            }
            else if (value.startsWith('file:')) {
                const uri = value.replace('file:', '');
                (0, opener_service_1.open)(this.openerService, new uri_1.default(vscode_uri_1.URI.file(uri).toString()));
            }
            else {
                this.windowService.openNewWindow(value, { external: true });
            }
        };
    }
    get visibleItems() {
        const visibleItems = this.items.filter(v => v.visible);
        if (visibleItems.length && this.defaultItem) {
            return [this.defaultItem.welcomeInfo];
        }
        return visibleItems.map(v => v.welcomeInfo);
    }
    renderTree(model) {
        if (this.shouldShowWelcomeView() && this.visibleItems.length) {
            return this.renderViewWelcome();
        }
        return super.renderTree(model);
    }
    shouldShowWelcomeView() {
        return false;
    }
    renderViewWelcome() {
        return (React.createElement("div", { className: 'theia-WelcomeView' }, ...this.viewWelcomeNodes));
    }
    handleViewWelcomeContentChange(viewWelcomes) {
        this.items = [];
        for (const welcomeInfo of viewWelcomes) {
            if (welcomeInfo.when === 'default') {
                this.defaultItem = { welcomeInfo, visible: true };
            }
            else {
                const visible = welcomeInfo.when === undefined || this.contextService.match(welcomeInfo.when);
                this.items.push({ welcomeInfo, visible });
            }
        }
        this.updateViewWelcomeNodes();
        this.update();
    }
    handleWelcomeContextChange() {
        let didChange = false;
        for (const item of this.items) {
            if (!item.welcomeInfo.when || item.welcomeInfo.when === 'default') {
                continue;
            }
            const visible = item.welcomeInfo.when === undefined || this.contextService.match(item.welcomeInfo.when);
            if (item.visible === visible) {
                continue;
            }
            item.visible = visible;
            didChange = true;
        }
        if (didChange) {
            this.updateViewWelcomeNodes();
            this.update();
        }
    }
    updateViewWelcomeNodes() {
        this.viewWelcomeNodes = [];
        this.toDisposeBeforeUpdateViewWelcomeNodes.dispose();
        const items = this.visibleItems.sort((a, b) => a.order - b.order);
        const enablementKeys = [];
        // the plugin-view-registry will push the changes when there is a change in the `when` prop  which controls the visibility
        // this listener is to update the enablement of the components in the view welcome
        this.toDisposeBeforeUpdateViewWelcomeNodes.push(this.contextService.onDidChange(event => {
            if (enablementKeys.some(keys => event.affects(keys))) {
                this.updateViewWelcomeNodes();
                this.update();
            }
        }));
        // Note: VS Code does not support the `renderSecondaryButtons` prop in welcome content either.
        for (const { content, enablement } of items) {
            const itemEnablementKeys = enablement
                ? this.contextService.parseKeys(enablement)
                : undefined;
            if (itemEnablementKeys) {
                enablementKeys.push(itemEnablementKeys);
            }
            const lines = content.split('\n');
            for (let line of lines) {
                line = line.trim();
                if (!line) {
                    continue;
                }
                const linkedTextItems = this.parseLinkedText(line);
                if (linkedTextItems.length === 1 && typeof linkedTextItems[0] !== 'string') {
                    const node = linkedTextItems[0];
                    this.viewWelcomeNodes.push(this.renderButtonNode(node, this.viewWelcomeNodes.length, enablement));
                }
                else {
                    const renderNode = (item, index) => typeof item == 'string'
                        ? this.renderTextNode(item, index)
                        : this.renderLinkNode(item, index, enablement);
                    this.viewWelcomeNodes.push(React.createElement("p", { key: `p-${this.viewWelcomeNodes.length}` }, ...linkedTextItems.flatMap(renderNode)));
                }
            }
        }
    }
    renderButtonNode(node, lineKey, enablement) {
        return (React.createElement("div", { key: `line-${lineKey}`, className: 'theia-WelcomeViewButtonWrapper' },
            React.createElement("button", { title: node.title, className: 'theia-button theia-WelcomeViewButton', disabled: !this.isEnabledClick(enablement), onClick: e => this.openLinkOrCommand(e, node.href) }, node.label)));
    }
    renderTextNode(node, textKey) {
        return React.createElement("span", { key: `text-${textKey}` }, this.labelParser.parse(node)
            .map((segment, index) => label_parser_1.LabelIcon.is(segment)
            ? React.createElement("span", { key: index, className: (0, widgets_1.codicon)(segment.name) })
            : React.createElement("span", { key: index }, segment)));
    }
    renderLinkNode(node, linkKey, enablement) {
        return (React.createElement("a", { key: `link-${linkKey}`, className: this.getLinkClassName(node.href, enablement), title: node.title || '', onClick: e => this.openLinkOrCommand(e, node.href) }, node.label));
    }
    getLinkClassName(href, enablement) {
        const classNames = ['theia-WelcomeViewCommandLink'];
        // Only command-backed links can be disabled. All other, https:, file: remain enabled
        if (href.startsWith('command:') && !this.isEnabledClick(enablement)) {
            classNames.push('disabled');
        }
        return classNames.join(' ');
    }
    isEnabledClick(enablement) {
        return typeof enablement === 'string'
            ? this.contextService.match(enablement)
            : true;
    }
    parseLinkedText(text) {
        const result = [];
        const linkRegex = /\[([^\]]+)\]\(((?:https?:\/\/|command:|file:)[^\)\s]+)(?: (["'])(.+?)(\3))?\)/gi;
        let index = 0;
        let match;
        while (match = linkRegex.exec(text)) {
            if (match.index - index > 0) {
                result.push(text.substring(index, match.index));
            }
            const [, label, href, , title] = match;
            if (title) {
                result.push({ label, href, title });
            }
            else {
                result.push({ label, href });
            }
            index = match.index + match[0].length;
        }
        if (index < text.length) {
            result.push(text.substring(index));
        }
        return result;
    }
};
exports.TreeViewWelcomeWidget = TreeViewWelcomeWidget;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.CommandRegistry),
    tslib_1.__metadata("design:type", common_1.CommandRegistry)
], TreeViewWelcomeWidget.prototype, "commands", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], TreeViewWelcomeWidget.prototype, "contextService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(window_service_1.WindowService),
    tslib_1.__metadata("design:type", Object)
], TreeViewWelcomeWidget.prototype, "windowService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(label_parser_1.LabelParser),
    tslib_1.__metadata("design:type", label_parser_1.LabelParser)
], TreeViewWelcomeWidget.prototype, "labelParser", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(opener_service_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], TreeViewWelcomeWidget.prototype, "openerService", void 0);
exports.TreeViewWelcomeWidget = TreeViewWelcomeWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TreeViewWelcomeWidget);
//# sourceMappingURL=tree-view-welcome-widget.js.map