"use strict";
// *****************************************************************************
// Copyright (C) 2020 RedHat and others.
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
exports.TimelineContextKeyService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
let TimelineContextKeyService = class TimelineContextKeyService {
    get timelineItem() {
        return this._timelineItem;
    }
    init() {
        this._timelineItem = this.contextKeyService.createKey('timelineItem', undefined);
    }
};
exports.TimelineContextKeyService = TimelineContextKeyService;
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], TimelineContextKeyService.prototype, "contextKeyService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TimelineContextKeyService.prototype, "init", null);
exports.TimelineContextKeyService = TimelineContextKeyService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TimelineContextKeyService);
//# sourceMappingURL=timeline-context-key-service.js.map