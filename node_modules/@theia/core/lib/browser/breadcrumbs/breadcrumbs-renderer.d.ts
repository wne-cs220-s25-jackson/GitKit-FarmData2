import * as React from 'react';
import { ReactRenderer } from '../widgets';
import { BreadcrumbsService } from './breadcrumbs-service';
import { BreadcrumbRenderer } from './breadcrumb-renderer';
import PerfectScrollbar from 'perfect-scrollbar';
import URI from '../../common/uri';
import { Emitter, Event } from '../../common';
import { BreadcrumbPopupContainer } from './breadcrumb-popup-container';
import { CorePreferences } from '../core-preferences';
import { Breadcrumb } from './breadcrumbs-constants';
import { LabelProvider } from '../label-provider';
interface Cancelable {
    canceled: boolean;
}
export declare class BreadcrumbsRenderer extends ReactRenderer {
    protected readonly breadcrumbsService: BreadcrumbsService;
    protected readonly breadcrumbRenderer: BreadcrumbRenderer;
    protected readonly corePreferences: CorePreferences;
    protected readonly labelProvider: LabelProvider;
    protected readonly onDidChangeActiveStateEmitter: Emitter<boolean>;
    get onDidChangeActiveState(): Event<boolean>;
    protected uri: URI | undefined;
    protected breadcrumbs: Breadcrumb[];
    protected popup: BreadcrumbPopupContainer | undefined;
    protected scrollbar: PerfectScrollbar | undefined;
    get active(): boolean;
    protected get breadCrumbsContainer(): Element | undefined;
    protected refreshCancellationMarker: Cancelable;
    protected init(): void;
    dispose(): void;
    refresh(uri?: URI): Promise<void>;
    protected update(): void;
    protected createScrollbar(): void;
    protected scrollToEnd(): void;
    protected doRender(): React.ReactNode;
    protected renderBreadcrumbs(): React.ReactNode;
    protected togglePopup: (breadcrumb: Breadcrumb, event: React.MouseEvent) => void;
}
export declare const BreadcrumbsRendererFactory: unique symbol;
export interface BreadcrumbsRendererFactory {
    (): BreadcrumbsRenderer;
}
export {};
//# sourceMappingURL=breadcrumbs-renderer.d.ts.map