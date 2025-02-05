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
const assert = require("assert");
const file_system_event_service_ext_impl_1 = require("./file-system-event-service-ext-impl");
const core_1 = require("@theia/core");
const types_impl_1 = require("./types-impl");
const eventSource = new core_1.Emitter();
let disposables = new core_1.DisposableCollection();
function checkIgnore(ignoreCreate, ignoreChange, ignoreDelete) {
    const watcher = new file_system_event_service_ext_impl_1.FileSystemWatcher(eventSource.event, '**/*.js', !ignoreCreate, !ignoreChange, !ignoreDelete);
    disposables.push(watcher);
    const matching = types_impl_1.URI.file('/foo/bar/zoz.js');
    const changed = [];
    const created = [];
    const deleted = [];
    watcher.onDidChange(e => {
        changed.push(e);
    });
    watcher.onDidCreate(e => {
        created.push(e);
    });
    watcher.onDidDelete(e => {
        deleted.push(e);
    });
    eventSource.fire({ changed: [matching], created: [matching], deleted: [matching] });
    assert.equal(created.length, ignoreCreate);
    assert.equal(deleted.length, ignoreDelete);
    assert.equal(changed.length, ignoreChange);
}
describe('File Watcher Test', () => {
    afterEach(() => {
        disposables.dispose();
        disposables = new core_1.DisposableCollection();
    });
    it('Should match files', () => {
        var _a, _b, _c;
        const watcher = new file_system_event_service_ext_impl_1.FileSystemWatcher(eventSource.event, '**/*.js');
        disposables.push(watcher);
        const matching = types_impl_1.URI.file('/foo/bar/zoz.js');
        const notMatching = types_impl_1.URI.file('/foo/bar/zoz.ts');
        const changed = [];
        const created = [];
        const deleted = [];
        watcher.onDidChange(e => {
            changed.push(e);
        });
        watcher.onDidCreate(e => {
            created.push(e);
        });
        watcher.onDidDelete(e => {
            deleted.push(e);
        });
        const URIs = [matching, notMatching];
        eventSource.fire({ changed: URIs, created: URIs, deleted: URIs });
        assert.equal(matching.toString(), (_a = changed[0]) === null || _a === void 0 ? void 0 : _a.toString());
        assert.equal(matching.toString(), (_b = created[0]) === null || _b === void 0 ? void 0 : _b.toString());
        assert.equal(matching.toString(), (_c = deleted[0]) === null || _c === void 0 ? void 0 : _c.toString());
    });
    it('Should ignore created', () => {
        checkIgnore(0, 1, 1);
    });
    it('Should ignore changed', () => {
        checkIgnore(1, 0, 1);
    });
    it('Should ignore deleted', () => {
        checkIgnore(1, 1, 0);
    });
    it('Should exclude files', () => {
        var _a, _b, _c;
        const watcher = new file_system_event_service_ext_impl_1.FileSystemWatcher(eventSource.event, '**/*.js', false, false, false, ['**/bar/**']);
        disposables.push(watcher);
        const notMatching = types_impl_1.URI.file('/foo/bar/zoz.js');
        const matching = types_impl_1.URI.file('/foo/gux/zoz.js');
        const changed = [];
        const created = [];
        const deleted = [];
        watcher.onDidChange(e => {
            changed.push(e);
        });
        watcher.onDidCreate(e => {
            created.push(e);
        });
        watcher.onDidDelete(e => {
            deleted.push(e);
        });
        const URIs = [matching, notMatching];
        eventSource.fire({ changed: URIs, created: URIs, deleted: URIs });
        assert.equal(matching.toString(), (_a = changed[0]) === null || _a === void 0 ? void 0 : _a.toString());
        assert.equal(matching.toString(), (_b = created[0]) === null || _b === void 0 ? void 0 : _b.toString());
        assert.equal(matching.toString(), (_c = deleted[0]) === null || _c === void 0 ? void 0 : _c.toString());
    });
});
//# sourceMappingURL=file-system-watcher.spec.js.map