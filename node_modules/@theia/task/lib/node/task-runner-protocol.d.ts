import { TaskConfiguration } from '../common';
import { Task } from './task';
export declare const TaskRunner: unique symbol;
/**
 * A {@link TaskRunner} knows how to run a task configuration of a particular type.
 */
export interface TaskRunner {
    /**
     * Runs a task based on the given `TaskConfiguration`.
     * @param taskConfig the task configuration that should be executed.
     * @param ctx the execution context.
     *
     * @returns a promise of the (currently running) {@link Task}.
     */
    run(tskConfig: TaskConfiguration, ctx?: string): Promise<Task>;
}
//# sourceMappingURL=task-runner-protocol.d.ts.map