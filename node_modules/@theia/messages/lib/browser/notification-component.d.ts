/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { NotificationManager, Notification } from './notifications-manager';
export interface NotificationComponentProps {
    readonly manager: NotificationManager;
    readonly notification: Notification;
}
export declare class NotificationComponent extends React.Component<NotificationComponentProps> {
    constructor(props: NotificationComponentProps);
    protected onClear: (event: React.MouseEvent) => void;
    protected onToggleExpansion: (event: React.MouseEvent) => void;
    protected onAction: (event: React.MouseEvent) => void;
    protected onMessageClick: (event: React.MouseEvent) => void;
    render(): React.ReactNode;
}
//# sourceMappingURL=notification-component.d.ts.map