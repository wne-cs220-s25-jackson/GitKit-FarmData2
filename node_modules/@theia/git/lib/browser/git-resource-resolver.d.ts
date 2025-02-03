import { Git, Repository } from '../common';
import { Resource, ResourceResolver } from '@theia/core';
import URI from '@theia/core/lib/common/uri';
import { GitRepositoryProvider } from './git-repository-provider';
import { GitResource } from './git-resource';
export declare class GitResourceResolver implements ResourceResolver {
    protected readonly git: Git;
    protected readonly repositoryProvider: GitRepositoryProvider;
    constructor(git: Git, repositoryProvider: GitRepositoryProvider);
    resolve(uri: URI): Resource | Promise<Resource>;
    getResource(uri: URI): Promise<GitResource>;
    getRepository(uri: URI): Promise<Repository | undefined>;
}
//# sourceMappingURL=git-resource-resolver.d.ts.map