import { DebugProtocol } from '@vscode/debugprotocol';
import { DebugSessionConnection } from './debug-session-connection';
export declare const DebugContribution: unique symbol;
export interface DebugContribution {
    register(configType: string, connection: DebugSessionConnection): void;
}
export interface LaunchVSCodeRequest extends DebugProtocol.Request {
    arguments: LaunchVSCodeArguments;
}
export interface LaunchVSCodeArguments {
    args: LaunchVSCodeArgument[];
    env?: {
        [key: string]: string | null;
    };
}
export interface LaunchVSCodeArgument {
    prefix?: string;
    path?: string;
}
export interface LaunchVSCodeResult {
    rendererDebugPort?: number;
}
//# sourceMappingURL=debug-contribution.d.ts.map