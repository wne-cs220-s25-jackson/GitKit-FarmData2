import { TerminalProcess, TerminalProcessOptions } from './terminal-process';
export declare const TaskTerminalProcessFactory: unique symbol;
export interface TaskTerminalProcessFactory {
    (options: TerminalProcessOptions): TaskTerminalProcess;
}
export declare class TaskTerminalProcess extends TerminalProcess {
    exited: boolean;
    attachmentAttempted: boolean;
    protected onTerminalExit(code: number | undefined, signal: string | undefined): void;
}
//# sourceMappingURL=task-terminal-process.d.ts.map