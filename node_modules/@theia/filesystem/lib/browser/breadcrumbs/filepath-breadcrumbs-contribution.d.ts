import { Disposable, Emitter, Event } from '@theia/core';
import URI from '@theia/core/lib/common/uri';
import { Breadcrumb, BreadcrumbsContribution, LabelProvider } from '@theia/core/lib/browser';
import { FilepathBreadcrumb } from './filepath-breadcrumb';
import { BreadcrumbsFileTreeWidget } from './filepath-breadcrumbs-container';
import { DirNode } from '../file-tree';
import { FileService } from '../file-service';
import { FileStat } from '../../common/files';
export declare const FilepathBreadcrumbType: unique symbol;
export interface FilepathBreadcrumbClassNameFactory {
    (location: URI, index: number): string;
}
export declare class FilepathBreadcrumbsContribution implements BreadcrumbsContribution {
    protected readonly labelProvider: LabelProvider;
    protected readonly fileSystem: FileService;
    protected readonly breadcrumbsFileTreeWidget: BreadcrumbsFileTreeWidget;
    protected readonly onDidChangeBreadcrumbsEmitter: Emitter<URI>;
    get onDidChangeBreadcrumbs(): Event<URI>;
    readonly type: symbol;
    readonly priority: number;
    computeBreadcrumbs(uri: URI): Promise<Breadcrumb[]>;
    protected getContainerClassCreator(fileURI: URI): FilepathBreadcrumbClassNameFactory;
    protected getIconClassCreator(fileURI: URI): FilepathBreadcrumbClassNameFactory;
    protected filterBreadcrumbs(_: URI, breadcrumb: FilepathBreadcrumb): boolean;
    attachPopupContent(breadcrumb: Breadcrumb, parent: HTMLElement): Promise<Disposable | undefined>;
    protected createRootNode(folderToOpen: FileStat): Promise<DirNode | undefined>;
}
//# sourceMappingURL=filepath-breadcrumbs-contribution.d.ts.map