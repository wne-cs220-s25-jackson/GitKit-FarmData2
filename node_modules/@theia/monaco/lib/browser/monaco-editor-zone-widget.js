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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation and others. All rights reserved.
 *  Licensed under the MIT License. See https://github.com/Microsoft/vscode/blob/master/LICENSE.txt for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoEditorZoneWidget = void 0;
const core_1 = require("@theia/core");
const browser_1 = require("@theia/editor/lib/browser");
const monaco = require("@theia/monaco-editor-core");
class MonacoEditorZoneWidget {
    constructor(editorInstance, showArrow = true) {
        this.showArrow = showArrow;
        this.zoneNode = document.createElement('div');
        this.containerNode = document.createElement('div');
        this.onDidLayoutChangeEmitter = new core_1.Emitter();
        this.onDidLayoutChange = this.onDidLayoutChangeEmitter.event;
        this.toHide = new core_1.DisposableCollection();
        this.toDispose = new core_1.DisposableCollection(this.onDidLayoutChangeEmitter, this.toHide);
        this.editor = editorInstance;
        this.zoneNode.classList.add('zone-widget');
        this.containerNode.classList.add('zone-widget-container');
        this.zoneNode.appendChild(this.containerNode);
        this.updateWidth();
        this.toDispose.push(this.editor.onDidLayoutChange(info => this.updateWidth(info)));
    }
    dispose() {
        this.toDispose.dispose();
        this.hide();
    }
    get options() {
        return this.viewZone ? this._options : undefined;
    }
    hide() {
        this.toHide.dispose();
    }
    show(options) {
        let { afterLineNumber, afterColumn, heightInLines } = this._options = { showFrame: true, ...options };
        const lineHeight = this.editor.getOption(monaco.editor.EditorOption.lineHeight);
        // adjust heightInLines to viewport
        const maxHeightInLines = Math.max(12, (this.editor.getLayoutInfo().height / lineHeight) * 0.8);
        heightInLines = Math.min(heightInLines, maxHeightInLines);
        let arrowHeight = 0;
        this.toHide.dispose();
        this.editor.changeViewZones(accessor => {
            this.zoneNode.style.top = '-1000px';
            const domNode = document.createElement('div');
            domNode.style.overflow = 'hidden';
            const zone = {
                domNode,
                afterLineNumber,
                afterColumn,
                heightInLines,
                onDomNodeTop: zoneTop => this.updateTop(zoneTop),
                onComputedHeight: zoneHeight => this.updateHeight(zoneHeight)
            };
            this.viewZone = Object.assign(zone, {
                id: accessor.addZone(zone)
            });
            const id = this.viewZone.id;
            this.toHide.push(core_1.Disposable.create(() => {
                this.editor.changeViewZones(a => a.removeZone(id));
                this.viewZone = undefined;
            }));
            if (this.showArrow) {
                this.arrow = new Arrow(this.editor);
                arrowHeight = Math.round(lineHeight / 3);
                this.arrow.height = arrowHeight;
                this.arrow.show({ lineNumber: options.afterLineNumber, column: 0 });
                this.toHide.push(this.arrow);
            }
            const widget = {
                getId: () => 'editor-zone-widget-' + id,
                getDomNode: () => this.zoneNode,
                // eslint-disable-next-line no-null/no-null
                getPosition: () => null
            };
            this.editor.addOverlayWidget(widget);
            this.toHide.push(core_1.Disposable.create(() => this.editor.removeOverlayWidget(widget)));
        });
        this.containerNode.style.overflow = 'hidden';
        this.updateContainerHeight(heightInLines * lineHeight);
        const model = this.editor.getModel();
        if (model) {
            const revealLineNumber = Math.min(model.getLineCount(), Math.max(1, afterLineNumber + 1));
            this.editor.revealLine(revealLineNumber, monaco.editor.ScrollType.Smooth);
        }
    }
    layout(heightInLines) {
        if (this.viewZone && this.viewZone.heightInLines !== heightInLines) {
            this.viewZone.heightInLines = heightInLines;
            const id = this.viewZone.id;
            this.editor.changeViewZones(accessor => accessor.layoutZone(id));
        }
    }
    updateTop(top) {
        this.zoneNode.style.top = top + (this.showArrow ? 6 : 0) + 'px';
    }
    updateHeight(zoneHeight) {
        this.zoneNode.style.height = zoneHeight + 'px';
        this.updateContainerHeight(zoneHeight);
    }
    updateContainerHeight(zoneHeight) {
        const { frameWidth, height } = this.computeContainerHeight(zoneHeight);
        this.containerNode.style.height = height + 'px';
        this.containerNode.style.borderTopWidth = frameWidth + 'px';
        this.containerNode.style.borderBottomWidth = frameWidth + 'px';
        const width = this.computeWidth();
        this.onDidLayoutChangeEmitter.fire({ height, width });
    }
    computeContainerHeight(zoneHeight) {
        const lineHeight = this.editor.getOption(monaco.editor.EditorOption.lineHeight);
        const frameWidth = this._options && this._options.frameWidth;
        const frameThickness = this._options && this._options.showFrame ? Math.round(lineHeight / 9) : 0;
        return {
            frameWidth: frameWidth !== undefined ? frameWidth : frameThickness,
            height: zoneHeight - 2 * frameThickness
        };
    }
    updateWidth(info = this.editor.getLayoutInfo()) {
        const width = this.computeWidth(info);
        this.zoneNode.style.width = width + 'px';
        this.zoneNode.style.left = this.computeLeft(info) + 'px';
    }
    computeWidth(info = this.editor.getLayoutInfo()) {
        return info.width - info.minimap.minimapWidth - info.verticalScrollbarWidth;
    }
    computeLeft(info = this.editor.getLayoutInfo()) {
        // If minimap is to the left, we move beyond it
        if (info.minimap.minimapWidth > 0 && info.minimap.minimapLeft === 0) {
            return info.minimap.minimapWidth;
        }
        return 0;
    }
}
exports.MonacoEditorZoneWidget = MonacoEditorZoneWidget;
class IdGenerator {
    constructor(prefix) {
        this.prefix = prefix;
        this.lastId = 0;
    }
    nextId() {
        return this.prefix + (++this.lastId);
    }
}
class Arrow {
    constructor(_editor) {
        this._editor = _editor;
        this.idGenerator = new IdGenerator('.arrow-decoration-');
        this.ruleName = this.idGenerator.nextId();
        this.decorations = [];
        this._height = -1;
    }
    dispose() {
        this.hide();
    }
    set height(value) {
        if (this._height !== value) {
            this._height = value;
            this._updateStyle();
        }
    }
    _updateStyle() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'screen';
        document.getElementsByTagName('head')[0].appendChild(style);
        const selector = `.monaco-editor ${this.ruleName}`;
        const cssText = `border-style: solid; border-color: transparent transparent var(--theia-peekView-border); border-width:
            ${this._height}px; bottom: -${this._height}px; margin-left: -${this._height}px; `;
        style.sheet.insertRule(selector + '{' + cssText + '}', 0);
    }
    show(where) {
        this.decorations = this._editor.deltaDecorations(this.decorations, [{ range: monaco.Range.fromPositions(where), options: { className: this.ruleName, stickiness: browser_1.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges } }]);
    }
    hide() {
        this._editor.deltaDecorations(this.decorations, []);
    }
}
//# sourceMappingURL=monaco-editor-zone-widget.js.map