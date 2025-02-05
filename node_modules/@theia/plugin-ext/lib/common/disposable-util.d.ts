export interface Disposable {
    dispose(): void;
}
export declare function dispose<T extends Disposable>(disposable: T): T | undefined;
export declare function dispose<T extends Disposable>(...disposables: T[]): T[] | undefined;
export declare function dispose<T extends Disposable>(disposables: T[]): T[] | undefined;
//# sourceMappingURL=disposable-util.d.ts.map