import { VariableResolverService } from '@theia/variable-resolver/lib/browser';
import { TaskResolver } from '../task-contribution';
import { TaskConfiguration } from '../../common/task-protocol';
import { TaskDefinitionRegistry } from '../task-definition-registry';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export declare class ProcessTaskResolver implements TaskResolver {
    protected readonly variableResolverService: VariableResolverService;
    protected readonly taskDefinitionRegistry: TaskDefinitionRegistry;
    protected readonly workspaceService: WorkspaceService;
    /**
     * Perform some adjustments to the task launch configuration, before sending
     * it to the backend to be executed. We can make sure that parameters that
     * are optional to the user but required by the server will be defined, with
     * sane default values. Also, resolve all known variables, e.g. `${workspaceFolder}`.
     */
    resolveTask(taskConfig: TaskConfiguration): Promise<TaskConfiguration>;
}
//# sourceMappingURL=process-task-resolver.d.ts.map