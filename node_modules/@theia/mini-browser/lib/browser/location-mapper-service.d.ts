import { MaybePromise } from '@theia/core/lib/common/types';
import { ContributionProvider } from '@theia/core/lib/common/contribution-provider';
import { MiniBrowserEnvironment } from './environment/mini-browser-environment';
/**
 * Contribution for the `LocationMapperService`.
 */
export declare const LocationMapper: unique symbol;
export interface LocationMapper {
    /**
     * Should return with a positive number if the current contribution can handle the given location.
     * The number indicates the priority of the location mapper. If it is not a positive number, it means, the
     * contribution cannot handle the location.
     */
    canHandle(location: string): MaybePromise<number>;
    /**
     * Maps the given location.
     */
    map(location: string): MaybePromise<string>;
}
/**
 * Location mapper service.
 */
export declare class LocationMapperService {
    protected readonly contributions: ContributionProvider<LocationMapper>;
    map(location: string): Promise<string>;
    protected defaultMapper(): (location: string) => MaybePromise<string>;
    protected prioritize(location: string): Promise<LocationMapper[]>;
    protected getContributions(): LocationMapper[];
}
/**
 * HTTP location mapper.
 */
export declare class HttpLocationMapper implements LocationMapper {
    canHandle(location: string): MaybePromise<number>;
    map(location: string): MaybePromise<string>;
}
/**
 * HTTPS location mapper.
 */
export declare class HttpsLocationMapper implements LocationMapper {
    canHandle(location: string): MaybePromise<number>;
    map(location: string): MaybePromise<string>;
}
/**
 * Location mapper for locations without a scheme.
 */
export declare class LocationWithoutSchemeMapper implements LocationMapper {
    canHandle(location: string): MaybePromise<number>;
    map(location: string): MaybePromise<string>;
}
/**
 * `file` URI location mapper.
 */
export declare class FileLocationMapper implements LocationMapper {
    protected miniBrowserEnvironment: MiniBrowserEnvironment;
    canHandle(location: string): MaybePromise<number>;
    map(location: string): Promise<string>;
}
//# sourceMappingURL=location-mapper-service.d.ts.map