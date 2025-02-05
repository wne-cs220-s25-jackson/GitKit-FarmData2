"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentDropEditAdapter = void 0;
const Converter = require("../type-converters");
const vscode_uri_1 = require("@theia/core/shared/vscode-uri");
const os = require("os");
const path = require("path");
class DocumentDropEditAdapter {
    constructor(provider, documents, fileSystem) {
        this.provider = provider;
        this.documents = documents;
        this.fileSystem = fileSystem;
    }
    async provideDocumentDropEdits(resource, position, dataTransfer, token) {
        return this.provider.provideDocumentDropEdits(this.documents.getDocument(resource), Converter.toPosition(position), Converter.DataTransfer.toDataTransfer(dataTransfer, itemId => this.resolveFileData(itemId)), token);
    }
    async resolveFileData(itemId) {
        const filePath = vscode_uri_1.URI.file(path.resolve(os.tmpdir(), 'theia_upload', itemId));
        return this.fileSystem.fileSystem.readFile(filePath);
    }
}
exports.DocumentDropEditAdapter = DocumentDropEditAdapter;
//# sourceMappingURL=document-drop-edit.js.map