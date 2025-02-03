"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.LoadMoreStackFrames = exports.DebugStackFramesSource = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const inversify_1 = require("@theia/core/shared/inversify");
const source_tree_1 = require("@theia/core/lib/browser/source-tree");
const debug_view_model_1 = require("./debug-view-model");
const debounce = require("p-debounce");
let DebugStackFramesSource = class DebugStackFramesSource extends source_tree_1.TreeSource {
    constructor() {
        super(...arguments);
        this.refresh = debounce(() => this.fireDidChange(), 100);
    }
    init() {
        this.refresh();
        this.toDispose.push(this.model.onDidChange(() => this.refresh()));
    }
    *getElements() {
        const thread = this.model.currentThread;
        if (!thread) {
            return;
        }
        yield* thread.frames;
        if (thread.stoppedDetails) {
            const { framesErrorMessage, totalFrames } = thread.stoppedDetails;
            if (framesErrorMessage) {
                yield {
                    render: () => React.createElement("span", { title: framesErrorMessage }, framesErrorMessage)
                };
            }
            if (totalFrames && totalFrames > thread.frameCount) {
                yield new LoadMoreStackFrames(thread);
            }
        }
    }
};
exports.DebugStackFramesSource = DebugStackFramesSource;
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_view_model_1.DebugViewModel),
    tslib_1.__metadata("design:type", debug_view_model_1.DebugViewModel)
], DebugStackFramesSource.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DebugStackFramesSource.prototype, "init", null);
exports.DebugStackFramesSource = DebugStackFramesSource = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugStackFramesSource);
class LoadMoreStackFrames {
    constructor(thread) {
        this.thread = thread;
    }
    render() {
        return React.createElement("span", { className: 'theia-load-more-frames' }, "Load More Stack Frames");
    }
    async open() {
        const frames = await this.thread.fetchFrames();
        if (frames[0]) {
            this.thread.currentFrame = frames[0];
        }
    }
}
exports.LoadMoreStackFrames = LoadMoreStackFrames;
//# sourceMappingURL=debug-stack-frames-source.js.map