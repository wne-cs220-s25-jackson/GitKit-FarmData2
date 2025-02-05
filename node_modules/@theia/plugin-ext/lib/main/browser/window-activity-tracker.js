"use strict";
// *****************************************************************************
// Copyright (C) 2024 STMicroelectronics and others.
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
exports.WindowActivityTracker = void 0;
const core_1 = require("@theia/core");
const CHECK_INACTIVITY_LIMIT = 30;
const CHECK_INACTIVITY_INTERVAL = 1000;
const eventListenerOptions = {
    passive: true,
    capture: true
};
class WindowActivityTracker {
    constructor(win) {
        this.win = win;
        this.inactivityCounter = 0; // number of times inactivity was checked since last reset
        this.inactivityLimit = CHECK_INACTIVITY_LIMIT; // number of inactivity checks done before sending inactive signal
        this.checkInactivityInterval = CHECK_INACTIVITY_INTERVAL; // check interval in milliseconds
        this.onDidChangeActiveStateEmitter = new core_1.Emitter();
        this._activeState = true;
        // Reset inactivity time
        this.resetInactivity = () => {
            this.inactivityCounter = 0;
            if (!this.interval) {
                // it was not active. Set as active and restart tracking inactivity
                this.activeState = true;
                this.startTracking();
            }
        };
        // Check inactivity status
        this.checkInactivity = () => {
            this.inactivityCounter++;
            if (this.inactivityCounter >= this.inactivityLimit) {
                this.activeState = false;
                this.stopTracking();
            }
        };
        this.initializeListeners(this.win);
    }
    get onDidChangeActiveState() {
        return this.onDidChangeActiveStateEmitter.event;
    }
    set activeState(newState) {
        if (this._activeState !== newState) {
            this._activeState = newState;
            this.onDidChangeActiveStateEmitter.fire(this._activeState);
        }
    }
    initializeListeners(win) {
        // currently assumes activity based on key/mouse/touch pressed, not on mouse move or scrolling.
        win.addEventListener('mousedown', this.resetInactivity, eventListenerOptions);
        win.addEventListener('keydown', this.resetInactivity, eventListenerOptions);
        win.addEventListener('touchstart', this.resetInactivity, eventListenerOptions);
    }
    dispose() {
        this.stopTracking();
        this.win.removeEventListener('mousedown', this.resetInactivity);
        this.win.removeEventListener('keydown', this.resetInactivity);
        this.win.removeEventListener('touchstart', this.resetInactivity);
    }
    startTracking() {
        this.stopTracking();
        this.interval = setInterval(this.checkInactivity, this.checkInactivityInterval);
    }
    stopTracking() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }
}
exports.WindowActivityTracker = WindowActivityTracker;
//# sourceMappingURL=window-activity-tracker.js.map