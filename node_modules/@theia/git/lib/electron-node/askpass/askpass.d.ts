/// <reference types="node" />
import * as http from 'http';
import { ILogger } from '@theia/core/lib/common/logger';
import { Disposable } from '@theia/core/lib/common/disposable';
import { MaybePromise } from '@theia/core/lib/common/types';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { DugiteGitPromptServer } from '../../node/dugite-git-prompt';
/**
 * Environment for the Git askpass helper.
 */
export interface AskpassEnvironment {
    /**
     * The path to the external script to run by Git when authentication is required.
     */
    readonly GIT_ASKPASS: string;
    /**
     * Starts the process as a normal Node.js process. User `"1"` if you want to enable it.
     */
    readonly ELECTRON_RUN_AS_NODE?: string;
    /**
     * The path to the Node.js executable that will run the external `ASKPASS` script.
     */
    readonly THEIA_GIT_ASKPASS_NODE?: string;
    /**
     * The JS file to run.
     */
    readonly THEIA_GIT_ASKPASS_MAIN?: string;
    /**
     * The Git askpass handle path. In our case, this is the address of the HTTP server listening on the `Username` and `Password` requests.
     */
    readonly THEIA_GIT_ASKPASS_HANDLE?: string;
}
export interface Address {
    readonly port: number;
    readonly family: string;
    readonly address: string;
}
export declare class Askpass implements Disposable {
    protected readonly logger: ILogger;
    protected readonly promptServer: DugiteGitPromptServer;
    protected server: http.Server;
    protected serverAddress: Address | undefined;
    protected ready: Deferred<boolean>;
    protected init(): void;
    protected setup(): Promise<Address | undefined>;
    protected onRequest(req: http.IncomingMessage, res: http.ServerResponse): void;
    protected prompt(requestingHost: string, request: string): Promise<string>;
    getEnv(): Promise<AskpassEnvironment>;
    dispose(): void;
    protected hostname(): string;
    protected GIT_ASKPASS(): MaybePromise<string>;
    protected ELECTRON_RUN_AS_NODE(): MaybePromise<string | undefined>;
    protected THEIA_GIT_ASKPASS_NODE(): MaybePromise<string | undefined>;
    protected THEIA_GIT_ASKPASS_MAIN(): MaybePromise<string | undefined>;
    protected THEIA_GIT_ASKPASS_HANDLE(): MaybePromise<string | undefined>;
}
//# sourceMappingURL=askpass.d.ts.map