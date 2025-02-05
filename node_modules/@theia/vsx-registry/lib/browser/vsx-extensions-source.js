"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
exports.VSXExtensionsSource = exports.VSXExtensionsSourceOptions = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const vsx_extensions_model_1 = require("./vsx-extensions-model");
const debounce = require("@theia/core/shared/lodash.debounce");
let VSXExtensionsSourceOptions = class VSXExtensionsSourceOptions {
};
exports.VSXExtensionsSourceOptions = VSXExtensionsSourceOptions;
VSXExtensionsSourceOptions.INSTALLED = 'installed';
VSXExtensionsSourceOptions.BUILT_IN = 'builtin';
VSXExtensionsSourceOptions.SEARCH_RESULT = 'searchResult';
VSXExtensionsSourceOptions.RECOMMENDED = 'recommended';
exports.VSXExtensionsSourceOptions = VSXExtensionsSourceOptions = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VSXExtensionsSourceOptions);
let VSXExtensionsSource = class VSXExtensionsSource extends source_tree_1.TreeSource {
    constructor() {
        super(...arguments);
        this.scheduleFireDidChange = debounce(() => this.fireDidChange(), 100, { leading: false, trailing: true });
    }
    init() {
        this.fireDidChange();
        this.toDispose.push(this.model.onDidChange(() => this.scheduleFireDidChange()));
    }
    getModel() {
        return this.model;
    }
    *getElements() {
        for (const id of this.doGetElements()) {
            const extension = this.model.getExtension(id);
            if (!extension) {
                continue;
            }
            if (this.options.id === VSXExtensionsSourceOptions.RECOMMENDED) {
                if (this.model.isInstalled(id)) {
                    continue;
                }
            }
            if (this.options.id === VSXExtensionsSourceOptions.BUILT_IN) {
                if (extension.builtin) {
                    yield extension;
                }
            }
            else if (!extension.builtin) {
                yield extension;
            }
        }
    }
    doGetElements() {
        if (this.options.id === VSXExtensionsSourceOptions.SEARCH_RESULT) {
            return this.model.searchResult;
        }
        if (this.options.id === VSXExtensionsSourceOptions.RECOMMENDED) {
            return this.model.recommended;
        }
        return this.model.installed;
    }
};
exports.VSXExtensionsSource = VSXExtensionsSource;
tslib_1.__decorate([
    (0, inversify_1.inject)(VSXExtensionsSourceOptions),
    tslib_1.__metadata("design:type", VSXExtensionsSourceOptions)
], VSXExtensionsSource.prototype, "options", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(vsx_extensions_model_1.VSXExtensionsModel),
    tslib_1.__metadata("design:type", vsx_extensions_model_1.VSXExtensionsModel)
], VSXExtensionsSource.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], VSXExtensionsSource.prototype, "init", null);
exports.VSXExtensionsSource = VSXExtensionsSource = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VSXExtensionsSource);
//# sourceMappingURL=vsx-extensions-source.js.map