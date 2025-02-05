import * as React from 'react';
import { Breadcrumb } from './breadcrumbs-constants';
export declare const BreadcrumbRenderer: unique symbol;
export interface BreadcrumbRenderer {
    /**
     * Renders the given breadcrumb. If `onClick` is given, it is called on breadcrumb click.
     */
    render(breadcrumb: Breadcrumb, onMouseDown?: (breadcrumb: Breadcrumb, event: React.MouseEvent) => void): React.ReactNode;
}
export declare class DefaultBreadcrumbRenderer implements BreadcrumbRenderer {
    render(breadcrumb: Breadcrumb, onMouseDown?: (breadcrumb: Breadcrumb, event: React.MouseEvent) => void): React.ReactNode;
}
//# sourceMappingURL=breadcrumb-renderer.d.ts.map