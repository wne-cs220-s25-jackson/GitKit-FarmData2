"use strict";
// *****************************************************************************
// Copyright (C) 2024 1C-Soft LLC and others.
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
exports.SplitWidget = void 0;
const widget_1 = require("./widget");
const saveable_1 = require("../saveable");
const common_1 = require("../../common");
/**
 * A widget containing a number of panes in a split layout.
 */
class SplitWidget extends widget_1.BaseWidget {
    constructor(options) {
        super();
        this.onDidChangeTrackableWidgetsEmitter = new common_1.Emitter();
        this.onDidChangeTrackableWidgets = this.onDidChangeTrackableWidgetsEmitter.event;
        this.compositeSaveable = new saveable_1.CompositeSaveable();
        this.toDispose.pushAll([this.onDidChangeTrackableWidgetsEmitter]);
        this.addClass('theia-split-widget');
        const layout = new widget_1.PanelLayout();
        this.layout = layout;
        const that = this;
        this.splitPanel = new class extends widget_1.SplitPanel {
            onChildAdded(msg) {
                super.onChildAdded(msg);
                that.onPaneAdded(msg.child);
            }
            onChildRemoved(msg) {
                super.onChildRemoved(msg);
                that.onPaneRemoved(msg.child);
            }
        }({
            spacing: 1, // --theia-border-width
            ...options
        });
        this.splitPanel.node.tabIndex = -1;
        layout.addWidget(this.splitPanel);
        this.navigatable = options === null || options === void 0 ? void 0 : options.navigatable;
    }
    get orientation() {
        return this.splitPanel.orientation;
    }
    set orientation(value) {
        this.splitPanel.orientation = value;
    }
    relativeSizes() {
        return this.splitPanel.relativeSizes();
    }
    setRelativeSizes(sizes) {
        this.splitPanel.setRelativeSizes(sizes);
    }
    get handles() {
        return this.splitPanel.handles;
    }
    get saveable() {
        return this.compositeSaveable;
    }
    getResourceUri() {
        var _a;
        return (_a = this.navigatable) === null || _a === void 0 ? void 0 : _a.getResourceUri();
    }
    createMoveToUri(resourceUri) {
        var _a;
        return (_a = this.navigatable) === null || _a === void 0 ? void 0 : _a.createMoveToUri(resourceUri);
    }
    storeState() {
        return { orientation: this.orientation, widgets: this.panes, relativeSizes: this.relativeSizes() };
    }
    restoreState(oldState) {
        const { orientation, widgets, relativeSizes } = oldState;
        if (orientation) {
            this.orientation = orientation;
        }
        for (const widget of widgets) {
            this.addPane(widget);
        }
        if (relativeSizes) {
            this.setRelativeSizes(relativeSizes);
        }
    }
    get panes() {
        return this.splitPanel.widgets;
    }
    getTrackableWidgets() {
        return [...this.panes];
    }
    fireDidChangeTrackableWidgets() {
        this.onDidChangeTrackableWidgetsEmitter.fire(this.getTrackableWidgets());
    }
    addPane(pane) {
        this.splitPanel.addWidget(pane);
    }
    insertPane(index, pane) {
        this.splitPanel.insertWidget(index, pane);
    }
    onPaneAdded(pane) {
        if (saveable_1.Saveable.isSource(pane)) {
            this.compositeSaveable.add(pane.saveable);
        }
        this.fireDidChangeTrackableWidgets();
    }
    onPaneRemoved(pane) {
        if (saveable_1.Saveable.isSource(pane)) {
            this.compositeSaveable.remove(pane.saveable);
        }
        this.fireDidChangeTrackableWidgets();
    }
    onActivateRequest(msg) {
        this.splitPanel.node.focus();
    }
}
exports.SplitWidget = SplitWidget;
//# sourceMappingURL=split-widget.js.map