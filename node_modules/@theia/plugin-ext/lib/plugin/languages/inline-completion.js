"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.InlineCompletionAdapter = exports.InlineCompletionAdapterBase = void 0;
const Converter = require("../type-converters");
const reference_map_1 = require("../../common/reference-map");
const disposable_1 = require("@theia/core/lib/common/disposable");
const types_impl_1 = require("../../plugin/types-impl");
const plugin_api_rpc_model_1 = require("../../common/plugin-api-rpc-model");
class InlineCompletionAdapterBase {
    async provideInlineCompletions(_resource, _position, _context, _token) {
        return undefined;
    }
    disposeCompletions(pid) { return; }
    ;
}
exports.InlineCompletionAdapterBase = InlineCompletionAdapterBase;
class InlineCompletionAdapter extends InlineCompletionAdapterBase {
    constructor(documents, provider, commands) {
        super();
        this.documents = documents;
        this.provider = provider;
        this.commands = commands;
        this.references = new reference_map_1.ReferenceMap();
        this.languageTriggerKindToVSCodeTriggerKind = {
            [plugin_api_rpc_model_1.InlineCompletionTriggerKind.Automatic]: types_impl_1.InlineCompletionTriggerKind.Automatic,
            [plugin_api_rpc_model_1.InlineCompletionTriggerKind.Explicit]: types_impl_1.InlineCompletionTriggerKind.Invoke,
        };
    }
    async provideInlineCompletions(resource, position, context, token) {
        const doc = this.documents.getDocument(resource);
        const pos = Converter.toPosition(position);
        const result = await this.provider.provideInlineCompletionItems(doc, pos, {
            selectedCompletionInfo: context.selectedSuggestionInfo
                ? {
                    range: Converter.toRange(context.selectedSuggestionInfo.range),
                    text: context.selectedSuggestionInfo.text
                }
                : undefined,
            triggerKind: this.languageTriggerKindToVSCodeTriggerKind[context.triggerKind]
        }, token);
        if (!result || token.isCancellationRequested) {
            return undefined;
        }
        const normalizedResult = Array.isArray(result) ? result : result.items;
        let disposableCollection = undefined;
        const pid = this.references.createReferenceId({
            dispose() {
                disposableCollection === null || disposableCollection === void 0 ? void 0 : disposableCollection.dispose();
            },
            items: normalizedResult
        });
        return {
            pid,
            items: normalizedResult.map((item, idx) => {
                let command = undefined;
                if (item.command) {
                    if (!disposableCollection) {
                        disposableCollection = new disposable_1.DisposableCollection();
                    }
                    command = this.commands.converter.toSafeCommand(item.command, disposableCollection);
                }
                const insertText = item.insertText;
                return ({
                    insertText: typeof insertText === 'string' ? insertText : { snippet: insertText.value },
                    filterText: item.filterText,
                    range: item.range ? Converter.fromRange(item.range) : undefined,
                    command,
                    idx: idx
                });
            })
        };
    }
    disposeCompletions(pid) {
        const data = this.references.disposeReferenceId(pid);
        data === null || data === void 0 ? void 0 : data.dispose();
    }
}
exports.InlineCompletionAdapter = InlineCompletionAdapter;
//# sourceMappingURL=inline-completion.js.map