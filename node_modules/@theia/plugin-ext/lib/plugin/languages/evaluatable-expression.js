"use strict";
// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics and others.
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
exports.EvaluatableExpressionAdapter = void 0;
const Converter = require("../type-converters");
class EvaluatableExpressionAdapter {
    constructor(provider, documents) {
        this.provider = provider;
        this.documents = documents;
    }
    async provideEvaluatableExpression(resource, position, token) {
        const documentData = this.documents.getDocumentData(resource);
        if (!documentData) {
            return Promise.reject(new Error(`There is no document data for ${resource}`));
        }
        const document = documentData.document;
        const pos = Converter.toPosition(position);
        return Promise.resolve(this.provider.provideEvaluatableExpression(document, pos, token)).then(expression => {
            if (!expression) {
                return undefined;
            }
            return Converter.fromEvaluatableExpression(expression);
        });
    }
}
exports.EvaluatableExpressionAdapter = EvaluatableExpressionAdapter;
//# sourceMappingURL=evaluatable-expression.js.map