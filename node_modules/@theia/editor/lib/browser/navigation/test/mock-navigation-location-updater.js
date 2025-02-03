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
exports.NoopNavigationLocationUpdater = exports.MockNavigationLocationUpdater = void 0;
const navigation_location_updater_1 = require("../navigation-location-updater");
/**
 * Navigation location updater with increased method visibility for testing.
 */
class MockNavigationLocationUpdater extends navigation_location_updater_1.NavigationLocationUpdater {
    contained(subRange, range) {
        return super.contained(subRange, range);
    }
}
exports.MockNavigationLocationUpdater = MockNavigationLocationUpdater;
/**
 * NOOP navigation location updater for testing. Use this, if you want to avoid any
 * location updates during the tests.
 */
class NoopNavigationLocationUpdater extends navigation_location_updater_1.NavigationLocationUpdater {
    affects() {
        return false;
    }
}
exports.NoopNavigationLocationUpdater = NoopNavigationLocationUpdater;
//# sourceMappingURL=mock-navigation-location-updater.js.map