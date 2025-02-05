/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { Emitter } from '@theia/core/lib/common/event';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { SelectOption } from '@theia/core/lib/browser/widgets/select-component';
import { OutputContribution } from './output-contribution';
import { OutputChannelManager } from './output-channel';
export declare class OutputToolbarContribution implements TabBarToolbarContribution {
    protected readonly outputChannelManager: OutputChannelManager;
    protected readonly outputContribution: OutputContribution;
    protected readonly onOutputWidgetStateChangedEmitter: Emitter<void>;
    protected readonly onOutputWidgetStateChanged: import("@theia/core/lib/common/event").Event<void>;
    protected readonly onChannelsChangedEmitter: Emitter<void>;
    protected readonly onChannelsChanged: import("@theia/core/lib/common/event").Event<void>;
    protected init(): void;
    registerToolbarItems(toolbarRegistry: TabBarToolbarRegistry): void;
    protected readonly NONE = "<no channels>";
    protected readonly OUTPUT_CHANNEL_LIST_ID = "outputChannelList";
    protected renderChannelSelector(): React.ReactNode;
    protected changeChannel: (option: SelectOption) => void;
}
//# sourceMappingURL=output-toolbar-contribution.d.ts.map