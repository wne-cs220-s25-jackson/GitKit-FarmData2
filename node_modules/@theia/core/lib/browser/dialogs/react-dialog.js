"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
exports.ReactDialog = void 0;
const tslib_1 = require("tslib");
const React = require("react");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const dialogs_1 = require("../dialogs");
const client_1 = require("react-dom/client");
let ReactDialog = class ReactDialog extends dialogs_1.AbstractDialog {
    constructor(props) {
        super(props);
        this.contentNodeRoot = (0, client_1.createRoot)(this.contentNode);
        this.isMounted = true;
        this.toDispose.push(common_1.Disposable.create(() => {
            this.contentNodeRoot.unmount();
            this.isMounted = false;
        }));
    }
    onUpdateRequest(msg) {
        var _a;
        super.onUpdateRequest(msg);
        if (!this.isMounted) {
            this.contentNodeRoot = (0, client_1.createRoot)(this.contentNode);
        }
        (_a = this.contentNodeRoot) === null || _a === void 0 ? void 0 : _a.render(React.createElement(React.Fragment, null, this.render()));
    }
};
exports.ReactDialog = ReactDialog;
exports.ReactDialog = ReactDialog = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(dialogs_1.DialogProps)),
    tslib_1.__metadata("design:paramtypes", [dialogs_1.DialogProps])
], ReactDialog);
//# sourceMappingURL=react-dialog.js.map