import { LabelProvider } from '@theia/core/lib/browser';
import { EditorManager, EditorOpenerOptions, EditorWidget } from '@theia/editor/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { DebugProtocol } from '@vscode/debugprotocol/lib/debugProtocol';
import { DebugSession } from '../debug-session';
export declare class DebugSourceData {
    readonly raw: DebugProtocol.Source;
}
export declare class DebugSource extends DebugSourceData {
    protected readonly session: DebugSession;
    protected readonly editorManager: EditorManager;
    protected readonly labelProvider: LabelProvider;
    constructor(session: DebugSession, editorManager: EditorManager, labelProvider: LabelProvider);
    get uri(): URI;
    update(data: Partial<DebugSourceData>): void;
    open(options?: EditorOpenerOptions): Promise<EditorWidget>;
    load(): Promise<string>;
    get inMemory(): boolean;
    get name(): string;
    get longName(): string;
    static SCHEME: string;
    static SCHEME_PATTERN: RegExp;
    static toUri(raw: DebugProtocol.Source): URI;
}
//# sourceMappingURL=debug-source.d.ts.map