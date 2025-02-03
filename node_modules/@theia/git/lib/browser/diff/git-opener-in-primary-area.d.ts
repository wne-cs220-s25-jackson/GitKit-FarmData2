import { EditorManager } from '@theia/editor/lib/browser/editor-manager';
import { GitResourceOpener } from './git-resource-opener';
import URI from '@theia/core/lib/common/uri';
export declare class GitOpenerInPrimaryArea implements GitResourceOpener {
    protected readonly editorManager: EditorManager;
    open(changeUri: URI): Promise<void>;
}
//# sourceMappingURL=git-opener-in-primary-area.d.ts.map