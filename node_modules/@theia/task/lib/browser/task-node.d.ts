import { TaskConfiguration } from '../common';
export declare class TaskNode {
    taskId: TaskConfiguration;
    childTasks: TaskNode[];
    parentsID: TaskConfiguration[];
    constructor(taskId: TaskConfiguration, childTasks: TaskNode[], parentsID: TaskConfiguration[]);
    addChildDependency(node: TaskNode): void;
    addParentDependency(parentId: TaskConfiguration): void;
}
//# sourceMappingURL=task-node.d.ts.map