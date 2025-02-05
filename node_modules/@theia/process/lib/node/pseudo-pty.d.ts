import { IPty } from 'node-pty';
import { Event } from '@theia/core';
export declare class PseudoPty implements IPty {
    readonly pid: number;
    readonly cols: number;
    readonly rows: number;
    readonly process: string;
    handleFlowControl: boolean;
    readonly onData: Event<string>;
    readonly onExit: Event<{
        exitCode: number;
        signal?: number;
    }>;
    on(event: string, listener: (data: string) => void): void;
    on(event: string, listener: (exitCode: number, signal?: number) => void): void;
    on(event: string, listener: (error?: string) => void): void;
    resize(columns: number, rows: number): void;
    write(data: string): void;
    kill(signal?: string): void;
    pause(): void;
    resume(): void;
    clear(): void;
}
//# sourceMappingURL=pseudo-pty.d.ts.map