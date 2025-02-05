import { TextEditor } from './editor';
export interface DiffNavigator {
    hasNext(): boolean;
    hasPrevious(): boolean;
    next(): void;
    previous(): void;
}
export declare const DiffNavigatorProvider: unique symbol;
export type DiffNavigatorProvider = (editor: TextEditor) => DiffNavigator;
//# sourceMappingURL=diff-navigator.d.ts.map