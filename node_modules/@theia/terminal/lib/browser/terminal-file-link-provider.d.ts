import { QuickInputService } from '@theia/core';
import { OpenerService } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { Position } from '@theia/editor/lib/browser';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { TerminalWidget } from './base/terminal-widget';
import { TerminalLink, TerminalLinkProvider } from './terminal-link-provider';
import { FileSearchService } from '@theia/file-search/lib/common/file-search-service';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export declare class FileLinkProvider implements TerminalLinkProvider {
    protected readonly openerService: OpenerService;
    protected readonly quickInputService: QuickInputService;
    protected fileService: FileService;
    protected searchService: FileSearchService;
    protected readonly workspaceService: WorkspaceService;
    provideLinks(line: string, terminal: TerminalWidget): Promise<TerminalLink[]>;
    protected createRegExp(): Promise<RegExp>;
    protected isValidFile(match: string, terminal: TerminalWidget): Promise<boolean>;
    protected isValidFileURI(uri: URI): Promise<boolean>;
    protected toURI(match: string, cwd: URI): Promise<URI | undefined>;
    protected getCwd(terminal: TerminalWidget): Promise<URI>;
    protected extractPath(link: string): Promise<string | undefined>;
    open(match: string, terminal: TerminalWidget): Promise<void>;
    openURI(toOpen: URI, position: Position): Promise<void>;
    protected extractPosition(link: string): Promise<Position>;
    protected getLineAndColumnMatchIndex(): number;
}
export declare class FileDiffPreLinkProvider extends FileLinkProvider {
    createRegExp(): Promise<RegExp>;
}
export declare class FileDiffPostLinkProvider extends FileLinkProvider {
    createRegExp(): Promise<RegExp>;
}
export declare class LocalFileLinkProvider extends FileLinkProvider {
    createRegExp(): Promise<RegExp>;
    provideLinks(line: string, terminal: TerminalWidget): Promise<TerminalLink[]>;
    protected getLineAndColumnMatchIndex(): number;
    protected isValidWorkspaceFile(searchTerm: string | undefined, terminal: TerminalWidget): Promise<URI | undefined>;
}
//# sourceMappingURL=terminal-file-link-provider.d.ts.map