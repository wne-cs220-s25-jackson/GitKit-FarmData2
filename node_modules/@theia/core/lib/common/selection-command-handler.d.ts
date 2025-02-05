import { CommandHandler } from './command';
import { SelectionService } from '../common/selection-service';
export declare class SelectionCommandHandler<S extends Object> implements CommandHandler {
    protected readonly selectionService: SelectionService;
    protected readonly toSelection: (arg: any) => S | undefined;
    protected readonly options: SelectionCommandHandler.Options<S>;
    constructor(selectionService: SelectionService, toSelection: (arg: any) => S | undefined, options: SelectionCommandHandler.Options<S>);
    execute(...args: any[]): Object | undefined;
    isVisible(...args: any[]): boolean;
    isEnabled(...args: any[]): boolean;
    protected isMulti(): boolean;
    protected getSelection(...args: any[]): S | S[] | undefined;
    protected getSingleSelection(arg: Object | undefined): S | undefined;
    protected getMultiSelection(arg: Object | undefined): S[] | undefined;
}
export declare namespace SelectionCommandHandler {
    type Options<S> = SelectionOptions<false, S> | SelectionOptions<true, S[]>;
    interface SelectionOptions<Multi extends boolean, T> {
        multi: Multi;
        execute(selection: T, ...args: any[]): any;
        isEnabled?(selection: T, ...args: any[]): boolean;
        isVisible?(selection: T, ...args: any[]): boolean;
    }
}
//# sourceMappingURL=selection-command-handler.d.ts.map