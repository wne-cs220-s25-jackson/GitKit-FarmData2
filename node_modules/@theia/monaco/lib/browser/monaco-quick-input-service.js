"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
exports.MonacoQuickPickItem = exports.MonacoQuickInputService = exports.MonacoQuickInputImplementation = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const quickInputController_1 = require("@theia/monaco-editor-core/esm/vs/platform/quickinput/browser/quickInputController");
const monaco_resolved_keybinding_1 = require("./monaco-resolved-keybinding");
const quickAccess_1 = require("@theia/monaco-editor-core/esm/vs/platform/quickinput/browser/quickAccess");
const contextkey_1 = require("@theia/monaco-editor-core/esm/vs/platform/contextkey/common/contextkey");
const instantiation_1 = require("@theia/monaco-editor-core/esm/vs/platform/instantiation/common/instantiation");
const standaloneServices_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices");
const core_1 = require("@theia/core");
const monaco_color_registry_1 = require("./monaco-color-registry");
const theming_1 = require("@theia/core/lib/browser/theming");
const standaloneTheme_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/common/standaloneTheme");
const layoutService_1 = require("@theia/monaco-editor-core/esm/vs/platform/layout/browser/layoutService");
class HoverDelegate {
    showHover(options, focus) {
        return undefined;
    }
}
let MonacoQuickInputImplementation = class MonacoQuickInputImplementation {
    get currentQuickInput() {
        return this.controller.currentQuickInput;
    }
    get backButton() { return this.controller.backButton; }
    get onShow() { return this.controller.onShow; }
    get onHide() { return this.controller.onHide; }
    init() {
        this.initContainer();
        this.initController();
        this.quickAccess = new quickAccess_1.QuickAccessController(this, standaloneServices_1.StandaloneServices.get(instantiation_1.IInstantiationService));
        this.inQuickOpen = standaloneServices_1.StandaloneServices.get(contextkey_1.IContextKeyService).createKey('inQuickOpen', false);
        this.controller.onShow(() => {
            this.container.style.top = this.shell.mainPanel.node.getBoundingClientRect().top + 'px';
            this.inQuickOpen.set(true);
        });
        this.controller.onHide(() => this.inQuickOpen.set(false));
        this.themeService.initialized.then(() => this.controller.applyStyles(this.computeStyles()));
        // Hook into the theming service of Monaco to ensure that the updates are ready.
        standaloneServices_1.StandaloneServices.get(standaloneTheme_1.IStandaloneThemeService).onDidColorThemeChange(() => this.controller.applyStyles(this.computeStyles()));
        window.addEventListener('resize', () => this.updateLayout());
    }
    setContextKey(key) {
        if (key) {
            standaloneServices_1.StandaloneServices.get(contextkey_1.IContextKeyService).createKey(key, undefined);
        }
    }
    createQuickWidget() {
        return this.controller.createQuickWidget();
    }
    createQuickPick(options) {
        return this.controller.createQuickPick({
            useSeparators: options.useSeparators
        });
    }
    createInputBox() {
        return this.controller.createInputBox();
    }
    open(filter) {
        this.quickAccess.show(filter);
    }
    input(options, token) {
        return this.controller.input(options, token);
    }
    pick(picks, options, token) {
        return this.controller.pick(picks, options, token);
    }
    hide() {
        this.controller.hide();
    }
    focus() {
        this.controller.focus();
    }
    toggle() {
        this.controller.toggle();
    }
    applyStyles(styles) {
        this.controller.applyStyles(styles);
    }
    layout(dimension, titleBarOffset) {
        this.controller.layout(dimension, titleBarOffset);
    }
    navigate(next, quickNavigate) {
        this.controller.navigate(next, quickNavigate);
    }
    dispose() {
        this.controller.dispose();
    }
    async cancel() {
        this.controller.cancel();
    }
    async back() {
        this.controller.back();
    }
    async accept(keyMods) {
        this.controller.accept(keyMods);
    }
    initContainer() {
        const container = this.container = document.createElement('div');
        container.id = 'quick-input-container';
        document.body.appendChild(this.container);
    }
    initController() {
        const contextKeyService = standaloneServices_1.StandaloneServices.get(contextkey_1.IContextKeyService);
        const instantiationService = standaloneServices_1.StandaloneServices.get(instantiation_1.IInstantiationService);
        const layoutService = standaloneServices_1.StandaloneServices.get(layoutService_1.ILayoutService);
        const options = {
            idPrefix: 'quickInput_',
            container: this.container,
            styles: this.computeStyles(),
            ignoreFocusOut: () => false,
            backKeybindingLabel: () => undefined,
            setContextKey: (id) => this.setContextKey(id),
            returnFocus: () => this.container.focus(),
            hoverDelegate: new HoverDelegate(),
            linkOpenerDelegate: () => {
                // @monaco-uplift: not sure what to do here
            }
        };
        this.controller = new quickInputController_1.QuickInputController(options, layoutService, instantiationService, contextKeyService);
        this.updateLayout();
    }
    updateLayout() {
        // Initialize the layout using screen dimensions as monaco computes the actual sizing.
        // https://github.com/microsoft/vscode/blob/6261075646f055b99068d3688932416f2346dd3b/src/vs/base/parts/quickinput/browser/quickInput.ts#L1799
        this.controller.layout(this.getClientDimension(), 0);
    }
    getClientDimension() {
        return { width: window.innerWidth, height: window.innerHeight };
    }
    // @monaco-uplift
    // Keep the styles up to date with https://github.com/microsoft/vscode/blob/7888ff3a6b104e9e2e3d0f7890ca92dd0828215f/src/vs/platform/quickinput/browser/quickInput.ts#L171.
    computeStyles() {
        return {
            toggle: {
                inputActiveOptionBorder: this.colorRegistry.toCssVariableName('inputOption.activeBorder'),
                inputActiveOptionForeground: this.colorRegistry.toCssVariableName('inputOption.activeForeground'),
                inputActiveOptionBackground: this.colorRegistry.toCssVariableName('inputOption.activeBackground')
            },
            pickerGroup: {
                pickerGroupBorder: this.colorRegistry.toCssVariableName('pickerGroup.Border'),
                pickerGroupForeground: this.colorRegistry.toCssVariableName('pickerGroupForeground')
            },
            widget: {
                quickInputBackground: this.colorRegistry.toCssVariableName('quickInput.background'),
                quickInputForeground: this.colorRegistry.toCssVariableName('quickInput.foreground'),
                quickInputTitleBackground: this.colorRegistry.toCssVariableName('quickInputTitle.background'),
                widgetBorder: this.colorRegistry.toCssVariableName('widget.border'),
                widgetShadow: this.colorRegistry.toCssVariableName('widget.shadow')
            },
            list: {
                listBackground: this.colorRegistry.toCssVariableName('quickInput.background'),
                listInactiveFocusForeground: this.colorRegistry.toCssVariableName('quickInputList.focusForeground'),
                listInactiveSelectionIconForeground: this.colorRegistry.toCssVariableName('quickInputList.focusIconForeground'),
                listInactiveFocusBackground: this.colorRegistry.toCssVariableName('quickInputList.focusBackground'),
                listFocusOutline: this.colorRegistry.toCssVariableName('activeContrastBorder'),
                listInactiveFocusOutline: this.colorRegistry.toCssVariableName('activeContrastBorder'),
                listFocusBackground: this.colorRegistry.toCssVariableName('list.focusBackground'),
                listFocusForeground: this.colorRegistry.toCssVariableName('list.focusForeground'),
                listActiveSelectionBackground: this.colorRegistry.toCssVariableName('list.activeSelectionBackground'),
                listActiveSelectionForeground: this.colorRegistry.toCssVariableName('list.ActiveSelectionForeground'),
                listActiveSelectionIconForeground: this.colorRegistry.toCssVariableName('list.ActiveSelectionIconForeground'),
                listFocusAndSelectionOutline: this.colorRegistry.toCssVariableName('list.FocusAndSelectionOutline'),
                listFocusAndSelectionBackground: this.colorRegistry.toCssVariableName('list.ActiveSelectionBackground'),
                listFocusAndSelectionForeground: this.colorRegistry.toCssVariableName('list.ActiveSelectionForeground'),
                listInactiveSelectionBackground: this.colorRegistry.toCssVariableName('list.InactiveSelectionBackground'),
                listInactiveSelectionForeground: this.colorRegistry.toCssVariableName('list.InactiveSelectionForeground'),
                listHoverBackground: this.colorRegistry.toCssVariableName('list.HoverBackground'),
                listHoverForeground: this.colorRegistry.toCssVariableName('list.HoverForeground'),
                listDropOverBackground: this.colorRegistry.toCssVariableName('list.DropOverBackground'),
                listDropBetweenBackground: this.colorRegistry.toCssVariableName('list.DropBetweenBackground'),
                listSelectionOutline: this.colorRegistry.toCssVariableName('activeContrastBorder'),
                listHoverOutline: this.colorRegistry.toCssVariableName('activeContrastBorder'),
                treeIndentGuidesStroke: this.colorRegistry.toCssVariableName('tree.indentGuidesStroke'),
                treeInactiveIndentGuidesStroke: this.colorRegistry.toCssVariableName('tree.inactiveIndentGuidesStroke'),
                treeStickyScrollBackground: this.colorRegistry.toCssVariableName('tree.StickyScrollBackground'),
                treeStickyScrollBorder: this.colorRegistry.toCssVariableName('tree.tickyScrollBorde'),
                treeStickyScrollShadow: this.colorRegistry.toCssVariableName('tree.StickyScrollShadow'),
                tableColumnsBorder: this.colorRegistry.toCssVariableName('tree.tableColumnsBorder'),
                tableOddRowsBackgroundColor: this.colorRegistry.toCssVariableName('tree.tableOddRowsBackground'),
            },
            inputBox: {
                inputForeground: this.colorRegistry.toCssVariableName('inputForeground'),
                inputBackground: this.colorRegistry.toCssVariableName('inputBackground'),
                inputBorder: this.colorRegistry.toCssVariableName('inputBorder'),
                inputValidationInfoBackground: this.colorRegistry.toCssVariableName('inputValidation.infoBackground'),
                inputValidationInfoForeground: this.colorRegistry.toCssVariableName('inputValidation.infoForeground'),
                inputValidationInfoBorder: this.colorRegistry.toCssVariableName('inputValidation.infoBorder'),
                inputValidationWarningBackground: this.colorRegistry.toCssVariableName('inputValidation.warningBackground'),
                inputValidationWarningForeground: this.colorRegistry.toCssVariableName('inputValidation.warningForeground'),
                inputValidationWarningBorder: this.colorRegistry.toCssVariableName('inputValidation.warningBorder'),
                inputValidationErrorBackground: this.colorRegistry.toCssVariableName('inputValidation.errorBackground'),
                inputValidationErrorForeground: this.colorRegistry.toCssVariableName('inputValidation.errorForeground'),
                inputValidationErrorBorder: this.colorRegistry.toCssVariableName('inputValidation.errorBorder'),
            },
            countBadge: {
                badgeBackground: this.colorRegistry.toCssVariableName('badge.background'),
                badgeForeground: this.colorRegistry.toCssVariableName('badge.foreground'),
                badgeBorder: this.colorRegistry.toCssVariableName('contrastBorder')
            },
            button: {
                buttonForeground: this.colorRegistry.toCssVariableName('button.foreground'),
                buttonBackground: this.colorRegistry.toCssVariableName('button.background'),
                buttonHoverBackground: this.colorRegistry.toCssVariableName('button.hoverBackground'),
                buttonBorder: this.colorRegistry.toCssVariableName('contrastBorder'),
                buttonSeparator: this.colorRegistry.toCssVariableName('button.Separator'),
                buttonSecondaryForeground: this.colorRegistry.toCssVariableName('button.secondaryForeground'),
                buttonSecondaryBackground: this.colorRegistry.toCssVariableName('button.secondaryBackground'),
                buttonSecondaryHoverBackground: this.colorRegistry.toCssVariableName('button.secondaryHoverBackground'),
            },
            progressBar: {
                progressBarBackground: this.colorRegistry.toCssVariableName('progressBar.background')
            },
            keybindingLabel: {
                keybindingLabelBackground: this.colorRegistry.toCssVariableName('keybindingLabel.background'),
                keybindingLabelForeground: this.colorRegistry.toCssVariableName('keybindingLabel.foreground'),
                keybindingLabelBorder: this.colorRegistry.toCssVariableName('keybindingLabel.border'),
                keybindingLabelBottomBorder: this.colorRegistry.toCssVariableName('keybindingLabel.bottomBorder'),
                keybindingLabelShadow: this.colorRegistry.toCssVariableName('widget.shadow')
            },
        };
    }
};
exports.MonacoQuickInputImplementation = MonacoQuickInputImplementation;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ApplicationShell),
    tslib_1.__metadata("design:type", browser_1.ApplicationShell)
], MonacoQuickInputImplementation.prototype, "shell", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_color_registry_1.MonacoColorRegistry),
    tslib_1.__metadata("design:type", monaco_color_registry_1.MonacoColorRegistry)
], MonacoQuickInputImplementation.prototype, "colorRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(theming_1.ThemeService),
    tslib_1.__metadata("design:type", theming_1.ThemeService)
], MonacoQuickInputImplementation.prototype, "themeService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonacoQuickInputImplementation.prototype, "init", null);
exports.MonacoQuickInputImplementation = MonacoQuickInputImplementation = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoQuickInputImplementation);
let MonacoQuickInputService = class MonacoQuickInputService {
    get backButton() {
        // need to cast because of vscode issue https://github.com/microsoft/vscode/issues/190584
        return this.monacoService.backButton;
    }
    get onShow() { return this.monacoService.onShow; }
    get onHide() { return this.monacoService.onHide; }
    open(filter) {
        this.monacoService.open(filter);
    }
    createInputBox() {
        // need to cast because of vscode issue https://github.com/microsoft/vscode/issues/190584
        return this.monacoService.createInputBox();
    }
    input(options, token) {
        let inputOptions;
        if (options) {
            const { validateInput, ...props } = options;
            inputOptions = { ...props };
            if (validateInput) {
                inputOptions.validateInput = async (input) => validateInput(input);
            }
        }
        return this.monacoService.input(inputOptions, token);
    }
    async pick(picks, options, token) {
        return this.monacoService.pick(picks, options, token);
    }
    showQuickPick(items, options) {
        return new Promise((resolve, reject) => {
            var _a, _b, _c, _d;
            const wrapped = this.createQuickPick();
            wrapped.items = items;
            if (options) {
                wrapped.canSelectMany = !!options.canSelectMany;
                wrapped.contextKey = options.contextKey;
                wrapped.description = options.description;
                wrapped.enabled = (_a = options.enabled) !== null && _a !== void 0 ? _a : true;
                wrapped.ignoreFocusOut = !!options.ignoreFocusOut;
                wrapped.matchOnDescription = (_b = options.matchOnDescription) !== null && _b !== void 0 ? _b : true;
                wrapped.matchOnDetail = (_c = options.matchOnDetail) !== null && _c !== void 0 ? _c : true;
                wrapped.keepScrollPosition = (_d = options.keepScrollPosition) !== null && _d !== void 0 ? _d : false;
                wrapped.placeholder = options.placeholder;
                wrapped.step = options.step;
                wrapped.title = options.title;
                wrapped.totalSteps = options.totalSteps;
                if (options.activeItem) {
                    wrapped.activeItems = [options.activeItem];
                }
                wrapped.onDidChangeValue((filter) => {
                    if (options.onDidChangeValue) {
                        options.onDidChangeValue(wrapped, filter);
                    }
                });
                wrapped.onDidChangeActive((activeItems) => {
                    if (options.onDidChangeActive) {
                        options.onDidChangeActive(wrapped, activeItems);
                    }
                });
                wrapped.onDidTriggerButton((button) => {
                    if (options.onDidTriggerButton) {
                        // need to cast because of vscode issue https://github.com/microsoft/vscode/issues/190584
                        options.onDidTriggerButton(button);
                    }
                });
                wrapped.onDidTriggerItemButton((event) => {
                    if (options.onDidTriggerItemButton) {
                        // https://github.com/theia-ide/vscode/blob/standalone/0.23.x/src/vs/base/parts/quickinput/browser/quickInput.ts#L1387
                        options.onDidTriggerItemButton({
                            ...event,
                            removeItem: () => {
                                wrapped.items = wrapped.items.filter(item => item !== event.item);
                                wrapped.activeItems = wrapped.activeItems.filter(item => item !== event.item);
                            }
                        });
                    }
                });
                wrapped.onDidChangeSelection((selectedItems) => {
                    if (options.onDidChangeSelection) {
                        options.onDidChangeSelection(wrapped, selectedItems);
                    }
                });
            }
            wrapped.onDidAccept(() => {
                if (options === null || options === void 0 ? void 0 : options.onDidAccept) {
                    options.onDidAccept();
                }
                wrapped.hide();
                resolve(wrapped.selectedItems[0]);
            });
            wrapped.onDidHide(() => {
                if (options === null || options === void 0 ? void 0 : options.onDidHide) {
                    options === null || options === void 0 ? void 0 : options.onDidHide();
                }
                ;
                wrapped.dispose();
                setTimeout(() => resolve(undefined));
            });
            wrapped.show();
        }).then(item => {
            if (item === null || item === void 0 ? void 0 : item.execute) {
                item.execute();
            }
            return item;
        });
    }
    createQuickPick() {
        const quickPick = this.monacoService.createQuickPick({ useSeparators: true });
        return this.wrapQuickPick(quickPick);
    }
    wrapQuickPick(wrapped) {
        return new MonacoQuickPick(wrapped, this.keybindingRegistry);
    }
    convertItems(item) {
        return new MonacoQuickPickItem(item, this.keybindingRegistry);
    }
    hide() {
        return this.monacoService.hide();
    }
};
exports.MonacoQuickInputService = MonacoQuickInputService;
tslib_1.__decorate([
    (0, inversify_1.inject)(MonacoQuickInputImplementation),
    tslib_1.__metadata("design:type", MonacoQuickInputImplementation)
], MonacoQuickInputService.prototype, "monacoService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.KeybindingRegistry),
    tslib_1.__metadata("design:type", browser_1.KeybindingRegistry)
], MonacoQuickInputService.prototype, "keybindingRegistry", void 0);
exports.MonacoQuickInputService = MonacoQuickInputService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoQuickInputService);
class MonacoQuickInput {
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    get onDidHide() { return this.wrapped.onDidHide; }
    get onDispose() { return this.wrapped.onDispose; }
    get title() {
        return this.wrapped.title;
    }
    set title(v) {
        this.wrapped.title = v;
    }
    get description() {
        return this.wrapped.description;
    }
    set description(v) {
        this.wrapped.description = v;
    }
    get step() {
        return this.wrapped.step;
    }
    set step(v) {
        this.wrapped.step = v;
    }
    get enabled() {
        return this.wrapped.enabled;
    }
    set enabled(v) {
        this.wrapped.enabled = v;
    }
    get totalSteps() {
        return this.wrapped.totalSteps;
    }
    set totalSteps(v) {
        this.wrapped.totalSteps = v;
    }
    get contextKey() {
        return this.wrapped.contextKey;
    }
    set contextKey(v) {
        this.wrapped.contextKey = v;
    }
    get busy() {
        return this.wrapped.busy;
    }
    set busy(v) {
        this.wrapped.busy = v;
    }
    get ignoreFocusOut() {
        return this.wrapped.ignoreFocusOut;
    }
    set ignoreFocusOut(v) {
        this.wrapped.ignoreFocusOut = v;
    }
    show() {
        this.wrapped.show();
    }
    hide() {
        this.wrapped.hide();
    }
    dispose() {
        this.wrapped.dispose();
    }
}
class MonacoQuickPick extends MonacoQuickInput {
    constructor(wrapped, keybindingRegistry) {
        super(wrapped);
        this.wrapped = wrapped;
        this.keybindingRegistry = keybindingRegistry;
        this.onDidAccept = this.wrapped.onDidAccept;
        this.onDidChangeValue = this.wrapped.onDidChangeValue;
        // need to cast because of vscode issue https://github.com/microsoft/vscode/issues/190584
        this.onDidTriggerButton = this.wrapped.onDidTriggerButton;
        this.onDidTriggerItemButton = core_1.Event.map(this.wrapped.onDidTriggerItemButton, (evt) => ({
            item: evt.item.item,
            button: evt.button
        }));
        this.onDidChangeActive = core_1.Event.map(this.wrapped.onDidChangeActive, (items) => items.map(item => item.item));
        this.onDidChangeSelection = core_1.Event.map(this.wrapped.onDidChangeSelection, (items) => items.map(item => item.item));
    }
    get value() {
        return this.wrapped.value;
    }
    ;
    set value(v) {
        this.wrapped.value = v;
    }
    get placeholder() {
        return this.wrapped.placeholder;
    }
    set placeholder(v) {
        this.wrapped.placeholder = v;
    }
    get canSelectMany() {
        return this.wrapped.canSelectMany;
    }
    set canSelectMany(v) {
        this.wrapped.canSelectMany = v;
    }
    get matchOnDescription() {
        return this.wrapped.matchOnDescription;
    }
    set matchOnDescription(v) {
        this.wrapped.matchOnDescription = v;
    }
    get matchOnDetail() {
        return this.wrapped.matchOnDetail;
    }
    set matchOnDetail(v) {
        this.wrapped.matchOnDetail = v;
    }
    get keepScrollPosition() {
        return this.wrapped.keepScrollPosition;
    }
    set keepScrollPosition(v) {
        this.wrapped.keepScrollPosition = v;
    }
    get items() {
        // need to cast because of vscode issue https://github.com/microsoft/vscode/issues/190584
        return this.wrapped.items.map(item => {
            if (item instanceof MonacoQuickPickItem) {
                return item.item;
            }
            else {
                return item;
            }
        });
    }
    get buttons() {
        return this.wrapped.buttons;
    }
    set buttons(buttons) {
        this.wrapped.buttons = buttons;
    }
    set items(itemList) {
        // We need to store and apply the currently selected active items.
        // Since monaco compares these items by reference equality, creating new wrapped items will unmark any active items.
        // Assigning the `activeItems` again will restore all active items even after the items array has changed.
        // See also the `findMonacoItemReferences` method.
        const active = this.activeItems;
        this.wrapped.items = itemList.map(item => browser_1.QuickPickSeparator.is(item) ? item : new MonacoQuickPickItem(item, this.keybindingRegistry));
        if (active.length !== 0) {
            this.activeItems = active; // If this is done with an empty activeItems array, then it will undo first item focus on quick menus.
        }
    }
    set activeItems(itemList) {
        this.wrapped.activeItems = this.findMonacoItemReferences(this.wrapped.items, itemList);
    }
    get activeItems() {
        return this.wrapped.activeItems.map(item => item.item);
    }
    set selectedItems(itemList) {
        this.wrapped.selectedItems = this.findMonacoItemReferences(this.wrapped.items, itemList);
    }
    get selectedItems() {
        return this.wrapped.selectedItems.map(item => item.item);
    }
    /**
     * Monaco doesn't check for deep equality when setting the `activeItems` or `selectedItems`.
     * Instead we have to find the references of the monaco wrappers that contain the selected/active items
     */
    findMonacoItemReferences(source, items) {
        const monacoReferences = [];
        for (const item of items) {
            for (const wrappedItem of source) {
                if (wrappedItem instanceof MonacoQuickPickItem && wrappedItem.item === item) {
                    monacoReferences.push(wrappedItem);
                }
            }
        }
        return monacoReferences;
    }
}
class MonacoQuickPickItem {
    constructor(item, kbRegistry) {
        this.item = item;
        this.type = item.type;
        this.id = item.id;
        this.label = item.label;
        this.meta = item.meta;
        this.ariaLabel = item.ariaLabel;
        this.description = item.description;
        this.detail = item.detail;
        this.keybinding = item.keySequence ? new monaco_resolved_keybinding_1.MonacoResolvedKeybinding(item.keySequence, kbRegistry) : undefined;
        this.iconClasses = item.iconClasses;
        this.buttons = item.buttons;
        this.alwaysShow = item.alwaysShow;
        this.highlights = item.highlights;
    }
    accept() {
        if (this.item.execute) {
            this.item.execute();
        }
    }
}
exports.MonacoQuickPickItem = MonacoQuickPickItem;
//# sourceMappingURL=monaco-quick-input-service.js.map