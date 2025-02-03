"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
exports.EditorPreviewWidget = void 0;
const browser_1 = require("@theia/core/lib/browser");
const browser_2 = require("@theia/editor/lib/browser");
const common_1 = require("@theia/core/lib/common");
const PREVIEW_TITLE_CLASS = 'theia-editor-preview-title-unpinned';
class EditorPreviewWidget extends browser_2.EditorWidget {
    get isPreview() {
        return this._isPreview;
    }
    constructor(editor, selectionService) {
        super(editor, selectionService);
        this._isPreview = false;
        this.onDidChangePreviewStateEmitter = new common_1.Emitter();
        this.onDidChangePreviewState = this.onDidChangePreviewStateEmitter.event;
        this.toDispose.push(this.onDidChangePreviewStateEmitter);
    }
    initializePreview() {
        const oneTimeListeners = new common_1.DisposableCollection();
        this._isPreview = true;
        this.title.className += ` ${PREVIEW_TITLE_CLASS}`;
        const oneTimeDirtyChangeListener = this.saveable.onDirtyChanged(() => {
            this.convertToNonPreview();
            oneTimeListeners.dispose();
        });
        oneTimeListeners.push(oneTimeDirtyChangeListener);
        const oneTimeTitleChangeHandler = () => {
            if (this.title.className.includes(browser_1.PINNED_CLASS)) {
                this.convertToNonPreview();
                oneTimeListeners.dispose();
            }
        };
        this.title.changed.connect(oneTimeTitleChangeHandler);
        oneTimeListeners.push(common_1.Disposable.create(() => this.title.changed.disconnect(oneTimeTitleChangeHandler)));
        this.toDispose.push(oneTimeListeners);
    }
    convertToNonPreview() {
        if (this._isPreview) {
            this._isPreview = false;
            this.currentTabbar = undefined;
            this.title.className = this.title.className.replace(PREVIEW_TITLE_CLASS, '');
            this.onDidChangePreviewStateEmitter.fire();
            this.onDidChangePreviewStateEmitter.dispose();
        }
    }
    handleTabBarChange(oldTabBar, newTabBar) {
        super.handleTabBarChange(oldTabBar, newTabBar);
        if (this._isPreview) {
            if (oldTabBar && newTabBar) {
                this.convertToNonPreview();
            }
        }
    }
    storeState() {
        var _a;
        if (((_a = this.getResourceUri()) === null || _a === void 0 ? void 0 : _a.scheme) !== common_1.UNTITLED_SCHEME) {
            const { _isPreview: isPreview } = this;
            return { isPreview, editorState: this.editor.storeViewState() };
        }
    }
    restoreState(oldState) {
        if (!oldState.isPreview) {
            this.convertToNonPreview();
        }
        this.editor.restoreViewState(oldState.editorState);
    }
}
exports.EditorPreviewWidget = EditorPreviewWidget;
//# sourceMappingURL=editor-preview-widget.js.map