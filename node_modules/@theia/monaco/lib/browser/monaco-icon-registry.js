"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
exports.MonacoIconRegistry = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const iconRegistry_1 = require("@theia/monaco-editor-core/esm/vs/platform/theme/common/iconRegistry");
let MonacoIconRegistry = class MonacoIconRegistry {
    constructor() {
        this.iconRegistry = (0, iconRegistry_1.getIconRegistry)();
    }
    registerIcon(id, defaults, description) {
        return this.iconRegistry.registerIcon(id, defaults, description);
    }
    deregisterIcon(id) {
        return this.iconRegistry.deregisterIcon(id);
    }
    registerIconFont(id, definition) {
        // need to cast because of vscode issue https://github.com/microsoft/vscode/issues/190584
        return this.iconRegistry.registerIconFont(id, definition);
    }
    deregisterIconFont(id) {
        return this.iconRegistry.deregisterIconFont(id);
    }
    getIconFont(id) {
        // need to cast because of vscode issue https://github.com/microsoft/vscode/issues/190584
        return this.iconRegistry.getIconFont(id);
    }
};
exports.MonacoIconRegistry = MonacoIconRegistry;
exports.MonacoIconRegistry = MonacoIconRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoIconRegistry);
//# sourceMappingURL=monaco-icon-registry.js.map