import { LocationProgress, ProgressLocationService } from './progress-location-service';
import { DisposableCollection, Disposable } from '../common';
import { ProgressBarOptions } from './progress-bar-factory';
export declare class ProgressBar implements Disposable {
    protected readonly progressLocationService: ProgressLocationService;
    protected readonly options: ProgressBarOptions;
    protected readonly toDispose: DisposableCollection;
    dispose(): void;
    protected progressBar: HTMLDivElement;
    protected progressBarContainer: HTMLDivElement;
    constructor();
    protected init(): void;
    protected onProgress(event: LocationProgress): void;
    protected setVisible(visible: boolean): void;
}
//# sourceMappingURL=progress-bar.d.ts.map