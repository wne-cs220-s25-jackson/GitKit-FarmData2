import { URI } from '@theia/core';
import { TerminalService } from './base/terminal-service';
import { TerminalWidget, TerminalWidgetOptions } from './base/terminal-widget';
import { TerminalProfile } from './terminal-profile-service';
export declare class ShellTerminalProfile implements TerminalProfile {
    protected readonly terminalService: TerminalService;
    protected readonly options: TerminalWidgetOptions;
    get shellPath(): string | undefined;
    constructor(terminalService: TerminalService, options: TerminalWidgetOptions);
    start(): Promise<TerminalWidget>;
    /**
     * Makes a copy of this profile modified with the options given
     * as an argument.
     * @param options the options to override
     * @returns a modified copy of this profile
     */
    modify(options: {
        cwd?: string | URI;
    }): TerminalProfile;
}
//# sourceMappingURL=shell-terminal-profile.d.ts.map