import URI from '@theia/core/lib/common/uri';
export declare class UndoRedoService {
    private readonly editStacks;
    pushElement(resource: URI, undo: () => Promise<void>, redo: () => Promise<void>): void;
    removeElements(resource: URI): void;
    undo(resource: URI): void;
    redo(resource: URI): void;
}
interface StackElement {
    undo(): Promise<void> | void;
    redo(): Promise<void> | void;
}
export declare class ResourceEditStack {
    private past;
    private future;
    constructor();
    pushElement(element: StackElement): void;
    getClosestPastElement(): StackElement | undefined;
    getClosestFutureElement(): StackElement | undefined;
    moveBackward(element: StackElement): void;
    moveForward(element: StackElement): void;
}
export {};
//# sourceMappingURL=undo-redo-service.d.ts.map