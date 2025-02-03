"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.FileDialogTreeFiltersRenderer = exports.FileDialogTreeFiltersRendererOptions = exports.FileDialogTreeFiltersRendererFactory = exports.FileDialogTreeFilters = exports.FILE_TREE_FILTERS_LIST_CLASS = void 0;
const tslib_1 = require("tslib");
const react_renderer_1 = require("@theia/core/lib/browser/widgets/react-renderer");
const React = require("@theia/core/shared/react");
const inversify_1 = require("@theia/core/shared/inversify");
exports.FILE_TREE_FILTERS_LIST_CLASS = 'theia-FileTreeFiltersList';
/**
 * A set of file filters that are used by the dialog. Each entry is a human readable label,
 * like "TypeScript", and an array of extensions, e.g.
 * ```ts
 * {
 *  'Images': ['png', 'jpg']
 *  'TypeScript': ['ts', 'tsx']
 * }
 * ```
 */
class FileDialogTreeFilters {
}
exports.FileDialogTreeFilters = FileDialogTreeFilters;
exports.FileDialogTreeFiltersRendererFactory = Symbol('FileDialogTreeFiltersRendererFactory');
exports.FileDialogTreeFiltersRendererOptions = Symbol('FileDialogTreeFiltersRendererOptions');
let FileDialogTreeFiltersRenderer = class FileDialogTreeFiltersRenderer extends react_renderer_1.ReactRenderer {
    constructor(options) {
        super();
        this.options = options;
        this.handleFilterChanged = (e) => this.onFilterChanged(e);
        this.suppliedFilters = options.suppliedFilters;
        this.fileDialogTree = options.fileDialogTree;
        this.appliedFilters = { ...this.suppliedFilters, 'All Files': [], };
    }
    doRender() {
        if (!this.appliedFilters) {
            return undefined;
        }
        const options = Object.keys(this.appliedFilters).map(value => this.renderLocation(value));
        return React.createElement("select", { className: 'theia-select ' + exports.FILE_TREE_FILTERS_LIST_CLASS, onChange: this.handleFilterChanged }, ...options);
    }
    renderLocation(value) {
        return React.createElement("option", { value: value, key: value }, value);
    }
    onFilterChanged(e) {
        const locationList = this.locationList;
        if (locationList) {
            const value = locationList.value;
            const filters = this.appliedFilters[value];
            this.fileDialogTree.setFilter(filters);
        }
        e.preventDefault();
        e.stopPropagation();
    }
    get locationList() {
        const locationList = this.host.getElementsByClassName(exports.FILE_TREE_FILTERS_LIST_CLASS)[0];
        if (locationList instanceof HTMLSelectElement) {
            return locationList;
        }
        return undefined;
    }
};
exports.FileDialogTreeFiltersRenderer = FileDialogTreeFiltersRenderer;
exports.FileDialogTreeFiltersRenderer = FileDialogTreeFiltersRenderer = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(exports.FileDialogTreeFiltersRendererOptions)),
    tslib_1.__metadata("design:paramtypes", [Object])
], FileDialogTreeFiltersRenderer);
//# sourceMappingURL=file-dialog-tree-filters-renderer.js.map