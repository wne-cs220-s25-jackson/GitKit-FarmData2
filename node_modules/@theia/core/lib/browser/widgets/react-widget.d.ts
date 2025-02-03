import * as React from 'react';
import { BaseWidget, Message } from './widget';
import { Widget } from '@phosphor/widgets';
import { Root } from 'react-dom/client';
export declare abstract class ReactWidget extends BaseWidget {
    protected nodeRoot: Root;
    constructor(options?: Widget.IOptions);
    protected onUpdateRequest(msg: Message): void;
    /**
     * Render the React widget in the DOM.
     * - If the widget has been previously rendered,
     * any subsequent calls will perform an update and only
     * change the DOM if absolutely necessary.
     */
    protected abstract render(): React.ReactNode;
}
//# sourceMappingURL=react-widget.d.ts.map