export interface PreviewableWidget {
    loaded?: boolean;
    getPreviewNode(): Node | undefined;
}
export declare namespace PreviewableWidget {
    function is(arg: unknown): arg is PreviewableWidget;
    function isPreviewable(arg: unknown): arg is PreviewableWidget;
}
//# sourceMappingURL=previewable-widget.d.ts.map