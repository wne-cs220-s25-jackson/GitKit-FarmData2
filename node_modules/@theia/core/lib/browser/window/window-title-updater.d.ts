import { Widget } from '../widgets';
import { FrontendApplication } from '../frontend-application';
import { FrontendApplicationContribution } from '../frontend-application-contribution';
import { WindowTitleService } from './window-title-service';
import { LabelProvider } from '../label-provider';
import { Disposable } from '../../common';
export declare class WindowTitleUpdater implements FrontendApplicationContribution {
    protected readonly windowTitleService: WindowTitleService;
    protected readonly labelProvider: LabelProvider;
    onStart(app: FrontendApplication): void;
    protected toDisposeOnWidgetChanged: Disposable;
    protected handleWidgetChange(widget?: Widget): void;
    /**
     * Updates the title of the application based on the currently opened widget.
     *
     * @param widget The current widget in the `main` application area. `undefined` if no widget is currently open in that area.
     */
    protected updateTitleWidget(widget?: Widget): void;
}
//# sourceMappingURL=window-title-updater.d.ts.map