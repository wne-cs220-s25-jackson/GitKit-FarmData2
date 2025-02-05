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
exports.ApplicationConnectionStatusContribution = exports.FrontendConnectionStatusService = exports.AbstractConnectionStatusService = exports.PingService = exports.ConnectionStatusOptions = exports.ConnectionStatus = exports.ConnectionStatusService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const logger_1 = require("../common/logger");
const event_1 = require("../common/event");
const frontend_application_contribution_1 = require("./frontend-application-contribution");
const status_bar_1 = require("./status-bar/status-bar");
const common_1 = require("../common");
const ws_connection_source_1 = require("./messaging/ws-connection-source");
/**
 * Service for listening on backend connection changes.
 */
exports.ConnectionStatusService = Symbol('ConnectionStatusService');
/**
 * The connection status.
 */
var ConnectionStatus;
(function (ConnectionStatus) {
    /**
     * Connected to the backend.
     */
    ConnectionStatus[ConnectionStatus["ONLINE"] = 0] = "ONLINE";
    /**
     * The connection is lost between frontend and backend.
     */
    ConnectionStatus[ConnectionStatus["OFFLINE"] = 1] = "OFFLINE";
})(ConnectionStatus || (exports.ConnectionStatus = ConnectionStatus = {}));
let ConnectionStatusOptions = class ConnectionStatusOptions {
};
exports.ConnectionStatusOptions = ConnectionStatusOptions;
ConnectionStatusOptions.DEFAULT = {
    offlineTimeout: 5000,
};
exports.ConnectionStatusOptions = ConnectionStatusOptions = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ConnectionStatusOptions);
exports.PingService = Symbol('PingService');
let AbstractConnectionStatusService = class AbstractConnectionStatusService {
    constructor(options = ConnectionStatusOptions.DEFAULT) {
        this.options = options;
        this.statusChangeEmitter = new event_1.Emitter();
        this.connectionStatus = ConnectionStatus.ONLINE;
    }
    get onStatusChange() {
        return this.statusChangeEmitter.event;
    }
    get currentStatus() {
        return this.connectionStatus;
    }
    dispose() {
        this.statusChangeEmitter.dispose();
    }
    updateStatus(success) {
        const previousStatus = this.connectionStatus;
        const newStatus = success ? ConnectionStatus.ONLINE : ConnectionStatus.OFFLINE;
        if (previousStatus !== newStatus) {
            this.connectionStatus = newStatus;
            this.fireStatusChange(newStatus);
        }
    }
    fireStatusChange(status) {
        this.statusChangeEmitter.fire(status);
    }
};
exports.AbstractConnectionStatusService = AbstractConnectionStatusService;
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], AbstractConnectionStatusService.prototype, "logger", void 0);
exports.AbstractConnectionStatusService = AbstractConnectionStatusService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(ConnectionStatusOptions)),
    tslib_1.__param(0, (0, inversify_1.optional)()),
    tslib_1.__metadata("design:paramtypes", [ConnectionStatusOptions])
], AbstractConnectionStatusService);
let FrontendConnectionStatusService = class FrontendConnectionStatusService extends AbstractConnectionStatusService {
    init() {
        this.wsConnectionProvider.onSocketDidOpen(() => {
            this.updateStatus(true);
            this.schedulePing();
        });
        this.wsConnectionProvider.onSocketDidClose(() => {
            this.clearTimeout(this.scheduledPing);
            this.updateStatus(false);
        });
        this.wsConnectionProvider.onIncomingMessageActivity(() => {
            // natural activity
            this.updateStatus(true);
            this.schedulePing();
        });
    }
    schedulePing() {
        this.clearTimeout(this.scheduledPing);
        this.scheduledPing = this.setTimeout(async () => {
            await this.performPingRequest();
            this.schedulePing();
        }, this.options.offlineTimeout);
    }
    async performPingRequest() {
        try {
            await this.pingService.ping();
            this.updateStatus(true);
        }
        catch (e) {
            this.updateStatus(false);
            await this.logger.error(e);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTimeout(handler, timeout) {
        return window.setTimeout(handler, timeout);
    }
    clearTimeout(handle) {
        if (handle !== undefined) {
            window.clearTimeout(handle);
        }
    }
};
exports.FrontendConnectionStatusService = FrontendConnectionStatusService;
tslib_1.__decorate([
    (0, inversify_1.inject)(ws_connection_source_1.WebSocketConnectionSource),
    tslib_1.__metadata("design:type", ws_connection_source_1.WebSocketConnectionSource)
], FrontendConnectionStatusService.prototype, "wsConnectionProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(exports.PingService),
    tslib_1.__metadata("design:type", Object)
], FrontendConnectionStatusService.prototype, "pingService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FrontendConnectionStatusService.prototype, "init", null);
exports.FrontendConnectionStatusService = FrontendConnectionStatusService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FrontendConnectionStatusService);
let ApplicationConnectionStatusContribution = class ApplicationConnectionStatusContribution extends frontend_application_contribution_1.DefaultFrontendApplicationContribution {
    constructor(connectionStatusService, statusBar, logger) {
        super();
        this.connectionStatusService = connectionStatusService;
        this.statusBar = statusBar;
        this.logger = logger;
        this.toDisposeOnOnline = new common_1.DisposableCollection();
        this.statusbarId = 'connection-status';
        this.connectionStatusService.onStatusChange(state => this.onStateChange(state));
    }
    onStateChange(state) {
        switch (state) {
            case ConnectionStatus.OFFLINE: {
                this.handleOffline();
                break;
            }
            case ConnectionStatus.ONLINE: {
                this.handleOnline();
                break;
            }
        }
    }
    handleOnline() {
        this.toDisposeOnOnline.dispose();
    }
    handleOffline() {
        this.statusBar.setElement(this.statusbarId, {
            alignment: status_bar_1.StatusBarAlignment.LEFT,
            text: common_1.nls.localize('theia/core/offline', 'Offline'),
            tooltip: common_1.nls.localize('theia/localize/offlineTooltip', 'Cannot connect to backend.'),
            priority: 5000
        });
        this.toDisposeOnOnline.push(common_1.Disposable.create(() => this.statusBar.removeElement(this.statusbarId)));
        document.body.classList.add('theia-mod-offline');
        this.toDisposeOnOnline.push(common_1.Disposable.create(() => document.body.classList.remove('theia-mod-offline')));
    }
};
exports.ApplicationConnectionStatusContribution = ApplicationConnectionStatusContribution;
exports.ApplicationConnectionStatusContribution = ApplicationConnectionStatusContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(exports.ConnectionStatusService)),
    tslib_1.__param(1, (0, inversify_1.inject)(status_bar_1.StatusBar)),
    tslib_1.__param(2, (0, inversify_1.inject)(logger_1.ILogger)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], ApplicationConnectionStatusContribution);
//# sourceMappingURL=connection-status-service.js.map