"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// *****************************************************************************
// Copyright (C) 2024 STMicroelectronics and others.
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
exports.MonacoStandaloneThemeService = void 0;
const standaloneThemeService_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneThemeService");
class MonacoStandaloneThemeService extends standaloneThemeService_1.StandaloneThemeService {
    get styleElements() {
        // access private style element array
        return this._styleElements;
    }
    get allCSS() {
        return this._allCSS;
    }
    registerEditorContainer(domNode) {
        const style = domNode.ownerDocument.createElement('style');
        style.type = 'text/css';
        style.media = 'screen';
        style.className = 'monaco-colors';
        style.textContent = this.allCSS;
        domNode.ownerDocument.head.appendChild(style);
        this.styleElements.push(style);
        return {
            dispose: () => {
                for (let i = 0; i < this.styleElements.length; i++) {
                    if (this.styleElements[i] === style) {
                        this.styleElements.splice(i, 1);
                        style.remove();
                        return;
                    }
                }
            }
        };
    }
}
exports.MonacoStandaloneThemeService = MonacoStandaloneThemeService;
//# sourceMappingURL=monaco-standalone-theme-service.js.map