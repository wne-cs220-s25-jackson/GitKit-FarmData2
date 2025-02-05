import { Message } from '@theia/core/shared/@phosphor/messaging';
import URI from '@theia/core/lib/common/uri';
import { NavigatableWidget, StatefulWidget } from '@theia/core/lib/browser';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { BaseWidget } from '@theia/core/lib/browser/widgets/widget';
import { MiniBrowserProps, MiniBrowserContentFactory } from './mini-browser-content';
export { MiniBrowserProps };
export declare class MiniBrowserOptions {
    uri: URI;
}
export declare class MiniBrowser extends BaseWidget implements NavigatableWidget, StatefulWidget {
    static ID: string;
    static ICON: string;
    protected readonly options: MiniBrowserOptions;
    protected readonly createContent: MiniBrowserContentFactory;
    protected init(): void;
    getResourceUri(): URI | undefined;
    createMoveToUri(resourceUri: URI): URI | undefined;
    protected props: MiniBrowserProps | undefined;
    protected readonly toDisposeOnProps: DisposableCollection;
    setProps(raw: MiniBrowserProps): void;
    protected onActivateRequest(msg: Message): void;
    storeState(): object;
    restoreState(oldState: object): void;
}
//# sourceMappingURL=mini-browser.d.ts.map