"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
exports.MonacoMarkerCollection = void 0;
const monaco = require("@theia/monaco-editor-core");
class MonacoMarkerCollection {
    constructor(uri, p2m) {
        this.markers = [];
        this.owners = new Map();
        this.didUpdate = false;
        this.uri = monaco.Uri.parse(uri.toString());
        this.p2m = p2m;
    }
    updateMarkers(markers) {
        this.markers = markers;
        const model = monaco.editor.getModel(this.uri);
        this.doUpdateMarkers(model ? model : undefined);
    }
    updateModelMarkers(model) {
        if (!this.didUpdate) {
            this.doUpdateMarkers(model);
            return;
        }
        for (const [owner, diagnostics] of this.owners) {
            this.setModelMarkers(model, owner, diagnostics);
        }
    }
    doUpdateMarkers(model) {
        if (!model) {
            this.didUpdate = false;
            return;
        }
        this.didUpdate = true;
        const toClean = new Set(this.owners.keys());
        this.owners.clear();
        for (const marker of this.markers) {
            const diagnostics = this.owners.get(marker.owner) || [];
            diagnostics.push(marker.data);
            this.owners.set(marker.owner, diagnostics);
        }
        for (const [owner, diagnostics] of this.owners) {
            toClean.delete(owner);
            this.setModelMarkers(model, owner, diagnostics);
        }
        for (const owner of toClean) {
            this.clearModelMarkers(model, owner);
        }
    }
    setModelMarkers(model, owner, diagnostics) {
        monaco.editor.setModelMarkers(model, owner, this.p2m.asDiagnostics(diagnostics));
    }
    clearModelMarkers(model, owner) {
        monaco.editor.setModelMarkers(model, owner, []);
    }
}
exports.MonacoMarkerCollection = MonacoMarkerCollection;
//# sourceMappingURL=monaco-marker-collection.js.map