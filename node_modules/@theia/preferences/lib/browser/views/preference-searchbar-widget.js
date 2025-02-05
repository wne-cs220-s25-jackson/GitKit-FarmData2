"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
var PreferencesSearchbarWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesSearchbarWidget = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const React = require("@theia/core/shared/react");
const debounce = require("p-debounce");
const core_1 = require("@theia/core");
const nls_1 = require("@theia/core/lib/common/nls");
let PreferencesSearchbarWidget = PreferencesSearchbarWidget_1 = class PreferencesSearchbarWidget extends browser_1.ReactWidget {
    constructor(options) {
        super(options);
        this.onFilterStringChangedEmitter = new core_1.Emitter();
        this.onFilterChanged = this.onFilterStringChangedEmitter.event;
        this.searchbarRef = React.createRef();
        this.resultsCount = 0;
        this.handleSearch = (e) => this.search(e.target.value);
        this.search = debounce(async (value) => {
            this.onFilterStringChangedEmitter.fire(value);
            this.update();
        }, 200);
        /**
         * Clears the search input and all search results.
         * @param e on-click mouse event.
         */
        this.clearSearchResults = async (e) => {
            const search = document.getElementById(PreferencesSearchbarWidget_1.SEARCHBAR_ID);
            if (search) {
                search.value = '';
                await this.search(search.value);
                this.update();
            }
        };
        this.focus = this.focus.bind(this);
    }
    init() {
        this.id = PreferencesSearchbarWidget_1.ID;
        this.title.label = PreferencesSearchbarWidget_1.LABEL;
        this.update();
    }
    focus() {
        if (this.searchbarRef.current) {
            this.searchbarRef.current.focus();
        }
    }
    /**
     * Renders all search bar options.
     */
    renderOptionContainer() {
        const resultsCount = this.renderResultsCountOption();
        const clearAllOption = this.renderClearAllOption();
        return React.createElement("div", { className: "option-buttons" },
            " ",
            resultsCount,
            " ",
            clearAllOption,
            " ");
    }
    /**
     * Renders a badge displaying search results count.
     */
    renderResultsCountOption() {
        let resultsFound;
        if (this.resultsCount === 0) {
            resultsFound = nls_1.nls.localizeByDefault('No Settings Found');
        }
        else if (this.resultsCount === 1) {
            resultsFound = nls_1.nls.localizeByDefault('1 Setting Found');
        }
        else {
            resultsFound = nls_1.nls.localizeByDefault('{0} Settings Found', this.resultsCount.toFixed(0));
        }
        return this.searchTermExists() ?
            (React.createElement("span", { className: "results-found", title: resultsFound }, resultsFound))
            : '';
    }
    /**
     * Renders a clear all button.
     */
    renderClearAllOption() {
        return React.createElement("span", { className: `${(0, browser_1.codicon)('clear-all')} option ${(this.searchTermExists() ? 'enabled' : '')}`, title: nls_1.nls.localizeByDefault('Clear Search Results'), onClick: this.clearSearchResults });
    }
    /**
     * Determines whether the search input currently has a value.
     * @returns true, if the search input currently has a value; false, otherwise.
     */
    searchTermExists() {
        var _a;
        return !!((_a = this.searchbarRef.current) === null || _a === void 0 ? void 0 : _a.value);
    }
    getSearchTerm() {
        const search = document.getElementById(PreferencesSearchbarWidget_1.SEARCHBAR_ID);
        return search === null || search === void 0 ? void 0 : search.value;
    }
    async updateSearchTerm(searchTerm) {
        const search = document.getElementById(PreferencesSearchbarWidget_1.SEARCHBAR_ID);
        if (!search || search.value === searchTerm) {
            return;
        }
        search.value = searchTerm;
        await this.search(search.value);
        this.update();
    }
    render() {
        const optionContainer = this.renderOptionContainer();
        return (React.createElement("div", { className: 'settings-header' },
            React.createElement("div", { className: "settings-search-container", ref: this.focus },
                React.createElement("input", { type: "text", id: PreferencesSearchbarWidget_1.SEARCHBAR_ID, spellCheck: false, placeholder: nls_1.nls.localizeByDefault('Search settings'), className: "settings-search-input theia-input", onChange: this.handleSearch, ref: this.searchbarRef }),
                optionContainer)));
    }
    /**
     * Updates the search result count.
     * @param count the result count.
     */
    updateResultsCount(count) {
        this.resultsCount = count;
        this.update();
    }
    storeState() {
        return {
            searchTerm: this.getSearchTerm()
        };
    }
    restoreState(oldState) {
        const searchInputExists = this.onDidChangeVisibility(() => {
            this.updateSearchTerm(oldState.searchTerm || '');
            searchInputExists.dispose();
        });
    }
};
exports.PreferencesSearchbarWidget = PreferencesSearchbarWidget;
PreferencesSearchbarWidget.ID = 'settings.header';
PreferencesSearchbarWidget.LABEL = 'Settings Header';
PreferencesSearchbarWidget.SEARCHBAR_ID = 'preference-searchbar';
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PreferencesSearchbarWidget.prototype, "init", null);
exports.PreferencesSearchbarWidget = PreferencesSearchbarWidget = PreferencesSearchbarWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.unmanaged)()),
    tslib_1.__metadata("design:paramtypes", [Object])
], PreferencesSearchbarWidget);
//# sourceMappingURL=preference-searchbar-widget.js.map