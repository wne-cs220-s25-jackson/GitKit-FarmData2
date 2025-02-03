import URI from '@theia/core/lib/common/uri';
export interface LocationService {
    location: URI | undefined;
    drives(): Promise<URI[]>;
}
//# sourceMappingURL=location-service.d.ts.map