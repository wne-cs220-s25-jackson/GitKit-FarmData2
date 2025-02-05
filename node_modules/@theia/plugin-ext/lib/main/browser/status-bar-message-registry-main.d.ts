import { interfaces } from '@theia/core/shared/inversify';
import { Disposable } from '@theia/core/lib/common/disposable';
import * as types from '../../plugin/types-impl';
import { StatusBarMessageRegistryMain } from '../../common/plugin-api-rpc';
import { ColorRegistry } from '@theia/core/lib/browser/color-registry';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering';
export declare class StatusBarMessageRegistryMainImpl implements StatusBarMessageRegistryMain, Disposable {
    private readonly delegate;
    private readonly entries;
    private readonly toDispose;
    protected readonly colorRegistry: ColorRegistry;
    constructor(container: interfaces.Container);
    dispose(): void;
    $setMessage(id: string, name: string | undefined, text: string | undefined, priority: number, alignment: number, color: string | undefined, backgroundColor: string | undefined, tooltip: string | MarkdownString | undefined, command: string | undefined, accessibilityInformation: types.AccessibilityInformation, args: any[] | undefined): Promise<void>;
    $dispose(id: string): void;
}
//# sourceMappingURL=status-bar-message-registry-main.d.ts.map