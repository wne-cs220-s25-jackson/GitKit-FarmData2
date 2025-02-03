import { VariableRegistry } from './variable';
import URI from '@theia/core/lib/common/uri';
import { CommandIdVariables } from '../common/variable-types';
export interface VariableResolveOptions {
    context?: URI;
    /**
     * Used for resolving inputs, see https://code.visualstudio.com/docs/editor/variables-reference#_input-variables
     */
    configurationSection?: string;
    commandIdVariables?: CommandIdVariables;
    configuration?: unknown;
}
/**
 * The variable resolver service should be used to resolve variables in strings.
 */
export declare class VariableResolverService {
    protected static VAR_REGEXP: RegExp;
    protected readonly variableRegistry: VariableRegistry;
    /**
     * Resolve the variables in the given string array.
     * @param value The array of data to resolve variables in.
     * @param options Options of the variable resolution.
     * @returns Promise to array with variables resolved. Never rejects.
     *
     * @deprecated since 1.28.0 use {@link resolve} instead.
     */
    resolveArray(value: string[], options?: VariableResolveOptions): Promise<string[] | undefined>;
    /**
     * Resolve the variables for all strings found in the object and nested objects.
     * @param value Data to resolve variables in.
     * @param options Options of the variable resolution
     * @returns Promise to object with variables resolved. Returns `undefined` if a variable resolution was cancelled.
     */
    resolve<T>(value: T, options?: VariableResolveOptions): Promise<T | undefined>;
    protected doResolve(value: any, context: VariableResolverService.Context): Promise<any>;
    protected doResolveObject(obj: object, context: VariableResolverService.Context): Promise<object>;
    protected doResolveArray(values: Array<Object | undefined>, context: VariableResolverService.Context): Promise<Array<Object | undefined>>;
    protected doResolveString(value: string, context: VariableResolverService.Context): Promise<string>;
    protected resolveVariables(value: string, context: VariableResolverService.Context): Promise<void>;
}
export declare namespace VariableResolverService {
    class Context {
        protected readonly variableRegistry: VariableRegistry;
        protected readonly options: VariableResolveOptions;
        protected readonly resolved: Map<string, string | undefined>;
        constructor(variableRegistry: VariableRegistry, options: VariableResolveOptions);
        get(name: string): string | undefined;
        resolve(name: string): Promise<void>;
    }
}
//# sourceMappingURL=variable-resolver-service.d.ts.map