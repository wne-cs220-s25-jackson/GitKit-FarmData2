/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { ConsoleItem } from './console-session';
import { Severity } from '@theia/core/lib/common/severity';
export declare class AnsiConsoleItem implements ConsoleItem {
    readonly content: string;
    readonly severity?: Severity | undefined;
    protected readonly htmlContent: string;
    constructor(content: string, severity?: Severity | undefined);
    get visible(): boolean;
    render(): React.ReactNode;
}
//# sourceMappingURL=ansi-console-item.d.ts.map