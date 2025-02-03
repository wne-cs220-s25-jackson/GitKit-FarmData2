import * as React from 'react';
import { Message } from '../widgets';
import { AbstractDialog, DialogProps } from '../dialogs';
import { Root } from 'react-dom/client';
export declare abstract class ReactDialog<T> extends AbstractDialog<T> {
    protected contentNodeRoot: Root;
    protected isMounted: boolean;
    constructor(props: DialogProps);
    protected onUpdateRequest(msg: Message): void;
    /**
     * Render the React widget in the DOM.
     * - If the widget has been previously rendered,
     * any subsequent calls will perform an update and only
     * change the DOM if absolutely necessary.
     */
    protected abstract render(): React.ReactNode;
}
//# sourceMappingURL=react-dialog.d.ts.map