import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import URI from '@theia/core/lib/common/uri';
export declare class PluginTheiaEnvironment {
    protected readonly environments: EnvVariablesServer;
    protected _pluginsDirUri: URI | undefined;
    getPluginsDirUri(): Promise<URI>;
}
//# sourceMappingURL=plugin-theia-environment.d.ts.map