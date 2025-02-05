import { CancellationToken, Event } from '@theia/core/lib/common';
import { WebviewWidget } from '../webview/webview';
export interface WebviewView {
    title?: string;
    description?: string;
    badge?: number | undefined;
    badgeTooltip?: string | undefined;
    readonly webview: WebviewWidget;
    readonly onDidChangeVisibility: Event<boolean>;
    readonly onDidDispose: Event<void>;
    readonly onDidChangeBadge: Event<void>;
    readonly onDidChangeBadgeTooltip: Event<void>;
    dispose(): void;
    show(preserveFocus: boolean): void;
    resolve(): Promise<void>;
}
export interface WebviewViewResolver {
    resolve(webviewView: WebviewView, cancellation: CancellationToken): Promise<void>;
}
//# sourceMappingURL=webview-views.d.ts.map