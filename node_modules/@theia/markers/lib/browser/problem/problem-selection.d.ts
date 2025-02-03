import { SelectionService } from '@theia/core/lib/common/selection-service';
import { SelectionCommandHandler } from '@theia/core/lib/common/selection-command-handler';
import { Marker } from '../../common/marker';
export interface ProblemSelection {
    marker: Marker<object>;
}
export declare namespace ProblemSelection {
    function is(arg: unknown): arg is ProblemSelection;
    class CommandHandler extends SelectionCommandHandler<ProblemSelection> {
        constructor(selectionService: SelectionService, options: SelectionCommandHandler.Options<ProblemSelection>);
    }
}
//# sourceMappingURL=problem-selection.d.ts.map