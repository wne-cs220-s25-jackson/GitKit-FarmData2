"use strict";
// *****************************************************************************
// Copyright (C) 2020 RedHat and others.
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
exports.TimelineAggregate = exports.TimelineService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
let TimelineService = class TimelineService {
    constructor() {
        this.providers = new Map();
        this.onDidChangeProvidersEmitter = new common_1.Emitter();
        this.onDidChangeProviders = this.onDidChangeProvidersEmitter.event;
        this.onDidChangeTimelineEmitter = new common_1.Emitter();
        this.onDidChangeTimeline = this.onDidChangeTimelineEmitter.event;
    }
    registerTimelineProvider(provider) {
        const id = provider.id;
        this.providers.set(id, provider);
        if (provider.onDidChange) {
            provider.onDidChange(e => this.onDidChangeTimelineEmitter.fire(e));
        }
        this.onDidChangeProvidersEmitter.fire({ added: [id] });
        return common_1.Disposable.create(() => this.unregisterTimelineProvider(id));
    }
    unregisterTimelineProvider(id) {
        const provider = this.providers.get(id);
        if (provider) {
            provider.dispose();
            this.providers.delete(id);
            this.onDidChangeProvidersEmitter.fire({ removed: [id] });
        }
    }
    getSources() {
        return [...this.providers.values()].map(p => ({ id: p.id, label: p.label }));
    }
    getSchemas() {
        const result = [];
        Array.from(this.providers.values()).forEach(provider => {
            const scheme = provider.scheme;
            if (typeof scheme === 'string') {
                result.push(scheme);
            }
            else {
                scheme.forEach(s => result.push(s));
            }
        });
        return result;
    }
    getTimeline(id, uri, options, internalOptions) {
        const provider = this.providers.get(id);
        if (!provider) {
            return Promise.resolve(undefined);
        }
        if (typeof provider.scheme === 'string') {
            if (provider.scheme !== '*' && provider.scheme !== uri.scheme) {
                return Promise.resolve(undefined);
            }
        }
        return provider.provideTimeline(uri, options, internalOptions)
            .then(result => {
            if (!result) {
                return undefined;
            }
            result.items = result.items.map(item => ({ ...item, source: provider.id }));
            return result;
        });
    }
};
exports.TimelineService = TimelineService;
exports.TimelineService = TimelineService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TimelineService);
class TimelineAggregate {
    get cursor() {
        return this._cursor;
    }
    set cursor(cursor) {
        this._cursor = cursor;
    }
    constructor(timeline) {
        var _a;
        this.source = timeline.source;
        this.items = timeline.items;
        this._cursor = (_a = timeline.paging) === null || _a === void 0 ? void 0 : _a.cursor;
    }
    add(items) {
        this.items.push(...items);
        this.items.sort((a, b) => b.timestamp - a.timestamp);
    }
}
exports.TimelineAggregate = TimelineAggregate;
//# sourceMappingURL=timeline-service.js.map