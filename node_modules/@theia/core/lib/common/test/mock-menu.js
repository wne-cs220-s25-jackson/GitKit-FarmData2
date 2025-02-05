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
exports.MockMenuModelRegistry = void 0;
const disposable_1 = require("../disposable");
const command_1 = require("../command");
const menu_1 = require("../menu");
class MockMenuModelRegistry extends menu_1.MenuModelRegistry {
    constructor() {
        const commands = new command_1.CommandRegistry({ getContributions: () => [] });
        super({ getContributions: () => [] }, commands);
    }
    registerMenuAction(menuPath, item) {
        return disposable_1.Disposable.NULL;
    }
    registerSubmenu(menuPath, label) {
        return disposable_1.Disposable.NULL;
    }
}
exports.MockMenuModelRegistry = MockMenuModelRegistry;
//# sourceMappingURL=mock-menu.js.map