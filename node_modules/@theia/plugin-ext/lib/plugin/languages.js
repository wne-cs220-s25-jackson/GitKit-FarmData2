"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguagesExtImpl = void 0;
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const types_impl_1 = require("./types-impl");
const completion_1 = require("./languages/completion");
const diagnostics_1 = require("./languages/diagnostics");
const signature_1 = require("./languages/signature");
const hover_1 = require("./languages/hover");
const evaluatable_expression_1 = require("./languages/evaluatable-expression");
const inline_values_1 = require("./languages/inline-values");
const document_highlight_1 = require("./languages/document-highlight");
const document_formatting_1 = require("./languages/document-formatting");
const range_formatting_1 = require("./languages/range-formatting");
const on_type_formatting_1 = require("./languages/on-type-formatting");
const definition_1 = require("./languages/definition");
const implementation_1 = require("./languages/implementation");
const type_definition_1 = require("./languages/type-definition");
const code_action_1 = require("./languages/code-action");
const link_provider_1 = require("./languages/link-provider");
const lens_1 = require("./languages/lens");
const outline_1 = require("./languages/outline");
const reference_1 = require("./languages/reference");
const workspace_symbol_1 = require("./languages/workspace-symbol");
const folding_1 = require("./languages/folding");
const selection_range_1 = require("./languages/selection-range");
const color_1 = require("./languages/color");
const rename_1 = require("./languages/rename");
const declaration_1 = require("./languages/declaration");
const call_hierarchy_1 = require("./languages/call-hierarchy");
const type_hierarchy_1 = require("./languages/type-hierarchy");
const semantic_highlighting_1 = require("./languages/semantic-highlighting");
const arrays_1 = require("../common/arrays");
const disposable_1 = require("@theia/core/lib/common/disposable");
const severity_1 = require("@theia/core/lib/common/severity");
const linked_editing_range_1 = require("./languages/linked-editing-range");
const languages_utils_1 = require("./languages-utils");
const inlay_hints_1 = require("./languages/inlay-hints");
const inline_completion_1 = require("./languages/inline-completion");
const document_drop_edit_1 = require("./languages/document-drop-edit");
class LanguagesExtImpl {
    constructor(rpc, documents, commands, filesSystem) {
        this.documents = documents;
        this.commands = commands;
        this.filesSystem = filesSystem;
        this.callId = 0;
        this.adaptersMap = new Map();
        // Copied from https://github.com/microsoft/vscode/blob/7d9b1c37f8e5ae3772782ba3b09d827eb3fdd833/src/vs/workbench/api/common/extHostLanguages.ts
        this.statusItemHandlePool = 0;
        this.statusItemIds = new Set();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.LANGUAGES_MAIN);
        this.diagnostics = new diagnostics_1.Diagnostics(rpc);
        filesSystem.onWillRegisterFileSystemProvider(linkProvider => this.registerLinkProviderIfNotYetRegistered(linkProvider));
    }
    dispose() {
        if (this.linkProviderRegistration) {
            this.linkProviderRegistration.dispose();
        }
    }
    get onDidChangeDiagnostics() {
        return this.diagnostics.onDidChangeDiagnostics;
    }
    getLanguages() {
        return this.proxy.$getLanguages();
    }
    changeLanguage(uri, languageId) {
        return this.proxy.$changeLanguage(uri, languageId).then(() => {
            const doc = this.documents.getDocumentData(uri);
            if (!doc) {
                throw new Error('No document found by URI ' + uri.toString());
            }
            return doc.document;
        });
    }
    setLanguageConfiguration(language, configuration) {
        const { wordPattern } = configuration;
        if (wordPattern) {
            this.documents.setWordDefinitionFor(language, wordPattern);
        }
        else {
            this.documents.setWordDefinitionFor(language, null);
        }
        const callId = this.nextCallId();
        const config = {
            brackets: configuration.brackets,
            comments: configuration.comments,
            onEnterRules: (0, languages_utils_1.serializeEnterRules)(configuration.onEnterRules),
            wordPattern: (0, languages_utils_1.serializeRegExp)(configuration.wordPattern),
            indentationRules: (0, languages_utils_1.serializeIndentation)(configuration.indentationRules),
            autoClosingPairs: (0, languages_utils_1.serializeAutoClosingPairs)(configuration.autoClosingPairs)
        };
        this.proxy.$setLanguageConfiguration(callId, language, config);
        return this.createDisposable(callId);
    }
    nextCallId() {
        return this.callId++;
    }
    createDisposable(callId, onDispose) {
        return new types_impl_1.Disposable(() => {
            this.adaptersMap.delete(callId);
            this.proxy.$unregister(callId);
            onDispose === null || onDispose === void 0 ? void 0 : onDispose();
        });
    }
    addNewAdapter(adapter) {
        const callId = this.nextCallId();
        this.adaptersMap.set(callId, adapter);
        return callId;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async withAdapter(handle, ctor, callback, fallbackValue) {
        const adapter = this.adaptersMap.get(handle);
        if (!adapter) {
            return fallbackValue;
        }
        if (adapter instanceof ctor) {
            return callback(adapter);
        }
        throw new Error('no adapter found');
    }
    transformDocumentSelector(selector) {
        if ((0, arrays_1.isReadonlyArray)(selector)) {
            return selector.map(sel => this.doTransformDocumentSelector(sel));
        }
        return [this.doTransformDocumentSelector(selector)];
    }
    doTransformDocumentSelector(selector) {
        if (typeof selector === 'string') {
            return {
                $serialized: true,
                language: selector
            };
        }
        if (selector) {
            return {
                $serialized: true,
                language: selector.language,
                scheme: selector.scheme,
                pattern: selector.pattern,
                notebookType: selector.notebookType
            };
        }
        return undefined;
    }
    registerLinkProviderIfNotYetRegistered(linkProvider) {
        if (!this.linkProviderRegistration) {
            this.linkProviderRegistration = this.registerDocumentLinkProvider('*', linkProvider, {
                id: 'theia.fs-ext-impl',
                name: 'fs-ext-impl'
            });
        }
    }
    // ### Completion begin
    $provideCompletionItems(handle, resource, position, context, token) {
        return this.withAdapter(handle, completion_1.CompletionAdapter, adapter => adapter.provideCompletionItems(types_impl_1.URI.revive(resource), position, context, token), undefined);
    }
    $resolveCompletionItem(handle, chainedId, token) {
        return this.withAdapter(handle, completion_1.CompletionAdapter, adapter => adapter.resolveCompletionItem(chainedId, token), undefined);
    }
    $releaseCompletionItems(handle, id) {
        this.withAdapter(handle, completion_1.CompletionAdapter, async (adapter) => adapter.releaseCompletionItems(id), undefined);
    }
    registerCompletionItemProvider(selector, provider, triggerCharacters, pluginInfo) {
        const callId = this.addNewAdapter(new completion_1.CompletionAdapter(provider, this.documents, this.commands));
        this.proxy.$registerCompletionSupport(callId, pluginInfo, this.transformDocumentSelector(selector), triggerCharacters, completion_1.CompletionAdapter.hasResolveSupport(provider));
        return this.createDisposable(callId);
    }
    // ### Completion end
    // ### Inline completion provider begin
    registerInlineCompletionsProvider(selector, provider) {
        const callId = this.addNewAdapter(new inline_completion_1.InlineCompletionAdapter(this.documents, provider, this.commands));
        this.proxy.$registerInlineCompletionsSupport(callId, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideInlineCompletions(handle, resource, position, context, token) {
        return this.withAdapter(handle, inline_completion_1.InlineCompletionAdapterBase, adapter => adapter.provideInlineCompletions(types_impl_1.URI.revive(resource), position, context, token), undefined);
    }
    $freeInlineCompletionsList(handle, pid) {
        this.withAdapter(handle, inline_completion_1.InlineCompletionAdapterBase, async (adapter) => { adapter.disposeCompletions(pid); }, undefined);
    }
    // ### Inline completion provider end
    // ### Definition provider begin
    $provideDefinition(handle, resource, position, token) {
        return this.withAdapter(handle, definition_1.DefinitionAdapter, adapter => adapter.provideDefinition(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    registerDefinitionProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new definition_1.DefinitionAdapter(provider, this.documents));
        this.proxy.$registerDefinitionProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    // ### Definition provider end
    // ### Declaration provider begin
    $provideDeclaration(handle, resource, position, token) {
        return this.withAdapter(handle, declaration_1.DeclarationAdapter, adapter => adapter.provideDeclaration(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    registerDeclarationProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new declaration_1.DeclarationAdapter(provider, this.documents));
        this.proxy.$registerDeclarationProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    // ### Declaration provider end
    // ### Signature help begin
    $provideSignatureHelp(handle, resource, position, context, token) {
        return this.withAdapter(handle, signature_1.SignatureHelpAdapter, adapter => adapter.provideSignatureHelp(types_impl_1.URI.revive(resource), position, token, context), undefined);
    }
    $releaseSignatureHelp(handle, id) {
        this.withAdapter(handle, signature_1.SignatureHelpAdapter, async (adapter) => adapter.releaseSignatureHelp(id), undefined);
    }
    registerSignatureHelpProvider(selector, provider, metadata, pluginInfo) {
        const callId = this.addNewAdapter(new signature_1.SignatureHelpAdapter(provider, this.documents));
        this.proxy.$registerSignatureHelpProvider(callId, pluginInfo, this.transformDocumentSelector(selector), metadata);
        return this.createDisposable(callId);
    }
    // ### Signature help end
    // ### Diagnostics begin
    getDiagnostics(resource) {
        return this.diagnostics.getDiagnostics(resource);
    }
    createDiagnosticCollection(name) {
        return this.diagnostics.createDiagnosticCollection(name);
    }
    // ### Diagnostics end
    // ### Implementation provider begin
    $provideImplementation(handle, resource, position, token) {
        return this.withAdapter(handle, implementation_1.ImplementationAdapter, adapter => adapter.provideImplementation(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    registerImplementationProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new implementation_1.ImplementationAdapter(provider, this.documents));
        this.proxy.$registerImplementationProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    // ### Implementation provider end
    // ### Type Definition provider begin
    $provideTypeDefinition(handle, resource, position, token) {
        return this.withAdapter(handle, type_definition_1.TypeDefinitionAdapter, adapter => adapter.provideTypeDefinition(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    registerTypeDefinitionProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new type_definition_1.TypeDefinitionAdapter(provider, this.documents));
        this.proxy.$registerTypeDefinitionProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    // ### Type Definition provider end
    // ### Hover Provider begin
    registerHoverProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new hover_1.HoverAdapter(provider, this.documents));
        this.proxy.$registerHoverProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideHover(handle, resource, position, token) {
        return this.withAdapter(handle, hover_1.HoverAdapter, adapter => adapter.provideHover(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    // ### Hover Provider end
    // ### EvaluatableExpression Provider begin
    registerEvaluatableExpressionProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new evaluatable_expression_1.EvaluatableExpressionAdapter(provider, this.documents));
        this.proxy.$registerEvaluatableExpressionProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideEvaluatableExpression(handle, resource, position, token) {
        return this.withAdapter(handle, evaluatable_expression_1.EvaluatableExpressionAdapter, adapter => adapter.provideEvaluatableExpression(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    // ### EvaluatableExpression Provider end
    // ### InlineValues Provider begin
    registerInlineValuesProvider(selector, provider, pluginInfo) {
        const eventHandle = typeof provider.onDidChangeInlineValues === 'function' ? this.nextCallId() : undefined;
        const callId = this.addNewAdapter(new inline_values_1.InlineValuesAdapter(provider, this.documents));
        this.proxy.$registerInlineValuesProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        let result = this.createDisposable(callId);
        if (eventHandle !== undefined) {
            const subscription = provider.onDidChangeInlineValues(_ => this.proxy.$emitInlineValuesEvent(eventHandle));
            result = types_impl_1.Disposable.from(result, subscription);
        }
        return result;
    }
    $provideInlineValues(handle, resource, range, context, token) {
        return this.withAdapter(handle, inline_values_1.InlineValuesAdapter, adapter => adapter.provideInlineValues(types_impl_1.URI.revive(resource), range, context, token), undefined);
    }
    // ### InlineValue Provider end
    // ### Document Highlight Provider begin
    registerDocumentHighlightProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new document_highlight_1.DocumentHighlightAdapter(provider, this.documents));
        this.proxy.$registerDocumentHighlightProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideDocumentHighlights(handle, resource, position, token) {
        return this.withAdapter(handle, document_highlight_1.DocumentHighlightAdapter, adapter => adapter.provideDocumentHighlights(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    // ### Document Highlight Provider end
    // ### WorkspaceSymbol Provider begin
    registerWorkspaceSymbolProvider(provider, pluginInfo) {
        const callId = this.addNewAdapter(new workspace_symbol_1.WorkspaceSymbolAdapter(provider));
        this.proxy.$registerWorkspaceSymbolProvider(callId, pluginInfo);
        return this.createDisposable(callId);
    }
    $provideWorkspaceSymbols(handle, query, token) {
        return this.withAdapter(handle, workspace_symbol_1.WorkspaceSymbolAdapter, adapter => adapter.provideWorkspaceSymbols(query, token), []);
    }
    $resolveWorkspaceSymbol(handle, symbol, token) {
        return this.withAdapter(handle, workspace_symbol_1.WorkspaceSymbolAdapter, adapter => adapter.resolveWorkspaceSymbol(symbol, token), undefined);
    }
    // ### WorkspaceSymbol Provider end
    // ### Document Formatting Edit begin
    registerDocumentFormattingEditProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new document_formatting_1.DocumentFormattingAdapter(provider, this.documents));
        this.proxy.$registerDocumentFormattingSupport(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideDocumentFormattingEdits(handle, resource, options, token) {
        return this.withAdapter(handle, document_formatting_1.DocumentFormattingAdapter, adapter => adapter.provideDocumentFormattingEdits(types_impl_1.URI.revive(resource), options, token), undefined);
    }
    // ### Document Formatting Edit end
    // ### Drop Edit Provider start
    $provideDocumentDropEdits(handle, resource, position, dataTransfer, token) {
        return this.withAdapter(handle, document_drop_edit_1.DocumentDropEditAdapter, adapter => adapter.provideDocumentDropEdits(types_impl_1.URI.revive(resource), position, dataTransfer, token), undefined);
    }
    registerDocumentDropEditProvider(selector, provider, metadata) {
        const callId = this.addNewAdapter(new document_drop_edit_1.DocumentDropEditAdapter(provider, this.documents, this.filesSystem));
        this.proxy.$registerDocumentDropEditProvider(callId, this.transformDocumentSelector(selector), metadata);
        return this.createDisposable(callId);
    }
    // ### Drop Edit Provider end
    // ### Document Range Formatting Edit begin
    registerDocumentRangeFormattingEditProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new range_formatting_1.RangeFormattingAdapter(provider, this.documents));
        this.proxy.$registerRangeFormattingSupport(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideDocumentRangeFormattingEdits(handle, resource, range, options, token) {
        return this.withAdapter(handle, range_formatting_1.RangeFormattingAdapter, adapter => adapter.provideDocumentRangeFormattingEdits(types_impl_1.URI.revive(resource), range, options, token), undefined);
    }
    // ### Document Range Formatting Edit end
    // ### On Type Formatting Edit begin
    registerOnTypeFormattingEditProvider(selector, provider, triggerCharacters, pluginInfo) {
        const callId = this.addNewAdapter(new on_type_formatting_1.OnTypeFormattingAdapter(provider, this.documents));
        this.proxy.$registerOnTypeFormattingProvider(callId, pluginInfo, this.transformDocumentSelector(selector), triggerCharacters);
        return this.createDisposable(callId);
    }
    $provideOnTypeFormattingEdits(handle, resource, position, ch, options, token) {
        return this.withAdapter(handle, on_type_formatting_1.OnTypeFormattingAdapter, adapter => adapter.provideOnTypeFormattingEdits(types_impl_1.URI.revive(resource), position, ch, options, token), undefined);
    }
    // ### On Type Formatting Edit end
    // ### Document Link Provider begin
    $provideDocumentLinks(handle, resource, token) {
        return this.withAdapter(handle, link_provider_1.LinkProviderAdapter, adapter => adapter.provideLinks(types_impl_1.URI.revive(resource), token), undefined);
    }
    $resolveDocumentLink(handle, link, token) {
        return this.withAdapter(handle, link_provider_1.LinkProviderAdapter, adapter => adapter.resolveLink(link, token), undefined);
    }
    registerDocumentLinkProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new link_provider_1.LinkProviderAdapter(provider, this.documents));
        this.proxy.$registerDocumentLinkProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $releaseDocumentLinks(handle, ids) {
        this.withAdapter(handle, link_provider_1.LinkProviderAdapter, async (adapter) => adapter.releaseDocumentLinks(ids), undefined);
    }
    // ### Document Link Provider end
    // ### Code Actions Provider begin
    registerCodeActionsProvider(selector, provider, pluginModel, pluginInfo, metadata) {
        const callId = this.addNewAdapter(new code_action_1.CodeActionAdapter(provider, this.documents, this.diagnostics, pluginModel ? pluginModel.id : '', this.commands));
        let documentation;
        let disposables;
        if (metadata && metadata.documentation) {
            disposables = new disposable_1.DisposableCollection();
            documentation = metadata.documentation.map(doc => ({
                kind: doc.kind.value,
                command: this.commands.converter.toSafeCommand(doc.command, disposables)
            }));
        }
        this.proxy.$registerQuickFixProvider(callId, pluginInfo, this.transformDocumentSelector(selector), metadata && metadata.providedCodeActionKinds ? metadata.providedCodeActionKinds.map(kind => kind.value) : undefined, documentation);
        return this.createDisposable(callId, disposables === null || disposables === void 0 ? void 0 : disposables.dispose);
    }
    $provideCodeActions(handle, resource, rangeOrSelection, context, token) {
        return this.withAdapter(handle, code_action_1.CodeActionAdapter, adapter => adapter.provideCodeAction(types_impl_1.URI.revive(resource), rangeOrSelection, context, token), undefined);
    }
    $releaseCodeActions(handle, cacheIds) {
        this.withAdapter(handle, code_action_1.CodeActionAdapter, adapter => adapter.releaseCodeActions(cacheIds), undefined);
    }
    $resolveCodeAction(handle, cacheId, token) {
        return this.withAdapter(handle, code_action_1.CodeActionAdapter, adapter => adapter.resolveCodeAction(cacheId, token), undefined);
    }
    ;
    // ### Code Actions Provider end
    // ### Code Lens Provider begin
    registerCodeLensProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new lens_1.CodeLensAdapter(provider, this.documents, this.commands));
        const eventHandle = typeof provider.onDidChangeCodeLenses === 'function' ? this.nextCallId() : undefined;
        this.proxy.$registerCodeLensSupport(callId, pluginInfo, this.transformDocumentSelector(selector), eventHandle);
        let result = this.createDisposable(callId);
        if (eventHandle !== undefined && provider.onDidChangeCodeLenses) {
            const subscription = provider.onDidChangeCodeLenses(e => this.proxy.$emitCodeLensEvent(eventHandle));
            result = types_impl_1.Disposable.from(result, subscription);
        }
        return result;
    }
    $provideCodeLenses(handle, resource, token) {
        return this.withAdapter(handle, lens_1.CodeLensAdapter, adapter => adapter.provideCodeLenses(types_impl_1.URI.revive(resource), token), undefined);
    }
    $resolveCodeLens(handle, resource, symbol, token) {
        return this.withAdapter(handle, lens_1.CodeLensAdapter, adapter => adapter.resolveCodeLens(types_impl_1.URI.revive(resource), symbol, token), undefined);
    }
    $releaseCodeLenses(handle, ids) {
        this.withAdapter(handle, lens_1.CodeLensAdapter, async (adapter) => adapter.releaseCodeLenses(ids), undefined);
    }
    // ### Code Lens Provider end
    // ### Code Reference Provider begin
    $provideReferences(handle, resource, position, context, token) {
        return this.withAdapter(handle, reference_1.ReferenceAdapter, adapter => adapter.provideReferences(types_impl_1.URI.revive(resource), position, context, token), undefined);
    }
    registerReferenceProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new reference_1.ReferenceAdapter(provider, this.documents));
        this.proxy.$registerReferenceProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    // ### Code Reference Provider end
    // ### Document Symbol Provider begin
    registerDocumentSymbolProvider(selector, provider, pluginInfo, metadata) {
        const callId = this.addNewAdapter(new outline_1.OutlineAdapter(this.documents, provider));
        const displayName = (metadata && metadata.label) || getPluginLabel(pluginInfo);
        this.proxy.$registerOutlineSupport(callId, pluginInfo, this.transformDocumentSelector(selector), displayName);
        return this.createDisposable(callId);
    }
    $provideDocumentSymbols(handle, resource, token) {
        return this.withAdapter(handle, outline_1.OutlineAdapter, adapter => adapter.provideDocumentSymbols(types_impl_1.URI.revive(resource), token), undefined);
    }
    // ### Document Symbol Provider end
    // ### Color Provider begin
    registerColorProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new color_1.ColorProviderAdapter(this.documents, provider));
        this.proxy.$registerDocumentColorProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideDocumentColors(handle, resource, token) {
        return this.withAdapter(handle, color_1.ColorProviderAdapter, adapter => adapter.provideColors(types_impl_1.URI.revive(resource), token), []);
    }
    $provideColorPresentations(handle, resource, colorInfo, token) {
        return this.withAdapter(handle, color_1.ColorProviderAdapter, adapter => adapter.provideColorPresentations(types_impl_1.URI.revive(resource), colorInfo, token), []);
    }
    // ### Color Provider end
    // ### InlayHints Provider begin
    registerInlayHintsProvider(selector, provider, pluginInfo) {
        const eventHandle = typeof provider.onDidChangeInlayHints === 'function' ? this.nextCallId() : undefined;
        const callId = this.addNewAdapter(new inlay_hints_1.InlayHintsAdapter(provider, this.documents, this.commands));
        this.proxy.$registerInlayHintsProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        let result = this.createDisposable(callId);
        if (eventHandle !== undefined) {
            const subscription = provider.onDidChangeInlayHints(() => this.proxy.$emitInlayHintsEvent(eventHandle));
            result = types_impl_1.Disposable.from(result, subscription);
        }
        return result;
    }
    $provideInlayHints(handle, resource, range, token) {
        return this.withAdapter(handle, inlay_hints_1.InlayHintsAdapter, adapter => adapter.provideInlayHints(types_impl_1.URI.revive(resource), range, token), undefined);
    }
    $resolveInlayHint(handle, id, token) {
        return this.withAdapter(handle, inlay_hints_1.InlayHintsAdapter, adapter => adapter.resolveInlayHint(id, token), undefined);
    }
    $releaseInlayHints(handle, id) {
        this.withAdapter(handle, inlay_hints_1.InlayHintsAdapter, async (adapter) => adapter.releaseHints(id), undefined);
    }
    // ### InlayHints Provider end
    // ### Folding Range Provider begin
    registerFoldingRangeProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new folding_1.FoldingProviderAdapter(provider, this.documents));
        const eventHandle = typeof provider.onDidChangeFoldingRanges === 'function' ? this.nextCallId() : undefined;
        this.proxy.$registerFoldingRangeProvider(callId, pluginInfo, this.transformDocumentSelector(selector), eventHandle);
        let result = this.createDisposable(callId);
        if (eventHandle !== undefined) {
            const subscription = provider.onDidChangeFoldingRanges(() => this.proxy.$emitFoldingRangeEvent(eventHandle));
            result = types_impl_1.Disposable.from(result, subscription);
        }
        return result;
    }
    $provideFoldingRange(callId, resource, context, token) {
        return this.withAdapter(callId, folding_1.FoldingProviderAdapter, adapter => adapter.provideFoldingRanges(types_impl_1.URI.revive(resource), context, token), undefined);
    }
    // ### Folding Range Provider end
    registerSelectionRangeProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new selection_range_1.SelectionRangeProviderAdapter(provider, this.documents));
        this.proxy.$registerSelectionRangeProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideSelectionRanges(handle, resource, positions, token) {
        return this.withAdapter(handle, selection_range_1.SelectionRangeProviderAdapter, adapter => adapter.provideSelectionRanges(types_impl_1.URI.revive(resource), positions, token), []);
    }
    // ### Rename Provider begin
    registerRenameProvider(selector, provider, pluginInfo) {
        const callId = this.addNewAdapter(new rename_1.RenameAdapter(provider, this.documents));
        this.proxy.$registerRenameProvider(callId, pluginInfo, this.transformDocumentSelector(selector), rename_1.RenameAdapter.supportsResolving(provider));
        return this.createDisposable(callId);
    }
    $provideRenameEdits(handle, resource, position, newName, token) {
        return this.withAdapter(handle, rename_1.RenameAdapter, adapter => adapter.provideRenameEdits(types_impl_1.URI.revive(resource), position, newName, token), undefined);
    }
    $resolveRenameLocation(handle, resource, position, token) {
        return this.withAdapter(handle, rename_1.RenameAdapter, adapter => adapter.resolveRenameLocation(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    // ### Rename Provider end
    // ### Call Hierarchy Provider begin
    registerCallHierarchyProvider(selector, provider) {
        const callId = this.addNewAdapter(new call_hierarchy_1.CallHierarchyAdapter(provider, this.documents));
        this.proxy.$registerCallHierarchyProvider(callId, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $provideRootDefinition(handle, resource, location, token) {
        return this.withAdapter(handle, call_hierarchy_1.CallHierarchyAdapter, adapter => adapter.provideRootDefinition(types_impl_1.URI.revive(resource), location, token), undefined);
    }
    $provideCallers(handle, definition, token) {
        return this.withAdapter(handle, call_hierarchy_1.CallHierarchyAdapter, adapter => adapter.provideCallers(definition, token), undefined);
    }
    $provideCallees(handle, definition, token) {
        return this.withAdapter(handle, call_hierarchy_1.CallHierarchyAdapter, adapter => adapter.provideCallees(definition, token), undefined);
    }
    $releaseCallHierarchy(handle, session) {
        return this.withAdapter(handle, call_hierarchy_1.CallHierarchyAdapter, adapter => adapter.releaseSession(session), false);
    }
    // ### Call Hierarchy Provider end
    // ### Type hierarchy Provider begin
    registerTypeHierarchyProvider(selector, provider) {
        const callId = this.addNewAdapter(new type_hierarchy_1.TypeHierarchyAdapter(provider, this.documents));
        this.proxy.$registerTypeHierarchyProvider(callId, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    }
    $prepareTypeHierarchy(handle, resource, location, token) {
        return this.withAdapter(handle, type_hierarchy_1.TypeHierarchyAdapter, adapter => adapter.prepareSession(types_impl_1.URI.revive(resource), location, token), undefined);
    }
    $provideSuperTypes(handle, sessionId, itemId, token) {
        return this.withAdapter(handle, type_hierarchy_1.TypeHierarchyAdapter, adapter => adapter.provideSupertypes(sessionId, itemId, token), undefined);
    }
    $provideSubTypes(handle, sessionId, itemId, token) {
        return this.withAdapter(handle, type_hierarchy_1.TypeHierarchyAdapter, adapter => adapter.provideSubtypes(sessionId, itemId, token), undefined);
    }
    $releaseTypeHierarchy(handle, session) {
        return this.withAdapter(handle, type_hierarchy_1.TypeHierarchyAdapter, adapter => adapter.releaseSession(session), false);
    }
    // ### Type hierarchy Provider end
    // ### Linked Editing Range Provider begin
    registerLinkedEditingRangeProvider(selector, provider) {
        const handle = this.addNewAdapter(new linked_editing_range_1.LinkedEditingRangeAdapter(this.documents, provider));
        this.proxy.$registerLinkedEditingRangeProvider(handle, this.transformDocumentSelector(selector));
        return this.createDisposable(handle);
    }
    $provideLinkedEditingRanges(handle, resource, position, token) {
        return this.withAdapter(handle, linked_editing_range_1.LinkedEditingRangeAdapter, async (adapter) => adapter.provideRanges(types_impl_1.URI.revive(resource), position, token), undefined);
    }
    // ### Linked Editing Range Provider end
    // #region semantic coloring
    registerDocumentSemanticTokensProvider(selector, provider, legend, pluginInfo) {
        const eventHandle = (typeof provider.onDidChangeSemanticTokens === 'function' ? this.nextCallId() : undefined);
        const handle = this.addNewAdapter(new semantic_highlighting_1.DocumentSemanticTokensAdapter(this.documents, provider));
        this.proxy.$registerDocumentSemanticTokensProvider(handle, pluginInfo, this.transformDocumentSelector(selector), legend, eventHandle);
        let result = this.createDisposable(handle);
        if (eventHandle) {
            // eslint-disable-next-line no-unsanitized/method
            const subscription = provider.onDidChangeSemanticTokens(_ => this.proxy.$emitDocumentSemanticTokensEvent(eventHandle));
            result = types_impl_1.Disposable.from(result, subscription);
        }
        return result;
    }
    $provideDocumentSemanticTokens(handle, resource, previousResultId, token) {
        return this.withAdapter(handle, semantic_highlighting_1.DocumentSemanticTokensAdapter, adapter => adapter.provideDocumentSemanticTokens(types_impl_1.URI.revive(resource), previousResultId, token), null);
    }
    $releaseDocumentSemanticTokens(handle, semanticColoringResultId) {
        this.withAdapter(handle, semantic_highlighting_1.DocumentSemanticTokensAdapter, adapter => adapter.releaseDocumentSemanticColoring(semanticColoringResultId), undefined);
    }
    registerDocumentRangeSemanticTokensProvider(selector, provider, legend, pluginInfo) {
        const handle = this.addNewAdapter(new semantic_highlighting_1.DocumentRangeSemanticTokensAdapter(this.documents, provider));
        this.proxy.$registerDocumentRangeSemanticTokensProvider(handle, pluginInfo, this.transformDocumentSelector(selector), legend);
        return this.createDisposable(handle);
    }
    $provideDocumentRangeSemanticTokens(handle, resource, range, token) {
        return this.withAdapter(handle, semantic_highlighting_1.DocumentRangeSemanticTokensAdapter, adapter => adapter.provideDocumentRangeSemanticTokens(types_impl_1.URI.revive(resource), range, token), null);
    }
    createLanguageStatusItem(extension, id, selector) {
        var _a;
        const handle = this.statusItemHandlePool++;
        const proxy = this.proxy;
        const ids = this.statusItemIds;
        // enforce extension unique identifier
        const fullyQualifiedId = `${extension.model.id}/${id}`;
        if (ids.has(fullyQualifiedId)) {
            throw new Error(`LanguageStatusItem with id '${id}' ALREADY exists`);
        }
        ids.add(fullyQualifiedId);
        const data = {
            selector,
            id,
            name: (_a = extension.model.displayName) !== null && _a !== void 0 ? _a : extension.model.name,
            severity: types_impl_1.LanguageStatusSeverity.Information,
            command: undefined,
            text: '',
            detail: '',
            busy: false
        };
        let soonHandle;
        const commandDisposables = new disposable_1.DisposableCollection();
        const updateAsync = () => {
            soonHandle === null || soonHandle === void 0 ? void 0 : soonHandle.dispose();
            soonHandle = (0, disposable_1.disposableTimeout)(() => {
                var _a, _b, _c, _d;
                commandDisposables.dispose();
                commandDisposables.push({ dispose: () => { } }); // Mark disposable as undisposed.
                this.proxy.$setLanguageStatus(handle, {
                    id: fullyQualifiedId,
                    name: (_b = (_a = data.name) !== null && _a !== void 0 ? _a : extension.model.displayName) !== null && _b !== void 0 ? _b : extension.model.name,
                    source: (_c = extension.model.displayName) !== null && _c !== void 0 ? _c : extension.model.name,
                    selector: this.transformDocumentSelector(data.selector),
                    label: data.text,
                    detail: (_d = data.detail) !== null && _d !== void 0 ? _d : '',
                    severity: data.severity === types_impl_1.LanguageStatusSeverity.Error ? severity_1.Severity.Error : data.severity === types_impl_1.LanguageStatusSeverity.Warning ? severity_1.Severity.Warning : severity_1.Severity.Info,
                    command: data.command && this.commands.converter.toSafeCommand(data.command, commandDisposables),
                    accessibilityInfo: data.accessibilityInformation,
                    busy: data.busy
                });
            }, 0);
        };
        const result = {
            dispose() {
                commandDisposables.dispose();
                soonHandle === null || soonHandle === void 0 ? void 0 : soonHandle.dispose();
                proxy.$removeLanguageStatus(handle);
                ids.delete(fullyQualifiedId);
            },
            get id() {
                return data.id;
            },
            get name() {
                return data.name;
            },
            set name(value) {
                data.name = value;
                updateAsync();
            },
            get selector() {
                return data.selector;
            },
            set selector(value) {
                data.selector = value;
                updateAsync();
            },
            get text() {
                return data.text;
            },
            set text(value) {
                data.text = value;
                updateAsync();
            },
            get detail() {
                return data.detail;
            },
            set detail(value) {
                data.detail = value;
                updateAsync();
            },
            get severity() {
                return data.severity;
            },
            set severity(value) {
                data.severity = value;
                updateAsync();
            },
            get accessibilityInformation() {
                return data.accessibilityInformation;
            },
            set accessibilityInformation(value) {
                data.accessibilityInformation = value;
                updateAsync();
            },
            get command() {
                return data.command;
            },
            set command(value) {
                data.command = value;
                updateAsync();
            },
            get busy() {
                return data.busy;
            },
            set busy(value) {
                data.busy = value;
                updateAsync();
            }
        };
        updateAsync();
        return result;
    }
    // #endregion
    // region DocumentPaste
    /** @stubbed */
    registerDocumentPasteEditProvider(extension, selector, provider, metadata) {
        return types_impl_1.Disposable.NULL;
    }
}
exports.LanguagesExtImpl = LanguagesExtImpl;
function getPluginLabel(pluginInfo) {
    return pluginInfo.displayName || pluginInfo.name;
}
//# sourceMappingURL=languages.js.map