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
exports.TaskProviderAdapter = void 0;
const Converter = require("../type-converters");
class TaskProviderAdapter {
    constructor(provider) {
        this.provider = provider;
    }
    provideTasks(token) {
        return Promise.resolve(this.provider.provideTasks(token)).then(tasks => {
            if (!Array.isArray(tasks)) {
                return [];
            }
            const result = [];
            for (const task of tasks) {
                const data = Converter.fromTask(task);
                if (!data) {
                    continue;
                }
                result.push(data);
            }
            return result;
        });
    }
    async resolveTask(task, token) {
        if (typeof this.provider.resolveTask !== 'function') {
            return task;
        }
        const item = Converter.toTask(task);
        if (!item) {
            return task;
        }
        const resolved = await this.provider.resolveTask(item, token);
        const converted = resolved ? Converter.fromTask(resolved) : Converter.fromTask(item);
        return converted !== null && converted !== void 0 ? converted : task;
    }
}
exports.TaskProviderAdapter = TaskProviderAdapter;
//# sourceMappingURL=task-provider.js.map