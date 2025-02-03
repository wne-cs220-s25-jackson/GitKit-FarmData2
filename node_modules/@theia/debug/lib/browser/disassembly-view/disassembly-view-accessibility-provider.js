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
exports.AccessibilityProvider = void 0;
const core_1 = require("@theia/core");
// This file is adapted from https://github.com/microsoft/vscode/blob/c061ce5c24fc480342fbc5f23244289d633c56eb/src/vs/workbench/contrib/debug/browser/disassemblyView.ts
class AccessibilityProvider {
    getWidgetAriaLabel() {
        return core_1.nls.localizeByDefault('Disassembly View');
    }
    getAriaLabel(element) {
        let label = '';
        const instruction = element.instruction;
        if (instruction.address !== '-1') {
            label += `${core_1.nls.localizeByDefault('Address')}: ${instruction.address}`;
        }
        if (instruction.instructionBytes) {
            label += `, ${core_1.nls.localizeByDefault('Bytes')}: ${instruction.instructionBytes}`;
        }
        label += `, ${core_1.nls.localizeByDefault('Instruction')}: ${instruction.instruction}`;
        return label;
    }
}
exports.AccessibilityProvider = AccessibilityProvider;
//# sourceMappingURL=disassembly-view-accessibility-provider.js.map