import { ContributionProvider, Emitter, Event } from '../../common';
import URI from '../../common/uri';
import { Coordinate } from '../context-menu-renderer';
import { BreadcrumbPopupContainer, BreadcrumbPopupContainerFactory } from './breadcrumb-popup-container';
import { BreadcrumbsContribution, Breadcrumb } from './breadcrumbs-constants';
export declare class BreadcrumbsService {
    protected readonly contributions: ContributionProvider<BreadcrumbsContribution>;
    protected readonly breadcrumbPopupContainerFactory: BreadcrumbPopupContainerFactory;
    protected hasSubscribed: boolean;
    protected popupsOverlayContainer: HTMLDivElement;
    protected readonly onDidChangeBreadcrumbsEmitter: Emitter<URI>;
    init(): void;
    protected createOverlayContainer(): void;
    /**
     * Subscribe to this event emitter to be notified when the breadcrumbs have changed.
     * The URI is the URI of the editor the breadcrumbs have changed for.
     */
    get onDidChangeBreadcrumbs(): Event<URI>;
    /**
     * Subscribes to the onDidChangeBreadcrumbs events for all contributions.
     */
    protected subscribeToContributions(): void;
    /**
     * Returns the breadcrumbs for a given URI, possibly an empty list.
     */
    getBreadcrumbs(uri: URI): Promise<Breadcrumb[]>;
    protected prioritizedContributions(): Promise<BreadcrumbsContribution[]>;
    /**
     * Opens a popup for the given breadcrumb at the given position.
     */
    openPopup(breadcrumb: Breadcrumb, position: Coordinate): Promise<BreadcrumbPopupContainer | undefined>;
}
//# sourceMappingURL=breadcrumbs-service.d.ts.map