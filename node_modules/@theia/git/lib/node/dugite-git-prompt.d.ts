import { GitPromptServer, GitPromptClient, GitPrompt } from '../common/git-prompt';
export declare class DugiteGitPromptServer implements GitPromptServer, GitPromptClient {
    protected client: GitPromptClient | undefined;
    dispose(): void;
    setClient(client: GitPromptClient | undefined): void;
    ask(question: GitPrompt.Question): Promise<GitPrompt.Answer>;
}
//# sourceMappingURL=dugite-git-prompt.d.ts.map