import * as React from 'react';
import { Root } from 'react-dom/client';
import { Disposable, DisposableCollection } from '../../common';
export type RendererHost = HTMLElement;
export declare const RendererHost: unique symbol;
export declare class ReactRenderer implements Disposable {
    protected readonly toDispose: DisposableCollection;
    readonly host: HTMLElement;
    protected hostRoot: Root;
    constructor(host?: RendererHost);
    dispose(): void;
    render(): void;
    protected doRender(): React.ReactNode;
}
//# sourceMappingURL=react-renderer.d.ts.map