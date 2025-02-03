import { GitFileChange, GitStatusChangeEvent } from '../common';
import { CancellationToken, Event } from '@theia/core/lib/common';
import { Decoration, DecorationsProvider } from '@theia/core/lib/browser/decorations-service';
import { GitRepositoryTracker } from './git-repository-tracker';
import URI from '@theia/core/lib/common/uri';
import { GitConfiguration, GitPreferences } from './git-preferences';
import { PreferenceChangeEvent } from '@theia/core/lib/browser';
export declare class GitDecorationProvider implements DecorationsProvider {
    protected readonly preferences: GitPreferences;
    protected readonly gitRepositoryTracker: GitRepositoryTracker;
    protected decorationsEnabled: boolean;
    protected colorsEnabled: boolean;
    protected decorations: Map<string, Decoration>;
    protected uris: Set<string>;
    private readonly onDidChangeDecorationsEmitter;
    readonly onDidChange: Event<URI[]>;
    protected init(): void;
    protected handleGitEvent(event: GitStatusChangeEvent | undefined): Promise<void>;
    protected updateDecorations(event?: GitStatusChangeEvent): void;
    protected collectDecorationData(changes: GitFileChange[], bucket: Map<string, Decoration>): void;
    provideDecorations(uri: URI, token: CancellationToken): Decoration | Promise<Decoration | undefined> | undefined;
    protected handlePreferenceChange(event: PreferenceChangeEvent<GitConfiguration>): void;
    /**
     * Notify that the provider has been updated to trigger a re-render of decorations.
     */
    protected triggerDecorationChange(): void;
}
//# sourceMappingURL=git-decoration-provider.d.ts.map