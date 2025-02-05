import { Widget } from './widget';
/**
 * A contract for widgets that are extractable to a secondary window.
 */
export interface ExtractableWidget extends Widget {
    /** Set to `true` to mark the widget to be extractable. */
    isExtractable: boolean;
    /** The secondary window that the window was extracted to or `undefined` if it is not yet extracted. */
    secondaryWindow: Window | undefined;
}
export declare namespace ExtractableWidget {
    function is(widget: unknown): widget is ExtractableWidget;
}
//# sourceMappingURL=extractable-widget.d.ts.map