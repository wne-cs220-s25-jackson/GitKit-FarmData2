import URI from '@theia/core/lib/common/uri';
import { Event, Resource, ResourceReadOptions, DisposableCollection, Emitter } from '@theia/core/lib/common';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { MonacoEditorModel } from '@theia/monaco/lib/browser/monaco-editor-model';
import { IReference } from '@theia/monaco-editor-core/esm/vs/base/common/lifecycle';
import * as monaco from '@theia/monaco-editor-core';
export declare class OutputResource implements Resource {
    readonly uri: URI;
    readonly editorModelRef: Deferred<IReference<MonacoEditorModel>>;
    protected _textModel: monaco.editor.ITextModel | undefined;
    protected onDidChangeContentsEmitter: Emitter<void>;
    protected toDispose: DisposableCollection;
    constructor(uri: URI, editorModelRef: Deferred<IReference<MonacoEditorModel>>);
    get textModel(): monaco.editor.ITextModel | undefined;
    get onDidChangeContents(): Event<void>;
    readContents(options?: ResourceReadOptions): Promise<string>;
    dispose(): void;
}
//# sourceMappingURL=output-resource.d.ts.map