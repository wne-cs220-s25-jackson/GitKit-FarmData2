"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskNode = void 0;
class TaskNode {
    constructor(taskId, childTasks, parentsID) {
        this.taskId = taskId;
        this.childTasks = childTasks;
        this.parentsID = parentsID;
    }
    addChildDependency(node) {
        this.childTasks.push(node);
    }
    addParentDependency(parentId) {
        this.parentsID.push(parentId);
    }
}
exports.TaskNode = TaskNode;
//# sourceMappingURL=task-node.js.map