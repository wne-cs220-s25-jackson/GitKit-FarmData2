import { CustomEditorWidget } from '../custom-editors/custom-editor-widget';
import { interfaces } from '@theia/core/shared/inversify';
import { WebviewWidgetIdentifier } from '../webview/webview';
export declare class CustomEditorWidgetFactory {
    readonly id: string;
    protected readonly container: interfaces.Container;
    constructor(container: interfaces.Container);
    createWidget(identifier: WebviewWidgetIdentifier): Promise<CustomEditorWidget>;
}
//# sourceMappingURL=custom-editor-widget-factory.d.ts.map