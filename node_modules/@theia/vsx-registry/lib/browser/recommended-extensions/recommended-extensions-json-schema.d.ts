import { InMemoryResources } from '@theia/core';
import { JsonSchemaContribution, JsonSchemaRegisterContext } from '@theia/core/lib/browser/json-schema-store';
import { IJSONSchema } from '@theia/core/lib/common/json-schema';
import URI from '@theia/core/lib/common/uri';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export declare const extensionsSchemaID = "vscode://schemas/extensions";
export declare const extensionsConfigurationSchema: IJSONSchema;
export declare class ExtensionSchemaContribution implements JsonSchemaContribution {
    protected readonly uri: URI;
    protected readonly inmemoryResources: InMemoryResources;
    protected readonly workspaceService: WorkspaceService;
    protected init(): void;
    registerSchemas(context: JsonSchemaRegisterContext): void;
}
//# sourceMappingURL=recommended-extensions-json-schema.d.ts.map