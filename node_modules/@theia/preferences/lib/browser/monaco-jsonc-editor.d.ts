import * as jsoncparser from 'jsonc-parser';
import { MonacoEditorModel } from '@theia/monaco/lib/browser/monaco-editor-model';
import { MonacoWorkspace } from '@theia/monaco/lib/browser/monaco-workspace';
import * as monaco from '@theia/monaco-editor-core';
export declare class MonacoJSONCEditor {
    protected readonly workspace: MonacoWorkspace;
    setValue(model: MonacoEditorModel, path: jsoncparser.JSONPath, value: unknown, shouldSave?: boolean): Promise<void>;
    getEditOperations(model: MonacoEditorModel, path: jsoncparser.JSONPath, value: unknown): monaco.editor.IIdentifiedSingleEditOperation[];
}
//# sourceMappingURL=monaco-jsonc-editor.d.ts.map