import { VariableRegistry, VariableContribution } from '@theia/variable-resolver/lib/browser';
import { TextEditor } from './editor';
import { EditorManager } from './editor-manager';
export declare class EditorVariableContribution implements VariableContribution {
    protected readonly editorManager: EditorManager;
    registerVariables(variables: VariableRegistry): void;
    protected getCurrentEditor(): TextEditor | undefined;
}
//# sourceMappingURL=editor-variable-contribution.d.ts.map