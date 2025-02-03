import * as React from 'react';
import { DialogProps } from './dialogs';
import { ReactDialog } from './dialogs/react-dialog';
import { ApplicationServer, ApplicationInfo, ExtensionInfo } from '../common/application-protocol';
import { Message } from './widgets/widget';
import { WindowService } from './window/window-service';
export declare const ABOUT_CONTENT_CLASS = "theia-aboutDialog";
export declare const ABOUT_EXTENSIONS_CLASS = "theia-aboutExtensions";
export declare class AboutDialogProps extends DialogProps {
}
export declare class AboutDialog extends ReactDialog<void> {
    protected readonly props: AboutDialogProps;
    protected applicationInfo: ApplicationInfo | undefined;
    protected extensionsInfos: ExtensionInfo[];
    protected readonly okButton: HTMLButtonElement;
    protected readonly appServer: ApplicationServer;
    protected readonly windowService: WindowService;
    constructor(props: AboutDialogProps);
    protected init(): void;
    protected doInit(): Promise<void>;
    protected renderHeader(): React.ReactNode;
    protected renderExtensions(): React.ReactNode;
    protected render(): React.ReactNode;
    protected onAfterAttach(msg: Message): void;
    /**
     * Open a link in an external window.
     * @param url the link.
     */
    protected doOpenExternalLink: (url: string) => undefined;
    protected doOpenExternalLinkEnter: (e: React.KeyboardEvent, url: string) => void;
    protected isEnterKey(e: React.KeyboardEvent): boolean;
    get value(): undefined;
}
//# sourceMappingURL=about-dialog.d.ts.map