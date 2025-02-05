import { Event } from '@theia/core';
export interface ManagedProcessManager {
    register(process: ManagedProcess): number;
    unregister(process: ManagedProcess): void;
    get(id: number): ManagedProcess | undefined;
}
export interface ManagedProcess {
    readonly id: number;
    readonly onStart: Event<IProcessStartEvent>;
    readonly onExit: Event<IProcessExitEvent>;
    readonly onClose: Event<IProcessExitEvent>;
    readonly onError: Event<ProcessErrorEvent>;
    readonly killed: boolean;
    kill(): void;
}
export interface IProcessExitEvent {
    readonly code?: number;
    readonly signal?: string;
}
/**
 * Data emitted when a process has been successfully started.
 */
export interface IProcessStartEvent {
}
/**
 * Data emitted when a process has failed to start.
 */
export interface ProcessErrorEvent extends Error {
    /** An errno-like error string (e.g. ENOENT).  */
    code: string;
}
export declare enum ProcessType {
    'Raw' = 0,
    'Terminal' = 1
}
//# sourceMappingURL=process-manager-types.d.ts.map