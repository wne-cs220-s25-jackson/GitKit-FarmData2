import URI from '@theia/core/lib/common/uri';
import { Emitter, Event } from '@theia/core/lib/common/event';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { DebugConfiguration } from '../common/debug-common';
import { PreferenceService } from '@theia/core/lib/browser/preferences/preference-service';
import { DebugCompound } from '../common/debug-compound';
export declare class DebugConfigurationModel implements Disposable {
    readonly workspaceFolderUri: string;
    protected readonly preferences: PreferenceService;
    protected json: DebugConfigurationModel.JsonContent;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: Event<void>;
    protected readonly toDispose: DisposableCollection;
    constructor(workspaceFolderUri: string, preferences: PreferenceService);
    get uri(): URI | undefined;
    dispose(): void;
    get onDispose(): Event<void>;
    get configurations(): DebugConfiguration[];
    get compounds(): DebugCompound[];
    reconcile(): Promise<void>;
    protected parseConfigurations(): DebugConfigurationModel.JsonContent;
}
export declare namespace DebugConfigurationModel {
    interface JsonContent {
        uri?: URI;
        configurations: DebugConfiguration[];
        compounds: DebugCompound[];
    }
}
//# sourceMappingURL=debug-configuration-model.d.ts.map