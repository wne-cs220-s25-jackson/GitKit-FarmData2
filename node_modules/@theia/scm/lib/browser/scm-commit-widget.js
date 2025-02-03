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
var ScmCommitWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmCommitWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const React = require("@theia/core/shared/react");
const react_textarea_autosize_1 = require("react-textarea-autosize");
const scm_input_1 = require("./scm-input");
const browser_1 = require("@theia/core/lib/browser");
const scm_service_1 = require("./scm-service");
let ScmCommitWidget = ScmCommitWidget_1 = class ScmCommitWidget extends browser_1.ReactWidget {
    constructor(contextMenuRenderer) {
        super();
        this.contextMenuRenderer = contextMenuRenderer;
        this.toDisposeOnRepositoryChange = new core_1.DisposableCollection();
        this.shouldScrollToRow = true;
        /**
         * Don't modify DOM use React! only exposed for `focusInput`
         * Use `this.scmService.selectedRepository?.input.value` as a single source of truth!
         */
        this.inputRef = React.createRef();
        this.setInputValue = (event) => {
            const repository = this.scmService.selectedRepository;
            if (repository) {
                repository.input.value = typeof event === 'string' ? event : event.currentTarget.value;
            }
        };
        this.scrollOptions = {
            suppressScrollX: true,
            minScrollbarLength: 35
        };
        this.addClass('theia-scm-commit');
        this.id = ScmCommitWidget_1.ID;
    }
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this.refreshOnRepositoryChange();
        this.toDisposeOnDetach.push(this.scmService.onDidChangeSelectedRepository(() => {
            this.refreshOnRepositoryChange();
            this.update();
        }));
    }
    refreshOnRepositoryChange() {
        this.toDisposeOnRepositoryChange.dispose();
        const repository = this.scmService.selectedRepository;
        if (repository) {
            this.toDisposeOnRepositoryChange.push(repository.provider.onDidChange(async () => {
                this.update();
            }));
            this.toDisposeOnRepositoryChange.push(repository.provider.onDidChangeCommitTemplate(e => {
                this.setInputValue(e);
            }));
        }
    }
    onActivateRequest(msg) {
        super.onActivateRequest(msg);
        this.focus();
    }
    focus() {
        (this.inputRef.current || this.node).focus();
    }
    render() {
        const repository = this.scmService.selectedRepository;
        if (repository) {
            return React.createElement('div', this.createContainerAttributes(), this.renderInput(repository.input));
        }
    }
    /**
     * Create the container attributes for the widget.
     */
    createContainerAttributes() {
        return {
            style: { flexGrow: 0 }
        };
    }
    renderInput(input) {
        let validationStatus = 'idle';
        if (input.issue) {
            switch (input.issue.type) {
                case scm_input_1.ScmInputIssueType.Error:
                    validationStatus = 'error';
                    break;
                case scm_input_1.ScmInputIssueType.Information:
                    validationStatus = 'info';
                    break;
                case scm_input_1.ScmInputIssueType.Warning:
                    validationStatus = 'warning';
                    break;
            }
        }
        const validationMessage = input.issue ? input.issue.message : '';
        const format = (value, ...args) => {
            if (args.length !== 0) {
                return value.replace(/{(\d+)}/g, (found, n) => {
                    const i = parseInt(n);
                    return isNaN(i) || i < 0 || i >= args.length ? found : args[i];
                });
            }
            return value;
        };
        const keybinding = this.keybindings.acceleratorFor(this.keybindings.getKeybindingsForCommand('scm.acceptInput')[0]).join('+');
        const message = format(input.placeholder || '', keybinding);
        const textArea = input.visible &&
            React.createElement(react_textarea_autosize_1.default, { className: `${ScmCommitWidget_1.Styles.INPUT_MESSAGE} theia-input theia-scm-input-message-${validationStatus}`, id: ScmCommitWidget_1.Styles.INPUT_MESSAGE, placeholder: message, spellCheck: false, autoFocus: true, value: input.value, disabled: !input.enabled, onChange: this.setInputValue, ref: this.inputRef, rows: 1, maxRows: 6 });
        return React.createElement("div", { className: ScmCommitWidget_1.Styles.INPUT_MESSAGE_CONTAINER },
            textArea,
            React.createElement("div", { className: `${ScmCommitWidget_1.Styles.VALIDATION_MESSAGE} ${ScmCommitWidget_1.Styles.NO_SELECT}
                    theia-scm-validation-message-${validationStatus} theia-scm-input-message-${validationStatus}`, style: {
                    display: !!input.issue ? 'block' : 'none'
                } }, validationMessage));
    }
    /**
     * Store the tree state.
     */
    storeState() {
        var _a;
        const message = (_a = this.scmService.selectedRepository) === null || _a === void 0 ? void 0 : _a.input.value;
        return { message };
    }
    /**
     * Restore the state.
     * @param oldState the old state object.
     */
    restoreState(oldState) {
        const value = oldState.message;
        if (!value) {
            return;
        }
        let repository = this.scmService.selectedRepository;
        if (repository) {
            repository.input.value = value;
        }
        else {
            const listener = this.scmService.onDidChangeSelectedRepository(() => {
                repository = this.scmService.selectedRepository;
                if (repository) {
                    listener.dispose();
                    if (!repository.input.value) {
                        repository.input.value = value;
                    }
                }
            });
            this.toDispose.push(listener);
        }
    }
};
exports.ScmCommitWidget = ScmCommitWidget;
ScmCommitWidget.ID = 'scm-commit-widget';
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_service_1.ScmService),
    tslib_1.__metadata("design:type", scm_service_1.ScmService)
], ScmCommitWidget.prototype, "scmService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.KeybindingRegistry),
    tslib_1.__metadata("design:type", browser_1.KeybindingRegistry)
], ScmCommitWidget.prototype, "keybindings", void 0);
exports.ScmCommitWidget = ScmCommitWidget = ScmCommitWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [browser_1.ContextMenuRenderer])
], ScmCommitWidget);
(function (ScmCommitWidget) {
    let Styles;
    (function (Styles) {
        Styles.INPUT_MESSAGE_CONTAINER = 'theia-scm-input-message-container';
        Styles.INPUT_MESSAGE = 'theia-scm-input-message';
        Styles.VALIDATION_MESSAGE = 'theia-scm-input-validation-message';
        Styles.NO_SELECT = 'no-select';
    })(Styles = ScmCommitWidget.Styles || (ScmCommitWidget.Styles = {}));
})(ScmCommitWidget || (exports.ScmCommitWidget = ScmCommitWidget = {}));
//# sourceMappingURL=scm-commit-widget.js.map