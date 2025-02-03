import URI from '@theia/core/lib/common/uri';
export declare const GitResourceOpener: unique symbol;
export interface GitResourceOpener {
    open(changeUri: URI): Promise<void>;
}
//# sourceMappingURL=git-resource-opener.d.ts.map