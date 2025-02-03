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
exports.PreviewHandlerProvider = exports.RenderContentParams = exports.PreviewHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
exports.PreviewHandler = Symbol('PreviewHandler');
var RenderContentParams;
(function (RenderContentParams) {
    function is(params) {
        return (0, core_1.isObject)(params) && 'content' in params && 'originUri' in params;
    }
    RenderContentParams.is = is;
})(RenderContentParams || (exports.RenderContentParams = RenderContentParams = {}));
/**
 * Provider managing the available PreviewHandlers.
 */
let PreviewHandlerProvider = class PreviewHandlerProvider {
    constructor(previewHandlerContributions) {
        this.previewHandlerContributions = previewHandlerContributions;
    }
    /**
     * Find PreviewHandlers for the given resource identifier.
     *
     * @param uri the URI identifying a resource.
     *
     * @returns the list of all supported `PreviewHandlers` sorted by their priority.
     */
    findContribution(uri) {
        const prioritized = core_1.Prioritizeable.prioritizeAllSync(this.previewHandlerContributions.getContributions(), contrib => contrib.canHandle(uri));
        return prioritized.map(c => c.value);
    }
    /**
     * Indicates whether any PreviewHandler can process the resource identified by the given URI.
     *
     * @param uri the URI identifying a resource.
     *
     * @returns `true` when a PreviewHandler can process the resource, `false` otherwise.
     */
    canHandle(uri) {
        return this.findContribution(uri).length > 0;
    }
};
exports.PreviewHandlerProvider = PreviewHandlerProvider;
exports.PreviewHandlerProvider = PreviewHandlerProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.ContributionProvider)),
    tslib_1.__param(0, (0, inversify_1.named)(exports.PreviewHandler)),
    tslib_1.__metadata("design:paramtypes", [Object])
], PreviewHandlerProvider);
//# sourceMappingURL=preview-handler.js.map