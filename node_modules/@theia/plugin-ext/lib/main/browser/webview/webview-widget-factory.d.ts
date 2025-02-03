import { interfaces } from '@theia/core/shared/inversify';
import { WebviewWidget, WebviewWidgetIdentifier } from './webview';
export declare class WebviewWidgetFactory {
    readonly id: string;
    protected readonly container: interfaces.Container;
    constructor(container: interfaces.Container);
    createWidget(identifier: WebviewWidgetIdentifier): Promise<WebviewWidget>;
}
//# sourceMappingURL=webview-widget-factory.d.ts.map