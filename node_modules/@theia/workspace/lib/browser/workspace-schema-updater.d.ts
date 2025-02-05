import { JsonSchemaContribution, JsonSchemaDataStore, JsonSchemaRegisterContext } from '@theia/core/lib/browser/json-schema-store';
import { IJSONSchema } from '@theia/core/lib/common/json-schema';
import URI from '@theia/core/lib/common/uri';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { WorkspaceFileService } from '../common';
export interface SchemaUpdateMessage {
    key: string;
    schema?: IJSONSchema;
    deferred: Deferred<boolean>;
}
export declare namespace AddKeyMessage {
    const is: (message: SchemaUpdateMessage | undefined) => message is Required<SchemaUpdateMessage>;
}
export declare class WorkspaceSchemaUpdater implements JsonSchemaContribution {
    protected readonly uri: URI;
    protected readonly editQueue: SchemaUpdateMessage[];
    protected safeToHandleQueue: Deferred<void>;
    protected readonly jsonSchemaData: JsonSchemaDataStore;
    protected readonly workspaceFileService: WorkspaceFileService;
    protected init(): void;
    registerSchemas(context: JsonSchemaRegisterContext): void;
    protected retrieveCurrent(): Promise<WorkspaceSchema>;
    updateSchema(message: Omit<SchemaUpdateMessage, 'deferred'>): Promise<boolean>;
    protected handleQueue(): Promise<void>;
    protected addKey({ key, schema, deferred }: Required<SchemaUpdateMessage>, cache: WorkspaceSchema): void;
    protected removeKey({ key, deferred }: SchemaUpdateMessage, cache: WorkspaceSchema): void;
}
export type WorkspaceSchema = Required<Pick<IJSONSchema, 'properties' | 'required'>>;
export declare namespace WorkspaceSchema {
    function is(candidate: unknown): candidate is WorkspaceSchema;
}
export declare const workspaceSchemaId = "vscode://schemas/workspace";
export declare const workspaceSchema: IJSONSchema;
//# sourceMappingURL=workspace-schema-updater.d.ts.map