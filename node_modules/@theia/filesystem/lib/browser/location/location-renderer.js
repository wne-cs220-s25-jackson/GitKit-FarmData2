"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
var LocationListRenderer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationListRenderer = exports.LocationListRendererOptions = exports.LocationListRendererFactory = void 0;
const tslib_1 = require("tslib");
const uri_1 = require("@theia/core/lib/common/uri");
const React = require("@theia/core/shared/react");
const file_service_1 = require("../file-service");
const common_1 = require("@theia/core/lib/common");
const inversify_1 = require("@theia/core/shared/inversify");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const react_renderer_1 = require("@theia/core/lib/browser/widgets/react-renderer");
const browser_1 = require("@theia/core/lib/browser");
class ResolvedDirectoryCache {
    constructor(fileService) {
        this.fileService = fileService;
        this.pendingResolvedDirectories = new Map();
        this.cachedDirectories = new Map();
        this.directoryResolvedEmitter = new common_1.Emitter();
        this.onDirectoryDidResolve = this.directoryResolvedEmitter.event;
    }
    tryResolveChildDirectories(inputAsURI) {
        const parentDirectory = inputAsURI.path.dir.toString();
        const cachedDirectories = this.cachedDirectories.get(parentDirectory);
        const pendingDirectories = this.pendingResolvedDirectories.get(parentDirectory);
        if (cachedDirectories) {
            return cachedDirectories;
        }
        else if (!pendingDirectories) {
            this.pendingResolvedDirectories.set(parentDirectory, this.createResolutionPromise(parentDirectory));
        }
        return undefined;
    }
    async createResolutionPromise(directoryToResolve) {
        return this.fileService.resolve(new uri_1.default(directoryToResolve)).then(({ children }) => {
            if (children) {
                const childDirectories = children.filter(child => child.isDirectory)
                    .map(directory => `${directory.resource.path}/`);
                this.cachedDirectories.set(directoryToResolve, childDirectories);
                this.directoryResolvedEmitter.fire({ parent: directoryToResolve, children: childDirectories });
            }
        }).catch(e => {
            // no-op
        });
    }
}
exports.LocationListRendererFactory = Symbol('LocationListRendererFactory');
exports.LocationListRendererOptions = Symbol('LocationListRendererOptions');
let LocationListRenderer = LocationListRenderer_1 = class LocationListRenderer extends react_renderer_1.ReactRenderer {
    get doShowTextInput() {
        return this._doShowTextInput;
    }
    set doShowTextInput(doShow) {
        this._doShowTextInput = doShow;
        if (doShow) {
            this.initResolveDirectoryCache();
        }
    }
    constructor(options) {
        super(options.host);
        this.options = options;
        this.toDisposeOnNewCache = new common_1.DisposableCollection();
        this._doShowTextInput = false;
        this.doAttemptAutocomplete = true;
        this.doAfterRender = () => {
            const locationList = this.locationList;
            const locationListTextInput = this.locationTextInput;
            if (locationList) {
                const currentLocation = this.service.location;
                locationList.value = currentLocation ? currentLocation.toString() : '';
            }
            else if (locationListTextInput) {
                locationListTextInput.focus();
            }
        };
        this.handleLocationChanged = (e) => this.onLocationChanged(e);
        this.handleTextInputOnChange = (e) => this.trySuggestDirectory(e);
        this.handleTextInputKeyDown = (e) => this.handleControlKeys(e);
        this.handleIconKeyDown = (e) => this.toggleInputOnKeyDown(e);
        this.handleTextInputOnBlur = () => this.toggleToSelectInput();
        this.handleTextInputMouseDown = (e) => this.toggleToTextInputOnMouseDown(e);
        this.service = options.model;
        this.doLoadDrives();
        this.doAfterRender = this.doAfterRender.bind(this);
    }
    init() {
        this.doInit();
    }
    async doInit() {
        const homeDirWithPrefix = await this.variablesServer.getHomeDirUri();
        this.homeDir = (new uri_1.default(homeDirWithPrefix)).path.toString();
    }
    render() {
        if (!this.toDispose.disposed) {
            this.hostRoot.render(this.doRender());
        }
    }
    initResolveDirectoryCache() {
        this.toDisposeOnNewCache.dispose();
        this.directoryCache = new ResolvedDirectoryCache(this.fileService);
        this.toDisposeOnNewCache.push(this.directoryCache.onDirectoryDidResolve(({ parent, children }) => {
            if (this.locationTextInput) {
                const expandedPath = common_1.Path.untildify(this.locationTextInput.value, this.homeDir);
                const inputParent = (new uri_1.default(expandedPath)).path.dir.toString();
                if (inputParent === parent) {
                    this.tryRenderFirstMatch(this.locationTextInput, children);
                }
            }
        }));
    }
    doRender() {
        return (React.createElement(React.Fragment, null,
            this.renderInputIcon(),
            this.doShowTextInput
                ? this.renderTextInput()
                : this.renderSelectInput()));
    }
    renderInputIcon() {
        return (React.createElement("span", { 
            // onMouseDown is used since it will fire before 'onBlur'. This prevents
            // a re-render when textinput is in focus and user clicks toggle icon
            onMouseDown: this.handleTextInputMouseDown, onKeyDown: this.handleIconKeyDown, className: LocationListRenderer_1.Styles.LOCATION_INPUT_TOGGLE_CLASS, tabIndex: 0, id: `${this.doShowTextInput ? 'text-input' : 'select-input'}`, title: this.doShowTextInput
                ? LocationListRenderer_1.Tooltips.TOGGLE_SELECT_INPUT
                : LocationListRenderer_1.Tooltips.TOGGLE_TEXT_INPUT, ref: this.doAfterRender },
            React.createElement("i", { className: (0, browser_1.codicon)(this.doShowTextInput ? 'folder-opened' : 'edit') })));
    }
    renderTextInput() {
        var _a;
        return (React.createElement("input", { className: 'theia-select ' + LocationListRenderer_1.Styles.LOCATION_TEXT_INPUT_CLASS, defaultValue: (_a = this.service.location) === null || _a === void 0 ? void 0 : _a.path.fsPath(), onBlur: this.handleTextInputOnBlur, onChange: this.handleTextInputOnChange, onKeyDown: this.handleTextInputKeyDown, spellCheck: false }));
    }
    renderSelectInput() {
        const options = this.collectLocations().map(value => this.renderLocation(value));
        return (React.createElement("select", { className: `theia-select ${LocationListRenderer_1.Styles.LOCATION_LIST_CLASS}`, onChange: this.handleLocationChanged }, ...options));
    }
    toggleInputOnKeyDown(e) {
        if (e.key === 'Enter') {
            this.doShowTextInput = true;
            this.render();
        }
    }
    toggleToTextInputOnMouseDown(e) {
        if (e.currentTarget.id === 'select-input') {
            e.preventDefault();
            this.doShowTextInput = true;
            this.render();
        }
    }
    toggleToSelectInput() {
        if (this.doShowTextInput) {
            this.doShowTextInput = false;
            this.render();
        }
    }
    /**
     * Collects the available locations based on the currently selected, and appends the available drives to it.
     */
    collectLocations() {
        const location = this.service.location;
        const locations = (!!location ? location.allLocations : []).map(uri => ({ uri }));
        if (this._drives) {
            const drives = this._drives.map(uri => ({ uri, isDrive: true }));
            // `URI.allLocations` returns with the URI without the trailing slash unlike `FileUri.create(fsPath)`.
            // to be able to compare file:///path/to/resource with file:///path/to/resource/.
            const toUriString = (uri) => {
                const toString = uri.toString();
                return toString.endsWith('/') ? toString.slice(0, -1) : toString;
            };
            drives.forEach(drive => {
                const index = locations.findIndex(loc => toUriString(loc.uri) === toUriString(drive.uri));
                // Ignore drives which are already discovered as a location based on the current model root URI.
                if (index === -1) {
                    // Make sure, it does not have the trailing slash.
                    locations.push({ uri: new uri_1.default(toUriString(drive.uri)), isDrive: true });
                }
                else {
                    // This is necessary for Windows to be able to show `/e:/` as a drive and `c:` as "non-drive" in the same way.
                    // `URI.path.toString()` Vs. `URI.displayName` behaves a bit differently on Windows.
                    // https://github.com/eclipse-theia/theia/pull/3038#issuecomment-425944189
                    locations[index].isDrive = true;
                }
            });
        }
        this.doLoadDrives();
        return locations;
    }
    /**
     * Asynchronously loads the drives (if not yet available) and triggers a UI update on success with the new values.
     */
    doLoadDrives() {
        if (!this._drives) {
            this.service.drives().then(drives => {
                // If the `drives` are empty, something already went wrong.
                if (drives.length > 0) {
                    this._drives = drives;
                    this.render();
                }
            });
        }
    }
    renderLocation(location) {
        const { uri, isDrive } = location;
        const value = uri.toString();
        return React.createElement("option", { value: value, key: uri.toString() }, isDrive ? uri.path.fsPath() : uri.displayName);
    }
    onLocationChanged(e) {
        const locationList = this.locationList;
        if (locationList) {
            const value = locationList.value;
            const uri = new uri_1.default(value);
            this.trySetNewLocation(uri);
            e.preventDefault();
            e.stopPropagation();
        }
    }
    trySetNewLocation(newLocation) {
        var _a;
        if (this.lastUniqueTextInputLocation === undefined) {
            this.lastUniqueTextInputLocation = this.service.location;
        }
        // prevent consecutive repeated locations from being added to location history
        if (((_a = this.lastUniqueTextInputLocation) === null || _a === void 0 ? void 0 : _a.path.toString()) !== newLocation.path.toString()) {
            this.lastUniqueTextInputLocation = newLocation;
            this.service.location = newLocation;
        }
    }
    trySuggestDirectory(e) {
        if (this.doAttemptAutocomplete) {
            const inputElement = e.currentTarget;
            const { value } = inputElement;
            if ((value.startsWith('/') || value.startsWith('~/')) && value.slice(-1) !== '/') {
                const expandedPath = common_1.Path.untildify(value, this.homeDir);
                const valueAsURI = new uri_1.default(expandedPath);
                const autocompleteDirectories = this.directoryCache.tryResolveChildDirectories(valueAsURI);
                if (autocompleteDirectories) {
                    this.tryRenderFirstMatch(inputElement, autocompleteDirectories);
                }
            }
        }
    }
    tryRenderFirstMatch(inputElement, children) {
        const { value, selectionStart } = inputElement;
        if (this.locationTextInput) {
            const expandedPath = common_1.Path.untildify(value, this.homeDir);
            const firstMatch = children === null || children === void 0 ? void 0 : children.find(child => child.includes(expandedPath));
            if (firstMatch) {
                const contractedPath = value.startsWith('~') ? common_1.Path.tildify(firstMatch, this.homeDir) : firstMatch;
                this.locationTextInput.value = contractedPath;
                this.locationTextInput.selectionStart = selectionStart;
                this.locationTextInput.selectionEnd = firstMatch.length;
            }
        }
    }
    handleControlKeys(e) {
        this.doAttemptAutocomplete = e.key !== 'Backspace';
        if (e.key === 'Enter') {
            const locationTextInput = this.locationTextInput;
            if (locationTextInput) {
                // expand '~' if present and remove extra whitespace and any trailing slashes or periods.
                const sanitizedInput = locationTextInput.value.trim().replace(/[\/\\.]*$/, '');
                const untildifiedInput = common_1.Path.untildify(sanitizedInput, this.homeDir);
                const uri = new uri_1.default(untildifiedInput);
                this.trySetNewLocation(uri);
                this.toggleToSelectInput();
            }
        }
        else if (e.key === 'Escape') {
            this.toggleToSelectInput();
        }
        else if (e.key === 'Tab') {
            e.preventDefault();
            const textInput = this.locationTextInput;
            if (textInput) {
                textInput.selectionStart = textInput.value.length;
            }
        }
        e.stopPropagation();
    }
    get locationList() {
        const locationList = this.host.getElementsByClassName(LocationListRenderer_1.Styles.LOCATION_LIST_CLASS)[0];
        if (locationList instanceof HTMLSelectElement) {
            return locationList;
        }
        return undefined;
    }
    get locationTextInput() {
        const locationTextInput = this.host.getElementsByClassName(LocationListRenderer_1.Styles.LOCATION_TEXT_INPUT_CLASS)[0];
        if (locationTextInput instanceof HTMLInputElement) {
            return locationTextInput;
        }
        return undefined;
    }
    dispose() {
        super.dispose();
        this.toDisposeOnNewCache.dispose();
    }
};
exports.LocationListRenderer = LocationListRenderer;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], LocationListRenderer.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], LocationListRenderer.prototype, "variablesServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], LocationListRenderer.prototype, "init", null);
exports.LocationListRenderer = LocationListRenderer = LocationListRenderer_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(exports.LocationListRendererOptions)),
    tslib_1.__metadata("design:paramtypes", [Object])
], LocationListRenderer);
(function (LocationListRenderer) {
    let Styles;
    (function (Styles) {
        Styles.LOCATION_LIST_CLASS = 'theia-LocationList';
        Styles.LOCATION_INPUT_TOGGLE_CLASS = 'theia-LocationInputToggle';
        Styles.LOCATION_TEXT_INPUT_CLASS = 'theia-LocationTextInput';
    })(Styles = LocationListRenderer.Styles || (LocationListRenderer.Styles = {}));
    let Tooltips;
    (function (Tooltips) {
        Tooltips.TOGGLE_TEXT_INPUT = 'Switch to text-based input';
        Tooltips.TOGGLE_SELECT_INPUT = 'Switch to location list';
    })(Tooltips = LocationListRenderer.Tooltips || (LocationListRenderer.Tooltips = {}));
})(LocationListRenderer || (exports.LocationListRenderer = LocationListRenderer = {}));
//# sourceMappingURL=location-renderer.js.map