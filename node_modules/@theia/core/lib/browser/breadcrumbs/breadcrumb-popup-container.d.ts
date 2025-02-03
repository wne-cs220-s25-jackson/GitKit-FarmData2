import { Emitter, Event } from '../../common';
import { Disposable, DisposableCollection } from '../../common/disposable';
import { Coordinate } from '../context-menu-renderer';
import { RendererHost } from '../widgets/react-renderer';
export interface BreadcrumbPopupContainerFactory {
    (parent: HTMLElement, breadcrumbId: string, position: Coordinate): BreadcrumbPopupContainer;
}
export declare const BreadcrumbPopupContainerFactory: unique symbol;
export type BreadcrumbID = string;
export declare const BreadcrumbID: unique symbol;
/**
 * This class creates a popup container at the given position
 * so that contributions can attach their HTML elements
 * as children of `BreadcrumbPopupContainer#container`.
 *
 * - `dispose()` is called on blur or on hit on escape
 */
export declare class BreadcrumbPopupContainer implements Disposable {
    protected readonly parent: RendererHost;
    readonly breadcrumbId: BreadcrumbID;
    protected readonly position: Coordinate;
    protected onDidDisposeEmitter: Emitter<void>;
    protected toDispose: DisposableCollection;
    get onDidDispose(): Event<void>;
    protected _container: HTMLElement;
    get container(): HTMLElement;
    protected _isOpen: boolean;
    get isOpen(): boolean;
    protected init(): void;
    protected createPopupDiv(position: Coordinate): HTMLDivElement;
    protected onFocusOut: (event: FocusEvent) => void;
    protected escFunction: (event: KeyboardEvent) => void;
    dispose(): void;
}
//# sourceMappingURL=breadcrumb-popup-container.d.ts.map