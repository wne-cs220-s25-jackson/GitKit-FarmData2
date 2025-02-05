import { interfaces, Container } from '@theia/core/shared/inversify';
import { MarkerOptions } from '../marker-tree';
import { ProblemWidget } from './problem-widget';
import { TreeProps } from '@theia/core/lib/browser';
export declare const PROBLEM_TREE_PROPS: TreeProps;
export declare const PROBLEM_OPTIONS: MarkerOptions;
export declare function createProblemTreeContainer(parent: interfaces.Container): Container;
export declare function createProblemWidget(parent: interfaces.Container): ProblemWidget;
//# sourceMappingURL=problem-container.d.ts.map