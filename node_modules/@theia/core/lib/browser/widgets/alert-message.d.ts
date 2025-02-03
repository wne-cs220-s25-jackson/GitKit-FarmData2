import React = require('react');
export type MessageType = keyof AlertMessageIcon;
interface AlertMessageIcon {
    INFO: string;
    SUCCESS: string;
    WARNING: string;
    ERROR: string;
}
declare const AlertMessageIcon: {
    INFO: string;
    SUCCESS: string;
    WARNING: string;
    ERROR: string;
};
export interface AlertMessageProps {
    type: MessageType;
    header: string;
    children?: React.ReactNode;
}
export declare class AlertMessage extends React.Component<AlertMessageProps> {
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=alert-message.d.ts.map