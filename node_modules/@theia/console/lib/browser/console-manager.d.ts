import { ApplicationShell } from '@theia/core/lib/browser';
import { ConsoleWidget } from './console-widget';
export declare class ConsoleManager {
    protected readonly shell: ApplicationShell;
    get activeConsole(): ConsoleWidget | undefined;
    get currentConsole(): ConsoleWidget | undefined;
}
//# sourceMappingURL=console-manager.d.ts.map