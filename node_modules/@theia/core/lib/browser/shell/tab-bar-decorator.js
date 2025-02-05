"use strict";
// *****************************************************************************
// Copyright (C) 2019 Ericsson and others.
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
exports.TabBarDecoratorService = exports.TabBarDecorator = void 0;
const tslib_1 = require("tslib");
const debounce = require("lodash.debounce");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const color_registry_1 = require("../color-registry");
const decorations_service_1 = require("../decorations-service");
const navigatable_types_1 = require("../navigatable-types");
exports.TabBarDecorator = Symbol('TabBarDecorator');
let TabBarDecoratorService = class TabBarDecoratorService {
    constructor() {
        this.onDidChangeDecorationsEmitter = new common_1.Emitter();
        this.onDidChangeDecorations = this.onDidChangeDecorationsEmitter.event;
        this.fireDidChangeDecorations = debounce(() => this.onDidChangeDecorationsEmitter.fire(undefined), 150);
    }
    initialize() {
        this.contributions.getContributions().map(decorator => decorator.onDidChangeDecorations(this.fireDidChangeDecorations));
    }
    /**
     * Assign tabs the decorators provided by all the contributions.
     * @param {Title<Widget>} title the title
     * @returns an array of its decoration data.
     */
    getDecorations(title) {
        const decorators = this.contributions.getContributions();
        const decorations = [];
        for (const decorator of decorators) {
            decorations.push(...decorator.decorate(title));
        }
        if (navigatable_types_1.Navigatable.is(title.owner)) {
            const resourceUri = title.owner.getResourceUri();
            if (resourceUri) {
                const serviceDecorations = this.decorationsService.getDecoration(resourceUri, false);
                decorations.push(...serviceDecorations.map(d => this.fromDecoration(d)));
            }
        }
        return decorations;
    }
    fromDecoration(decoration) {
        const colorVariable = decoration.colorId && this.colors.toCssVariableName(decoration.colorId);
        return {
            tailDecorations: [
                {
                    data: decoration.letter ? decoration.letter : '',
                    fontData: {
                        color: colorVariable && `var(${colorVariable})`
                    },
                    tooltip: decoration.tooltip ? decoration.tooltip : ''
                }
            ]
        };
    }
};
exports.TabBarDecoratorService = TabBarDecoratorService;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(exports.TabBarDecorator),
    tslib_1.__metadata("design:type", Object)
], TabBarDecoratorService.prototype, "contributions", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(decorations_service_1.DecorationsService),
    tslib_1.__metadata("design:type", decorations_service_1.DecorationsServiceImpl)
], TabBarDecoratorService.prototype, "decorationsService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(color_registry_1.ColorRegistry),
    tslib_1.__metadata("design:type", color_registry_1.ColorRegistry)
], TabBarDecoratorService.prototype, "colors", void 0);
exports.TabBarDecoratorService = TabBarDecoratorService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TabBarDecoratorService);
//# sourceMappingURL=tab-bar-decorator.js.map