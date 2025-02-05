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
exports.ScmFileChangeLabelProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const scm_file_change_node_1 = require("./scm-file-change-node");
const uri_1 = require("@theia/core/lib/common/uri");
const scm_service_1 = require("@theia/scm/lib/browser/scm-service");
let ScmFileChangeLabelProvider = class ScmFileChangeLabelProvider {
    canHandle(element) {
        return scm_file_change_node_1.ScmFileChangeNode.is(element) ? 100 : 0;
    }
    getIcon(node) {
        return this.labelProvider.getIcon(new uri_1.default(node.fileChange.uri));
    }
    getName(node) {
        return this.labelProvider.getName(new uri_1.default(node.fileChange.uri));
    }
    getDescription(node) {
        return this.relativePath(new uri_1.default(node.fileChange.uri).parent);
    }
    affects(node, event) {
        return event.affects(new uri_1.default(node.fileChange.uri));
    }
    getCaption(node) {
        return node.fileChange.getCaption();
    }
    relativePath(uri) {
        const parsedUri = typeof uri === 'string' ? new uri_1.default(uri) : uri;
        const repo = this.scmService.findRepository(parsedUri);
        if (repo) {
            const repositoryUri = new uri_1.default(repo.provider.rootUri);
            const relativePath = repositoryUri.relative(parsedUri);
            if (relativePath) {
                return relativePath.toString();
            }
        }
        return this.labelProvider.getLongName(parsedUri);
    }
    getStatusCaption(node) {
        return node.fileChange.getStatusCaption();
    }
};
exports.ScmFileChangeLabelProvider = ScmFileChangeLabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], ScmFileChangeLabelProvider.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_service_1.ScmService),
    tslib_1.__metadata("design:type", scm_service_1.ScmService)
], ScmFileChangeLabelProvider.prototype, "scmService", void 0);
exports.ScmFileChangeLabelProvider = ScmFileChangeLabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ScmFileChangeLabelProvider);
//# sourceMappingURL=scm-file-change-label-provider.js.map