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
exports.ReactRenderer = exports.RendererHost = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const React = require("react");
const client_1 = require("react-dom/client");
const common_1 = require("../../common");
exports.RendererHost = Symbol('RendererHost');
let ReactRenderer = class ReactRenderer {
    constructor(host) {
        this.toDispose = new common_1.DisposableCollection();
        this.host = host || document.createElement('div');
        this.hostRoot = (0, client_1.createRoot)(this.host);
        this.toDispose.push(common_1.Disposable.create(() => this.hostRoot.unmount()));
    }
    dispose() {
        this.toDispose.dispose();
    }
    render() {
        // Ignore all render calls after the host element has unmounted
        if (!this.toDispose.disposed) {
            this.hostRoot.render(React.createElement(React.Fragment, null, this.doRender()));
        }
    }
    doRender() {
        return undefined;
    }
};
exports.ReactRenderer = ReactRenderer;
exports.ReactRenderer = ReactRenderer = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(exports.RendererHost)),
    tslib_1.__param(0, (0, inversify_1.optional)()),
    tslib_1.__metadata("design:paramtypes", [Object])
], ReactRenderer);
//# sourceMappingURL=react-renderer.js.map