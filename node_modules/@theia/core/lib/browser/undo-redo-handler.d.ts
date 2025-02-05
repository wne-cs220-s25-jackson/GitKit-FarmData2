import { ContributionProvider } from '../common';
export declare const UndoRedoHandler: unique symbol;
export interface UndoRedoHandler<T> {
    priority: number;
    select(): T | undefined;
    undo(item: T): void;
    redo(item: T): void;
}
export declare class UndoRedoHandlerService {
    protected readonly provider: ContributionProvider<UndoRedoHandler<unknown>>;
    protected handlers: UndoRedoHandler<unknown>[];
    protected init(): void;
    undo(): void;
    redo(): void;
}
export declare class DomInputUndoRedoHandler implements UndoRedoHandler<Element> {
    priority: number;
    select(): Element | undefined;
    undo(item: Element): void;
    redo(item: Element): void;
}
//# sourceMappingURL=undo-redo-handler.d.ts.map