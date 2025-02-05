import { WebviewWidgetFactory } from '../../browser/webview/webview-widget-factory';
import { WebviewWidgetIdentifier, WebviewWidget } from '../../browser/webview/webview';
import { CustomEditorWidgetFactory } from '../../browser/custom-editors/custom-editor-widget-factory';
import { CustomEditorWidget } from '../../browser/custom-editors/custom-editor-widget';
import '@theia/core/lib/electron-common/electron-api';
export declare class ElectronWebviewWidgetFactory extends WebviewWidgetFactory {
    createWidget(identifier: WebviewWidgetIdentifier): Promise<WebviewWidget>;
    /**
     * Attach the ElectronSecurityToken to a cookie that will be sent with each webview request.
     *
     * @param endpoint cookie's target url
     */
    protected attachElectronSecurityCookie(endpoint: string): Promise<void>;
}
export declare class ElectronCustomEditorWidgetFactory extends CustomEditorWidgetFactory {
    createWidget(identifier: WebviewWidgetIdentifier): Promise<CustomEditorWidget>;
    /**
     * Attach the ElectronSecurityToken to a cookie that will be sent with each webview request.
     *
     * @param endpoint cookie's target url
     */
    protected attachElectronSecurityCookie(endpoint: string): Promise<void>;
}
//# sourceMappingURL=electron-webview-widget-factory.d.ts.map