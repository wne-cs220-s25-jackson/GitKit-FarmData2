import { Menu, MenuItemConstructorOptions, WebContents } from '@theia/electron/shared/electron';
import { FrontendApplicationState, StopReason } from '../common/frontend-application-state';
import { ElectronSecurityToken } from '../electron-common/electron-token';
import { WindowEvent, InternalMenuDto } from '../electron-common/electron-api';
import { ElectronMainApplication, ElectronMainApplicationContribution } from './electron-main-application';
import { Disposable, MaybePromise } from '../common';
export declare class TheiaMainApi implements ElectronMainApplicationContribution {
    protected electronSecurityToken: ElectronSecurityToken;
    protected readonly openPopups: Map<number, Menu>;
    onStart(application: ElectronMainApplication): MaybePromise<void>;
    private isASCI;
    fromMenuDto(sender: WebContents, menuId: number, menuDto: InternalMenuDto[]): MenuItemConstructorOptions[];
}
export declare namespace TheiaRendererAPI {
    function sendWindowEvent(wc: WebContents, event: WindowEvent): void;
    function openUrl(wc: WebContents, url: string): Promise<boolean>;
    function sendAboutToClose(wc: WebContents): Promise<void>;
    function requestClose(wc: WebContents, stopReason: StopReason): Promise<boolean>;
    function requestSecondaryClose(mainWindow: WebContents, secondaryWindow: WebContents): Promise<boolean>;
    function onRequestReload(wc: WebContents, handler: () => void): Disposable;
    function onApplicationStateChanged(wc: WebContents, handler: (state: FrontendApplicationState) => void): Disposable;
    function onIpcData(handler: (sender: WebContents, data: Uint8Array) => void): Disposable;
    function sendData(wc: WebContents, data: Uint8Array): void;
}
//# sourceMappingURL=electron-api-main.d.ts.map