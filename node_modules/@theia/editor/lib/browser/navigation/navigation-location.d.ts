import URI from '@theia/core/lib/common/uri';
import { Position, Range, TextDocumentContentChangeDelta } from '../editor';
export { Position, Range };
export declare namespace NavigationLocation {
    /**
     * The navigation location type.
     */
    enum Type {
        /**
         * Cursor position change type.
         */
        CURSOR = 0,
        /**
         * Text selection change type.
         */
        SELECTION = 1,
        /**
         * Content change type.
         */
        CONTENT_CHANGE = 2
    }
    /**
     * The type of the context for the navigation location.
     */
    type Context = Position | Range | TextDocumentContentChangeDelta;
    namespace Context {
        /**
         * Returns with the type for the context.
         */
        function getType(context: Context): Type;
    }
}
/**
 * Representation of a navigation location in a text editor.
 */
export interface NavigationLocation {
    /**
     * The URI of the resource opened in the editor.
     */
    readonly uri: URI;
    /**
     * The type of the navigation location.
     */
    readonly type: NavigationLocation.Type;
    /**
     * Context of the navigation location.
     */
    readonly context: NavigationLocation.Context;
}
export declare namespace NavigationLocation {
    /**
     * Transforms the location into an object that can be safely serialized.
     */
    function toObject(location: NavigationLocation): object;
    /**
     * Returns with the navigation location object from its serialized counterpart.
     */
    function fromObject(object: Partial<NavigationLocation>): NavigationLocation | undefined;
    /**
     * Returns with the context of the location as a `Range`.
     */
    function range(location: NavigationLocation): Range;
    /**
     * Creates a new cursor location.
     */
    function create(uri: URI | {
        uri: URI;
    } | string, context: Position): CursorLocation;
    /**
     * Creates a new selection location.
     */
    function create(uri: URI | {
        uri: URI;
    } | string, context: Range): SelectionLocation;
    /**
     * Creates a new text content change location type.
     */
    function create(uri: URI | {
        uri: URI;
    } | string, context: TextDocumentContentChangeDelta): ContentChangeLocation;
    /**
     * Returns with the human-consumable (JSON) string representation of the location argument.
     */
    function toString(location: NavigationLocation): string;
}
/**
 * Representation of a closed editor.
 */
export interface RecentlyClosedEditor {
    /**
     * The uri of the closed editor.
     */
    readonly uri: URI;
    /**
     * The serializable view state of the closed editor.
     */
    readonly viewState: object;
}
export declare namespace RecentlyClosedEditor {
    /**
     * Transform a RecentlyClosedEditor into an object for storing.
     *
     * @param closedEditor the editor needs to be transformed.
     */
    function toObject(closedEditor: RecentlyClosedEditor): object;
    /**
     * Transform the given object to a RecentlyClosedEditor object if possible.
     */
    function fromObject(object: Partial<RecentlyClosedEditor>): RecentlyClosedEditor | undefined;
}
/**
 * Navigation location representing the cursor location change.
 */
export interface CursorLocation extends NavigationLocation {
    /**
     * The type is always `cursor`.
     */
    readonly type: NavigationLocation.Type.CURSOR;
    /**
     * The context for the location, that is always a position.
     */
    readonly context: Position;
}
export declare namespace CursorLocation {
    /**
     * `true` if the argument is a cursor location. Otherwise, `false`.
     */
    function is(location: NavigationLocation): location is CursorLocation;
    /**
     * Returns with the serialized format of the position argument.
     */
    function toObject(context: Position): object;
    /**
     * Returns with the position from its serializable counterpart, or `undefined`.
     */
    function fromObject(object: Partial<Position>): Position | undefined;
}
/**
 * Representation of a selection location.
 */
export interface SelectionLocation extends NavigationLocation {
    /**
     * The `selection` type.
     */
    readonly type: NavigationLocation.Type.SELECTION;
    /**
     * The context of the selection; a range.
     */
    readonly context: Range;
}
export declare namespace SelectionLocation {
    /**
     * `true` if the argument is a selection location.
     */
    function is(location: NavigationLocation): location is SelectionLocation;
    /**
     * Converts the range argument into a serializable object.
     */
    function toObject(context: Range): object;
    /**
     * Creates a range object from its serializable counterpart. Returns with `undefined` if the argument cannot be converted into a range.
     */
    function fromObject(object: Partial<Range>): Range | undefined;
}
/**
 * Content change location type.
 */
export interface ContentChangeLocation extends NavigationLocation {
    /**
     * The type, that is always `content change`.
     */
    readonly type: NavigationLocation.Type.CONTENT_CHANGE;
    /**
     * A text document content change deltas as the context.
     */
    readonly context: TextDocumentContentChangeDelta;
}
export declare namespace ContentChangeLocation {
    /**
     * `true` if the argument is a content change location. Otherwise, `false`.
     */
    function is(location: NavigationLocation): location is ContentChangeLocation;
    /**
     * Returns with a serializable object representing the arguments.
     */
    function toObject(context: TextDocumentContentChangeDelta): object;
    /**
     * Returns with a text document change delta for the argument. `undefined` if the argument cannot be mapped to a content change delta.
     */
    function fromObject(object: Partial<TextDocumentContentChangeDelta>): TextDocumentContentChangeDelta | undefined;
}
//# sourceMappingURL=navigation-location.d.ts.map