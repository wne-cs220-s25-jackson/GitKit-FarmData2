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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlayHintsAdapter = void 0;
const Converter = require("../type-converters");
const cache_1 = require("../../common/cache");
const disposable_1 = require("@theia/core/lib/common/disposable");
const util_1 = require("./util");
class InlayHintsAdapter {
    constructor(provider, documents, commands) {
        this.provider = provider;
        this.documents = documents;
        this.commands = commands;
        this.cache = new cache_1.Cache('InlayHints');
        this.disposables = new Map();
    }
    async provideInlayHints(resource, range, token) {
        const documentData = this.documents.getDocumentData(resource);
        if (!documentData) {
            return Promise.reject(new Error(`There are no documents for ${resource}`));
        }
        const doc = documentData.document;
        const ran = Converter.toRange(range);
        const hints = await this.provider.provideInlayHints(doc, ran, token);
        if (!Array.isArray(hints) || hints.length === 0) {
            return undefined;
        }
        if (token.isCancellationRequested) {
            return undefined;
        }
        const pid = this.cache.add(hints);
        this.disposables.set(pid, new disposable_1.DisposableCollection());
        const result = { hints: [], cacheId: pid };
        for (let i = 0; i < hints.length; i++) {
            if (this.isValidInlayHint(hints[i], ran)) {
                result.hints.push(this.convertInlayHint(hints[i], [pid, i]));
            }
        }
        return result;
    }
    async resolveInlayHint(id, token) {
        if (typeof this.provider.resolveInlayHint !== 'function') {
            return undefined;
        }
        const item = this.cache.get(...id);
        if (!item) {
            return undefined;
        }
        const hint = await this.provider.resolveInlayHint(item, token);
        if (!hint) {
            return undefined;
        }
        if (!this.isValidInlayHint(hint)) {
            return undefined;
        }
        return this.convertInlayHint(hint, id);
    }
    isValidInlayHint(hint, range) {
        if (hint.label.length === 0 || Array.isArray(hint.label) && hint.label.every(part => part.value.length === 0)) {
            return false;
        }
        if (range && !range.contains(hint.position)) {
            return false;
        }
        return true;
    }
    convertInlayHint(hint, id) {
        const disposables = this.disposables.get(id[0]);
        if (!disposables) {
            throw Error('DisposableCollection is missing...');
        }
        const result = {
            label: '', // fill-in below.
            cacheId: id,
            tooltip: hint.tooltip,
            position: Converter.fromPosition(hint.position),
            textEdits: hint.textEdits && hint.textEdits.map(Converter.fromTextEdit),
            kind: hint.kind && Converter.InlayHintKind.from(hint.kind),
            paddingLeft: hint.paddingLeft,
            paddingRight: hint.paddingRight,
        };
        if (typeof hint.label === 'string') {
            result.label = hint.label;
        }
        else {
            result.label = hint.label.map(part => {
                const partResult = { label: part.value };
                if (part.tooltip) {
                    partResult.tooltip = typeof partResult === 'string' ? part.tooltip : Converter.fromMarkdown(part.tooltip);
                }
                if ((0, util_1.isLocationArray)(part.location)) {
                    partResult.location = Converter.fromLocation(part.location);
                }
                if (part.command) {
                    partResult.command = this.commands.converter.toSafeCommand(part.command, disposables);
                }
                return partResult;
            });
        }
        return result;
    }
    async releaseHints(id) {
        var _a;
        (_a = this.disposables.get(id)) === null || _a === void 0 ? void 0 : _a.dispose();
        this.disposables.delete(id);
        this.cache.delete(id);
    }
}
exports.InlayHintsAdapter = InlayHintsAdapter;
//# sourceMappingURL=inlay-hints.js.map