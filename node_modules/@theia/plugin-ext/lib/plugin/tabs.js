"use strict";
// *****************************************************************************
// Copyright (C) 2022 TypeFox and others.
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
exports.TabsExtImpl = void 0;
const core_1 = require("@theia/core");
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const types_impl_1 = require("./types-impl");
const types_1 = require("../common/types");
const collections_1 = require("../common/collections");
const type_converters_1 = require("./type-converters");
class TabExt {
    constructor(dto, parentGroup, activeTabIdGetter) {
        this.activeTabIdGetter = activeTabIdGetter;
        this.parentGroup = parentGroup;
        this.acceptDtoUpdate(dto);
    }
    get apiObject() {
        if (!this.tabApiObject) {
            // Don't want to lose reference to parent `this` in the getters
            const that = this;
            const obj = {
                get isActive() {
                    // We use a getter function here to always ensure at most 1 active tab per group and prevent iteration for being required
                    return that.tabDto.id === that.activeTabIdGetter();
                },
                get label() {
                    return that.tabDto.label;
                },
                get input() {
                    return that.input;
                },
                get isDirty() {
                    return that.tabDto.isDirty;
                },
                get isPinned() {
                    return that.tabDto.isPinned;
                },
                get isPreview() {
                    return that.tabDto.isPreview;
                },
                get group() {
                    return that.parentGroup.apiObject;
                }
            };
            this.tabApiObject = Object.freeze(obj);
        }
        return this.tabApiObject;
    }
    get tabId() {
        return this.tabDto.id;
    }
    acceptDtoUpdate(tabDto) {
        this.tabDto = tabDto;
        this.input = this.initInput();
    }
    initInput() {
        switch (this.tabDto.input.kind) {
            case 1 /* TabInputKind.TextInput */:
                return new types_impl_1.TextTabInput(types_impl_1.URI.revive(this.tabDto.input.uri));
            case 2 /* TabInputKind.TextDiffInput */:
                return new types_impl_1.TextDiffTabInput(types_impl_1.URI.revive(this.tabDto.input.original), types_impl_1.URI.revive(this.tabDto.input.modified));
            case 3 /* TabInputKind.TextMergeInput */:
                return new types_impl_1.TextMergeTabInput(types_impl_1.URI.revive(this.tabDto.input.base), types_impl_1.URI.revive(this.tabDto.input.input1), types_impl_1.URI.revive(this.tabDto.input.input2), types_impl_1.URI.revive(this.tabDto.input.result));
            case 6 /* TabInputKind.CustomEditorInput */:
                return new types_impl_1.CustomEditorTabInput(types_impl_1.URI.revive(this.tabDto.input.uri), this.tabDto.input.viewType);
            case 7 /* TabInputKind.WebviewEditorInput */:
                return new types_impl_1.WebviewEditorTabInput(this.tabDto.input.viewType);
            case 4 /* TabInputKind.NotebookInput */:
                return new types_impl_1.NotebookEditorTabInput(types_impl_1.URI.revive(this.tabDto.input.uri), this.tabDto.input.notebookType);
            case 5 /* TabInputKind.NotebookDiffInput */:
                return new types_impl_1.NotebookDiffEditorTabInput(types_impl_1.URI.revive(this.tabDto.input.original), types_impl_1.URI.revive(this.tabDto.input.modified), this.tabDto.input.notebookType);
            case 8 /* TabInputKind.TerminalEditorInput */:
                return new types_impl_1.TerminalEditorTabInput();
            case 9 /* TabInputKind.InteractiveEditorInput */:
                return new types_impl_1.InteractiveWindowInput(types_impl_1.URI.revive(this.tabDto.input.uri), types_impl_1.URI.revive(this.tabDto.input.inputBoxUri));
            default:
                return undefined;
        }
    }
}
class TabGroupExt {
    constructor(dto, activeGroupIdGetter) {
        this.tabsArr = [];
        this.activeTabId = '';
        this.tabGroupDto = dto;
        this.activeGroupIdGetter = activeGroupIdGetter;
        // Construct all tabs from the given dto
        for (const tabDto of dto.tabs) {
            if (tabDto.isActive) {
                this.activeTabId = tabDto.id;
            }
            this.tabsArr.push(new TabExt(tabDto, this, () => this.getActiveTabId()));
        }
    }
    get apiObject() {
        if (!this.tabGroupApiObject) {
            // Don't want to lose reference to parent `this` in the getters
            const that = this;
            const obj = {
                get isActive() {
                    // We use a getter function here to always ensure at most 1 active group and prevent iteration for being required
                    return that.tabGroupDto.groupId === that.activeGroupIdGetter();
                },
                get viewColumn() {
                    return type_converters_1.ViewColumn.to(that.tabGroupDto.viewColumn);
                },
                get activeTab() {
                    var _a;
                    return (_a = that.tabsArr.find(tab => tab.tabId === that.activeTabId)) === null || _a === void 0 ? void 0 : _a.apiObject;
                },
                get tabs() {
                    return Object.freeze(that.tabsArr.map(tab => tab.apiObject));
                }
            };
            this.tabGroupApiObject = Object.freeze(obj);
        }
        return this.tabGroupApiObject;
    }
    get groupId() {
        return this.tabGroupDto.groupId;
    }
    get tabs() {
        return this.tabsArr;
    }
    acceptGroupDtoUpdate(dto) {
        this.tabGroupDto = dto;
    }
    acceptTabOperation(operation) {
        // In the open case we add the tab to the group
        if (operation.kind === 0 /* TabModelOperationKind.TAB_OPEN */) {
            const tab = new TabExt(operation.tabDto, this, () => this.getActiveTabId());
            // Insert tab at editor index
            this.tabsArr.splice(operation.index, 0, tab);
            if (operation.tabDto.isActive) {
                this.activeTabId = tab.tabId;
            }
            return tab;
        }
        else if (operation.kind === 1 /* TabModelOperationKind.TAB_CLOSE */) {
            const tab = this.tabsArr.splice(operation.index, 1)[0];
            if (!tab) {
                throw new Error(`Tab close updated received for index ${operation.index} which does not exist`);
            }
            if (tab.tabId === this.activeTabId) {
                this.activeTabId = '';
            }
            return tab;
        }
        else if (operation.kind === 3 /* TabModelOperationKind.TAB_MOVE */) {
            if (operation.oldIndex === undefined) {
                throw new Error('Invalid old index on move IPC');
            }
            // Splice to remove at old index and insert at new index === moving the tab
            const tab = this.tabsArr.splice(operation.oldIndex, 1)[0];
            if (!tab) {
                throw new Error(`Tab move updated received for index ${operation.oldIndex} which does not exist`);
            }
            this.tabsArr.splice(operation.index, 0, tab);
            return tab;
        }
        const _tab = this.tabsArr.find(extHostTab => extHostTab.tabId === operation.tabDto.id);
        if (!_tab) {
            throw new Error('INVALID tab');
        }
        if (operation.tabDto.isActive) {
            this.activeTabId = operation.tabDto.id;
        }
        else if (this.activeTabId === operation.tabDto.id && !operation.tabDto.isActive) {
            // Events aren't guaranteed to be in order so if we receive a dto that matches the active tab id
            // but isn't active we mark the active tab id as empty. This prevent onDidActiveTabChange from
            // firing incorrectly
            this.activeTabId = '';
        }
        _tab.acceptDtoUpdate(operation.tabDto);
        return _tab;
    }
    // Not a getter since it must be a function to be used as a callback for the tabs
    getActiveTabId() {
        return this.activeTabId;
    }
}
class TabsExtImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.onDidChangeTabs = new core_1.Emitter();
        this.onDidChangeTabGroups = new core_1.Emitter();
        this.tabGroupArr = [];
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TABS_MAIN);
    }
    get tabGroups() {
        if (!this.apiObject) {
            const that = this;
            const obj = {
                // never changes -> simple value
                onDidChangeTabGroups: that.onDidChangeTabGroups.event,
                onDidChangeTabs: that.onDidChangeTabs.event,
                // dynamic -> getters
                get all() {
                    return Object.freeze(that.tabGroupArr.map(group => group.apiObject));
                },
                get activeTabGroup() {
                    var _a;
                    const activeTabGroupId = that.activeGroupId;
                    const activeTabGroup = (0, types_1.assertIsDefined)((_a = that.tabGroupArr.find(candidate => candidate.groupId === activeTabGroupId)) === null || _a === void 0 ? void 0 : _a.apiObject);
                    return activeTabGroup;
                },
                close: async (tabOrTabGroup, preserveFocus) => {
                    const tabsOrTabGroups = Array.isArray(tabOrTabGroup) ? tabOrTabGroup : [tabOrTabGroup];
                    if (!tabsOrTabGroups.length) {
                        return true;
                    }
                    // Check which type was passed in and call the appropriate close
                    // Casting is needed as typescript doesn't seem to infer enough from this
                    if (isTabGroup(tabsOrTabGroups[0])) {
                        return this._closeGroups(tabsOrTabGroups, preserveFocus);
                    }
                    else {
                        return this._closeTabs(tabsOrTabGroups, preserveFocus);
                    }
                },
            };
            this.apiObject = Object.freeze(obj);
        }
        return this.apiObject;
    }
    $acceptEditorTabModel(tabGroups) {
        var _a;
        const groupIdsBefore = new Set(this.tabGroupArr.map(group => group.groupId));
        const groupIdsAfter = new Set(tabGroups.map(dto => dto.groupId));
        const diff = (0, collections_1.diffSets)(groupIdsBefore, groupIdsAfter);
        const closed = this.tabGroupArr.filter(group => diff.removed.includes(group.groupId)).map(group => group.apiObject);
        const opened = [];
        const changed = [];
        const tabsOpened = [];
        this.tabGroupArr = tabGroups.map(tabGroup => {
            const group = new TabGroupExt(tabGroup, () => this.activeGroupId);
            if (diff.added.includes(group.groupId)) {
                opened.push({ activeTab: undefined, isActive: group.apiObject.isActive, tabs: [], viewColumn: group.apiObject.viewColumn });
                tabsOpened.push(...group.apiObject.tabs);
            }
            else {
                changed.push(group.apiObject);
            }
            return group;
        });
        // Set the active tab group id. skip if no tabgroups are open
        if (tabGroups.length > 0) {
            const activeTabGroupId = (0, types_1.assertIsDefined)((_a = tabGroups.find(group => group.isActive === true)) === null || _a === void 0 ? void 0 : _a.groupId);
            if (this.activeGroupId !== activeTabGroupId) {
                this.activeGroupId = activeTabGroupId;
            }
        }
        if (closed.length > 0 || opened.length > 0 || changed.length > 0) {
            this.onDidChangeTabGroups.fire(Object.freeze({ opened, closed, changed }));
        }
        if (tabsOpened.length > 0) {
            this.onDidChangeTabs.fire({ opened: tabsOpened, changed: [], closed: [] });
        }
    }
    $acceptTabGroupUpdate(groupDto) {
        const group = this.tabGroupArr.find(tabGroup => tabGroup.groupId === groupDto.groupId);
        if (!group) {
            throw new Error('Update Group IPC call received before group creation.');
        }
        group.acceptGroupDtoUpdate(groupDto);
        if (groupDto.isActive) {
            this.activeGroupId = groupDto.groupId;
        }
        this.onDidChangeTabGroups.fire(Object.freeze({ changed: [group.apiObject], opened: [], closed: [] }));
    }
    $acceptTabOperation(operation) {
        const group = this.tabGroupArr.find(tabGroup => tabGroup.groupId === operation.groupId);
        if (!group) {
            throw new Error('Update Tabs IPC call received before group creation.');
        }
        const tab = group.acceptTabOperation(operation);
        // Construct the tab change event based on the operation
        switch (operation.kind) {
            case 0 /* TabModelOperationKind.TAB_OPEN */:
                this.onDidChangeTabs.fire(Object.freeze({
                    opened: [tab.apiObject],
                    closed: [],
                    changed: []
                }));
                return;
            case 1 /* TabModelOperationKind.TAB_CLOSE */:
                this.onDidChangeTabs.fire(Object.freeze({
                    opened: [],
                    closed: [tab.apiObject],
                    changed: []
                }));
                return;
            case 3 /* TabModelOperationKind.TAB_MOVE */:
            case 2 /* TabModelOperationKind.TAB_UPDATE */:
                this.onDidChangeTabs.fire(Object.freeze({
                    opened: [],
                    closed: [],
                    changed: [tab.apiObject]
                }));
                return;
        }
    }
    _findExtHostTabFromApi(apiTab) {
        for (const group of this.tabGroupArr) {
            for (const tab of group.tabs) {
                if (tab.apiObject === apiTab) {
                    return tab;
                }
            }
        }
        return;
    }
    _findExtHostTabGroupFromApi(apiTabGroup) {
        return this.tabGroupArr.find(candidate => candidate.apiObject === apiTabGroup);
    }
    async _closeTabs(tabs, preserveFocus) {
        const extHostTabIds = [];
        for (const tab of tabs) {
            const extHostTab = this._findExtHostTabFromApi(tab);
            if (!extHostTab) {
                throw new Error('Tab close: Invalid tab not found!');
            }
            extHostTabIds.push(extHostTab.tabId);
        }
        return this.proxy.$closeTab(extHostTabIds, preserveFocus);
    }
    async _closeGroups(groups, preserveFocus) {
        const extHostGroupIds = [];
        for (const group of groups) {
            const extHostGroup = this._findExtHostTabGroupFromApi(group);
            if (!extHostGroup) {
                throw new Error('Group close: Invalid group not found!');
            }
            extHostGroupIds.push(extHostGroup.groupId);
        }
        return this.proxy.$closeGroup(extHostGroupIds, preserveFocus);
    }
}
exports.TabsExtImpl = TabsExtImpl;
// #region Utils
function isTabGroup(obj) {
    const tabGroup = obj;
    if (tabGroup.tabs !== undefined) {
        return true;
    }
    return false;
}
// #endregion
//# sourceMappingURL=tabs.js.map