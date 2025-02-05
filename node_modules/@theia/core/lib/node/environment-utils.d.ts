/// <reference types="node" />
export declare class EnvironmentUtils {
    /**
     * Merge a given record of environment variables with the process environment variables.
     * Empty string values will not be included in the final env.
     * @param env desired environment to merge with `process.env`.
     * @returns a normalized merged record of valid environment variables.
     */
    mergeProcessEnv(env?: Record<string, string | null>): Record<string, string>;
    /**
     * Normalize an environment record for a given OS.
     *
     * On Windows it will uppercase all keys.
     *
     * @param env Environment variables map to normalize.
     * @param platform Platform to normalize for.
     * @returns New object with normalized environment variables.
     */
    normalizeEnv<T>(env: Record<string, T>): Record<string, T>;
    protected getPlatform(): NodeJS.Platform;
}
//# sourceMappingURL=environment-utils.d.ts.map