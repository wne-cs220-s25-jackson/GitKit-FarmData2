import { TreeDecorator, TreeDecoration } from '@theia/core/lib/browser/tree/tree-decorator';
import { Emitter } from '@theia/core/lib/common/event';
import { Tree } from '@theia/core/lib/browser/tree/tree';
import { ApplicationShell, FrontendApplication, FrontendApplicationContribution, NavigatableWidget, Widget } from '@theia/core/lib/browser';
import { Disposable } from '@theia/core/lib/common';
export declare class EditorPreviewTreeDecorator implements TreeDecorator, FrontendApplicationContribution {
    protected readonly shell: ApplicationShell;
    readonly id = "theia-open-editors-file-decorator";
    protected decorationsMap: Map<string, TreeDecoration.Data>;
    protected readonly decorationsChangedEmitter: Emitter<any>;
    readonly onDidChangeDecorations: import("@theia/core/lib/common").Event<any>;
    protected readonly toDisposeOnDirtyChanged: Map<string, Disposable>;
    protected readonly toDisposeOnPreviewPinned: Map<string, Disposable>;
    onDidInitializeLayout(app: FrontendApplication): void;
    protected registerEditorListeners(widget: Widget): void;
    protected unregisterEditorListeners(widget: Widget): void;
    protected get editorWidgets(): NavigatableWidget[];
    protected fireDidChangeDecorations(event: (tree: Tree) => Map<string, TreeDecoration.Data>): void;
    decorations(tree: Tree): Map<string, TreeDecoration.Data>;
    protected collectDecorators(tree: Tree): Map<string, TreeDecoration.Data>;
}
//# sourceMappingURL=editor-preview-tree-decorator.d.ts.map