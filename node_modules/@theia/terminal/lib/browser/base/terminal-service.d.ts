import { Event } from '@theia/core/lib/common/event';
import { WidgetOpenerOptions } from '@theia/core/lib/browser';
import { TerminalWidgetOptions, TerminalWidget } from './terminal-widget';
/**
 * Service manipulating terminal widgets.
 */
export declare const TerminalService: unique symbol;
export interface TerminalService {
    /**
     * Create new terminal with predefined options.
     * @param options - terminal options.
     */
    newTerminal(options: TerminalWidgetOptions): Promise<TerminalWidget>;
    open(terminal: TerminalWidget, options?: WidgetOpenerOptions): void;
    readonly all: TerminalWidget[];
    /**
     * @param id - the widget id (NOT the terminal id!)
     * @return the widget
     */
    getById(id: string): TerminalWidget | undefined;
    /**
     * @param id - the terminal id (NOT the terminal widget id!)
     * @return the widget
     */
    getByTerminalId(terminalId: number): TerminalWidget | undefined;
    /**
     * Returns detected default shell.
     */
    getDefaultShell(): Promise<string>;
    readonly onDidCreateTerminal: Event<TerminalWidget>;
    readonly currentTerminal: TerminalWidget | undefined;
    readonly onDidChangeCurrentTerminal: Event<TerminalWidget | undefined>;
    readonly lastUsedTerminal: TerminalWidget | undefined;
}
//# sourceMappingURL=terminal-service.d.ts.map