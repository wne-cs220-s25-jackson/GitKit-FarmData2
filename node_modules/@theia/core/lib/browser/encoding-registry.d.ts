import URI from '../common/uri';
import { Disposable } from '../common/disposable';
import { CorePreferences } from './core-preferences';
import { EncodingService as EncodingService } from '../common/encoding-service';
export interface EncodingOverride {
    parent?: URI;
    extension?: string;
    scheme?: string;
    encoding: string;
}
export declare class EncodingRegistry {
    protected readonly encodingOverrides: EncodingOverride[];
    protected readonly preferences: CorePreferences;
    protected readonly encodingService: EncodingService;
    registerOverride(override: EncodingOverride): Disposable;
    getEncodingForResource(resource: URI, preferredEncoding?: string): string;
    protected getEncodingOverride(resource: URI): string | undefined;
}
//# sourceMappingURL=encoding-registry.d.ts.map