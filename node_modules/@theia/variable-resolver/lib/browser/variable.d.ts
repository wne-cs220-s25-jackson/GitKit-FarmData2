import { Disposable, DisposableCollection, MaybePromise } from '@theia/core';
import URI from '@theia/core/lib/common/uri';
import { CommandIdVariables } from '../common/variable-types';
/**
 * Variable can be used inside of strings using ${variableName} syntax.
 */
export interface Variable {
    /**
     * A unique name of this variable.
     */
    readonly name: string;
    /**
     * A human-readable description of this variable.
     */
    readonly description?: string;
    /**
     * Resolve to a string value of this variable or
     * `undefined` if variable cannot be resolved.
     * Never reject.
     */
    resolve(context?: URI, argument?: string, configurationSection?: string, commandIdVariables?: CommandIdVariables, configuration?: unknown): MaybePromise<any>;
}
export declare const VariableContribution: unique symbol;
/**
 * The variable contribution should be implemented to register custom variables.
 */
export interface VariableContribution {
    registerVariables(variables: VariableRegistry): void;
}
/**
 * The variable registry manages variables.
 */
export declare class VariableRegistry implements Disposable {
    protected readonly variables: Map<string, Variable>;
    protected readonly toDispose: DisposableCollection;
    dispose(): void;
    /**
     * Register the given variable.
     * Do nothing if a variable is already registered for the given variable name.
     */
    registerVariable(variable: Variable): Disposable;
    /**
     * Return all registered variables.
     */
    getVariables(): Variable[];
    /**
     * Get a variable for the given name or `undefined` if none.
     */
    getVariable(name: string): Variable | undefined;
    /**
     * Register an array of variables.
     * Do nothing if a variable is already registered for the given variable name.
     */
    registerVariables(variables: Variable[]): Disposable[];
}
//# sourceMappingURL=variable.d.ts.map