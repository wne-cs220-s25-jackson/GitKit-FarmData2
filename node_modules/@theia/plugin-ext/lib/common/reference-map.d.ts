export declare class ReferenceMap<T> {
    private readonly _references;
    private _idPool;
    createReferenceId(value: T): number;
    disposeReferenceId(referenceId: number): T | undefined;
    get(referenceId: number): T | undefined;
}
//# sourceMappingURL=reference-map.d.ts.map