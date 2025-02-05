import { Resource } from '@theia/core/lib/common/resource';
import { MonacoEditorModel } from '@theia/monaco/lib/browser/monaco-editor-model';
import { MonacoEditorModelFactory } from '@theia/monaco/lib/browser/monaco-text-model-service';
import { MonacoToProtocolConverter } from '@theia/monaco/lib/browser/monaco-to-protocol-converter';
import { ProtocolToMonacoConverter } from '@theia/monaco/lib/browser/protocol-to-monaco-converter';
export declare class OutputEditorModelFactory implements MonacoEditorModelFactory {
    protected readonly m2p: MonacoToProtocolConverter;
    protected readonly p2m: ProtocolToMonacoConverter;
    readonly scheme: string;
    createModel(resource: Resource): MonacoEditorModel;
}
export declare class OutputEditorModel extends MonacoEditorModel {
    get readOnly(): boolean;
    protected setDirty(dirty: boolean): void;
}
//# sourceMappingURL=output-editor-model-factory.d.ts.map