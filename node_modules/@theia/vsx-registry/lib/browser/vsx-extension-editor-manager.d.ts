import URI from '@theia/core/lib/common/uri';
import { WidgetOpenHandler } from '@theia/core/lib/browser';
import { VSXExtensionOptions } from './vsx-extension';
import { VSXExtensionEditor } from './vsx-extension-editor';
export declare class VSXExtensionEditorManager extends WidgetOpenHandler<VSXExtensionEditor> {
    readonly id: string;
    canHandle(uri: URI): number;
    protected createWidgetOptions(uri: URI): VSXExtensionOptions;
}
//# sourceMappingURL=vsx-extension-editor-manager.d.ts.map