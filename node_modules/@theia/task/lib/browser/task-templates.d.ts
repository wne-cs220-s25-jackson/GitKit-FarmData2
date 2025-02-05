import { QuickPickValue } from '@theia/core/lib/browser';
/** The representation of a task template used in the auto-generation of `tasks.json` */
export interface TaskTemplateEntry {
    id: string;
    label: string;
    description: string;
    sort?: string;
    autoDetect: boolean;
    content: string;
}
export declare class TaskTemplateSelector {
    selectTemplates(): QuickPickValue<TaskTemplateEntry>[];
}
//# sourceMappingURL=task-templates.d.ts.map