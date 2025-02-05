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
exports.AnsiConsoleItem = void 0;
const React = require("@theia/core/shared/react");
const DOMPurify = require("@theia/core/shared/dompurify");
const Anser = require("anser");
class AnsiConsoleItem {
    constructor(content, severity) {
        this.content = content;
        this.severity = severity;
        this.htmlContent = new Anser().ansiToHtml(this.content, {
            use_classes: true,
            remove_empty: true
        });
    }
    get visible() {
        return !!this.htmlContent;
    }
    render() {
        return React.createElement("div", { className: 'theia-console-ansi-console-item', dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(this.htmlContent) } });
    }
}
exports.AnsiConsoleItem = AnsiConsoleItem;
//# sourceMappingURL=ansi-console-item.js.map