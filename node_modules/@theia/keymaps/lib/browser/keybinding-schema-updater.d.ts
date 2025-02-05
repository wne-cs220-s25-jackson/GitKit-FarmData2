import { CommandRegistry, InMemoryResources } from '@theia/core/lib/common';
import { JsonSchemaContribution, JsonSchemaRegisterContext } from '@theia/core/lib/browser/json-schema-store';
import URI from '@theia/core/lib/common/uri';
export declare class KeybindingSchemaUpdater implements JsonSchemaContribution {
    protected readonly uri: URI;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly inMemoryResources: InMemoryResources;
    protected init(): void;
    registerSchemas(store: JsonSchemaRegisterContext): void;
    protected updateSchema(): void;
}
export declare const keybindingSchema: {
    $id: string;
    type: string;
    title: string;
    default: never[];
    definitions: {
        key: {
            type: string;
            description: string;
        };
    };
    items: {
        type: string;
        defaultSnippets: {
            body: {
                key: string;
                command: string;
                when: string;
            };
        }[];
        allOf: ({
            required: string[];
            properties: {
                command: {
                    anyOf: ({
                        type: string;
                        enum?: undefined;
                        enumDescriptions?: undefined;
                    } | {
                        enum: string[];
                        enumDescriptions: string[];
                        type?: undefined;
                    })[];
                    description: string;
                };
                when: {
                    type: string;
                    description: string;
                };
                args: {
                    description: string;
                };
                context: {
                    type: string;
                    description: string;
                    deprecationMessage: string;
                };
            };
            anyOf?: undefined;
        } | {
            anyOf: ({
                required: string[];
                properties: {
                    key: {
                        $ref: string;
                    };
                    keybinding?: undefined;
                };
            } | {
                required: string[];
                properties: {
                    keybinding: {
                        $ref: string;
                    };
                    key?: undefined;
                };
            })[];
            required?: undefined;
            properties?: undefined;
        })[];
    };
    allowComments: boolean;
    allowTrailingCommas: boolean;
};
//# sourceMappingURL=keybinding-schema-updater.d.ts.map