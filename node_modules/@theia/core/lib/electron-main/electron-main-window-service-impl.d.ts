import { ElectronMainWindowService } from '../electron-common/electron-main-window-service';
import { ElectronMainApplication } from './electron-main-application';
import { NewWindowOptions, WindowSearchParams } from '../common/window';
export declare class ElectronMainWindowServiceImpl implements ElectronMainWindowService {
    protected readonly app: ElectronMainApplication;
    openNewWindow(url: string, { external }: NewWindowOptions): undefined;
    openNewDefaultWindow(params?: WindowSearchParams): void;
}
//# sourceMappingURL=electron-main-window-service-impl.d.ts.map