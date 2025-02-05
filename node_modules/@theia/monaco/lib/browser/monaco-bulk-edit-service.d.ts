import { MonacoWorkspace } from './monaco-workspace';
import { IBulkEditOptions, IBulkEditPreviewHandler, IBulkEditResult, IBulkEditService, ResourceEdit } from '@theia/monaco-editor-core/esm/vs/editor/browser/services/bulkEditService';
import { IDisposable } from '@theia/monaco-editor-core/esm/vs/base/common/lifecycle';
import { WorkspaceEdit } from '@theia/monaco-editor-core/esm/vs/editor/common/languages';
export declare class MonacoBulkEditService implements IBulkEditService {
    readonly _serviceBrand: undefined;
    protected readonly workspace: MonacoWorkspace;
    private _previewHandler?;
    apply(editsIn: ResourceEdit[] | WorkspaceEdit, options?: IBulkEditOptions): Promise<IBulkEditResult>;
    hasPreviewHandler(): boolean;
    setPreviewHandler(handler: IBulkEditPreviewHandler): IDisposable;
}
//# sourceMappingURL=monaco-bulk-edit-service.d.ts.map