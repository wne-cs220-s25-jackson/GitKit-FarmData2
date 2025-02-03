/// <reference types="node" />
export declare function dynamicRequire<T = any>(id: string): T;
/**
 * Remove all references to a module from Node's module cache.
 * @param filter callback to filter modules from the cache: return `true` to remove the module from the cache.
 */
export declare function removeFromCache(filter: (mod: NodeJS.Module) => boolean): void;
//# sourceMappingURL=dynamic-require.d.ts.map