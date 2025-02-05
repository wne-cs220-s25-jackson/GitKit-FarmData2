import { Event, Emitter } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { Marker } from '../common/marker';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { FileChangesEvent } from '@theia/filesystem/lib/common/files';
export interface SearchFilter<D> {
    uri?: URI;
    owner?: string;
    dataFilter?: (data: D) => boolean;
}
export declare class MarkerCollection<T> {
    readonly uri: URI;
    readonly kind: string;
    protected readonly owner2Markers: Map<string, Readonly<Marker<T>>[]>;
    constructor(uri: URI, kind: string);
    get empty(): boolean;
    getOwners(): string[];
    getMarkers(owner: string): Readonly<Marker<T>>[];
    setMarkers(owner: string, markerData: T[]): Marker<T>[];
    protected createMarker(owner: string, data: T): Readonly<Marker<T>>;
    findMarkers(filter: SearchFilter<T>): Marker<T>[];
    protected filterMarkers(filter: SearchFilter<T>, toFilter?: Marker<T>[]): Marker<T>[];
}
export interface Uri2MarkerEntry {
    uri: string;
    markers: Owner2MarkerEntry[];
}
export interface Owner2MarkerEntry {
    owner: string;
    markerData: object[];
}
export declare abstract class MarkerManager<D extends object> {
    abstract getKind(): string;
    protected readonly uri2MarkerCollection: Map<string, MarkerCollection<D>>;
    protected readonly onDidChangeMarkersEmitter: Emitter<URI>;
    protected readonly fileService: FileService;
    protected init(): void;
    protected cleanMarkers(event: FileChangesEvent): void;
    get onDidChangeMarkers(): Event<URI>;
    protected fireOnDidChangeMarkers(uri: URI): void;
    setMarkers(uri: URI, owner: string, data: D[]): Marker<D>[];
    findMarkers(filter?: SearchFilter<D>): Marker<D>[];
    getMarkersByUri(): IterableIterator<[string, MarkerCollection<D>]>;
    getUris(): IterableIterator<string>;
    cleanAllMarkers(uri?: URI): void;
    protected doCleanAllMarkers(uri: URI): void;
}
//# sourceMappingURL=marker-manager.d.ts.map