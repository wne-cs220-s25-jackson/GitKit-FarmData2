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
exports.PluginWidget = exports.PLUGINS_LABEL = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const inversify_1 = require("@theia/core/shared/inversify");
const react_widget_1 = require("@theia/core/lib/browser/widgets/react-widget");
const alert_message_1 = require("@theia/core/lib/browser/widgets/alert-message");
const hosted_plugin_1 = require("../../hosted/browser/hosted-plugin");
const progress_bar_factory_1 = require("@theia/core/lib/browser/progress-bar-factory");
const disposable_1 = require("@theia/core/lib/common/disposable");
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
exports.PLUGINS_LABEL = common_1.nls.localize('theia/plugin-ext/plugins', 'Plugins');
let PluginWidget = class PluginWidget extends react_widget_1.ReactWidget {
    constructor() {
        super();
        this.toDisposeProgress = new disposable_1.DisposableCollection();
        this.id = 'plugins';
        this.title.label = exports.PLUGINS_LABEL;
        this.title.caption = exports.PLUGINS_LABEL;
        this.title.iconClass = (0, browser_1.codicon)('diff-added');
        this.title.closable = true;
        this.node.tabIndex = 0;
        this.addClass('theia-plugins');
        this.update();
    }
    init() {
        this.toDispose.push(this.pluginService.onDidChangePlugins(() => this.update()));
    }
    onActivateRequest(msg) {
        super.onActivateRequest(msg);
        this.node.focus();
    }
    render() {
        return React.createElement("div", { ref: ref => {
                this.toDisposeProgress.dispose();
                this.toDispose.push(this.toDisposeProgress);
                if (ref) {
                    this.toDispose.push(this.progressBarFactory({ container: this.node, insertMode: 'prepend', locationId: hosted_plugin_1.PluginProgressLocation }));
                }
            } }, this.doRender());
    }
    doRender() {
        const plugins = this.pluginService.plugins;
        if (!plugins.length) {
            return React.createElement(alert_message_1.AlertMessage, { type: 'INFO', header: 'No plugins currently available.' });
        }
        return React.createElement(React.Fragment, null, this.renderPlugins(plugins));
    }
    renderPlugins(plugins) {
        return React.createElement("div", { id: 'pluginListContainer' }, plugins.sort((a, b) => this.compareMetadata(a, b)).map(plugin => this.renderPlugin(plugin)));
    }
    renderPlugin(plugin) {
        return React.createElement("div", { key: plugin.model.name, className: this.createPluginClassName(plugin) },
            React.createElement("div", { className: 'column flexcontainer pluginInformationContainer' },
                React.createElement("div", { className: 'row flexcontainer' },
                    React.createElement("div", { className: (0, browser_1.codicon)('list-selection') }),
                    React.createElement("div", { title: plugin.model.name, className: 'pluginName noWrapInfo' }, plugin.model.name)),
                React.createElement("div", { className: 'row flexcontainer' },
                    React.createElement("div", { className: 'pluginVersion' }, plugin.model.version)),
                React.createElement("div", { className: 'row flexcontainer' },
                    React.createElement("div", { className: 'pluginDescription noWrapInfo' }, plugin.model.description)),
                React.createElement("div", { className: 'row flexcontainer' },
                    React.createElement("div", { className: 'pluginPublisher noWrapInfo flexcontainer' }, plugin.model.publisher))));
    }
    createPluginClassName(plugin) {
        const classNames = ['pluginHeaderContainer'];
        return classNames.join(' ');
    }
    /**
     * Compare two plugins based on their names, and publishers.
     * @param a the first plugin metadata.
     * @param b the second plugin metadata.
     */
    compareMetadata(a, b) {
        // Determine the name of the plugins.
        const nameA = a.model.name.toLowerCase();
        const nameB = b.model.name.toLowerCase();
        // Determine the publisher of the plugin (when names are equal).
        const publisherA = a.model.publisher.toLowerCase();
        const publisherB = b.model.publisher.toLowerCase();
        return (nameA === nameA)
            ? nameA.localeCompare(nameB)
            : publisherA.localeCompare(publisherB);
    }
};
exports.PluginWidget = PluginWidget;
tslib_1.__decorate([
    (0, inversify_1.inject)(hosted_plugin_1.HostedPluginSupport),
    tslib_1.__metadata("design:type", hosted_plugin_1.HostedPluginSupport)
], PluginWidget.prototype, "pluginService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(progress_bar_factory_1.ProgressBarFactory),
    tslib_1.__metadata("design:type", Function)
], PluginWidget.prototype, "progressBarFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PluginWidget.prototype, "init", null);
exports.PluginWidget = PluginWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], PluginWidget);
//# sourceMappingURL=plugin-ext-widget.js.map