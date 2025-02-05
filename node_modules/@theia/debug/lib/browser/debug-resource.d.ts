import { Resource, ResourceResolver } from '@theia/core';
import URI from '@theia/core/lib/common/uri';
import { DebugSessionManager } from './debug-session-manager';
export declare class DebugResource implements Resource {
    uri: URI;
    protected readonly manager: DebugSessionManager;
    constructor(uri: URI, manager: DebugSessionManager);
    dispose(): void;
    readContents(): Promise<string>;
}
export declare class DebugResourceResolver implements ResourceResolver {
    protected readonly manager: DebugSessionManager;
    resolve(uri: URI): DebugResource;
}
//# sourceMappingURL=debug-resource.d.ts.map