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
exports.PreviewLinkNormalizer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const mini_browser_environment_1 = require("@theia/mini-browser/lib/browser/environment/mini-browser-environment");
let PreviewLinkNormalizer = class PreviewLinkNormalizer {
    constructor() {
        this.urlScheme = new RegExp('^[a-z][a-z|0-9|\+|\-|\.]*:', 'i');
    }
    normalizeLink(documentUri, link) {
        try {
            if (!this.urlScheme.test(link)) {
                const location = documentUri.parent.resolve(link).path.toString();
                return this.miniBrowserEnvironment.getEndpoint('normalized-link').getRestUrl().resolve(location).toString();
            }
        }
        catch {
            // ignore
        }
        return link;
    }
};
exports.PreviewLinkNormalizer = PreviewLinkNormalizer;
tslib_1.__decorate([
    (0, inversify_1.inject)(mini_browser_environment_1.MiniBrowserEnvironment),
    tslib_1.__metadata("design:type", mini_browser_environment_1.MiniBrowserEnvironment)
], PreviewLinkNormalizer.prototype, "miniBrowserEnvironment", void 0);
exports.PreviewLinkNormalizer = PreviewLinkNormalizer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreviewLinkNormalizer);
//# sourceMappingURL=preview-link-normalizer.js.map