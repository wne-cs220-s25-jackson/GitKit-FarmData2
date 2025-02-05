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
exports.createTerminalSearchFactory = void 0;
const terminal_search_widget_1 = require("./terminal-search-widget");
const xterm_1 = require("xterm");
function createTerminalSearchFactory(container) {
    container.bind(terminal_search_widget_1.TerminalSearchWidget).toSelf().inSingletonScope();
    return (terminal) => {
        container.bind(xterm_1.Terminal).toConstantValue(terminal);
        return container.get(terminal_search_widget_1.TerminalSearchWidget);
    };
}
exports.createTerminalSearchFactory = createTerminalSearchFactory;
//# sourceMappingURL=terminal-search-container.js.map