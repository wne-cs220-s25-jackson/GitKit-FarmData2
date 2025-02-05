import { Emitter, Event, ResourceProvider } from '@theia/core';
import { DirtyDiffDecorator, DirtyDiffUpdate } from '../dirty-diff/dirty-diff-decorator';
import { EditorManager, TextEditor } from '@theia/editor/lib/browser';
import { ScmService } from '../scm-service';
export declare class ScmDecorationsService {
    protected readonly decorator: DirtyDiffDecorator;
    protected readonly scmService: ScmService;
    protected readonly editorManager: EditorManager;
    protected readonly resourceProvider: ResourceProvider;
    private readonly diffComputer;
    protected readonly onDirtyDiffUpdateEmitter: Emitter<DirtyDiffUpdate>;
    readonly onDirtyDiffUpdate: Event<DirtyDiffUpdate>;
    constructor(decorator: DirtyDiffDecorator, scmService: ScmService, editorManager: EditorManager, resourceProvider: ResourceProvider);
    applyEditorDecorations(editor: TextEditor): Promise<void>;
    protected supportsDirtyDiff(editor: TextEditor): boolean;
    protected createUpdateTask(editor: TextEditor): {
        (): void;
        cancel(): void;
    };
}
//# sourceMappingURL=scm-decorations-service.d.ts.map