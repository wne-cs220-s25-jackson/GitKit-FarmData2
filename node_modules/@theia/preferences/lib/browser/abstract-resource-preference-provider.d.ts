import { PreferenceProvider, PreferenceSchemaProvider, PreferenceScope } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { PreferenceConfigurations } from '@theia/core/lib/browser/preferences/preference-configurations';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { PreferenceContext, PreferenceTransaction, PreferenceTransactionFactory } from './preference-transaction-manager';
import { Emitter, Event } from '@theia/core';
export declare abstract class AbstractResourcePreferenceProvider extends PreferenceProvider {
    protected preferences: Record<string, any>;
    protected _fileExists: boolean;
    protected readonly loading: Deferred<void>;
    protected transaction: PreferenceTransaction | undefined;
    protected readonly onDidChangeValidityEmitter: Emitter<boolean>;
    set fileExists(exists: boolean);
    get onDidChangeValidity(): Event<boolean>;
    protected readonly transactionFactory: PreferenceTransactionFactory;
    protected readonly schemaProvider: PreferenceSchemaProvider;
    protected readonly fileService: FileService;
    protected readonly configurations: PreferenceConfigurations;
    protected init(): void;
    protected doInit(): Promise<void>;
    protected abstract getUri(): URI;
    abstract getScope(): PreferenceScope;
    get valid(): boolean;
    getConfigUri(): URI;
    getConfigUri(resourceUri: string | undefined): URI | undefined;
    contains(resourceUri: string | undefined): boolean;
    getPreferences(resourceUri?: string): {
        [key: string]: any;
    };
    setPreference(key: string, value: any, resourceUri?: string): Promise<boolean>;
    protected doSetPreference(key: string, path: string[], value: unknown): Promise<boolean>;
    /**
     * Use this method as intermediary for interactions with actual files.
     * Allows individual providers to modify where they store their files without disrupting the preference system's
     * conventions about scope and file location.
     */
    protected toFileManager(): PreferenceContext;
    protected getPath(preferenceName: string): string[] | undefined;
    protected readPreferencesFromFile(): Promise<void>;
    protected readPreferencesFromContent(content: string): void;
    protected parse(content: string): any;
    protected handlePreferenceChanges(newPrefs: {
        [key: string]: any;
    }): void;
    protected reset(): void;
}
//# sourceMappingURL=abstract-resource-preference-provider.d.ts.map