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
exports.BreakpointRenderer = void 0;
const dom_1 = require("@theia/monaco-editor-core/esm/vs/base/browser/dom");
const lifecycle_1 = require("@theia/monaco-editor-core/esm/vs/base/common/lifecycle");
// This file is adapted from https://github.com/microsoft/vscode/blob/c061ce5c24fc480342fbc5f23244289d633c56eb/src/vs/workbench/contrib/debug/browser/disassemblyView.ts
class BreakpointRenderer {
    constructor(_disassemblyView, _debugService) {
        this._disassemblyView = _disassemblyView;
        this._debugService = _debugService;
        this.templateId = BreakpointRenderer.TEMPLATE_ID;
        this._breakpointIcon = 'codicon-debug-breakpoint';
        this._breakpointDisabledIcon = 'codicon-debug-breakpoint-disabled';
        this._breakpointHintIcon = 'codicon-debug-hint';
        this._debugStackframe = 'codicon-debug-stackframe';
        this._debugStackframeFocused = 'codicon-debug-stackframe-focused';
    }
    renderTemplate(container) {
        // align from the bottom so that it lines up with instruction when source code is present.
        container.style.alignSelf = 'flex-end';
        const icon = (0, dom_1.append)(container, (0, dom_1.$)('.disassembly-view'));
        icon.classList.add('codicon');
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.height = this._disassemblyView.fontInfo.lineHeight + 'px';
        const currentElement = { element: undefined };
        const disposables = [
            this._disassemblyView.onDidChangeStackFrame(() => this.rerenderDebugStackframe(icon, currentElement.element)),
            (0, dom_1.addStandardDisposableListener)(container, 'mouseover', () => {
                var _a;
                if ((_a = currentElement.element) === null || _a === void 0 ? void 0 : _a.allowBreakpoint) {
                    icon.classList.add(this._breakpointHintIcon);
                }
            }),
            (0, dom_1.addStandardDisposableListener)(container, 'mouseout', () => {
                var _a;
                if ((_a = currentElement.element) === null || _a === void 0 ? void 0 : _a.allowBreakpoint) {
                    icon.classList.remove(this._breakpointHintIcon);
                }
            }),
            (0, dom_1.addStandardDisposableListener)(container, 'click', () => {
                var _a;
                if ((_a = currentElement.element) === null || _a === void 0 ? void 0 : _a.allowBreakpoint) {
                    // click show hint while waiting for BP to resolve.
                    icon.classList.add(this._breakpointHintIcon);
                    if (currentElement.element.isBreakpointSet) {
                        this._debugService.removeInstructionBreakpoint(currentElement.element.instruction.address);
                    }
                    else if (currentElement.element.allowBreakpoint && !currentElement.element.isBreakpointSet) {
                        this._debugService.addInstructionBreakpoint(currentElement.element.instruction.address, 0);
                    }
                }
            })
        ];
        return { currentElement, icon, disposables };
    }
    renderElement(element, index, templateData, height) {
        templateData.currentElement.element = element;
        this.rerenderDebugStackframe(templateData.icon, element);
    }
    disposeTemplate(templateData) {
        (0, lifecycle_1.dispose)(templateData.disposables);
        templateData.disposables = [];
    }
    rerenderDebugStackframe(icon, element) {
        if ((element === null || element === void 0 ? void 0 : element.instruction.address) === this._disassemblyView.focusedCurrentInstructionAddress) {
            icon.classList.add(this._debugStackframe);
        }
        else if ((element === null || element === void 0 ? void 0 : element.instruction.address) === this._disassemblyView.focusedInstructionAddress) {
            icon.classList.add(this._debugStackframeFocused);
        }
        else {
            icon.classList.remove(this._debugStackframe);
            icon.classList.remove(this._debugStackframeFocused);
        }
        icon.classList.remove(this._breakpointHintIcon);
        if (element === null || element === void 0 ? void 0 : element.isBreakpointSet) {
            if (element.isBreakpointEnabled) {
                icon.classList.add(this._breakpointIcon);
                icon.classList.remove(this._breakpointDisabledIcon);
            }
            else {
                icon.classList.remove(this._breakpointIcon);
                icon.classList.add(this._breakpointDisabledIcon);
            }
        }
        else {
            icon.classList.remove(this._breakpointIcon);
            icon.classList.remove(this._breakpointDisabledIcon);
        }
    }
}
exports.BreakpointRenderer = BreakpointRenderer;
BreakpointRenderer.TEMPLATE_ID = 'breakpoint';
//# sourceMappingURL=disassembly-view-breakpoint-renderer.js.map