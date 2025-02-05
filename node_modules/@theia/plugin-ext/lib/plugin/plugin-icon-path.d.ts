import { URI } from './types-impl';
import { IconUrl } from '../common/plugin-protocol';
import { Plugin } from '../common/plugin-api-rpc';
export type PluginIconPath = string | URI | {
    light: string | URI;
    dark: string | URI;
};
export declare namespace PluginIconPath {
    function toUrl(iconPath: unknown, plugin: Plugin): IconUrl | undefined;
    function is(item: unknown): item is PluginIconPath;
    function asString(arg: string | URI, plugin: Plugin): string;
}
//# sourceMappingURL=plugin-icon-path.d.ts.map