"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.BreadcrumbsService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const breadcrumb_popup_container_1 = require("./breadcrumb-popup-container");
const breadcrumbs_constants_1 = require("./breadcrumbs-constants");
let BreadcrumbsService = class BreadcrumbsService {
    constructor() {
        this.hasSubscribed = false;
        this.onDidChangeBreadcrumbsEmitter = new common_1.Emitter();
    }
    init() {
        this.createOverlayContainer();
    }
    createOverlayContainer() {
        this.popupsOverlayContainer = window.document.createElement('div');
        this.popupsOverlayContainer.id = breadcrumbs_constants_1.Styles.BREADCRUMB_POPUP_OVERLAY_CONTAINER;
        if (window.document.body) {
            window.document.body.appendChild(this.popupsOverlayContainer);
        }
    }
    /**
     * Subscribe to this event emitter to be notified when the breadcrumbs have changed.
     * The URI is the URI of the editor the breadcrumbs have changed for.
     */
    get onDidChangeBreadcrumbs() {
        // This lazy subscription is to address problems in inversify's instantiation routine
        // related to use of the IconThemeService by different components instantiated by the
        // ContributionProvider.
        if (!this.hasSubscribed) {
            this.subscribeToContributions();
        }
        return this.onDidChangeBreadcrumbsEmitter.event;
    }
    /**
     * Subscribes to the onDidChangeBreadcrumbs events for all contributions.
     */
    subscribeToContributions() {
        this.hasSubscribed = true;
        for (const contribution of this.contributions.getContributions()) {
            contribution.onDidChangeBreadcrumbs(uri => this.onDidChangeBreadcrumbsEmitter.fire(uri));
        }
    }
    /**
     * Returns the breadcrumbs for a given URI, possibly an empty list.
     */
    async getBreadcrumbs(uri) {
        const result = [];
        for (const contribution of await this.prioritizedContributions()) {
            result.push(...await contribution.computeBreadcrumbs(uri));
        }
        return result;
    }
    async prioritizedContributions() {
        const prioritized = await common_1.Prioritizeable.prioritizeAll(this.contributions.getContributions(), contribution => contribution.priority);
        return prioritized.map(p => p.value).reverse();
    }
    /**
     * Opens a popup for the given breadcrumb at the given position.
     */
    async openPopup(breadcrumb, position) {
        const contribution = this.contributions.getContributions().find(c => c.type === breadcrumb.type);
        if (contribution) {
            const popup = this.breadcrumbPopupContainerFactory(this.popupsOverlayContainer, breadcrumb.id, position);
            const popupContent = await contribution.attachPopupContent(breadcrumb, popup.container);
            if (popupContent && popup.isOpen) {
                popup.onDidDispose(() => popupContent.dispose());
            }
            else {
                popupContent === null || popupContent === void 0 ? void 0 : popupContent.dispose();
            }
            return popup;
        }
    }
};
exports.BreadcrumbsService = BreadcrumbsService;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(breadcrumbs_constants_1.BreadcrumbsContribution),
    tslib_1.__metadata("design:type", Object)
], BreadcrumbsService.prototype, "contributions", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(breadcrumb_popup_container_1.BreadcrumbPopupContainerFactory),
    tslib_1.__metadata("design:type", Function)
], BreadcrumbsService.prototype, "breadcrumbPopupContainerFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BreadcrumbsService.prototype, "init", null);
exports.BreadcrumbsService = BreadcrumbsService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], BreadcrumbsService);
//# sourceMappingURL=breadcrumbs-service.js.map