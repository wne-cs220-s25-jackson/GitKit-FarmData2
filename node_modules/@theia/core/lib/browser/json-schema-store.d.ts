import { ContributionProvider } from '../common/contribution-provider';
import { FrontendApplicationContribution } from './frontend-application-contribution';
import { Emitter, MaybePromise, URI } from '../common';
import { Deferred } from '../common/promise-util';
import { IJSONSchema } from '../common/json-schema';
export interface JsonSchemaConfiguration {
    fileMatch: string | string[];
    url: string;
}
export interface JsonSchemaRegisterContext {
    registerSchema(config: JsonSchemaConfiguration): void;
}
export declare const JsonSchemaContribution: unique symbol;
export interface JsonSchemaContribution {
    registerSchemas(store: JsonSchemaRegisterContext): MaybePromise<void>;
}
export declare class JsonSchemaStore implements FrontendApplicationContribution {
    protected readonly contributions: ContributionProvider<JsonSchemaContribution>;
    protected readonly _schemas: Deferred<JsonSchemaConfiguration[]>;
    get schemas(): Promise<JsonSchemaConfiguration[]>;
    onStart(): void;
    protected getRegisterTimeout(): number;
}
export declare class JsonSchemaDataStore {
    protected readonly _schemas: Map<string, string>;
    protected readonly onDidSchemaUpdateEmitter: Emitter<URI>;
    readonly onDidSchemaUpdate: import("../common").Event<URI>;
    hasSchema(uri: URI): boolean;
    getSchema(uri: URI): string | undefined;
    setSchema(uri: URI, schema: IJSONSchema | string): void;
    deleteSchema(uri: URI): void;
    notifySchemaUpdate(uri: URI): void;
}
export declare class DefaultJsonSchemaContribution implements JsonSchemaContribution {
    registerSchemas(context: JsonSchemaRegisterContext): Promise<void>;
}
export declare namespace DefaultJsonSchemaContribution {
    interface SchemaData {
        name: string;
        description: string;
        fileMatch?: string[];
        url: string;
        schema: any;
    }
}
//# sourceMappingURL=json-schema-store.d.ts.map