import { CancellationToken, Command, Disposable, Emitter, Event, URI } from '@theia/core';
import { CellStatusbarAlignment } from '../../common';
import { ThemeColor } from '@theia/core/lib/common/theme';
import { AccessibilityInformation } from '@theia/core/lib/common/accessibility';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering';
export interface NotebookCellStatusBarItem {
    readonly alignment: CellStatusbarAlignment;
    readonly priority?: number;
    readonly text: string;
    readonly color?: string | ThemeColor;
    readonly backgroundColor?: string | ThemeColor;
    readonly tooltip?: string | MarkdownString;
    readonly command?: string | (Command & {
        arguments?: unknown[];
    });
    readonly accessibilityInformation?: AccessibilityInformation;
    readonly opacity?: string;
    readonly onlyShowWhenActive?: boolean;
}
export interface NotebookCellStatusBarItemList {
    items: NotebookCellStatusBarItem[];
    dispose?(): void;
}
export interface NotebookCellStatusBarItemProvider {
    viewType: string;
    onDidChangeStatusBarItems?: Event<void>;
    provideCellStatusBarItems(uri: URI, index: number, token: CancellationToken): Promise<NotebookCellStatusBarItemList | undefined>;
}
export declare class NotebookCellStatusBarService implements Disposable {
    protected readonly onDidChangeProvidersEmitter: Emitter<void>;
    readonly onDidChangeProviders: Event<void>;
    protected readonly onDidChangeItemsEmitter: Emitter<void>;
    readonly onDidChangeItems: Event<void>;
    protected readonly providers: NotebookCellStatusBarItemProvider[];
    registerCellStatusBarItemProvider(provider: NotebookCellStatusBarItemProvider): Disposable;
    getStatusBarItemsForCell(notebookUri: URI, cellIndex: number, viewType: string, token: CancellationToken): Promise<NotebookCellStatusBarItemList[]>;
    dispose(): void;
}
//# sourceMappingURL=notebook-cell-status-bar-service.d.ts.map