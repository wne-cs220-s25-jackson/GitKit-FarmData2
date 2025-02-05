"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.NotificationComponent = void 0;
const React = require("@theia/core/shared/react");
const DOMPurify = require("@theia/core/shared/dompurify");
const browser_1 = require("@theia/core/lib/browser");
const nls_1 = require("@theia/core/lib/common/nls");
class NotificationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onClear = (event) => {
            if (event.target instanceof HTMLElement) {
                const messageId = event.target.dataset.messageId;
                if (messageId) {
                    this.props.manager.clear(messageId);
                }
            }
        };
        this.onToggleExpansion = (event) => {
            if (event.target instanceof HTMLElement) {
                const messageId = event.target.dataset.messageId;
                if (messageId) {
                    this.props.manager.toggleExpansion(messageId);
                }
            }
        };
        this.onAction = (event) => {
            if (event.target instanceof HTMLElement) {
                const messageId = event.target.dataset.messageId;
                const action = event.target.dataset.action;
                if (messageId && action) {
                    this.props.manager.accept(messageId, action);
                }
            }
        };
        this.onMessageClick = (event) => {
            if (event.target instanceof HTMLAnchorElement) {
                event.stopPropagation();
                event.preventDefault();
                const link = event.target.href;
                this.props.manager.openLink(link);
            }
        };
        this.state = {};
    }
    render() {
        const { messageId, message, type, progress, collapsed, expandable, source, actions } = this.props.notification;
        const isProgress = type === 'progress' || typeof progress === 'number';
        const icon = type === 'progress' ? 'info' : type;
        return (React.createElement("div", { key: messageId, className: 'theia-notification-list-item-container' },
            React.createElement("div", { className: 'theia-notification-list-item', tabIndex: 0 },
                React.createElement("div", { className: `theia-notification-list-item-content ${collapsed ? 'collapsed' : ''}` },
                    React.createElement("div", { className: 'theia-notification-list-item-content-main' },
                        React.createElement("div", { className: `theia-notification-icon ${(0, browser_1.codicon)(icon)} ${icon}` }),
                        React.createElement("div", { className: 'theia-notification-message' },
                            React.createElement("span", { 
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML: {
                                    __html: DOMPurify.sanitize(message, {
                                        ALLOW_UNKNOWN_PROTOCOLS: true // DOMPurify usually strips non http(s) links from hrefs
                                    })
                                }, onClick: this.onMessageClick })),
                        React.createElement("ul", { className: 'theia-notification-actions' },
                            expandable && (React.createElement("li", { className: (0, browser_1.codicon)('chevron-down', true) + (collapsed ? ' expand' : ' collapse'), title: collapsed ? 'Expand' : 'Collapse', "data-message-id": messageId, onClick: this.onToggleExpansion })),
                            !isProgress && (React.createElement("li", { className: (0, browser_1.codicon)('close', true), title: nls_1.nls.localizeByDefault('Clear'), "data-message-id": messageId, onClick: this.onClear })))),
                    (source || !!actions.length) && (React.createElement("div", { className: 'theia-notification-list-item-content-bottom' },
                        React.createElement("div", { className: 'theia-notification-source' }, source && (React.createElement("span", null, source))),
                        React.createElement("div", { className: 'theia-notification-buttons' }, actions && actions.map((action, index) => (React.createElement("button", { key: messageId + `-action-${index}`, className: 'theia-button', "data-message-id": messageId, "data-action": action, onClick: this.onAction }, action))))))),
                isProgress && (React.createElement("div", { className: 'theia-notification-item-progress' },
                    React.createElement("div", { className: `theia-notification-item-progressbar ${progress ? 'determinate' : 'indeterminate'}`, style: { width: `${progress !== null && progress !== void 0 ? progress : '100'}%` } }))))));
    }
}
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification-component.js.map