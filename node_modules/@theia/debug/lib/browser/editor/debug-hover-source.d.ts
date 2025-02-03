/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { TreeSource, TreeElement } from '@theia/core/lib/browser/source-tree';
import { ExpressionContainer, ExpressionItem, DebugVariable } from '../console/debug-console-items';
import { DebugSessionManager } from '../debug-session-manager';
export declare class DebugHoverSource extends TreeSource {
    protected readonly sessions: DebugSessionManager;
    protected _expression: ExpressionItem | DebugVariable | undefined;
    get expression(): ExpressionItem | DebugVariable | undefined;
    protected elements: TreeElement[];
    getElements(): IterableIterator<TreeElement>;
    protected renderTitle(element: ExpressionItem | DebugVariable): React.ReactNode;
    reset(): void;
    evaluate(expression: string): Promise<ExpressionItem | DebugVariable | undefined>;
    protected doEvaluate(expression: string): Promise<ExpressionItem | DebugVariable | undefined>;
    protected findVariable(namesToFind: string[]): Promise<DebugVariable | undefined>;
    protected doFindVariable(owner: ExpressionContainer, namesToFind: string[]): Promise<DebugVariable | undefined>;
}
//# sourceMappingURL=debug-hover-source.d.ts.map