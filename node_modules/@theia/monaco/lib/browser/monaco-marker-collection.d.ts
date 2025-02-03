import { Diagnostic } from '@theia/core/shared/vscode-languageserver-protocol';
import { ProtocolToMonacoConverter } from './protocol-to-monaco-converter';
import * as monaco from '@theia/monaco-editor-core';
import { Marker } from '@theia/markers/lib/common/marker';
import URI from '@theia/core/lib/common/uri';
export declare class MonacoMarkerCollection {
    protected readonly uri: monaco.Uri;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected markers: Marker<Diagnostic>[];
    protected owners: Map<string, Diagnostic[]>;
    protected didUpdate: boolean;
    constructor(uri: URI, p2m: ProtocolToMonacoConverter);
    updateMarkers(markers: Marker<Diagnostic>[]): void;
    updateModelMarkers(model: monaco.editor.ITextModel): void;
    doUpdateMarkers(model: monaco.editor.ITextModel | undefined): void;
    setModelMarkers(model: monaco.editor.ITextModel, owner: string, diagnostics: Diagnostic[]): void;
    clearModelMarkers(model: monaco.editor.ITextModel, owner: string): void;
}
//# sourceMappingURL=monaco-marker-collection.d.ts.map