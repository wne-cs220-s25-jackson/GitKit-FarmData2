import { EditorManager, EditorOpenerOptions, EditorWidget } from '@theia/editor/lib/browser';
import { EditorPreviewPreferences } from './editor-preview-preferences';
import { MaybePromise } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { EditorPreviewOptions } from './editor-preview-widget-factory';
import { EditorPreviewWidget } from './editor-preview-widget';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
export declare class EditorPreviewManager extends EditorManager {
    readonly id: string;
    protected readonly preferences: EditorPreviewPreferences;
    protected readonly stateService: FrontendApplicationStateService;
    /**
     * Until the layout has been restored, widget state is not reliable, so we ignore creation events.
     */
    protected layoutIsSet: boolean;
    protected init(): void;
    protected doOpen(widget: EditorPreviewWidget, options?: EditorOpenerOptions): Promise<void>;
    protected handleNewPreview(newPreviewWidget: EditorPreviewWidget): void;
    protected tryGetPendingWidget(uri: URI, options?: EditorOpenerOptions): MaybePromise<EditorWidget> | undefined;
    protected getWidget(uri: URI, options?: EditorOpenerOptions): Promise<EditorWidget | undefined>;
    protected getOrCreateWidget(uri: URI, options?: EditorOpenerOptions): Promise<EditorWidget>;
    protected createWidgetOptions(uri: URI, options?: EditorOpenerOptions): EditorPreviewOptions;
    protected convertEditorOnDoubleClick(event: Event): void;
}
//# sourceMappingURL=editor-preview-manager.d.ts.map