"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
exports.BulkEditContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
const bulk_edit_commands_1 = require("./bulk-edit-commands");
const monaco_bulk_edit_service_1 = require("@theia/monaco/lib/browser/monaco-bulk-edit-service");
const bulk_edit_tree_1 = require("./bulk-edit-tree");
const browser_1 = require("@theia/core/lib/browser");
const nls_1 = require("@theia/core/lib/common/nls");
let BulkEditContribution = class BulkEditContribution extends view_contribution_1.AbstractViewContribution {
    constructor() {
        super({
            widgetId: bulk_edit_tree_1.BULK_EDIT_TREE_WIDGET_ID,
            widgetName: bulk_edit_tree_1.BULK_EDIT_WIDGET_NAME,
            defaultWidgetOptions: {
                area: 'bottom'
            }
        });
    }
    init() {
        this.bulkEditService.setPreviewHandler((edits) => this.previewEdit(edits));
    }
    registerCommands(registry) {
        var _a;
        super.registerCommands(registry);
        (_a = this.quickView) === null || _a === void 0 ? void 0 : _a.hideItem(bulk_edit_tree_1.BULK_EDIT_WIDGET_NAME);
        registry.registerCommand(bulk_edit_commands_1.BulkEditCommands.APPLY, {
            isEnabled: widget => this.withWidget(widget, () => true),
            isVisible: widget => this.withWidget(widget, () => true),
            execute: widget => this.withWidget(widget, () => this.apply())
        });
        registry.registerCommand(bulk_edit_commands_1.BulkEditCommands.DISCARD, {
            isEnabled: widget => this.withWidget(widget, () => true),
            isVisible: widget => this.withWidget(widget, () => true),
            execute: widget => this.withWidget(widget, () => this.discard())
        });
    }
    async registerToolbarItems(toolbarRegistry) {
        toolbarRegistry.registerItem({
            id: bulk_edit_commands_1.BulkEditCommands.APPLY.id,
            command: bulk_edit_commands_1.BulkEditCommands.APPLY.id,
            tooltip: nls_1.nls.localizeByDefault('Apply Refactoring'),
            priority: 0,
        });
        toolbarRegistry.registerItem({
            id: bulk_edit_commands_1.BulkEditCommands.DISCARD.id,
            command: bulk_edit_commands_1.BulkEditCommands.DISCARD.id,
            tooltip: nls_1.nls.localizeByDefault('Discard Refactoring'),
            priority: 1,
        });
    }
    withWidget(widget = this.tryGetWidget(), cb) {
        if (widget instanceof bulk_edit_tree_1.BulkEditTreeWidget) {
            return cb(widget);
        }
        return false;
    }
    async previewEdit(edits) {
        const widget = await this.openView({ activate: true });
        if (widget) {
            this.edits = edits;
            await widget.initModel(edits);
        }
        return edits;
    }
    apply() {
        if (this.edits) {
            this.edits.forEach(edit => {
                if (edit.metadata) {
                    edit.metadata.needsConfirmation = false;
                }
            });
            this.bulkEditService.apply(this.edits);
        }
        this.closeView();
    }
    discard() {
        this.edits = [];
        this.closeView();
    }
};
exports.BulkEditContribution = BulkEditContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.QuickViewService),
    (0, inversify_1.optional)(),
    tslib_1.__metadata("design:type", browser_1.QuickViewService)
], BulkEditContribution.prototype, "quickView", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_bulk_edit_service_1.MonacoBulkEditService),
    tslib_1.__metadata("design:type", monaco_bulk_edit_service_1.MonacoBulkEditService)
], BulkEditContribution.prototype, "bulkEditService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BulkEditContribution.prototype, "init", null);
exports.BulkEditContribution = BulkEditContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], BulkEditContribution);
//# sourceMappingURL=bulk-edit-contribution.js.map