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
exports.MarkdownRendererImpl = exports.MarkdownRendererFactory = exports.MarkdownRenderer = void 0;
const tslib_1 = require("tslib");
const DOMPurify = require("dompurify");
const inversify_1 = require("inversify");
const markdownit = require("markdown-it");
const label_parser_1 = require("../label-parser");
const widgets_1 = require("../widgets");
// #endregion
/** Use this directly if you aren't worried about circular dependencies in the Shell */
exports.MarkdownRenderer = Symbol('MarkdownRenderer');
/** Use this to avoid circular dependencies in the Shell */
exports.MarkdownRendererFactory = Symbol('MarkdownRendererFactory');
let MarkdownRendererImpl = class MarkdownRendererImpl {
    constructor() {
        this.markdownIt = markdownit();
    }
    init() {
        this.markdownItPlugin();
    }
    render(markdown, options) {
        const host = document.createElement('div');
        if (markdown) {
            const html = this.markdownIt.render(markdown.value);
            host.innerHTML = DOMPurify.sanitize(html, {
                ALLOW_UNKNOWN_PROTOCOLS: true // DOMPurify usually strips non http(s) links from hrefs
            });
        }
        return { element: host, dispose: () => { } };
    }
    markdownItPlugin() {
        this.markdownIt.renderer.rules.text = (tokens, idx) => {
            const content = tokens[idx].content;
            return this.labelParser.parse(content).map(chunk => {
                if (typeof chunk === 'string') {
                    return chunk;
                }
                return `<i class="${(0, widgets_1.codicon)(chunk.name)} ${chunk.animation ? `fa-${chunk.animation}` : ''} icon-inline"></i>`;
            }).join('');
        };
    }
};
exports.MarkdownRendererImpl = MarkdownRendererImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(label_parser_1.LabelParser),
    tslib_1.__metadata("design:type", label_parser_1.LabelParser)
], MarkdownRendererImpl.prototype, "labelParser", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MarkdownRendererImpl.prototype, "init", null);
exports.MarkdownRendererImpl = MarkdownRendererImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MarkdownRendererImpl);
//# sourceMappingURL=markdown-renderer.js.map