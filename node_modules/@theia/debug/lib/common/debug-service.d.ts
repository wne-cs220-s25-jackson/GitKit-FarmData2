import { Channel, Disposable, Event } from '@theia/core';
import { ApplicationError } from '@theia/core/lib/common/application-error';
import { IJSONSchema, IJSONSchemaSnippet } from '@theia/core/lib/common/json-schema';
import { CommandIdVariables } from '@theia/variable-resolver/lib/common/variable-types';
import { DebugConfiguration } from './debug-configuration';
export interface DebuggerDescription {
    type: string;
    label: string;
}
/**
 * The WS endpoint path to the Debug service.
 */
export declare const DebugPath = "/services/debug";
/**
 * DebugService symbol for DI.
 */
export declare const DebugService: unique symbol;
/**
 * This service provides functionality to configure and to start a new debug adapter session.
 * The workflow is the following. If user wants to debug an application and
 * there is no debug configuration associated with the application then
 * the list of available providers is requested to create suitable debug configuration.
 * When configuration is chosen it is possible to alter the configuration
 * by filling in missing values or by adding/changing/removing attributes. For this purpose the
 * #resolveDebugConfiguration method is invoked. After that the debug adapter session will be started.
 */
export interface DebugService extends Disposable {
    onDidChangeDebuggers?: Event<void>;
    /**
     * Finds and returns an array of registered debug types.
     * @returns An array of registered debug types
     */
    debugTypes(): Promise<string[]>;
    getDebuggersForLanguage(language: string): Promise<DebuggerDescription[]>;
    /**
     * Provide debugger contributed variables
     * see "variables" at https://code.visualstudio.com/api/references/contribution-points#contributes.debuggers
     */
    provideDebuggerVariables(debugType: string): Promise<CommandIdVariables>;
    /**
     * Provides the schema attributes.
     * @param debugType The registered debug type
     * @returns An JSON Schema describing the configuration attributes for the given debug type
     */
    getSchemaAttributes(debugType: string): Promise<IJSONSchema[]>;
    getConfigurationSnippets(): Promise<IJSONSchemaSnippet[]>;
    /**
     * Provides initial [debug configuration](#DebugConfiguration).
     * @param debugType The registered debug type
     * @returns An array of [debug configurations](#DebugConfiguration)
     */
    provideDebugConfigurations(debugType: string, workspaceFolderUri: string | undefined): Promise<DebugConfiguration[]>;
    /**
     * @returns A Record of debug configuration provider types and a corresponding dynamic debug configurations array
     */
    provideDynamicDebugConfigurations?(folder?: string): Promise<Record<string, DebugConfiguration[]>>;
    /**
     * Provides a dynamic debug configuration matching the name and the provider debug type
     */
    fetchDynamicDebugConfiguration(name: string, type: string, folder?: string): Promise<DebugConfiguration | undefined>;
    /**
     * Resolves a [debug configuration](#DebugConfiguration) by filling in missing values
     * or by adding/changing/removing attributes before variable substitution.
     * @param debugConfiguration The [debug configuration](#DebugConfiguration) to resolve.
     * @returns The resolved debug configuration, undefined or null.
     */
    resolveDebugConfiguration(config: DebugConfiguration, workspaceFolderUri: string | undefined): Promise<DebugConfiguration | undefined | null>;
    /**
     * Resolves a [debug configuration](#DebugConfiguration) by filling in missing values
     * or by adding/changing/removing attributes with substituted variables.
     * @param debugConfiguration The [debug configuration](#DebugConfiguration) to resolve.
     * @returns The resolved debug configuration, undefined or null.
     */
    resolveDebugConfigurationWithSubstitutedVariables(config: DebugConfiguration, workspaceFolderUri: string | undefined): Promise<DebugConfiguration | undefined | null>;
    /**
     * Creates a new [debug adapter session](#DebugAdapterSession).
     * @param config The resolved [debug configuration](#DebugConfiguration).
     * @param workspaceFolderUri The workspace folder for this sessions or undefined when folderless
     * @returns The identifier of the created [debug adapter session](#DebugAdapterSession).
     */
    createDebugSession(config: DebugConfiguration, workspaceFolderUri: string | undefined): Promise<string>;
    /**
     * Stop a running session for the given session id.
     */
    terminateDebugSession(sessionId: string): Promise<void>;
    /**
     * Event handle to indicate when one or more dynamic debug configuration providers
     * have been registered or unregistered.
     */
    onDidChangeDebugConfigurationProviders: Event<void>;
}
/**
 * The endpoint path to the debug adapter session.
 */
export declare const DebugAdapterPath = "/services/debug-adapter";
export declare namespace DebugError {
    const NotFound: ApplicationError.Constructor<-41000, {
        type: string;
    }>;
}
/**
 * A closeable channel to send debug protocol messages over with error/close handling
 */
export interface DebugChannel {
    send(content: string): void;
    onMessage(cb: (message: string) => void): void;
    onError(cb: (reason: unknown) => void): void;
    onClose(cb: (code: number, reason: string) => void): void;
    close(): void;
}
/**
 * A {@link DebugChannel} wrapper implementation that sends and receives messages to/from an underlying {@link Channel}.
 */
export declare class ForwardingDebugChannel implements DebugChannel {
    private readonly underlyingChannel;
    private onMessageEmitter;
    constructor(underlyingChannel: Channel);
    send(content: string): void;
    onMessage(cb: (message: string) => void): void;
    onError(cb: (reason: unknown) => void): void;
    onClose(cb: (code: number, reason: string) => void): void;
    close(): void;
}
//# sourceMappingURL=debug-service.d.ts.map