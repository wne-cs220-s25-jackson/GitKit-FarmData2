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
exports.BasicNotificationMainImpl = void 0;
const common_1 = require("@theia/core/lib/common");
const disposable_1 = require("@theia/core/lib/common/disposable");
class BasicNotificationMainImpl {
    constructor(rpc, container, extIdentifier) {
        this.progressMap = new Map();
        this.progress2Work = new Map();
        this.toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(() => { }));
        this.progressService = container.get(common_1.ProgressService);
        this.proxy = rpc.getProxy(extIdentifier);
    }
    dispose() {
        this.toDispose.dispose();
    }
    async $startProgress(options) {
        const onDidCancel = () => {
            // If the map does not contain current id, it has already stopped and should not be cancelled
            if (this.progressMap.has(id)) {
                this.proxy.$acceptProgressCanceled(id);
            }
        };
        const progressMessage = this.mapOptions(options);
        const progress = await this.progressService.showProgress(progressMessage, onDidCancel);
        const id = progress.id;
        this.progressMap.set(id, progress);
        this.progress2Work.set(id, 0);
        if (this.toDispose.disposed) {
            this.$stopProgress(id);
        }
        else {
            this.toDispose.push(disposable_1.Disposable.create(() => this.$stopProgress(id)));
        }
        return id;
    }
    mapOptions(options) {
        const { title, location, cancellable } = options;
        return { text: title, options: { location, cancelable: cancellable } };
    }
    $stopProgress(id) {
        const progress = this.progressMap.get(id);
        if (progress) {
            this.progressMap.delete(id);
            this.progress2Work.delete(id);
            progress.cancel();
        }
    }
    $updateProgress(id, item) {
        const progress = this.progressMap.get(id);
        if (!progress) {
            return;
        }
        const done = Math.min((this.progress2Work.get(id) || 0) + (item.increment || 0), 100);
        this.progress2Work.set(id, done);
        progress.report({ message: item.message, work: done ? { done, total: 100 } : undefined });
    }
}
exports.BasicNotificationMainImpl = BasicNotificationMainImpl;
//# sourceMappingURL=basic-notification-main.js.map