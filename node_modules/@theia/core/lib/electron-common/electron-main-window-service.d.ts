import { NewWindowOptions, WindowSearchParams } from '../common/window';
export declare const electronMainWindowServicePath = "/services/electron-window";
export declare const ElectronMainWindowService: unique symbol;
export interface ElectronMainWindowService {
    openNewWindow(url: string, options?: NewWindowOptions): undefined;
    openNewDefaultWindow(params?: WindowSearchParams): void;
}
//# sourceMappingURL=electron-main-window-service.d.ts.map