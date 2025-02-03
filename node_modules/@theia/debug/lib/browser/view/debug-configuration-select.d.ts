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
/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { DebugConfigurationManager } from '../debug-configuration-manager';
import { DebugSessionOptions } from '../debug-session-options';
import { SelectOption } from '@theia/core/lib/browser/widgets/select-component';
import { QuickInputService } from '@theia/core/lib/browser';
interface DynamicPickItem {
    label: string;
    configurationType: string;
    request: string;
    providerType: string;
    workspaceFolderUri?: string;
}
export interface DebugConfigurationSelectProps {
    manager: DebugConfigurationManager;
    quickInputService: QuickInputService;
    isMultiRoot: boolean;
}
export interface DebugProviderSelectState {
    providerTypes: string[];
    currentValue: string | undefined;
}
export declare class DebugConfigurationSelect extends React.Component<DebugConfigurationSelectProps, DebugProviderSelectState> {
    protected static readonly SEPARATOR = "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500";
    protected static readonly PICK = "__PICK__";
    protected static readonly NO_CONFIGURATION = "__NO_CONF__";
    protected static readonly ADD_CONFIGURATION = "__ADD_CONF__";
    protected static readonly CONFIG_MARKER = "__CONFIG__";
    private readonly selectRef;
    private manager;
    private quickInputService;
    constructor(props: DebugConfigurationSelectProps);
    componentDidUpdate(): void;
    componentDidMount(): void;
    render(): React.ReactNode;
    protected get currentValue(): string;
    protected getCurrentOption(current: DebugSessionOptions | undefined): SelectOption | undefined;
    protected matchesOption(sessionOption: DebugSessionOptions, current: DebugSessionOptions): boolean;
    protected readonly setCurrentConfiguration: (option: SelectOption) => false | undefined;
    protected toPickValue(providerType: string): string;
    protected parsePickValue(value: string): string;
    protected resolveDynamicConfigurationPicks(providerType: string): Promise<DynamicPickItem[]>;
    protected selectDynamicConfigFromQuickPick(providerType: string): Promise<void>;
    protected refreshDebugConfigurations: () => Promise<void>;
    protected renderOptions(): SelectOption[];
    protected toName(options: DebugSessionOptions, multiRoot: boolean): string;
    protected toBaseName(uri: string | undefined): string;
}
export {};
//# sourceMappingURL=debug-configuration-select.d.ts.map