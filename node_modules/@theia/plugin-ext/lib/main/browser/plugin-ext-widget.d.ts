/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { Message } from '@theia/core/shared/@phosphor/messaging';
import { PluginMetadata } from '../../common/plugin-protocol';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { HostedPluginSupport } from '../../hosted/browser/hosted-plugin';
import { ProgressBarFactory } from '@theia/core/lib/browser/progress-bar-factory';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
export declare const PLUGINS_LABEL: string;
export declare class PluginWidget extends ReactWidget {
    protected readonly pluginService: HostedPluginSupport;
    protected readonly progressBarFactory: ProgressBarFactory;
    constructor();
    protected init(): void;
    protected onActivateRequest(msg: Message): void;
    protected readonly toDisposeProgress: DisposableCollection;
    protected render(): React.ReactNode;
    protected doRender(): React.ReactNode;
    protected renderPlugins(plugins: PluginMetadata[]): React.ReactNode;
    private renderPlugin;
    protected createPluginClassName(plugin: PluginMetadata): string;
    /**
     * Compare two plugins based on their names, and publishers.
     * @param a the first plugin metadata.
     * @param b the second plugin metadata.
     */
    protected compareMetadata(a: PluginMetadata, b: PluginMetadata): number;
}
//# sourceMappingURL=plugin-ext-widget.d.ts.map