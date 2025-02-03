import { EditorsAndDocumentsExt, EditorsAndDocumentsDelta } from '../common/plugin-api-rpc';
import { TextEditorExt } from './text-editor';
import { RPCProtocol } from '../common/rpc-protocol';
import { Event } from '@theia/core/lib/common/event';
import { DocumentDataExt } from './document-data';
export declare class EditorsAndDocumentsExtImpl implements EditorsAndDocumentsExt {
    protected readonly rpc: RPCProtocol;
    private activeEditorId;
    private readonly _onDidAddDocuments;
    private readonly _onDidRemoveDocuments;
    private readonly _onDidChangeVisibleTextEditors;
    private readonly _onDidChangeActiveTextEditor;
    readonly onDidAddDocuments: Event<DocumentDataExt[]>;
    readonly onDidRemoveDocuments: Event<DocumentDataExt[]>;
    readonly onDidChangeVisibleTextEditors: Event<TextEditorExt[]>;
    readonly onDidChangeActiveTextEditor: Event<TextEditorExt | undefined>;
    private readonly documents;
    private readonly editors;
    $acceptEditorsAndDocumentsDelta(delta: EditorsAndDocumentsDelta): Promise<void>;
    acceptEditorsAndDocumentsDelta(delta: EditorsAndDocumentsDelta): void;
    allEditors(): TextEditorExt[];
    activeEditor(): TextEditorExt | undefined;
    allDocuments(): DocumentDataExt[];
    getDocument(uri: string): DocumentDataExt | undefined;
    getEditor(id: string): TextEditorExt | undefined;
}
//# sourceMappingURL=editors-and-documents.d.ts.map