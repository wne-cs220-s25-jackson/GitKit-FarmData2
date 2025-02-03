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
exports.ProgressBar = void 0;
const tslib_1 = require("tslib");
const progress_location_service_1 = require("./progress-location-service");
const common_1 = require("../common");
const inversify_1 = require("inversify");
const progress_bar_factory_1 = require("./progress-bar-factory");
let ProgressBar = class ProgressBar {
    dispose() {
        this.toDispose.dispose();
    }
    constructor() {
        this.toDispose = new common_1.DisposableCollection();
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'theia-progress-bar';
        this.progressBar.style.display = 'none';
        this.progressBarContainer = document.createElement('div');
        this.progressBarContainer.className = 'theia-progress-bar-container';
        this.progressBarContainer.append(this.progressBar);
    }
    init() {
        const { container, insertMode, locationId } = this.options;
        if (insertMode === 'prepend') {
            container.prepend(this.progressBarContainer);
        }
        else {
            container.append(this.progressBarContainer);
        }
        this.toDispose.push(common_1.Disposable.create(() => this.progressBarContainer.remove()));
        const onProgress = this.progressLocationService.onProgress(locationId);
        this.toDispose.push(onProgress(event => this.onProgress(event)));
        const current = this.progressLocationService.getProgress(locationId);
        if (current) {
            this.onProgress(current);
        }
    }
    onProgress(event) {
        if (this.toDispose.disposed) {
            return;
        }
        this.setVisible(event.show);
    }
    setVisible(visible) {
        this.progressBar.style.display = visible ? 'block' : 'none';
    }
};
exports.ProgressBar = ProgressBar;
tslib_1.__decorate([
    (0, inversify_1.inject)(progress_location_service_1.ProgressLocationService),
    tslib_1.__metadata("design:type", progress_location_service_1.ProgressLocationService)
], ProgressBar.prototype, "progressLocationService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(progress_bar_factory_1.ProgressBarOptions),
    tslib_1.__metadata("design:type", Object)
], ProgressBar.prototype, "options", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ProgressBar.prototype, "init", null);
exports.ProgressBar = ProgressBar = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProgressBar);
//# sourceMappingURL=progress-bar.js.map