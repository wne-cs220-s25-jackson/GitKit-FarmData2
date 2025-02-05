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
var OpenEditorsWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenEditorsWidget = exports.OPEN_EDITORS_PROPS = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const navigator_open_editors_tree_model_1 = require("./navigator-open-editors-tree-model");
const browser_2 = require("@theia/filesystem/lib/browser");
const navigator_open_editors_decorator_service_1 = require("./navigator-open-editors-decorator-service");
const navigator_open_editors_menus_1 = require("./navigator-open-editors-menus");
const common_1 = require("@theia/core/lib/common");
const navigator_open_editors_commands_1 = require("./navigator-open-editors-commands");
const nls_1 = require("@theia/core/lib/common/nls");
const browser_3 = require("@theia/workspace/lib/browser");
const abstract_navigator_tree_widget_1 = require("../abstract-navigator-tree-widget");
exports.OPEN_EDITORS_PROPS = {
    ...browser_1.defaultTreeProps,
    virtualized: false,
    contextMenuPath: navigator_open_editors_menus_1.OPEN_EDITORS_CONTEXT_MENU,
    leftPadding: 22
};
let OpenEditorsWidget = OpenEditorsWidget_1 = class OpenEditorsWidget extends abstract_navigator_tree_widget_1.AbstractNavigatorTreeWidget {
    static createContainer(parent) {
        const child = (0, browser_2.createFileTreeContainer)(parent);
        child.unbind(browser_2.FileTreeModel);
        child.bind(navigator_open_editors_tree_model_1.OpenEditorsModel).toSelf();
        child.rebind(browser_1.TreeModel).toService(navigator_open_editors_tree_model_1.OpenEditorsModel);
        child.unbind(browser_2.FileTreeWidget);
        child.bind(OpenEditorsWidget_1).toSelf();
        child.rebind(browser_1.TreeProps).toConstantValue(exports.OPEN_EDITORS_PROPS);
        child.bind(navigator_open_editors_decorator_service_1.OpenEditorsTreeDecoratorService).toSelf().inSingletonScope();
        child.rebind(browser_1.TreeDecoratorService).toService(navigator_open_editors_decorator_service_1.OpenEditorsTreeDecoratorService);
        return child;
    }
    static createWidget(parent) {
        return OpenEditorsWidget_1.createContainer(parent).get(OpenEditorsWidget_1);
    }
    constructor(props, model, contextMenuRenderer) {
        super(props, model, contextMenuRenderer);
        this.model = model;
        this.handleGroupActionIconClicked = async (e) => this.doHandleGroupActionIconClicked(e);
        this.closeEditor = async (e) => this.doCloseEditor(e);
    }
    init() {
        super.init();
        this.id = OpenEditorsWidget_1.ID;
        this.title.label = OpenEditorsWidget_1.LABEL;
        this.addClass(OpenEditorsWidget_1.ID);
        this.update();
    }
    get editorWidgets() {
        return this.model.editorWidgets;
    }
    renderNode(node, props) {
        if (!browser_1.TreeNode.isVisible(node)) {
            return undefined;
        }
        const attributes = this.createNodeAttributes(node, props);
        const isEditorNode = !(node.id.startsWith(navigator_open_editors_tree_model_1.OpenEditorsModel.GROUP_NODE_ID_PREFIX) || node.id.startsWith(navigator_open_editors_tree_model_1.OpenEditorsModel.AREA_NODE_ID_PREFIX));
        const content = React.createElement("div", { className: `${browser_1.TREE_NODE_CONTENT_CLASS}` },
            this.renderExpansionToggle(node, props),
            isEditorNode && this.renderPrefixIcon(node),
            this.decorateIcon(node, this.renderIcon(node, props)),
            React.createElement("div", { className: 'noWrapInfo theia-TreeNodeSegmentGrow' },
                this.renderCaptionAffixes(node, props, 'captionPrefixes'),
                this.renderCaption(node, props),
                this.renderCaptionAffixes(node, props, 'captionSuffixes')),
            this.renderTailDecorations(node, props),
            (this.isGroupNode(node) || this.isAreaNode(node)) && this.renderInteractables(node, props));
        return React.createElement('div', attributes, content);
    }
    getDecorationData(node, key) {
        const contributed = super.getDecorationData(node, key);
        if (key === 'captionSuffixes' && navigator_open_editors_tree_model_1.OpenEditorNode.is(node)) {
            contributed.push(this.getWorkspaceDecoration(node));
        }
        return contributed;
    }
    getWorkspaceDecoration(node) {
        var _a;
        const color = (_a = this.getDecorationData(node, 'fontData').find(data => data.color)) === null || _a === void 0 ? void 0 : _a.color;
        return [{
                fontData: { color },
                data: this.labelProvider.getDetails(node.fileStat),
            }];
    }
    isGroupNode(node) {
        return node.id.startsWith(navigator_open_editors_tree_model_1.OpenEditorsModel.GROUP_NODE_ID_PREFIX);
    }
    isAreaNode(node) {
        return node.id.startsWith(navigator_open_editors_tree_model_1.OpenEditorsModel.AREA_NODE_ID_PREFIX);
    }
    doRenderNodeRow({ node, depth }) {
        let groupClass = '';
        if (this.isGroupNode(node)) {
            groupClass = 'group-node';
        }
        else if (this.isAreaNode(node)) {
            groupClass = 'area-node';
        }
        return React.createElement("div", { className: `open-editors-node-row ${this.getPrefixIconClass(node)}${groupClass}` }, this.renderNode(node, { depth }));
    }
    renderInteractables(node, props) {
        return (React.createElement("div", { className: 'open-editors-inline-actions-container' },
            React.createElement("div", { className: 'open-editors-inline-action' },
                React.createElement("a", { className: 'codicon codicon-save-all', title: navigator_open_editors_commands_1.OpenEditorsCommands.SAVE_ALL_IN_GROUP_FROM_ICON.label, onClick: this.handleGroupActionIconClicked, "data-id": node.id, id: navigator_open_editors_commands_1.OpenEditorsCommands.SAVE_ALL_IN_GROUP_FROM_ICON.id })),
            React.createElement("div", { className: 'open-editors-inline-action' },
                React.createElement("a", { className: 'codicon codicon-close-all', title: navigator_open_editors_commands_1.OpenEditorsCommands.CLOSE_ALL_EDITORS_IN_GROUP_FROM_ICON.label, onClick: this.handleGroupActionIconClicked, "data-id": node.id, id: navigator_open_editors_commands_1.OpenEditorsCommands.CLOSE_ALL_EDITORS_IN_GROUP_FROM_ICON.id }))));
    }
    async doHandleGroupActionIconClicked(e) {
        e.stopPropagation();
        const groupName = e.currentTarget.getAttribute('data-id');
        const command = e.currentTarget.id;
        if (groupName && command) {
            const groupFromTarget = groupName.split(':').pop();
            const areaOrTabBar = this.sanitizeInputFromClickHandler(groupFromTarget);
            if (areaOrTabBar) {
                return this.commandService.executeCommand(command, areaOrTabBar);
            }
        }
    }
    sanitizeInputFromClickHandler(groupFromTarget) {
        let areaOrTabBar;
        if (groupFromTarget) {
            if (browser_1.ApplicationShell.isValidArea(groupFromTarget)) {
                areaOrTabBar = groupFromTarget;
            }
            else {
                const groupAsNum = parseInt(groupFromTarget);
                if (!isNaN(groupAsNum)) {
                    areaOrTabBar = this.model.getTabBarForGroup(groupAsNum);
                }
            }
        }
        return areaOrTabBar;
    }
    renderPrefixIcon(node) {
        return (React.createElement("div", { className: 'open-editors-prefix-icon-container' },
            React.createElement("div", { "data-id": node.id, className: `open-editors-prefix-icon dirty ${(0, browser_1.codicon)('circle-filled', true)}` }),
            React.createElement("div", { "data-id": node.id, onClick: this.closeEditor, className: `open-editors-prefix-icon close ${(0, browser_1.codicon)('close', true)}` })));
    }
    getPrefixIconClass(node) {
        const saveable = browser_1.Saveable.get(node.widget);
        if (saveable) {
            return saveable.dirty ? 'dirty' : '';
        }
        return '';
    }
    async doCloseEditor(e) {
        const widgetId = e.currentTarget.getAttribute('data-id');
        if (widgetId) {
            await this.applicationShell.closeWidget(widgetId);
        }
    }
    tapNode(node) {
        if (navigator_open_editors_tree_model_1.OpenEditorNode.is(node)) {
            this.applicationShell.activateWidget(node.widget.id);
        }
        super.tapNode(node);
    }
    handleContextMenuEvent(node, event) {
        super.handleContextMenuEvent(node, event);
        if (node) {
            // Since the CommonCommands used in the context menu act on the shell's activeWidget, this is necessary to ensure
            // that the EditorWidget is activated, not the Navigator itself
            this.applicationShell.activateWidget(node.widget.id);
        }
    }
    getPaddingLeft(node) {
        if (node.id.startsWith(navigator_open_editors_tree_model_1.OpenEditorsModel.AREA_NODE_ID_PREFIX)) {
            return 0;
        }
        return this.props.leftPadding;
    }
    // The state of this widget is derived from external factors. No need to store or restore it.
    storeState() { return {}; }
    restoreState() { }
};
exports.OpenEditorsWidget = OpenEditorsWidget;
OpenEditorsWidget.ID = 'theia-open-editors-widget';
OpenEditorsWidget.LABEL = nls_1.nls.localizeByDefault('Open Editors');
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ApplicationShell),
    tslib_1.__metadata("design:type", browser_1.ApplicationShell)
], OpenEditorsWidget.prototype, "applicationShell", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.CommandService),
    tslib_1.__metadata("design:type", Object)
], OpenEditorsWidget.prototype, "commandService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_3.WorkspaceService),
    tslib_1.__metadata("design:type", browser_3.WorkspaceService)
], OpenEditorsWidget.prototype, "workspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OpenEditorsWidget.prototype, "init", null);
exports.OpenEditorsWidget = OpenEditorsWidget = OpenEditorsWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.TreeProps)),
    tslib_1.__param(1, (0, inversify_1.inject)(navigator_open_editors_tree_model_1.OpenEditorsModel)),
    tslib_1.__param(2, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [Object, navigator_open_editors_tree_model_1.OpenEditorsModel,
        browser_1.ContextMenuRenderer])
], OpenEditorsWidget);
//# sourceMappingURL=navigator-open-editors-widget.js.map