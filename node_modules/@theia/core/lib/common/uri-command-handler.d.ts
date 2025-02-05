import { SelectionService } from '../common/selection-service';
import { CommandHandler } from './command';
import URI from './uri';
import { MaybeArray } from './types';
export interface UriCommandHandler<T extends MaybeArray<URI>> extends CommandHandler {
    execute(uri: T, ...args: any[]): any;
    isEnabled?(uri: T, ...args: any[]): boolean;
    isVisible?(uri: T, ...args: any[]): boolean;
}
/**
 * Handler for a single URI-based selection.
 */
export interface SingleUriCommandHandler extends UriCommandHandler<URI> {
}
/**
 * Handler for multiple URIs.
 */
export interface MultiUriCommandHandler extends UriCommandHandler<URI[]> {
}
export declare class UriAwareCommandHandler<T extends MaybeArray<URI>> implements UriCommandHandler<T> {
    protected readonly selectionService: SelectionService;
    protected readonly handler: UriCommandHandler<T>;
    protected readonly options?: UriAwareCommandHandler.Options | undefined;
    /**
     * @deprecated since 1.6.0. Please use `UriAwareCommandHandler.MonoSelect` or `UriAwareCommandHandler.MultiSelect`.
     */
    constructor(selectionService: SelectionService, handler: UriCommandHandler<T>, options?: UriAwareCommandHandler.Options | undefined);
    protected getUri(...args: any[]): T | undefined;
    protected getArgsWithUri(...args: any[]): [T | undefined, ...any[]];
    execute(...args: any[]): object | undefined;
    isVisible(...args: any[]): boolean;
    isEnabled(...args: any[]): boolean;
    protected isMulti(): boolean | undefined;
}
export declare namespace UriAwareCommandHandler {
    /**
     * Further options for the URI aware command handler instantiation.
     */
    interface Options {
        /**
         * `true` if the handler supports multiple selection. Otherwise, `false`. Defaults to `false`.
         */
        readonly multi?: boolean;
    }
    /**
     * @returns a command handler for mono-select contexts that expects a `URI` as the first parameter of its methods.
     */
    function MonoSelect(selectionService: SelectionService, handler: UriCommandHandler<URI>): UriAwareCommandHandler<URI>;
    /**
     * @returns a command handler for multi-select contexts that expects a `URI[]` as the first parameter of its methods.
     */
    function MultiSelect(selectionService: SelectionService, handler: UriCommandHandler<URI[]>): UriAwareCommandHandler<URI[]>;
}
//# sourceMappingURL=uri-command-handler.d.ts.map