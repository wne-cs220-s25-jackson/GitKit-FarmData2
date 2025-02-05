import { URI, MaybeArray } from '../common';
import { Widget, BaseWidget } from './widgets';
/**
 * `Navigatable` provides an access to an URI of an underlying instance of `Resource`.
 */
export interface Navigatable {
    /**
     * Return an underlying resource URI.
     */
    getResourceUri(): URI | undefined;
    /**
     * Creates a new URI to which this navigatable should moved based on the given target resource URI.
     */
    createMoveToUri(resourceUri: URI): URI | undefined;
}
export declare namespace Navigatable {
    function is(arg: unknown): arg is Navigatable;
}
export type NavigatableWidget = BaseWidget & Navigatable;
export declare namespace NavigatableWidget {
    function is(arg: unknown): arg is NavigatableWidget;
    function getAffected<T extends Widget>(widgets: Iterable<T>, context: MaybeArray<URI>): IterableIterator<[URI, T & NavigatableWidget]>;
    function get<T extends Widget>(widgets: Iterable<T>, filter?: (resourceUri: URI) => boolean): IterableIterator<[URI, T & NavigatableWidget]>;
    function getUri(widget?: Widget): URI | undefined;
}
export interface NavigatableWidgetOptions {
    kind: 'navigatable';
    uri: string;
    counter?: number;
}
export declare namespace NavigatableWidgetOptions {
    function is(arg: unknown): arg is NavigatableWidgetOptions;
}
//# sourceMappingURL=navigatable-types.d.ts.map