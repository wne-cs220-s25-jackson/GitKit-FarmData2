"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.UserWorkingDirectoryProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const uri_1 = require("../common/uri");
const common_1 = require("../common");
const env_variables_1 = require("../common/env-variables");
const navigatable_types_1 = require("./navigatable-types");
let UserWorkingDirectoryProvider = class UserWorkingDirectoryProvider {
    configure(app) {
        app.shell.onDidChangeCurrentWidget(e => { var _a; return this.setLastOpenResource((_a = e.newValue) !== null && _a !== void 0 ? _a : undefined); });
        this.setLastOpenResource(app.shell.currentWidget);
    }
    setLastOpenResource(widget) {
        if (navigatable_types_1.Navigatable.is(widget)) {
            const uri = widget.getResourceUri();
            if (uri && uri.scheme !== common_1.UNTITLED_SCHEME) {
                this.lastOpenResource = uri;
            }
        }
    }
    /**
     * @returns A {@link URI} that represents a good guess about the directory in which the user is currently operating.
     *
     * Factors considered may include the current widget, current selection, user home directory, or other application state.
     */
    async getUserWorkingDir() {
        var _a;
        return (_a = await this.getFromSelection()) !== null && _a !== void 0 ? _a : this.getFromUserHome();
    }
    getFromSelection() {
        const uri = common_1.UriSelection.getUri(this.selectionService.selection);
        if ((uri === null || uri === void 0 ? void 0 : uri.scheme) === common_1.UNTITLED_SCHEME) {
            // An untitled file is not a valid working directory context.
            return undefined;
        }
        return this.ensureIsDirectory(uri);
    }
    getFromLastOpenResource() {
        return this.ensureIsDirectory(this.lastOpenResource);
    }
    getFromUserHome() {
        return this.envVariables.getHomeDirUri().then(home => new uri_1.default(home));
    }
    ensureIsDirectory(uri) {
        return uri === null || uri === void 0 ? void 0 : uri.parent;
    }
};
exports.UserWorkingDirectoryProvider = UserWorkingDirectoryProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.SelectionService),
    tslib_1.__metadata("design:type", common_1.SelectionService)
], UserWorkingDirectoryProvider.prototype, "selectionService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], UserWorkingDirectoryProvider.prototype, "envVariables", void 0);
exports.UserWorkingDirectoryProvider = UserWorkingDirectoryProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], UserWorkingDirectoryProvider);
//# sourceMappingURL=user-working-directory-provider.js.map