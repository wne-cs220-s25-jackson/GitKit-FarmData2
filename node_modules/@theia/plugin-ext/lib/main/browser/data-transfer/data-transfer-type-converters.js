"use strict";
// *****************************************************************************
// Copyright (C) 2023 Red Hat, Inc. and others.
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
exports.DataTransfer = exports.DataTransferItem = void 0;
const types_impl_1 = require("../../../plugin/types-impl");
var DataTransferItem;
(function (DataTransferItem) {
    async function from(mime, item) {
        const stringValue = await item.asString();
        if (mime === 'text/uri-list') {
            return {
                asString: '',
                fileData: undefined,
                uriListData: serializeUriList(stringValue),
            };
        }
        const fileValue = item.asFile();
        return {
            asString: stringValue,
            fileData: fileValue ? { id: fileValue.id, name: fileValue.name, uri: fileValue.uri } : undefined,
        };
    }
    DataTransferItem.from = from;
    function serializeUriList(stringValue) {
        return stringValue.split('\r\n').map(part => {
            if (part.startsWith('#')) {
                return part;
            }
            try {
                return types_impl_1.URI.parse(part);
            }
            catch {
                // noop
            }
            return part;
        });
    }
})(DataTransferItem || (exports.DataTransferItem = DataTransferItem = {}));
var DataTransfer;
(function (DataTransfer) {
    async function toDataTransferDTO(value) {
        return {
            items: await Promise.all(Array.from(value)
                .map(async ([mime, item]) => [mime, await DataTransferItem.from(mime, item)]))
        };
    }
    DataTransfer.toDataTransferDTO = toDataTransferDTO;
})(DataTransfer || (exports.DataTransfer = DataTransfer = {}));
//# sourceMappingURL=data-transfer-type-converters.js.map