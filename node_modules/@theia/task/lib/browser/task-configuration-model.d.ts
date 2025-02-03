import URI from '@theia/core/lib/common/uri';
import { Emitter, Event } from '@theia/core/lib/common/event';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { TaskCustomization, TaskConfiguration, TaskConfigurationScope } from '../common/task-protocol';
import { PreferenceProvider } from '@theia/core/lib/browser';
/**
 * Holds the task configurations associated with a particular file. Uses an editor model to facilitate
 * non-destructive editing and coordination with editing the file by hand.
 */
export declare class TaskConfigurationModel implements Disposable {
    protected readonly scope: TaskConfigurationScope;
    readonly preferences: PreferenceProvider;
    protected json: TaskConfigurationModel.JsonContent;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: Event<void>;
    protected readonly toDispose: DisposableCollection;
    constructor(scope: TaskConfigurationScope, preferences: PreferenceProvider);
    get uri(): URI | undefined;
    getWorkspaceFolder(): string | undefined;
    dispose(): void;
    get onDispose(): Event<void>;
    get configurations(): (TaskCustomization | TaskConfiguration)[];
    protected reconcile(): void;
    setConfigurations(value: object): Promise<boolean>;
    protected parseConfigurations(): TaskConfigurationModel.JsonContent;
}
export declare namespace TaskConfigurationModel {
    interface JsonContent {
        uri?: URI;
        configurations: (TaskCustomization | TaskConfiguration)[];
    }
}
//# sourceMappingURL=task-configuration-model.d.ts.map