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
exports.MarkdownPreviewHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const path_1 = require("@theia/core/lib/common/path");
const hljs = require("highlight.js");
const markdownit = require("@theia/core/shared/markdown-it");
const anchor = require("markdown-it-anchor");
const DOMPurify = require("@theia/core/shared/dompurify");
const preview_uri_1 = require("../preview-uri");
const preview_handler_1 = require("../preview-handler");
const preview_link_normalizer_1 = require("../preview-link-normalizer");
let MarkdownPreviewHandler = class MarkdownPreviewHandler {
    constructor() {
        this.iconClass = 'markdown-icon file-icon';
        this.contentClass = 'markdown-preview';
    }
    canHandle(uri) {
        return uri.scheme === 'file'
            && (uri.path.ext.toLowerCase() === '.md' ||
                uri.path.ext.toLowerCase() === '.markdown') ? 500 : 0;
    }
    renderContent(params) {
        const content = params.content;
        const renderedContent = this.getEngine().render(content, params);
        const contentElement = document.createElement('div');
        contentElement.classList.add(this.contentClass);
        contentElement.innerHTML = DOMPurify.sanitize(renderedContent);
        this.addLinkClickedListener(contentElement, params);
        return contentElement;
    }
    addLinkClickedListener(contentElement, params) {
        contentElement.addEventListener('click', (event) => {
            const candidate = (event.target || event.srcElement);
            const link = this.findLink(candidate, contentElement);
            if (link) {
                event.preventDefault();
                if (link.startsWith('#')) {
                    this.revealFragment(contentElement, link);
                }
                else {
                    const preview = !(common_1.isOSX ? event.metaKey : event.ctrlKey);
                    const uri = this.resolveUri(link, params.originUri, preview);
                    this.openLink(uri, params.originUri);
                }
            }
        });
    }
    findLink(element, container) {
        let candidate = element;
        while (candidate.tagName !== 'A') {
            if (candidate === container) {
                return;
            }
            candidate = candidate.parentElement;
            if (!candidate) {
                return;
            }
        }
        return candidate.getAttribute('href') || undefined;
    }
    async openLink(uri, originUri) {
        const opener = await this.openerService.getOpener(uri);
        opener.open(uri, { originUri });
    }
    resolveUri(link, uri, preview) {
        const linkURI = new uri_1.default(link);
        // URIs are always absolute, check link as a path whether it is relative
        if (!new path_1.Path(link).isAbsolute && linkURI.scheme === uri.scheme &&
            (!linkURI.authority || linkURI.authority === uri.authority)) {
            // get a relative path from URI by trimming leading `/`
            const relativePath = linkURI.path.toString().substring(1);
            const resolvedUri = uri.parent.resolve(relativePath).withFragment(linkURI.fragment).withQuery(linkURI.query);
            return preview ? preview_uri_1.PreviewUri.encode(resolvedUri) : resolvedUri;
        }
        return linkURI;
    }
    revealFragment(contentElement, fragment) {
        const elementToReveal = this.findElementForFragment(contentElement, fragment);
        if (!elementToReveal) {
            return;
        }
        elementToReveal.scrollIntoView();
    }
    findElementForFragment(content, link) {
        const fragment = link.startsWith('#') ? link.substring(1) : link;
        const filter = {
            acceptNode: (node) => {
                if (node instanceof HTMLHeadingElement) {
                    if (node.tagName.toLowerCase().startsWith('h') && node.id === fragment) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
                return NodeFilter.FILTER_SKIP;
            }
        };
        const treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_ELEMENT, filter);
        if (treeWalker.nextNode()) {
            const element = treeWalker.currentNode;
            return element;
        }
        return undefined;
    }
    findElementForSourceLine(content, sourceLine) {
        const markedElements = content.getElementsByClassName('line');
        let matchedElement;
        for (let i = 0; i < markedElements.length; i++) {
            const element = markedElements[i];
            const line = Number.parseInt(element.getAttribute('data-line') || '0');
            if (line > sourceLine) {
                break;
            }
            matchedElement = element;
        }
        return matchedElement;
    }
    getSourceLineForOffset(content, offset) {
        const lineElements = this.getLineElementsAtOffset(content, offset);
        if (lineElements.length < 1) {
            return undefined;
        }
        const firstLineNumber = this.getLineNumberFromAttribute(lineElements[0]);
        if (firstLineNumber === undefined) {
            return undefined;
        }
        if (lineElements.length === 1) {
            return firstLineNumber;
        }
        const secondLineNumber = this.getLineNumberFromAttribute(lineElements[1]);
        if (secondLineNumber === undefined) {
            return firstLineNumber;
        }
        const y1 = lineElements[0].offsetTop;
        const y2 = lineElements[1].offsetTop;
        const dY = (offset - y1) / (y2 - y1);
        const dL = (secondLineNumber - firstLineNumber) * dY;
        const line = firstLineNumber + Math.floor(dL);
        return line;
    }
    /**
     * returns two significant line elements for the given offset.
     */
    getLineElementsAtOffset(content, offset) {
        let skipNext = false;
        const filter = {
            acceptNode: (node) => {
                if (node instanceof HTMLElement) {
                    if (node.classList.contains('line')) {
                        if (skipNext) {
                            return NodeFilter.FILTER_SKIP;
                        }
                        if (node.offsetTop > offset) {
                            skipNext = true;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
                return NodeFilter.FILTER_REJECT;
            }
        };
        const treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_ELEMENT, filter);
        const lineElements = [];
        while (treeWalker.nextNode()) {
            const element = treeWalker.currentNode;
            lineElements.push(element);
        }
        return lineElements.slice(-2);
    }
    getLineNumberFromAttribute(element) {
        const attribute = element.getAttribute('data-line');
        return attribute ? Number.parseInt(attribute) : undefined;
    }
    getEngine() {
        if (!this.engine) {
            const engine = this.engine = markdownit({
                html: true,
                linkify: true,
                highlight: (str, lang) => {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return '<pre class="hljs"><code><div>' + hljs.highlight(lang, str, true).value + '</div></code></pre>';
                        }
                        catch { }
                    }
                    return '<pre class="hljs"><code><div>' + engine.utils.escapeHtml(str) + '</div></code></pre>';
                }
            });
            const renderers = ['heading_open', 'paragraph_open', 'list_item_open', 'blockquote_open', 'code_block', 'image', 'fence'];
            for (const renderer of renderers) {
                const originalRenderer = engine.renderer.rules[renderer];
                engine.renderer.rules[renderer] = (tokens, index, options, env, self) => {
                    const token = tokens[index];
                    if (token.map) {
                        const line = token.map[0];
                        token.attrJoin('class', 'line');
                        token.attrSet('data-line', line.toString());
                    }
                    return (originalRenderer)
                        // tslint:disable-next-line:no-void-expression
                        ? originalRenderer(tokens, index, options, env, self)
                        : self.renderToken(tokens, index, options);
                };
            }
            const originalImageRenderer = engine.renderer.rules.image;
            if (originalImageRenderer) {
                engine.renderer.rules.image = (tokens, index, options, env, self) => {
                    if (preview_handler_1.RenderContentParams.is(env)) {
                        const documentUri = env.originUri;
                        const token = tokens[index];
                        if (token.attrs) {
                            const srcAttr = token.attrs.find(a => a[0] === 'src');
                            if (srcAttr) {
                                const href = srcAttr[1];
                                srcAttr[1] = this.linkNormalizer.normalizeLink(documentUri, href);
                            }
                        }
                    }
                    return originalImageRenderer(tokens, index, options, env, self);
                };
            }
            const domParser = new DOMParser();
            const parseDOM = (html) => domParser.parseFromString(html, 'text/html').getElementsByTagName('body')[0];
            const modifyDOM = (body, tag, procedure) => {
                const elements = body.getElementsByTagName(tag);
                for (let i = 0; i < elements.length; i++) {
                    const element = elements.item(i);
                    if (element) {
                        procedure(element);
                    }
                }
            };
            const normalizeAllImgSrcInHTML = (html, normalizeLink) => {
                const body = parseDOM(html);
                modifyDOM(body, 'img', img => {
                    const src = img.getAttributeNode('src');
                    if (src) {
                        src.nodeValue = normalizeLink(src.nodeValue || '');
                    }
                });
                return body.innerHTML;
            };
            for (const name of ['html_block', 'html_inline']) {
                const originalRenderer = engine.renderer.rules[name];
                if (originalRenderer) {
                    engine.renderer.rules[name] = (tokens, index, options, env, self) => {
                        const currentToken = tokens[index];
                        const content = currentToken.content;
                        if (content.includes('<img') && preview_handler_1.RenderContentParams.is(env)) {
                            const documentUri = env.originUri;
                            currentToken.content = normalizeAllImgSrcInHTML(content, link => this.linkNormalizer.normalizeLink(documentUri, link));
                        }
                        return originalRenderer(tokens, index, options, env, self);
                    };
                }
            }
            anchor(engine, {});
        }
        return this.engine;
    }
};
exports.MarkdownPreviewHandler = MarkdownPreviewHandler;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], MarkdownPreviewHandler.prototype, "openerService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(preview_link_normalizer_1.PreviewLinkNormalizer),
    tslib_1.__metadata("design:type", preview_link_normalizer_1.PreviewLinkNormalizer)
], MarkdownPreviewHandler.prototype, "linkNormalizer", void 0);
exports.MarkdownPreviewHandler = MarkdownPreviewHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MarkdownPreviewHandler);
//# sourceMappingURL=markdown-preview-handler.js.map