import { TaskConfiguration } from '../../common';
import { Task } from '../task';
import { TaskRunner } from '../task-runner';
import { ILogger } from '@theia/core';
import { TaskFactory } from './custom-task';
import { TerminalProcessFactory } from '@theia/process/lib/node';
/**
 * Task runner that runs a task as a pseudoterminal open.
 */
export declare class CustomTaskRunner implements TaskRunner {
    protected readonly logger: ILogger;
    protected readonly terminalProcessFactory: TerminalProcessFactory;
    protected readonly taskFactory: TaskFactory;
    run(taskConfig: TaskConfiguration, ctx?: string): Promise<Task>;
}
//# sourceMappingURL=custom-task-runner.d.ts.map