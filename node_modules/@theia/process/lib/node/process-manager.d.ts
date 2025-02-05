import { Emitter, Event } from '@theia/core/lib/common';
import { ILogger } from '@theia/core/lib/common/logger';
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { ManagedProcessManager, ManagedProcess } from '../common/process-manager-types';
import { Process } from './process';
export declare class ProcessManager implements ManagedProcessManager, BackendApplicationContribution {
    protected logger: ILogger;
    protected readonly processes: Map<number, Process>;
    protected readonly deleteEmitter: Emitter<number>;
    constructor(logger: ILogger);
    /**
     * Registers the given process into this manager. Both on process termination and on error,
     * the process will be automatically removed from the manager.
     *
     * @param process the process to register.
     */
    register(process: Process): number;
    /**
     * @returns a random id for a process that is not assigned to a different process yet.
     */
    protected generateId(): number;
    /**
     * Removes the process from this process manager. Invoking this method, will make
     * sure that the process is terminated before eliminating it from the manager's cache.
     *
     * @param process the process to unregister from this process manager.
     */
    unregister(process: ManagedProcess): void;
    get(id: number): ManagedProcess | undefined;
    get onDelete(): Event<number>;
    onStop(): void;
    private getProcessLabel;
}
//# sourceMappingURL=process-manager.d.ts.map