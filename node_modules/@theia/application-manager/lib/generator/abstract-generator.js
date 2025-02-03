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
exports.AbstractGenerator = void 0;
const fs = require("fs-extra");
class AbstractGenerator {
    constructor(pck, options = {}) {
        this.pck = pck;
        this.options = options;
    }
    ifBrowser(value, defaultValue = '') {
        return this.pck.ifBrowser(value, defaultValue);
    }
    ifElectron(value, defaultValue = '') {
        return this.pck.ifElectron(value, defaultValue);
    }
    ifBrowserOnly(value, defaultValue = '') {
        return this.pck.ifBrowserOnly(value, defaultValue);
    }
    async write(path, content) {
        await fs.ensureFile(path);
        await fs.writeFile(path, content);
    }
    ifMonaco(value, defaultValue = () => '') {
        return this.ifPackage([
            '@theia/monaco',
            '@theia/monaco-editor-core'
        ], value, defaultValue);
    }
    ifPackage(packageName, value, defaultValue = '') {
        const packages = Array.isArray(packageName) ? packageName : [packageName];
        if (this.pck.extensionPackages.some(e => packages.includes(e.name))) {
            return typeof value === 'string' ? value : value();
        }
        else {
            return typeof defaultValue === 'string' ? defaultValue : defaultValue();
        }
    }
    prettyStringify(object) {
        return JSON.stringify(object, undefined, 4);
    }
}
exports.AbstractGenerator = AbstractGenerator;
//# sourceMappingURL=abstract-generator.js.map