/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { DisposableCollection } from '@theia/core';
import { NotificationManager, NotificationUpdateEvent } from './notifications-manager';
export interface NotificationCenterComponentProps {
    readonly manager: NotificationManager;
}
type NotificationCenterComponentState = Pick<NotificationUpdateEvent, Exclude<keyof NotificationUpdateEvent, 'toasts'>>;
export declare class NotificationCenterComponent extends React.Component<NotificationCenterComponentProps, NotificationCenterComponentState> {
    constructor(props: NotificationCenterComponentProps);
    protected readonly toDisposeOnUnmount: DisposableCollection;
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    render(): React.ReactNode;
    protected onHide: () => void;
    protected onClearAll: () => void;
}
export {};
//# sourceMappingURL=notification-center-component.d.ts.map