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
var MiniBrowser_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniBrowser = exports.MiniBrowserOptions = exports.MiniBrowserProps = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const disposable_1 = require("@theia/core/lib/common/disposable");
const widget_1 = require("@theia/core/lib/browser/widgets/widget");
const mini_browser_content_1 = require("./mini-browser-content");
Object.defineProperty(exports, "MiniBrowserProps", { enumerable: true, get: function () { return mini_browser_content_1.MiniBrowserProps; } });
let MiniBrowserOptions = class MiniBrowserOptions {
};
exports.MiniBrowserOptions = MiniBrowserOptions;
exports.MiniBrowserOptions = MiniBrowserOptions = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MiniBrowserOptions);
let MiniBrowser = MiniBrowser_1 = class MiniBrowser extends widget_1.BaseWidget {
    constructor() {
        super(...arguments);
        this.toDisposeOnProps = new disposable_1.DisposableCollection();
    }
    init() {
        const { uri } = this.options;
        this.id = `${MiniBrowser_1.ID}:${uri.toString()}`;
        this.title.closable = true;
        this.layout = new widget_1.PanelLayout({ fitPolicy: 'set-no-constraint' });
    }
    getResourceUri() {
        return this.options.uri;
    }
    createMoveToUri(resourceUri) {
        return this.options.uri && this.options.uri.withPath(resourceUri.path);
    }
    setProps(raw) {
        const props = {
            toolbar: raw.toolbar,
            startPage: raw.startPage,
            sandbox: raw.sandbox,
            iconClass: raw.iconClass,
            name: raw.name,
            resetBackground: raw.resetBackground
        };
        if (JSON.stringify(props) === JSON.stringify(this.props)) {
            return;
        }
        this.toDisposeOnProps.dispose();
        this.toDispose.push(this.toDisposeOnProps);
        this.props = props;
        this.title.caption = this.title.label = props.name || 'Browser';
        this.title.iconClass = props.iconClass || MiniBrowser_1.ICON;
        const content = this.createContent(props);
        this.layout.addWidget(content);
        this.toDisposeOnProps.push(content);
    }
    onActivateRequest(msg) {
        super.onActivateRequest(msg);
        const widget = this.layout.widgets[0];
        if (widget) {
            widget.activate();
        }
    }
    storeState() {
        const { props } = this;
        return { props };
    }
    restoreState(oldState) {
        if (!this.toDisposeOnProps.disposed) {
            return;
        }
        if ('props' in oldState) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.setProps(oldState['props']);
        }
    }
};
exports.MiniBrowser = MiniBrowser;
MiniBrowser.ID = 'mini-browser';
MiniBrowser.ICON = (0, widget_1.codicon)('globe');
tslib_1.__decorate([
    (0, inversify_1.inject)(MiniBrowserOptions),
    tslib_1.__metadata("design:type", MiniBrowserOptions)
], MiniBrowser.prototype, "options", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(mini_browser_content_1.MiniBrowserContentFactory),
    tslib_1.__metadata("design:type", Function)
], MiniBrowser.prototype, "createContent", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MiniBrowser.prototype, "init", null);
exports.MiniBrowser = MiniBrowser = MiniBrowser_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MiniBrowser);
//# sourceMappingURL=mini-browser.js.map