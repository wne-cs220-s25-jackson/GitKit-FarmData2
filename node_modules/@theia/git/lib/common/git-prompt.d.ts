import { RpcProxy, RpcServer } from '@theia/core/lib/common/messaging/proxy-factory';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
export declare const GitPromptServer: unique symbol;
export interface GitPromptServer extends RpcServer<GitPromptClient> {
}
export declare const GitPromptServerProxy: unique symbol;
export interface GitPromptServerProxy extends RpcProxy<GitPromptServer> {
}
export declare class GitPrompt implements GitPromptClient, Disposable {
    protected readonly server: GitPromptServer;
    protected readonly toDispose: DisposableCollection;
    protected init(): void;
    dispose(): void;
    ask(question: GitPrompt.Question): Promise<GitPrompt.Answer>;
}
export declare namespace GitPrompt {
    /**
     * Unique WS endpoint path for the Git prompt service.
     */
    const WS_PATH = "services/git-prompt";
    interface Question {
        readonly text: string;
        readonly details?: string;
        readonly password?: boolean;
    }
    interface Answer {
        readonly type: Answer.Type;
    }
    interface Success {
        readonly type: Answer.Type.SUCCESS;
        readonly result: string | boolean;
    }
    namespace Success {
        function is(answer: Answer): answer is Success;
        function create(result: string | boolean): Success;
    }
    interface Cancel extends Answer {
        readonly type: Answer.Type.CANCEL;
    }
    namespace Cancel {
        function is(answer: Answer): answer is Cancel;
        function create(): Cancel;
    }
    interface Failure extends Answer {
        readonly type: Answer.Type.FAILURE;
        readonly error: string | Error;
    }
    namespace Failure {
        function is(answer: Answer): answer is Failure;
        function create(error: string | Error): Failure;
    }
    namespace Answer {
        enum Type {
            SUCCESS = 0,
            CANCEL = 1,
            FAILURE = 2
        }
    }
}
export declare const GitPromptClient: unique symbol;
export interface GitPromptClient {
    ask(question: GitPrompt.Question): Promise<GitPrompt.Answer>;
}
/**
 * Note: This implementation is not reconnecting.
 * Git prompting is not supported in the browser. In electron, there's no need to reconnect.
 */
export declare class GitPromptServerImpl implements GitPromptServer {
    protected readonly proxy: GitPromptServerProxy;
    setClient(client: GitPromptClient): void;
    dispose(): void;
}
//# sourceMappingURL=git-prompt.d.ts.map