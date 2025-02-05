/// <reference types="react" />
import * as React from '@theia/core/shared/react';
export declare class DebugAction extends React.Component<DebugAction.Props> {
    render(): React.ReactNode;
    focus(): void;
    protected ref: HTMLElement | undefined;
    protected setRef: (ref: HTMLElement | null) => HTMLElement | undefined;
}
export declare namespace DebugAction {
    interface Props {
        label: string;
        iconClass: string;
        run: () => void;
        enabled?: boolean;
    }
}
//# sourceMappingURL=debug-action.d.ts.map