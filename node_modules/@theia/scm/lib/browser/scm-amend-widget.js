"use strict";
// *****************************************************************************
// Copyright (C) 2020 Arm and others.
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
var ScmAmendWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmAmendWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const React = require("@theia/core/shared/react");
const browser_1 = require("@theia/core/lib/browser");
const scm_service_1 = require("./scm-service");
const scm_avatar_service_1 = require("./scm-avatar-service");
const scm_amend_component_1 = require("./scm-amend-component");
let ScmAmendWidget = ScmAmendWidget_1 = class ScmAmendWidget extends browser_1.ReactWidget {
    constructor(contextMenuRenderer) {
        super();
        this.contextMenuRenderer = contextMenuRenderer;
        this.shouldScrollToRow = true;
        this.setInputValue = (event) => {
            const repository = this.scmService.selectedRepository;
            if (repository) {
                repository.input.value = typeof event === 'string' ? event : event.currentTarget.value;
            }
        };
        this.scrollOptions = {
            suppressScrollX: true,
            minScrollbarLength: 35
        };
        this.id = ScmAmendWidget_1.ID;
    }
    render() {
        const repository = this.scmService.selectedRepository;
        if (repository && repository.provider.amendSupport) {
            return React.createElement(scm_amend_component_1.ScmAmendComponent, {
                key: `amend:${repository.provider.rootUri}`,
                style: { flexGrow: 0 },
                repository: repository,
                scmAmendSupport: repository.provider.amendSupport,
                setCommitMessage: this.setInputValue,
                avatarService: this.avatarService,
                storageService: this.storageService,
            });
        }
    }
};
exports.ScmAmendWidget = ScmAmendWidget;
ScmAmendWidget.ID = 'scm-amend-widget';
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_service_1.ScmService),
    tslib_1.__metadata("design:type", scm_service_1.ScmService)
], ScmAmendWidget.prototype, "scmService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_avatar_service_1.ScmAvatarService),
    tslib_1.__metadata("design:type", scm_avatar_service_1.ScmAvatarService)
], ScmAmendWidget.prototype, "avatarService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.StorageService),
    tslib_1.__metadata("design:type", Object)
], ScmAmendWidget.prototype, "storageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.SelectionService),
    tslib_1.__metadata("design:type", common_1.SelectionService)
], ScmAmendWidget.prototype, "selectionService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], ScmAmendWidget.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.KeybindingRegistry),
    tslib_1.__metadata("design:type", browser_1.KeybindingRegistry)
], ScmAmendWidget.prototype, "keybindings", void 0);
exports.ScmAmendWidget = ScmAmendWidget = ScmAmendWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [browser_1.ContextMenuRenderer])
], ScmAmendWidget);
//# sourceMappingURL=scm-amend-widget.js.map