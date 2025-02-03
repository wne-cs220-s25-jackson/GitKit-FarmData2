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
exports.DefaultBreadcrumbRenderer = exports.BreadcrumbRenderer = void 0;
const tslib_1 = require("tslib");
const React = require("react");
const inversify_1 = require("inversify");
const breadcrumbs_constants_1 = require("./breadcrumbs-constants");
exports.BreadcrumbRenderer = Symbol('BreadcrumbRenderer');
let DefaultBreadcrumbRenderer = class DefaultBreadcrumbRenderer {
    render(breadcrumb, onMouseDown) {
        return React.createElement("li", { key: breadcrumb.id, title: breadcrumb.longLabel, className: breadcrumbs_constants_1.Styles.BREADCRUMB_ITEM + (!onMouseDown ? '' : ' ' + breadcrumbs_constants_1.Styles.BREADCRUMB_ITEM_HAS_POPUP), onMouseDown: event => onMouseDown && onMouseDown(breadcrumb, event), tabIndex: 0, "data-breadcrumb-id": breadcrumb.id },
            breadcrumb.iconClass && React.createElement("span", { className: breadcrumb.iconClass }),
            " ",
            React.createElement("span", null,
                " ",
                breadcrumb.label));
    }
};
exports.DefaultBreadcrumbRenderer = DefaultBreadcrumbRenderer;
exports.DefaultBreadcrumbRenderer = DefaultBreadcrumbRenderer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultBreadcrumbRenderer);
//# sourceMappingURL=breadcrumb-renderer.js.map