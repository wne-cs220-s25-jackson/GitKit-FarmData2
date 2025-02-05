import { MaybePromise } from '@theia/core/lib/common/types';
import { TreeSource, TreeElement, CompositeTreeElement } from '@theia/core/lib/browser/source-tree';
import { Emitter } from '@theia/core/lib/common/event';
import { Severity } from '@theia/core/lib/common/severity';
export interface ConsoleItem extends TreeElement {
    readonly severity?: Severity;
}
export declare namespace ConsoleItem {
    const errorClassName = "theia-console-error";
    const warningClassName = "theia-console-warning";
    const infoClassName = "theia-console-info";
    const logClassName = "theia-console-log";
}
export interface CompositeConsoleItem extends ConsoleItem, CompositeTreeElement {
    getElements(): MaybePromise<IterableIterator<ConsoleItem>>;
}
export declare abstract class ConsoleSession extends TreeSource {
    protected selectedSeverity?: Severity;
    protected readonly selectionEmitter: Emitter<void>;
    readonly onSelectionChange: import("@theia/core/lib/common/event").Event<void>;
    id: string;
    get severity(): Severity | undefined;
    set severity(severity: Severity | undefined);
    abstract getElements(): MaybePromise<IterableIterator<ConsoleItem>>;
    abstract execute(value: string): MaybePromise<void>;
    abstract clear(): MaybePromise<void>;
}
//# sourceMappingURL=console-session.d.ts.map