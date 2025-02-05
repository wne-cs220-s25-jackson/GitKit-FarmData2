import URI from '@theia/core/lib/common/uri';
import { Emitter, Event, WaitUntilEvent } from '@theia/core/lib/common/event';
import { EditorManager, EditorWidget } from '@theia/editor/lib/browser';
import { LabelProvider, PreferenceService, StorageService } from '@theia/core/lib/browser';
import { QuickPickService } from '@theia/core/lib/common/quick-pick-service';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { DebugConfigurationModel } from './debug-configuration-model';
import { DebugSessionOptions, DynamicDebugConfigurationSessionOptions } from './debug-session-options';
import { DebugService } from '../common/debug-service';
import { ContextKey, ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { DebugConfiguration } from '../common/debug-common';
import { WorkspaceVariableContribution } from '@theia/workspace/lib/browser/workspace-variable-contribution';
import { PreferenceConfigurations } from '@theia/core/lib/browser/preferences/preference-configurations';
import { MonacoTextModelService } from '@theia/monaco/lib/browser/monaco-text-model-service';
import { DebugCompound } from '../common/debug-compound';
export interface WillProvideDebugConfiguration extends WaitUntilEvent {
}
export declare class DebugConfigurationManager {
    protected readonly workspaceService: WorkspaceService;
    protected readonly editorManager: EditorManager;
    protected readonly debug: DebugService;
    protected readonly quickPickService: QuickPickService;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly labelProvider: LabelProvider;
    protected readonly textModelService: MonacoTextModelService;
    protected readonly preferences: PreferenceService;
    protected readonly preferenceConfigurations: PreferenceConfigurations;
    protected readonly workspaceVariables: WorkspaceVariableContribution;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: Event<void>;
    protected readonly onWillProvideDebugConfigurationEmitter: Emitter<WillProvideDebugConfiguration>;
    readonly onWillProvideDebugConfiguration: Event<WillProvideDebugConfiguration>;
    protected readonly onWillProvideDynamicDebugConfigurationEmitter: Emitter<WillProvideDebugConfiguration>;
    get onWillProvideDynamicDebugConfiguration(): Event<WillProvideDebugConfiguration>;
    get onDidChangeConfigurationProviders(): Event<void>;
    protected debugConfigurationTypeKey: ContextKey<string>;
    protected initialized: Promise<void>;
    protected recentDynamicOptionsTracker: DynamicDebugConfigurationSessionOptions[];
    protected init(): void;
    protected doInit(): Promise<void>;
    protected readonly models: Map<string, DebugConfigurationModel>;
    protected updateModels: () => Promise<void>;
    /**
     * All _non-dynamic_ debug configurations.
     */
    get all(): IterableIterator<DebugSessionOptions>;
    protected getAll(): IterableIterator<DebugSessionOptions>;
    get supported(): Promise<IterableIterator<DebugSessionOptions>>;
    protected getSupported(): Promise<IterableIterator<DebugSessionOptions>>;
    protected doGetSupported(debugTypes: Set<string>): IterableIterator<DebugSessionOptions>;
    protected _currentOptions: DebugSessionOptions | undefined;
    get current(): DebugSessionOptions | undefined;
    getSelectedConfiguration(): Promise<DebugSessionOptions | undefined>;
    set current(option: DebugSessionOptions | undefined);
    protected updateRecentlyUsedDynamicConfigurationOptions(option: DebugSessionOptions | undefined): void;
    protected dynamicOptionsMatch(one: DynamicDebugConfigurationSessionOptions, other: DynamicDebugConfigurationSessionOptions): boolean;
    get recentDynamicOptions(): readonly DynamicDebugConfigurationSessionOptions[];
    protected updateCurrent(options?: DebugSessionOptions | undefined): void;
    /**
     * @deprecated since v1.27.0
     */
    find(name: string, workspaceFolderUri: string): DebugSessionOptions | undefined;
    /**
     * Find / Resolve DebugSessionOptions from a given target debug configuration
     */
    find(compound: DebugCompound, workspaceFolderUri?: string): DebugSessionOptions | undefined;
    find(configuration: DebugConfiguration, workspaceFolderUri?: string, providerType?: string): DebugSessionOptions | undefined;
    find(name: string, workspaceFolderUri?: string, providerType?: string): DebugSessionOptions | undefined;
    findConfigurations(name: string, workspaceFolderUri?: string): DebugConfiguration[];
    findConfiguration(name: string, workspaceFolderUri?: string): DebugConfiguration | undefined;
    findCompound(name: string, workspaceFolderUri?: string): DebugCompound | undefined;
    openConfiguration(): Promise<void>;
    protected configurationToOptions(configuration: DebugConfiguration, workspaceFolderUri?: string, providerType?: string): DebugSessionOptions;
    protected compoundToOptions(compound: DebugCompound, workspaceFolderUri?: string): DebugSessionOptions;
    addConfiguration(): Promise<void>;
    protected selectRootUri(): Promise<URI | undefined>;
    protected getModel(uri?: URI): DebugConfigurationModel | undefined;
    protected doOpen(model: DebugConfigurationModel): Promise<EditorWidget>;
    protected doCreate(model: DebugConfigurationModel): Promise<URI>;
    /**
     * Checks whether a `launch.json` file contains the minimum necessary content.
     * If content not found, provides content and populates the file using Monaco.
     */
    protected ensureContent(uri: URI, model: DebugConfigurationModel): Promise<void>;
    protected provideDebugConfigurations(debugType: string, workspaceFolderUri: string | undefined): Promise<DebugConfiguration[]>;
    protected fireWillProvideDebugConfiguration(): Promise<void>;
    provideDynamicDebugConfigurations(): Promise<Record<string, DynamicDebugConfigurationSessionOptions[]>>;
    fetchDynamicDebugConfiguration(name: string, type: string, folder?: string): Promise<DebugConfiguration | undefined>;
    protected fireWillProvideDynamicDebugConfiguration(): Promise<void>;
    protected getInitialConfigurationContent(initialConfigurations: DebugConfiguration[]): string;
    protected selectDebugType(): Promise<string | undefined>;
    protected readonly storage: StorageService;
    load(): Promise<void>;
    protected resolveRecentDynamicOptionsFromData(options?: DynamicDebugConfigurationSessionOptions[]): void;
    save(): void;
}
export declare namespace DebugConfigurationManager {
    interface Data {
        current?: DebugSessionOptions;
        recentDynamicOptions?: DynamicDebugConfigurationSessionOptions[];
    }
}
//# sourceMappingURL=debug-configuration-manager.d.ts.map