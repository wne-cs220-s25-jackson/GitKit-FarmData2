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
exports.MiniBrowserContent = exports.MiniBrowserContentFactory = exports.MiniBrowserProps = void 0;
const tslib_1 = require("tslib");
const PDFObject = require("pdfobject");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const logger_1 = require("@theia/core/lib/common/logger");
const event_1 = require("@theia/core/lib/common/event");
const keybinding_1 = require("@theia/core/lib/browser/keybinding");
const window_service_1 = require("@theia/core/lib/browser/window/window-service");
const browser_1 = require("@theia/core/lib/browser");
const disposable_1 = require("@theia/core/lib/common/disposable");
const widget_1 = require("@theia/core/lib/browser/widgets/widget");
const location_mapper_service_1 = require("./location-mapper-service");
const application_shell_mouse_tracker_1 = require("@theia/core/lib/browser/shell/application-shell-mouse-tracker");
const debounce = require("@theia/core/shared/lodash.debounce");
const mini_browser_content_style_1 = require("./mini-browser-content-style");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
/**
 * Initializer properties for the embedded browser widget.
 */
let MiniBrowserProps = class MiniBrowserProps {
};
exports.MiniBrowserProps = MiniBrowserProps;
exports.MiniBrowserProps = MiniBrowserProps = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MiniBrowserProps);
(function (MiniBrowserProps) {
    /**
     * Enumeration of the supported `sandbox` options for the `iframe`.
     */
    let SandboxOptions;
    (function (SandboxOptions) {
        /**
         * Allows form submissions.
         */
        SandboxOptions[SandboxOptions["allow-forms"] = 0] = "allow-forms";
        /**
         * Allows popups, such as `window.open()`, `showModalDialog()`, `target=”_blank”`, etc.
         */
        SandboxOptions[SandboxOptions["allow-popups"] = 1] = "allow-popups";
        /**
         * Allows pointer lock.
         */
        SandboxOptions[SandboxOptions["allow-pointer-lock"] = 2] = "allow-pointer-lock";
        /**
         * Allows the document to maintain its origin. Pages loaded from https://example.com/ will retain access to that origin’s data.
         */
        SandboxOptions[SandboxOptions["allow-same-origin"] = 3] = "allow-same-origin";
        /**
         * Allows JavaScript execution. Also allows features to trigger automatically (as they’d be trivial to implement via JavaScript).
         */
        SandboxOptions[SandboxOptions["allow-scripts"] = 4] = "allow-scripts";
        /**
         * Allows the document to break out of the frame by navigating the top-level `window`.
         */
        SandboxOptions[SandboxOptions["allow-top-navigation"] = 5] = "allow-top-navigation";
        /**
         * Allows the embedded browsing context to open modal windows.
         */
        SandboxOptions[SandboxOptions["allow-modals"] = 6] = "allow-modals";
        /**
         * Allows the embedded browsing context to disable the ability to lock the screen orientation.
         */
        SandboxOptions[SandboxOptions["allow-orientation-lock"] = 7] = "allow-orientation-lock";
        /**
         * Allows a sandboxed document to open new windows without forcing the sandboxing flags upon them.
         * This will allow, for example, a third-party advertisement to be safely sandboxed without forcing the same restrictions upon a landing page.
         */
        SandboxOptions[SandboxOptions["allow-popups-to-escape-sandbox"] = 8] = "allow-popups-to-escape-sandbox";
        /**
         * Allows embedders to have control over whether an iframe can start a presentation session.
         */
        SandboxOptions[SandboxOptions["allow-presentation"] = 9] = "allow-presentation";
        /**
         * Allows the embedded browsing context to navigate (load) content to the top-level browsing context only when initiated by a user gesture.
         * If this keyword is not used, this operation is not allowed.
         */
        SandboxOptions[SandboxOptions["allow-top-navigation-by-user-activation"] = 10] = "allow-top-navigation-by-user-activation";
    })(SandboxOptions = MiniBrowserProps.SandboxOptions || (MiniBrowserProps.SandboxOptions = {}));
    (function (SandboxOptions) {
        /**
         * The default `sandbox` options, if other is not provided.
         *
         * See: https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
         */
        SandboxOptions.DEFAULT = [
            SandboxOptions['allow-same-origin'],
            SandboxOptions['allow-scripts'],
            SandboxOptions['allow-popups'],
            SandboxOptions['allow-forms'],
            SandboxOptions['allow-modals']
        ];
    })(SandboxOptions = MiniBrowserProps.SandboxOptions || (MiniBrowserProps.SandboxOptions = {}));
})(MiniBrowserProps || (exports.MiniBrowserProps = MiniBrowserProps = {}));
exports.MiniBrowserContentFactory = Symbol('MiniBrowserContentFactory');
let MiniBrowserContent = class MiniBrowserContent extends widget_1.BaseWidget {
    constructor(props) {
        super();
        this.props = props;
        this.submitInputEmitter = new event_1.Emitter();
        this.navigateBackEmitter = new event_1.Emitter();
        this.navigateForwardEmitter = new event_1.Emitter();
        this.refreshEmitter = new event_1.Emitter();
        this.openEmitter = new event_1.Emitter();
        this.toDisposeOnGo = new disposable_1.DisposableCollection();
        this.node.tabIndex = 0;
        this.addClass(mini_browser_content_style_1.MiniBrowserContentStyle.MINI_BROWSER);
        this.input = this.createToolbar(this.node).input;
        const contentArea = this.createContentArea(this.node);
        this.frame = contentArea.frame;
        this.transparentOverlay = contentArea.transparentOverlay;
        this.loadIndicator = contentArea.loadIndicator;
        this.errorBar = contentArea.errorBar;
        this.pdfContainer = contentArea.pdfContainer;
        this.initialHistoryLength = history.length;
        this.toDispose.pushAll([
            this.submitInputEmitter,
            this.navigateBackEmitter,
            this.navigateForwardEmitter,
            this.refreshEmitter,
            this.openEmitter
        ]);
    }
    init() {
        this.toDispose.push(this.mouseTracker.onMousedown(e => {
            if (this.frame.style.display !== 'none') {
                this.transparentOverlay.style.display = 'block';
            }
        }));
        this.toDispose.push(this.mouseTracker.onMouseup(e => {
            if (this.frame.style.display !== 'none') {
                this.transparentOverlay.style.display = 'none';
            }
        }));
        const { startPage } = this.props;
        if (startPage) {
            setTimeout(() => this.go(startPage), 500);
            this.listenOnContentChange(startPage);
        }
    }
    onActivateRequest(msg) {
        super.onActivateRequest(msg);
        if (this.getToolbarProps() !== 'hide') {
            this.input.focus();
        }
        else {
            this.node.focus();
        }
    }
    async listenOnContentChange(location) {
        if (await this.fileService.exists(new uri_1.default(location))) {
            const fileUri = new uri_1.default(location);
            const watcher = this.fileService.watch(fileUri);
            this.toDispose.push(watcher);
            const onFileChange = (event) => {
                if (event.contains(fileUri, 1 /* FileChangeType.ADDED */) || event.contains(fileUri, 0 /* FileChangeType.UPDATED */)) {
                    this.go(location, {
                        showLoadIndicator: false
                    });
                }
            };
            this.toDispose.push(this.fileService.onDidFilesChange(debounce(onFileChange, 500)));
        }
    }
    createToolbar(parent) {
        const toolbar = document.createElement('div');
        toolbar.classList.add(this.getToolbarProps() === 'read-only' ? mini_browser_content_style_1.MiniBrowserContentStyle.TOOLBAR_READ_ONLY : mini_browser_content_style_1.MiniBrowserContentStyle.TOOLBAR);
        parent.appendChild(toolbar);
        this.createPrevious(toolbar);
        this.createNext(toolbar);
        this.createRefresh(toolbar);
        const input = this.createInput(toolbar);
        input.readOnly = this.getToolbarProps() === 'read-only';
        this.createOpen(toolbar);
        if (this.getToolbarProps() === 'hide') {
            toolbar.style.display = 'none';
        }
        return Object.assign(toolbar, { input });
    }
    getToolbarProps() {
        return !this.props.startPage ? 'show' : this.props.toolbar || 'show';
    }
    // eslint-disable-next-line max-len
    createContentArea(parent) {
        const contentArea = document.createElement('div');
        contentArea.classList.add(mini_browser_content_style_1.MiniBrowserContentStyle.CONTENT_AREA);
        const loadIndicator = document.createElement('div');
        loadIndicator.classList.add(mini_browser_content_style_1.MiniBrowserContentStyle.PRE_LOAD);
        loadIndicator.style.display = 'none';
        const errorBar = this.createErrorBar();
        const frame = this.createIFrame();
        this.submitInputEmitter.event(input => this.go(input, {
            preserveFocus: false
        }));
        this.navigateBackEmitter.event(this.handleBack.bind(this));
        this.navigateForwardEmitter.event(this.handleForward.bind(this));
        this.refreshEmitter.event(this.handleRefresh.bind(this));
        this.openEmitter.event(this.handleOpen.bind(this));
        const transparentOverlay = document.createElement('div');
        transparentOverlay.classList.add(mini_browser_content_style_1.MiniBrowserContentStyle.TRANSPARENT_OVERLAY);
        transparentOverlay.style.display = 'none';
        const pdfContainer = document.createElement('div');
        pdfContainer.classList.add(mini_browser_content_style_1.MiniBrowserContentStyle.PDF_CONTAINER);
        pdfContainer.id = `${this.id}-pdf-container`;
        pdfContainer.style.display = 'none';
        contentArea.appendChild(errorBar);
        contentArea.appendChild(transparentOverlay);
        contentArea.appendChild(pdfContainer);
        contentArea.appendChild(loadIndicator);
        contentArea.appendChild(frame);
        parent.appendChild(contentArea);
        return Object.assign(contentArea, { frame, loadIndicator, errorBar, pdfContainer, transparentOverlay });
    }
    createIFrame() {
        const frame = document.createElement('iframe');
        const sandbox = (this.props.sandbox || MiniBrowserProps.SandboxOptions.DEFAULT).map(name => MiniBrowserProps.SandboxOptions[name]);
        frame.sandbox.add(...sandbox);
        this.toDispose.push((0, widget_1.addEventListener)(frame, 'load', this.onFrameLoad.bind(this)));
        this.toDispose.push((0, widget_1.addEventListener)(frame, 'error', this.onFrameError.bind(this)));
        return frame;
    }
    createErrorBar() {
        const errorBar = document.createElement('div');
        errorBar.classList.add(mini_browser_content_style_1.MiniBrowserContentStyle.ERROR_BAR);
        errorBar.style.display = 'none';
        const icon = document.createElement('span');
        icon.classList.add(...(0, widget_1.codiconArray)('info'));
        errorBar.appendChild(icon);
        const message = document.createElement('span');
        errorBar.appendChild(message);
        return Object.assign(errorBar, { message });
    }
    onFrameLoad() {
        clearTimeout(this.frameLoadTimeout);
        this.maybeResetBackground();
        this.hideLoadIndicator();
        this.hideErrorBar();
    }
    onFrameError() {
        clearTimeout(this.frameLoadTimeout);
        this.maybeResetBackground();
        this.hideLoadIndicator();
        this.showErrorBar('An error occurred while loading this page');
    }
    onFrameTimeout() {
        clearTimeout(this.frameLoadTimeout);
        this.maybeResetBackground();
        this.hideLoadIndicator();
        this.showErrorBar('Still loading...');
    }
    showLoadIndicator() {
        this.loadIndicator.classList.remove(mini_browser_content_style_1.MiniBrowserContentStyle.FADE_OUT);
        this.loadIndicator.style.display = 'block';
    }
    hideLoadIndicator() {
        // Start the fade-out transition.
        this.loadIndicator.classList.add(mini_browser_content_style_1.MiniBrowserContentStyle.FADE_OUT);
        // Actually hide the load indicator after the transition is finished.
        const preloadStyle = window.getComputedStyle(this.loadIndicator);
        const transitionDuration = (0, browser_1.parseCssTime)(preloadStyle.transitionDuration, 0);
        setTimeout(() => {
            // But don't hide it if it was shown again since the transition started.
            if (this.loadIndicator.classList.contains(mini_browser_content_style_1.MiniBrowserContentStyle.FADE_OUT)) {
                this.loadIndicator.style.display = 'none';
                this.loadIndicator.classList.remove(mini_browser_content_style_1.MiniBrowserContentStyle.FADE_OUT);
            }
        }, transitionDuration);
    }
    showErrorBar(message) {
        this.errorBar.message.textContent = message;
        this.errorBar.style.display = 'block';
    }
    hideErrorBar() {
        this.errorBar.message.textContent = '';
        this.errorBar.style.display = 'none';
    }
    maybeResetBackground() {
        if (this.props.resetBackground === true) {
            this.frame.style.backgroundColor = 'white';
        }
    }
    handleBack() {
        if (history.length - this.initialHistoryLength > 0) {
            history.back();
        }
    }
    handleForward() {
        if (history.length > this.initialHistoryLength) {
            history.forward();
        }
    }
    handleRefresh() {
        // Initial pessimism; use the location of the input.
        let location = this.props.startPage;
        // Use the the location from the `input`.
        if (this.input && this.input.value) {
            location = this.input.value;
        }
        try {
            const { contentDocument } = this.frame;
            if (contentDocument && contentDocument.location) {
                location = contentDocument.location.href;
            }
        }
        catch {
            // Security exception due to CORS when trying to access the `location.href` of the content document.
        }
        if (location) {
            this.go(location, {
                preserveFocus: false
            });
        }
    }
    handleOpen() {
        const location = this.frameSrc() || this.input.value;
        if (location) {
            this.windowService.openNewWindow(location);
        }
    }
    createInput(parent) {
        const input = document.createElement('input');
        input.type = 'text';
        input.spellcheck = false;
        input.classList.add('theia-input');
        this.toDispose.pushAll([
            (0, widget_1.addEventListener)(input, 'keydown', this.handleInputChange.bind(this)),
            (0, widget_1.addEventListener)(input, 'click', () => {
                if (this.getToolbarProps() === 'read-only') {
                    this.handleOpen();
                }
                else {
                    if (input.value) {
                        input.select();
                    }
                }
            })
        ]);
        parent.appendChild(input);
        return input;
    }
    handleInputChange(e) {
        const { key } = browser_1.KeyCode.createKeyCode(e);
        if (key && browser_1.Key.ENTER.keyCode === key.keyCode && this.getToolbarProps() === 'show') {
            const { target } = e;
            if (target instanceof HTMLInputElement) {
                this.mapLocation(target.value).then(location => this.submitInputEmitter.fire(location));
            }
        }
    }
    createPrevious(parent) {
        return this.onClick(this.createButton(parent, 'Show The Previous Page', mini_browser_content_style_1.MiniBrowserContentStyle.PREVIOUS), this.navigateBackEmitter);
    }
    createNext(parent) {
        return this.onClick(this.createButton(parent, 'Show The Next Page', mini_browser_content_style_1.MiniBrowserContentStyle.NEXT), this.navigateForwardEmitter);
    }
    createRefresh(parent) {
        return this.onClick(this.createButton(parent, 'Reload This Page', mini_browser_content_style_1.MiniBrowserContentStyle.REFRESH), this.refreshEmitter);
    }
    createOpen(parent) {
        const button = this.onClick(this.createButton(parent, 'Open In A New Window', mini_browser_content_style_1.MiniBrowserContentStyle.OPEN), this.openEmitter);
        return button;
    }
    createButton(parent, title, ...className) {
        const button = document.createElement('div');
        button.title = title;
        button.classList.add(...className, mini_browser_content_style_1.MiniBrowserContentStyle.BUTTON);
        parent.appendChild(button);
        return button;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick(element, emitter) {
        this.toDispose.push((0, widget_1.addEventListener)(element, 'click', () => {
            if (!element.classList.contains(mini_browser_content_style_1.MiniBrowserContentStyle.DISABLED)) {
                emitter.fire(undefined);
            }
        }));
        return element;
    }
    mapLocation(location) {
        return this.locationMapper.map(location);
    }
    setInput(value) {
        if (this.input.value !== value) {
            this.input.value = value;
        }
    }
    frameSrc() {
        let src = this.frame.src;
        try {
            const { contentWindow } = this.frame;
            if (contentWindow) {
                src = contentWindow.location.href;
            }
        }
        catch {
            // CORS issue. Ignored.
        }
        if (src === 'about:blank') {
            src = '';
        }
        return src;
    }
    contentDocument() {
        try {
            let { contentDocument } = this.frame;
            // eslint-disable-next-line no-null/no-null
            if (contentDocument === null) {
                const { contentWindow } = this.frame;
                if (contentWindow) {
                    contentDocument = contentWindow.document;
                }
            }
            return contentDocument;
        }
        catch {
            // eslint-disable-next-line no-null/no-null
            return null;
        }
    }
    async go(location, options) {
        const { showLoadIndicator, preserveFocus } = {
            showLoadIndicator: true,
            preserveFocus: true,
            ...options
        };
        if (location) {
            try {
                this.toDisposeOnGo.dispose();
                const url = await this.mapLocation(location);
                this.setInput(url);
                if (this.getToolbarProps() === 'read-only') {
                    this.input.title = `Open ${url} In A New Window`;
                }
                clearTimeout(this.frameLoadTimeout);
                this.frameLoadTimeout = window.setTimeout(this.onFrameTimeout.bind(this), 4000);
                if (showLoadIndicator) {
                    this.showLoadIndicator();
                }
                if (url.endsWith('.pdf')) {
                    this.pdfContainer.style.display = 'block';
                    this.frame.style.display = 'none';
                    PDFObject.embed(url, this.pdfContainer, {
                        // eslint-disable-next-line max-len, @typescript-eslint/quotes
                        fallbackLink: `<p style="padding: 0px 15px 0px 15px">Your browser does not support inline PDFs. Click on this <a href='[url]' target="_blank">link</a> to open the PDF in a new tab.</p>`
                    });
                    clearTimeout(this.frameLoadTimeout);
                    this.hideLoadIndicator();
                    if (!preserveFocus) {
                        this.pdfContainer.focus();
                    }
                }
                else {
                    this.pdfContainer.style.display = 'none';
                    this.frame.style.display = 'block';
                    this.frame.src = url;
                    // The load indicator will hide itself if the content of the iframe was loaded.
                    if (!preserveFocus) {
                        this.frame.addEventListener('load', () => {
                            const window = this.frame.contentWindow;
                            if (window) {
                                window.focus();
                            }
                        }, { once: true });
                    }
                }
                // Delegate all the `keypress` events from the `iframe` to the application.
                this.toDisposeOnGo.push((0, widget_1.addEventListener)(this.frame, 'load', () => {
                    try {
                        const { contentDocument } = this.frame;
                        if (contentDocument) {
                            const keypressHandler = (e) => this.keybindings.run(e);
                            contentDocument.addEventListener('keypress', keypressHandler, true);
                            this.toDisposeOnDetach.push(disposable_1.Disposable.create(() => contentDocument.removeEventListener('keypress', keypressHandler)));
                        }
                    }
                    catch {
                        // There is not much we could do with the security exceptions due to CORS.
                    }
                }));
            }
            catch (e) {
                clearTimeout(this.frameLoadTimeout);
                this.hideLoadIndicator();
                this.showErrorBar(String(e));
                console.log(e);
            }
        }
    }
};
exports.MiniBrowserContent = MiniBrowserContent;
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], MiniBrowserContent.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(window_service_1.WindowService),
    tslib_1.__metadata("design:type", Object)
], MiniBrowserContent.prototype, "windowService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(location_mapper_service_1.LocationMapperService),
    tslib_1.__metadata("design:type", location_mapper_service_1.LocationMapperService)
], MiniBrowserContent.prototype, "locationMapper", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(keybinding_1.KeybindingRegistry),
    tslib_1.__metadata("design:type", keybinding_1.KeybindingRegistry)
], MiniBrowserContent.prototype, "keybindings", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(application_shell_mouse_tracker_1.ApplicationShellMouseTracker),
    tslib_1.__metadata("design:type", application_shell_mouse_tracker_1.ApplicationShellMouseTracker)
], MiniBrowserContent.prototype, "mouseTracker", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], MiniBrowserContent.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MiniBrowserContent.prototype, "init", null);
exports.MiniBrowserContent = MiniBrowserContent = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(MiniBrowserProps)),
    tslib_1.__metadata("design:paramtypes", [MiniBrowserProps])
], MiniBrowserContent);
//# sourceMappingURL=mini-browser-content.js.map