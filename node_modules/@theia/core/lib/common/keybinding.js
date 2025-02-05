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
exports.RawKeybinding = exports.Keybinding = void 0;
const types_1 = require("./types");
var Keybinding;
(function (Keybinding) {
    /**
     * Compares two keybindings for equality.
     * Can optionally ignore the keybinding and/or args property in the comparison.
     * @param a The first Keybinding in the comparison
     * @param b The second Keybinding in the comparison
     * @param ignoreKeybinding Ignore the 'keybinding' property in the comparison
     * @param ignoreArgs Ignore the 'args' property in the comparison
     */
    function equals(a, b, ignoreKeybinding = false, ignoreArgs = false) {
        if (a.command === b.command &&
            (a.context || '') === (b.context || '') &&
            (a.when || '') === (b.when || '') &&
            (ignoreKeybinding || a.keybinding === b.keybinding) &&
            (ignoreArgs || (a.args || '') === (b.args || ''))) {
            return true;
        }
        return false;
    }
    Keybinding.equals = equals;
    /**
     * Returns a new object only containing properties which
     * are described on the `Keybinding` API.
     *
     * @param binding the binding to create an API object for.
     */
    function apiObjectify(binding) {
        return {
            command: binding.command,
            keybinding: retrieveKeybinding(binding),
            context: binding.context,
            when: binding.when,
            args: binding.args
        };
    }
    Keybinding.apiObjectify = apiObjectify;
    function retrieveKeybinding(binding) {
        var _a, _b;
        return (_b = (_a = binding.keybinding) !== null && _a !== void 0 ? _a : binding.key) !== null && _b !== void 0 ? _b : '';
    }
    Keybinding.retrieveKeybinding = retrieveKeybinding;
    /**
     * Returns with the string representation of the binding.
     * Any additional properties which are not described on
     * the `Keybinding` API will be ignored.
     *
     * @param binding the binding to stringify.
     */
    function stringify(binding) {
        return JSON.stringify(apiObjectify(binding));
    }
    Keybinding.stringify = stringify;
    /* Determine whether object is a KeyBinding */
    function is(arg) {
        return (0, types_1.isObject)(arg) && 'command' in arg && 'keybinding' in arg;
    }
    Keybinding.is = is;
    function replaceKeybinding(keybindings, oldKeybinding, newKeybinding) {
        const indexOld = keybindings.findIndex(keybinding => Keybinding.equals(keybinding, oldKeybinding, false, true));
        if (indexOld >= 0) {
            const indexNew = keybindings.findIndex(keybinding => Keybinding.equals(keybinding, newKeybinding, false, true));
            if (indexNew >= 0 && indexNew !== indexOld) {
                // if keybindings already contain the new keybinding, remove the old keybinding and update the new one
                keybindings.splice(indexOld, 1);
                keybindings[indexNew] = newKeybinding;
            }
            else {
                keybindings[indexOld] = newKeybinding;
            }
            return true;
        }
        return false;
    }
    Keybinding.replaceKeybinding = replaceKeybinding;
    function addKeybinding(keybindings, newKeybinding) {
        const index = keybindings.findIndex(keybinding => Keybinding.equals(keybinding, newKeybinding, false, true));
        if (index >= 0) {
            // if keybindings already contain the new keybinding, update it
            keybindings[index] = newKeybinding;
        }
        else {
            keybindings.push(newKeybinding);
        }
    }
    Keybinding.addKeybinding = addKeybinding;
})(Keybinding || (exports.Keybinding = Keybinding = {}));
var RawKeybinding;
(function (RawKeybinding) {
    function is(candidate) {
        return (0, types_1.isObject)(candidate) && 'command' in candidate && 'key' in candidate;
    }
    RawKeybinding.is = is;
})(RawKeybinding || (exports.RawKeybinding = RawKeybinding = {}));
//# sourceMappingURL=keybinding.js.map