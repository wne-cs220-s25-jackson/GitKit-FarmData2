"use strict";
/********************************************************************************
 * Copyright (C) 2021 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugConfigurationSelect = void 0;
const uri_1 = require("@theia/core/lib/common/uri");
const React = require("@theia/core/shared/react");
const debug_session_options_1 = require("../debug-session-options");
const select_component_1 = require("@theia/core/lib/browser/widgets/select-component");
const nls_1 = require("@theia/core/lib/common/nls");
class DebugConfigurationSelect extends React.Component {
    constructor(props) {
        super(props);
        this.selectRef = React.createRef();
        this.setCurrentConfiguration = (option) => {
            const value = option.value;
            if (!value) {
                return false;
            }
            else if (value === DebugConfigurationSelect.ADD_CONFIGURATION) {
                setTimeout(() => this.manager.addConfiguration());
            }
            else if (value.startsWith(DebugConfigurationSelect.PICK)) {
                const providerType = this.parsePickValue(value);
                this.selectDynamicConfigFromQuickPick(providerType);
            }
            else {
                const data = JSON.parse(value);
                this.manager.current = data;
                this.refreshDebugConfigurations();
            }
        };
        this.refreshDebugConfigurations = async () => {
            const configsOptionsPerType = await this.manager.provideDynamicDebugConfigurations();
            const providerTypes = [];
            for (const [type, configurationsOptions] of Object.entries(configsOptionsPerType)) {
                if (configurationsOptions.length > 0) {
                    providerTypes.push(type);
                }
            }
            const value = this.currentValue;
            this.selectRef.current.value = value;
            this.setState({ providerTypes, currentValue: value });
        };
        this.manager = props.manager;
        this.quickInputService = props.quickInputService;
        this.state = {
            providerTypes: [],
            currentValue: undefined
        };
        this.manager.onDidChangeConfigurationProviders(() => {
            this.refreshDebugConfigurations();
        });
    }
    componentDidUpdate() {
        var _a;
        // synchronize the currentValue with the selectComponent value
        if (((_a = this.selectRef.current) === null || _a === void 0 ? void 0 : _a.value) !== this.currentValue) {
            this.refreshDebugConfigurations();
        }
    }
    componentDidMount() {
        this.refreshDebugConfigurations();
    }
    render() {
        return React.createElement(select_component_1.SelectComponent, { options: this.renderOptions(), defaultValue: this.state.currentValue, onChange: option => this.setCurrentConfiguration(option), onFocus: () => this.refreshDebugConfigurations(), onBlur: () => this.refreshDebugConfigurations(), ref: this.selectRef });
    }
    get currentValue() {
        const { current } = this.manager;
        const matchingOption = this.getCurrentOption(current);
        return matchingOption ? matchingOption.value : current ? JSON.stringify(current) : DebugConfigurationSelect.NO_CONFIGURATION;
    }
    getCurrentOption(current) {
        if (!current || !this.selectRef.current) {
            return;
        }
        const matchingOption = this.selectRef.current.options.find(option => option.userData === DebugConfigurationSelect.CONFIG_MARKER
            && this.matchesOption(JSON.parse(option.value), current));
        return matchingOption;
    }
    matchesOption(sessionOption, current) {
        const matchesNameAndWorkspace = sessionOption.name === current.name && sessionOption.workspaceFolderUri === current.workspaceFolderUri;
        return debug_session_options_1.DebugSessionOptions.isConfiguration(sessionOption) && debug_session_options_1.DebugSessionOptions.isConfiguration(current)
            ? matchesNameAndWorkspace && sessionOption.providerType === current.providerType
            : matchesNameAndWorkspace;
    }
    toPickValue(providerType) {
        return DebugConfigurationSelect.PICK + providerType;
    }
    parsePickValue(value) {
        return value.slice(DebugConfigurationSelect.PICK.length);
    }
    async resolveDynamicConfigurationPicks(providerType) {
        const configurationsOfProviderType = (await this.manager.provideDynamicDebugConfigurations())[providerType];
        if (!configurationsOfProviderType) {
            return [];
        }
        return configurationsOfProviderType.map(options => ({
            label: options.configuration.name,
            configurationType: options.configuration.type,
            request: options.configuration.request,
            providerType: options.providerType,
            description: this.toBaseName(options.workspaceFolderUri),
            workspaceFolderUri: options.workspaceFolderUri
        }));
    }
    async selectDynamicConfigFromQuickPick(providerType) {
        const picks = await this.resolveDynamicConfigurationPicks(providerType);
        if (picks.length === 0) {
            return;
        }
        const selected = await this.quickInputService.showQuickPick(picks, {
            placeholder: nls_1.nls.localizeByDefault('Select Launch Configuration')
        });
        if (!selected) {
            return;
        }
        const selectedConfiguration = {
            name: selected.label,
            type: selected.configurationType,
            request: selected.request
        };
        this.manager.current = this.manager.find(selectedConfiguration, selected.workspaceFolderUri, selected.providerType);
        this.refreshDebugConfigurations();
    }
    renderOptions() {
        const options = [];
        // Add non dynamic debug configurations
        for (const config of this.manager.all) {
            const value = JSON.stringify(config);
            options.push({
                value,
                label: this.toName(config, this.props.isMultiRoot),
                userData: DebugConfigurationSelect.CONFIG_MARKER
            });
        }
        // Add recently used dynamic debug configurations
        const { recentDynamicOptions } = this.manager;
        if (recentDynamicOptions.length > 0) {
            if (options.length > 0) {
                options.push({
                    separator: true
                });
            }
            for (const dynamicOption of recentDynamicOptions) {
                const value = JSON.stringify(dynamicOption);
                options.push({
                    value,
                    label: this.toName(dynamicOption, this.props.isMultiRoot) + ' (' + dynamicOption.providerType + ')',
                    userData: DebugConfigurationSelect.CONFIG_MARKER
                });
            }
        }
        // Placing a 'No Configuration' entry enables proper functioning of the 'onChange' event, by
        // having an entry to switch from (E.g. a case where only one dynamic configuration type is available)
        if (options.length === 0) {
            const value = DebugConfigurationSelect.NO_CONFIGURATION;
            options.push({
                value,
                label: nls_1.nls.localizeByDefault('No Configurations')
            });
        }
        // Add dynamic configuration types for quick pick selection
        const types = this.state.providerTypes;
        if (types.length > 0) {
            options.push({
                separator: true
            });
            for (const type of types) {
                const value = this.toPickValue(type);
                options.push({
                    value,
                    label: type + '...'
                });
            }
        }
        options.push({
            separator: true
        });
        options.push({
            value: DebugConfigurationSelect.ADD_CONFIGURATION,
            label: nls_1.nls.localizeByDefault('Add Configuration...')
        });
        return options;
    }
    toName(options, multiRoot) {
        var _a, _b;
        const name = (_b = (_a = options.configuration) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : options.name;
        if (!options.workspaceFolderUri || !multiRoot) {
            return name;
        }
        return `${name} (${this.toBaseName(options.workspaceFolderUri)})`;
    }
    toBaseName(uri) {
        return uri ? new uri_1.default(uri).path.base : '';
    }
}
exports.DebugConfigurationSelect = DebugConfigurationSelect;
DebugConfigurationSelect.SEPARATOR = '──────────';
DebugConfigurationSelect.PICK = '__PICK__';
DebugConfigurationSelect.NO_CONFIGURATION = '__NO_CONF__';
DebugConfigurationSelect.ADD_CONFIGURATION = '__ADD_CONF__';
DebugConfigurationSelect.CONFIG_MARKER = '__CONFIG__';
//# sourceMappingURL=debug-configuration-select.js.map