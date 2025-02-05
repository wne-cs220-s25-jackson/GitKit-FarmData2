import { CancellationToken, URI } from '@theia/core/lib/common';
import { Disposable } from '@theia/core/shared/vscode-languageserver-protocol';
export interface CanonicalUriProvider extends Disposable {
    provideCanonicalUri(uri: URI, targetScheme: string, token: CancellationToken): Promise<URI | undefined>;
}
export declare class CanonicalUriService {
    private providers;
    registerCanonicalUriProvider(scheme: string, provider: CanonicalUriProvider): Disposable;
    private removeCanonicalUriProvider;
    provideCanonicalUri(uri: URI, targetScheme: string, token?: CancellationToken): Promise<URI | undefined>;
}
//# sourceMappingURL=canonical-uri-service.d.ts.map