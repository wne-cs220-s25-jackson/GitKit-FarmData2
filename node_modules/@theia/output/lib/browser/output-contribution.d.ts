import URI from '@theia/core/lib/common/uri';
import { Widget } from '@theia/core/lib/browser/widgets/widget';
import { MaybePromise } from '@theia/core/lib/common/types';
import { OpenHandler, OpenerOptions, OpenerService } from '@theia/core/lib/browser';
import { CommandRegistry, MenuModelRegistry, CommandService } from '@theia/core/lib/common';
import { AbstractViewContribution } from '@theia/core/lib/browser/shell/view-contribution';
import { OutputWidget } from './output-widget';
import { ClipboardService } from '@theia/core/lib/browser/clipboard-service';
import { OutputChannelManager, OutputChannel } from './output-channel';
import { QuickPickService } from '@theia/core/lib/common/quick-pick-service';
export declare class OutputContribution extends AbstractViewContribution<OutputWidget> implements OpenHandler {
    protected readonly clipboardService: ClipboardService;
    protected readonly commandService: CommandService;
    protected readonly outputChannelManager: OutputChannelManager;
    protected readonly openerService: OpenerService;
    protected readonly quickPickService: QuickPickService;
    readonly id: string;
    constructor();
    protected init(): void;
    registerCommands(registry: CommandRegistry): void;
    registerMenus(registry: MenuModelRegistry): void;
    canHandle(uri: URI): MaybePromise<number>;
    open(uri: URI, options?: OpenerOptions): Promise<OutputWidget>;
    protected withWidget(widget?: Widget | undefined, predicate?: (output: OutputWidget) => boolean): boolean | false;
    protected pick({ channels, placeholder }: {
        channels: OutputChannel[];
        placeholder: string;
    }): Promise<OutputChannel | undefined>;
}
//# sourceMappingURL=output-contribution.d.ts.map