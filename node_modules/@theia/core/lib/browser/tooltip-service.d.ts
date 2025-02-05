import * as React from 'react';
import { ReactRenderer, RendererHost } from './widgets/react-renderer';
import { CorePreferences } from './core-preferences';
export declare const TooltipService: unique symbol;
export interface TooltipService {
    tooltipId: string;
    attachTo(host: HTMLElement): void;
    update(fullRender?: boolean): void;
}
/**
 * Attributes to be added to an HTML element to enable
 * rich HTML tooltip rendering
 */
export interface TooltipAttributes {
    /**
     * HTML to render in the tooltip.
     */
    'data-tip': string;
    /**
     * The ID of the tooltip renderer. Should be TOOLTIP_ID.
     */
    'data-for': string;
}
export declare class TooltipServiceImpl extends ReactRenderer implements TooltipService {
    protected readonly corePreferences: CorePreferences;
    readonly tooltipId: string;
    protected rendered: boolean;
    constructor(host?: RendererHost);
    protected init(): void;
    attachTo(host: HTMLElement): void;
    update(fullRender?: boolean): void;
    protected doRender(): React.ReactNode;
    dispose(): void;
}
//# sourceMappingURL=tooltip-service.d.ts.map