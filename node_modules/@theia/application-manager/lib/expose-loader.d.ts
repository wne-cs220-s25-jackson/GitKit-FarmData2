import type { RawSourceMap } from 'source-map';
/**
 * Expose bundled modules on window.theia.moduleName namespace, e.g.
 * window['theia']['@theia/core/lib/common/uri'].
 * Such syntax can be used by external code, for instance, for testing.
 */
declare const _default: (this: any, source: string, sourceMap?: RawSourceMap) => string | undefined;
export = _default;
//# sourceMappingURL=expose-loader.d.ts.map