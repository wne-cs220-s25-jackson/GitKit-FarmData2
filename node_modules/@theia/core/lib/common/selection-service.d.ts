import { Emitter, Event } from '../common/event';
/**
 * `SelectionProvider` is implemented by services to notify listeners about selection changes.
 */
export interface SelectionProvider<T> {
    onSelectionChanged: Event<T | undefined>;
}
/**
 * Singleton service that is used to share the current selection globally in a Theia application.
 * On each change of selection, subscribers are notified and receive the updated selection object.
 */
export declare class SelectionService implements SelectionProvider<Object | undefined> {
    private currentSelection;
    protected readonly onSelectionChangedEmitter: Emitter<any>;
    readonly onSelectionChanged: Event<any>;
    get selection(): Object | undefined;
    set selection(selection: Object | undefined);
}
//# sourceMappingURL=selection-service.d.ts.map