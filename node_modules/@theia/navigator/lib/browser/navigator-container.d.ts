import { Container, interfaces } from '@theia/core/shared/inversify';
import { TreeProps } from '@theia/core/lib/browser';
import { FileNavigatorWidget } from './navigator-widget';
export declare const FILE_NAVIGATOR_PROPS: TreeProps;
export declare function createFileNavigatorContainer(parent: interfaces.Container): Container;
export declare function createFileNavigatorWidget(parent: interfaces.Container): FileNavigatorWidget;
//# sourceMappingURL=navigator-container.d.ts.map