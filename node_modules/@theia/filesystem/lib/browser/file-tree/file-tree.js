"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.DirNode = exports.FileNode = exports.FileStatNodeData = exports.FileStatNode = exports.FileTree = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const files_1 = require("../../common/files");
const message_service_1 = require("@theia/core/lib/common/message-service");
const file_service_1 = require("../file-service");
let FileTree = class FileTree extends browser_1.TreeImpl {
    async resolveChildren(parent) {
        if (FileStatNode.is(parent)) {
            const fileStat = await this.resolveFileStat(parent);
            if (fileStat) {
                return this.toNodes(fileStat, parent);
            }
            return [];
        }
        return super.resolveChildren(parent);
    }
    async resolveFileStat(node) {
        try {
            const fileStat = await this.fileService.resolve(node.uri);
            node.fileStat = fileStat;
            return fileStat;
        }
        catch (e) {
            if (!(e instanceof files_1.FileOperationError && e.fileOperationResult === 1 /* FileOperationResult.FILE_NOT_FOUND */)) {
                this.messagingService.error(e.message);
            }
            return undefined;
        }
    }
    async toNodes(fileStat, parent) {
        if (!fileStat.children) {
            return [];
        }
        const result = await Promise.all(fileStat.children.map(async (child) => this.toNode(child, parent)));
        return result.sort(DirNode.compare);
    }
    toNode(fileStat, parent) {
        const uri = fileStat.resource;
        const id = this.toNodeId(uri, parent);
        const node = this.getNode(id);
        if (fileStat.isDirectory) {
            if (DirNode.is(node)) {
                node.fileStat = fileStat;
                return node;
            }
            return {
                id, uri, fileStat, parent,
                expanded: false,
                selected: false,
                children: []
            };
        }
        if (FileNode.is(node)) {
            node.fileStat = fileStat;
            return node;
        }
        return {
            id, uri, fileStat, parent,
            selected: false
        };
    }
    toNodeId(uri, parent) {
        return uri.path.toString();
    }
};
exports.FileTree = FileTree;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], FileTree.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], FileTree.prototype, "messagingService", void 0);
exports.FileTree = FileTree = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileTree);
var FileStatNode;
(function (FileStatNode) {
    function is(node) {
        return (0, common_1.isObject)(node) && 'fileStat' in node;
    }
    FileStatNode.is = is;
    function getUri(node) {
        if (is(node)) {
            return node.fileStat.resource.toString();
        }
        return undefined;
    }
    FileStatNode.getUri = getUri;
})(FileStatNode || (exports.FileStatNode = FileStatNode = {}));
var FileStatNodeData;
(function (FileStatNodeData) {
    function is(node) {
        return (0, common_1.isObject)(node) && 'uri' in node && ('fileStat' in node || 'stat' in node);
    }
    FileStatNodeData.is = is;
})(FileStatNodeData || (exports.FileStatNodeData = FileStatNodeData = {}));
var FileNode;
(function (FileNode) {
    function is(node) {
        return FileStatNode.is(node) && !node.fileStat.isDirectory;
    }
    FileNode.is = is;
})(FileNode || (exports.FileNode = FileNode = {}));
var DirNode;
(function (DirNode) {
    function is(node) {
        return FileStatNode.is(node) && node.fileStat.isDirectory;
    }
    DirNode.is = is;
    function compare(node, node2) {
        return DirNode.dirCompare(node, node2) || uriCompare(node, node2);
    }
    DirNode.compare = compare;
    function uriCompare(node, node2) {
        if (FileStatNode.is(node)) {
            if (FileStatNode.is(node2)) {
                return node.uri.displayName.localeCompare(node2.uri.displayName);
            }
            return 1;
        }
        if (FileStatNode.is(node2)) {
            return -1;
        }
        return 0;
    }
    DirNode.uriCompare = uriCompare;
    function dirCompare(node, node2) {
        const a = DirNode.is(node) ? 1 : 0;
        const b = DirNode.is(node2) ? 1 : 0;
        return b - a;
    }
    DirNode.dirCompare = dirCompare;
    function createRoot(fileStat) {
        const uri = fileStat.resource;
        const id = uri.toString();
        return {
            id, uri, fileStat,
            visible: true,
            parent: undefined,
            children: [],
            expanded: true,
            selected: false
        };
    }
    DirNode.createRoot = createRoot;
    function getContainingDir(node) {
        let containing = node;
        while (!!containing && !is(containing)) {
            containing = containing.parent;
        }
        return containing;
    }
    DirNode.getContainingDir = getContainingDir;
})(DirNode || (exports.DirNode = DirNode = {}));
//# sourceMappingURL=file-tree.js.map