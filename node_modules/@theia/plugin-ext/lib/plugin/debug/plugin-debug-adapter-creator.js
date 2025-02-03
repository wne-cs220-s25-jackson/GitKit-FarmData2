"use strict";
// *****************************************************************************
// Copyright (C) 2022 Arm and others.
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
exports.PluginDebugAdapterCreator = void 0;
const types_impl_1 = require("../types-impl");
const inline_debug_adapter_1 = require("@theia/debug/lib/common/inline-debug-adapter");
class PluginDebugAdapterCreator {
    async resolveDebugAdapterExecutable(_pluginPath, _debuggerContribution) {
        // Node is required to run the default executable
        return undefined;
    }
    async createDebugAdapter(session, _debugConfiguration, executable, descriptorFactory) {
        if (descriptorFactory) {
            const descriptor = await descriptorFactory.createDebugAdapterDescriptor(session, executable);
            if (descriptor) {
                if (types_impl_1.DebugAdapterInlineImplementation.is(descriptor)) {
                    return this.connectInlineDebugAdapter(descriptor);
                }
            }
        }
        throw new Error('It is not possible to provide debug adapter executable.');
    }
    connectInlineDebugAdapter(adapter) {
        return new inline_debug_adapter_1.InlineDebugAdapter(adapter.implementation);
    }
}
exports.PluginDebugAdapterCreator = PluginDebugAdapterCreator;
//# sourceMappingURL=plugin-debug-adapter-creator.js.map