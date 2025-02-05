import { ApplicationShell, Tree, TreeDecoration, TreeDecorator } from '@theia/core/lib/browser';
import { FileSystemFrontendContribution } from '@theia/filesystem/lib/browser/filesystem-frontend-contribution';
import { Emitter } from '@theia/core';
export declare class NavigatorDeletedEditorDecorator implements TreeDecorator {
    protected readonly fileSystemContribution: FileSystemFrontendContribution;
    protected readonly shell: ApplicationShell;
    readonly id = "theia-deleted-editor-decorator";
    protected readonly onDidChangeDecorationsEmitter: Emitter<any>;
    readonly onDidChangeDecorations: import("@theia/core").Event<any>;
    protected deletedURIs: Set<string>;
    init(): void;
    decorations(tree: Tree): Map<string, TreeDecoration.Data>;
    protected collectDecorators(tree: Tree): Map<string, TreeDecoration.Data>;
    protected fireDidChangeDecorations(event: (tree: Tree) => Map<string, TreeDecoration.Data>): void;
}
//# sourceMappingURL=navigator-deleted-editor-decorator.d.ts.map