import { Widget } from '@theia/core/shared/@phosphor/widgets';
import { EditorManager } from '@theia/editor/lib/browser/editor-manager';
import { GitResourceOpener } from '../diff/git-resource-opener';
import URI from '@theia/core/lib/common/uri';
export declare class GitOpenerInSecondaryArea implements GitResourceOpener {
    protected readonly editorManager: EditorManager;
    protected refWidget: Widget;
    setRefWidget(refWidget: Widget): void;
    protected ref: Widget | undefined;
    open(changeUri: URI): Promise<void>;
}
//# sourceMappingURL=git-opener-in-secondary-area.d.ts.map