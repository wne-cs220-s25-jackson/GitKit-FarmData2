/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { ExpressionItem, DebugSessionProvider } from '../console/debug-console-items';
import { DebugProtocol } from '@vscode/debugprotocol';
export declare class DebugWatchExpression extends ExpressionItem {
    protected readonly options: {
        id: number;
        expression: string;
        session: DebugSessionProvider;
        remove: () => void;
        onDidChange: () => void;
    };
    readonly id: number;
    protected isError: boolean;
    constructor(options: {
        id: number;
        expression: string;
        session: DebugSessionProvider;
        remove: () => void;
        onDidChange: () => void;
    });
    evaluate(): Promise<void>;
    protected setResult(body?: DebugProtocol.EvaluateResponse['body'], error?: string): void;
    render(): React.ReactNode;
    open(): Promise<void>;
    get supportCopyValue(): boolean;
    copyValue(): void;
    protected valueRef: HTMLSpanElement | undefined;
    protected setValueRef: (valueRef: HTMLSpanElement | null) => HTMLSpanElement | undefined;
}
//# sourceMappingURL=debug-watch-expression.d.ts.map