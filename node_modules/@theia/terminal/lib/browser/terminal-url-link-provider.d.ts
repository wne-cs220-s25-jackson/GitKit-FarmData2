import { OpenerService } from '@theia/core/lib/browser';
import { TerminalWidget } from './base/terminal-widget';
import { TerminalLink, TerminalLinkProvider } from './terminal-link-provider';
export declare class UrlLinkProvider implements TerminalLinkProvider {
    protected readonly openerService: OpenerService;
    protected readonly urlRegExp: RegExp;
    protected readonly localhostRegExp: RegExp;
    provideLinks(line: string, terminal: TerminalWidget): Promise<TerminalLink[]>;
    protected matchUrlLinks(line: string): TerminalLink[];
    protected matchLocalhostLinks(line: string): TerminalLink[];
}
//# sourceMappingURL=terminal-url-link-provider.d.ts.map