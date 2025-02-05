import URI from '@theia/core/lib/common/uri';
import { Command, CommandService } from '@theia/core/lib/common/command';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
export declare class OpenUriCommandHandler {
    protected readonly windowService: WindowService;
    protected readonly commandService: CommandService;
    static readonly COMMAND_METADATA: Command;
    private openNewTabDialog;
    constructor(windowService: WindowService, commandService: CommandService);
    execute(resource: URI | string | undefined): void;
    private openWebUri;
}
//# sourceMappingURL=commands.d.ts.map