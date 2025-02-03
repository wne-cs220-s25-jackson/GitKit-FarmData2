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
exports.FilepathBreadcrumb = void 0;
const filepath_breadcrumbs_contribution_1 = require("./filepath-breadcrumbs-contribution");
class FilepathBreadcrumb {
    constructor(uri, label, longLabel, iconClass, containerClass) {
        this.uri = uri;
        this.label = label;
        this.longLabel = longLabel;
        this.iconClass = iconClass;
        this.containerClass = containerClass;
    }
    get id() {
        return this.type.toString() + '_' + this.uri.toString();
    }
    get type() {
        return filepath_breadcrumbs_contribution_1.FilepathBreadcrumbType;
    }
}
exports.FilepathBreadcrumb = FilepathBreadcrumb;
(function (FilepathBreadcrumb) {
    function is(breadcrumb) {
        return 'uri' in breadcrumb;
    }
    FilepathBreadcrumb.is = is;
})(FilepathBreadcrumb || (exports.FilepathBreadcrumb = FilepathBreadcrumb = {}));
//# sourceMappingURL=filepath-breadcrumb.js.map