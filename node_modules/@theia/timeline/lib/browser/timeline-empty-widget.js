"use strict";
// *****************************************************************************
// Copyright (C) 2020 RedHat and others.
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
var TimelineEmptyWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineEmptyWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const alert_message_1 = require("@theia/core/lib/browser/widgets/alert-message");
const React = require("@theia/core/shared/react");
let TimelineEmptyWidget = TimelineEmptyWidget_1 = class TimelineEmptyWidget extends browser_1.ReactWidget {
    constructor() {
        super();
        this.addClass('theia-timeline-empty');
        this.id = TimelineEmptyWidget_1.ID;
    }
    render() {
        return React.createElement(alert_message_1.AlertMessage, { type: 'WARNING', header: 'The active editor cannot provide timeline information.' });
    }
};
exports.TimelineEmptyWidget = TimelineEmptyWidget;
TimelineEmptyWidget.ID = 'timeline-empty-widget';
exports.TimelineEmptyWidget = TimelineEmptyWidget = TimelineEmptyWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], TimelineEmptyWidget);
//# sourceMappingURL=timeline-empty-widget.js.map