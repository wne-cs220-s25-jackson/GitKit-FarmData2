import { ProgressBar } from './progress-bar';
export declare const ProgressBarFactory: unique symbol;
export interface ProgressBarFactory {
    (options: ProgressBarOptions): ProgressBar;
}
export declare const ProgressBarOptions: unique symbol;
export interface ProgressBarOptions {
    locationId: string;
    container: HTMLElement;
    insertMode: 'append' | 'prepend';
}
//# sourceMappingURL=progress-bar-factory.d.ts.map