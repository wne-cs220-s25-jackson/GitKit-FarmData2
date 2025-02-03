/**
 * Converts the given standard name to a variable name starting with '$' if not already present.
 *
 * Variable names are used, for instance, to reference problem matchers, within task configurations.
 *
 * @param name standard name
 * @returns variable name with leading '$' if not already present.
 *
 * @see {@link fromVariableName} for the reverse conversion.
 */
export declare function asVariableName(name: string): string;
/**
 * Converts a given variable name to a standard name, effectively removing a leading '$' if present.
 *
 * Standard names are used, for instance, in registries to store variable objects
 *
 * @param name variable name
 * @returns variable name without leading '$' if present.
 *
 * @see {@link asVariableName} for the reverse conversion.
 */
export declare function fromVariableName(name: string): string;
//# sourceMappingURL=task-util.d.ts.map