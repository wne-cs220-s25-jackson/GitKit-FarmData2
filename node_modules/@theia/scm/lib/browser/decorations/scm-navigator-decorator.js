"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.ScmNavigatorDecorator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const logger_1 = require("@theia/core/lib/common/logger");
const event_1 = require("@theia/core/lib/common/event");
const browser_1 = require("@theia/core/lib/browser");
const browser_2 = require("@theia/filesystem/lib/browser");
const uri_1 = require("@theia/core/lib/common/uri");
const color_registry_1 = require("@theia/core/lib/browser/color-registry");
const decorations_service_1 = require("@theia/core/lib/browser/decorations-service");
/**
 * @deprecated since 1.25.0
 * URI-based decorators should implement `DecorationsProvider` and contribute decorations via the `DecorationsService`.
 */
let ScmNavigatorDecorator = class ScmNavigatorDecorator {
    constructor(decorationsService) {
        this.decorationsService = decorationsService;
        this.id = 'theia-scm-decorator';
        this.emitter = new event_1.Emitter();
        this.decorationsService.onDidChangeDecorations(data => {
            this.decorationsMap = data;
            this.fireDidChangeDecorations((tree) => this.collectDecorators(tree));
        });
    }
    collectDecorators(tree) {
        const result = new Map();
        if (tree.root === undefined || !this.decorationsMap) {
            return result;
        }
        const markers = this.appendContainerChanges(this.decorationsMap);
        for (const treeNode of new browser_1.DepthFirstTreeIterator(tree.root)) {
            const uri = browser_2.FileStatNode.getUri(treeNode);
            if (uri) {
                const marker = markers.get(uri);
                if (marker) {
                    result.set(treeNode.id, marker);
                }
            }
        }
        return new Map(Array.from(result.entries()).map(m => [m[0], this.toDecorator(m[1])]));
    }
    toDecorator(change) {
        const colorVariable = change.colorId && this.colors.toCssVariableName(change.colorId);
        return {
            tailDecorations: [
                {
                    data: change.letter ? change.letter : '',
                    fontData: {
                        color: colorVariable && `var(${colorVariable})`
                    },
                    tooltip: change.tooltip ? change.tooltip : ''
                }
            ]
        };
    }
    async decorations(tree) {
        if (this.decorationsMap) {
            return this.collectDecorators(tree);
        }
        else {
            return new Map();
        }
    }
    appendContainerChanges(decorationsMap) {
        const result = new Map();
        for (const [uri, data] of decorationsMap.entries()) {
            const uriString = uri.toString();
            result.set(uriString, data);
            let parentUri = new uri_1.default(uri).parent;
            while (parentUri && !parentUri.path.isRoot) {
                const parentUriString = parentUri.toString();
                const existing = result.get(parentUriString);
                if (existing === undefined) {
                    result.set(parentUriString, data);
                    parentUri = parentUri.parent;
                }
                else {
                    parentUri = undefined;
                }
            }
        }
        return result;
    }
    get onDidChangeDecorations() {
        return this.emitter.event;
    }
    fireDidChangeDecorations(event) {
        this.emitter.fire(event);
    }
};
exports.ScmNavigatorDecorator = ScmNavigatorDecorator;
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], ScmNavigatorDecorator.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(color_registry_1.ColorRegistry),
    tslib_1.__metadata("design:type", color_registry_1.ColorRegistry)
], ScmNavigatorDecorator.prototype, "colors", void 0);
exports.ScmNavigatorDecorator = ScmNavigatorDecorator = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(decorations_service_1.DecorationsService)),
    tslib_1.__metadata("design:paramtypes", [Object])
], ScmNavigatorDecorator);
//# sourceMappingURL=scm-navigator-decorator.js.map