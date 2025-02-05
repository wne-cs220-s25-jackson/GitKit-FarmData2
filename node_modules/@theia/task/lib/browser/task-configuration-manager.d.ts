import URI from '@theia/core/lib/common/uri';
import { Emitter, Event } from '@theia/core/lib/common/event';
import { EditorManager, EditorWidget } from '@theia/editor/lib/browser';
import { PreferenceScope, PreferenceProvider, PreferenceService } from '@theia/core/lib/browser';
import { QuickPickService } from '@theia/core/lib/common/quick-pick-service';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { TaskConfigurationModel } from './task-configuration-model';
import { TaskTemplateSelector } from './task-templates';
import { TaskCustomization, TaskConfiguration, TaskConfigurationScope } from '../common/task-protocol';
import { WorkspaceVariableContribution } from '@theia/workspace/lib/browser/workspace-variable-contribution';
import { FileChangeType } from '@theia/filesystem/lib/common/filesystem-watcher-protocol';
import { PreferenceConfigurations } from '@theia/core/lib/browser/preferences/preference-configurations';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { DisposableCollection } from '@theia/core/lib/common';
import { TaskSchemaUpdater } from './task-schema-updater';
export interface TasksChange {
    scope: TaskConfigurationScope;
    type: FileChangeType;
}
/**
 * This class connects the the "tasks" preferences sections to task system: it collects tasks preference values and
 * provides them to the task system as raw, parsed JSON.
 */
export declare class TaskConfigurationManager {
    protected readonly workspaceService: WorkspaceService;
    protected readonly editorManager: EditorManager;
    protected readonly quickPickService: QuickPickService;
    protected readonly fileService: FileService;
    protected readonly preferenceService: PreferenceService;
    protected readonly taskSchemaProvider: TaskSchemaUpdater;
    protected readonly folderPreferences: PreferenceProvider;
    protected readonly userPreferences: PreferenceProvider;
    protected readonly workspacePreferences: PreferenceProvider;
    protected readonly preferenceConfigurations: PreferenceConfigurations;
    protected readonly workspaceVariables: WorkspaceVariableContribution;
    protected readonly taskTemplateSelector: TaskTemplateSelector;
    protected readonly onDidChangeTaskConfigEmitter: Emitter<TasksChange>;
    readonly onDidChangeTaskConfig: Event<TasksChange>;
    protected readonly models: Map<TaskConfigurationScope, TaskConfigurationModel>;
    protected workspaceDelegate: PreferenceProvider;
    protected init(): void;
    protected createModels(): void;
    protected updateModels: () => Promise<void>;
    getTasks(scope: TaskConfigurationScope): (TaskCustomization | TaskConfiguration)[];
    getTask(name: string, scope: TaskConfigurationScope): TaskCustomization | TaskConfiguration | undefined;
    openConfiguration(scope: TaskConfigurationScope): Promise<void>;
    addTaskConfiguration(scope: TaskConfigurationScope, taskConfig: TaskCustomization): Promise<boolean>;
    setTaskConfigurations(scope: TaskConfigurationScope, taskConfigs: (TaskCustomization | TaskConfiguration)[]): Promise<boolean>;
    protected getModel(scope: TaskConfigurationScope): TaskConfigurationModel | undefined;
    protected doOpen(model: TaskConfigurationModel, configURI: URI): Promise<EditorWidget | undefined>;
    protected doCreate(model: TaskConfigurationModel, configURI: URI): Promise<void>;
    protected getMatchingPreferenceScope(scope: TaskConfigurationScope): PreferenceScope;
    protected getInitialConfigurationContent(): Promise<string | undefined>;
    protected readonly toDisposeOnDelegateChange: DisposableCollection;
    protected updateWorkspaceModel(): void;
}
export declare namespace TaskConfigurationManager {
    interface Data {
        current?: {
            name: string;
            workspaceFolderUri?: string;
        };
    }
}
//# sourceMappingURL=task-configuration-manager.d.ts.map