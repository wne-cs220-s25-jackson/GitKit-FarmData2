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
exports.ScmHistoryList = exports.ScmHistoryWidget = exports.ScmHistorySupport = exports.ScmCommitNode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const cancellation_1 = require("@theia/core/lib/common/cancellation");
const react_virtuoso_1 = require("@theia/core/shared/react-virtuoso");
const uri_1 = require("@theia/core/lib/common/uri");
const scm_file_change_node_1 = require("../scm-file-change-node");
const scm_avatar_service_1 = require("@theia/scm/lib/browser/scm-avatar-service");
const scm_navigable_list_widget_1 = require("../scm-navigable-list-widget");
const React = require("@theia/core/shared/react");
const alert_message_1 = require("@theia/core/lib/browser/widgets/alert-message");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
const nls_1 = require("@theia/core/lib/common/nls");
const scm_history_provider_1 = require("./scm-history-provider");
const throttle = require("@theia/core/shared/lodash.throttle");
const scm_history_constants_1 = require("./scm-history-constants");
Object.defineProperty(exports, "ScmCommitNode", { enumerable: true, get: function () { return scm_history_constants_1.ScmCommitNode; } });
Object.defineProperty(exports, "ScmHistorySupport", { enumerable: true, get: function () { return scm_history_constants_1.ScmHistorySupport; } });
let ScmHistoryWidget = class ScmHistoryWidget extends scm_navigable_list_widget_1.ScmNavigableListWidget {
    constructor(openerService, shell, fileService, avatarService, widgetManager) {
        super();
        this.openerService = openerService;
        this.shell = shell;
        this.fileService = fileService;
        this.avatarService = avatarService;
        this.widgetManager = widgetManager;
        this.toDisposeOnRepositoryChange = new core_1.DisposableCollection();
        this.toDisposeOnRefresh = new core_1.DisposableCollection();
        this.setContent = throttle((options) => this.doSetContent(options), 100);
        this.loadMoreRows = (index) => this.doLoadMoreRows(index);
        this.renderCommit = (commit) => this.doRenderCommit(commit);
        this.renderFileChangeList = (fileChange) => this.doRenderFileChangeList(fileChange);
        this.id = scm_history_constants_1.SCM_HISTORY_ID;
        this.scrollContainer = 'scm-history-list-container';
        this.title.label = scm_history_constants_1.SCM_HISTORY_LABEL;
        this.title.caption = scm_history_constants_1.SCM_HISTORY_LABEL;
        this.title.iconClass = (0, browser_1.codicon)('history');
        this.title.closable = true;
        this.addClass('theia-scm');
        this.addClass('theia-scm-history');
        this.status = { state: 'loading' };
        this.resetState();
        this.cancelIndicator = new cancellation_1.CancellationTokenSource();
    }
    init() {
        this.refreshOnRepositoryChange();
        this.toDispose.push(this.scmService.onDidChangeSelectedRepository(() => this.refreshOnRepositoryChange()));
        this.toDispose.push(this.labelProvider.onDidChange(event => {
            if (this.scmNodes.some(node => scm_file_change_node_1.ScmFileChangeNode.is(node) && event.affects(new uri_1.default(node.fileChange.uri)))) {
                this.update();
            }
        }));
    }
    refreshOnRepositoryChange() {
        this.toDisposeOnRepositoryChange.dispose();
        const repository = this.scmService.selectedRepository;
        if (repository && scm_history_provider_1.ScmHistoryProvider.is(repository.provider)) {
            this.historySupport = repository.provider.historySupport;
            if (this.historySupport) {
                this.toDisposeOnRepositoryChange.push(this.historySupport.onDidChangeHistory(() => this.setContent(this.options)));
            }
        }
        else {
            this.historySupport = undefined;
        }
        this.setContent(this.options);
        // If switching repository, discard options because they are specific to a repository
        this.options = this.createHistoryOptions();
        this.refresh();
    }
    createHistoryOptions() {
        return {
            maxCount: scm_history_constants_1.SCM_HISTORY_MAX_COUNT
        };
    }
    refresh() {
        this.toDisposeOnRefresh.dispose();
        this.toDispose.push(this.toDisposeOnRefresh);
        const repository = this.scmService.selectedRepository;
        this.title.label = scm_history_constants_1.SCM_HISTORY_LABEL;
        if (repository) {
            this.title.label += ': ' + repository.provider.label;
        }
        const area = this.shell.getAreaFor(this);
        if (area === 'left') {
            this.shell.leftPanelHandler.refresh();
        }
        else if (area === 'right') {
            this.shell.rightPanelHandler.refresh();
        }
        this.update();
        if (repository) {
            this.toDisposeOnRefresh.push(repository.onDidChange(() => this.update()));
            // render synchronously to avoid cursor jumping
            // see https://stackoverflow.com/questions/28922275/in-reactjs-why-does-setstate-behave-differently-when-called-synchronously/28922465#28922465
            this.toDisposeOnRefresh.push(repository.input.onDidChange(() => this.setContent(this.options)));
        }
    }
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this.addListNavigationKeyListeners(this.node);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.addEventListener(this.node, 'ps-scroll-y', (e) => {
            var _a;
            if ((_a = this.listView) === null || _a === void 0 ? void 0 : _a.list) {
                const { scrollTop } = e.target;
                this.listView.list.scrollTo({
                    top: scrollTop
                });
            }
        });
    }
    async doSetContent(options) {
        this.resetState(options);
        if (options && options.uri) {
            try {
                const fileStat = await this.fileService.resolve(new uri_1.default(options.uri));
                this.singleFileMode = !fileStat.isDirectory;
            }
            catch {
                this.singleFileMode = true;
            }
        }
        await this.addCommits(options);
        this.onDataReady();
        if (this.scmNodes.length > 0) {
            this.selectNode(this.scmNodes[0]);
        }
    }
    resetState(options) {
        this.options = options || this.createHistoryOptions();
        this.hasMoreCommits = true;
        this.allowScrollToSelected = true;
    }
    async addCommits(options) {
        const repository = this.scmService.selectedRepository;
        this.cancelIndicator.cancel();
        this.cancelIndicator = new cancellation_1.CancellationTokenSource();
        const token = this.cancelIndicator.token;
        if (repository) {
            if (this.historySupport) {
                try {
                    const history = await this.historySupport.getCommitHistory(options);
                    if (token.isCancellationRequested || !this.hasMoreCommits) {
                        return;
                    }
                    if (options && (options.maxCount && history.length < options.maxCount)) {
                        this.hasMoreCommits = false;
                    }
                    const avatarCache = new Map();
                    const commits = [];
                    for (const commit of history) {
                        const fileChangeNodes = [];
                        await Promise.all(commit.fileChanges.map(async (fileChange) => {
                            fileChangeNodes.push({
                                fileChange, commitId: commit.id
                            });
                        }));
                        let avatarUrl = '';
                        if (avatarCache.has(commit.authorEmail)) {
                            avatarUrl = avatarCache.get(commit.authorEmail);
                        }
                        else {
                            avatarUrl = await this.avatarService.getAvatar(commit.authorEmail);
                            avatarCache.set(commit.authorEmail, avatarUrl);
                        }
                        commits.push({
                            commitDetails: commit,
                            authorAvatar: avatarUrl,
                            fileChangeNodes,
                            expanded: false,
                            selected: false
                        });
                    }
                    this.status = { state: 'ready', commits };
                }
                catch (error) {
                    if (options && options.uri && repository) {
                        this.hasMoreCommits = false;
                    }
                    this.status = { state: 'error', errorMessage: React.createElement(React.Fragment, null,
                            " ",
                            error.message,
                            " ") };
                }
            }
            else {
                this.status = { state: 'error', errorMessage: React.createElement(React.Fragment, null,
                        "History is not supported for ",
                        repository.provider.label,
                        " source control.") };
            }
        }
        else {
            this.status = {
                state: 'error',
                errorMessage: React.createElement(React.Fragment, null, nls_1.nls.localizeByDefault('No source control providers registered.'))
            };
        }
    }
    async addOrRemoveFileChangeNodes(commit) {
        const id = this.scmNodes.findIndex(node => node === commit);
        if (commit.expanded) {
            this.removeFileChangeNodes(commit, id);
        }
        else {
            await this.addFileChangeNodes(commit, id);
        }
        commit.expanded = !commit.expanded;
        this.update();
    }
    async addFileChangeNodes(commit, scmNodesArrayIndex) {
        if (commit.fileChangeNodes) {
            this.scmNodes.splice(scmNodesArrayIndex + 1, 0, ...commit.fileChangeNodes.map(node => Object.assign(node, { commitSha: commit.commitDetails.id })));
        }
    }
    removeFileChangeNodes(commit, scmNodesArrayIndex) {
        if (commit.fileChangeNodes) {
            this.scmNodes.splice(scmNodesArrayIndex + 1, commit.fileChangeNodes.length);
        }
    }
    storeState() {
        const { options, singleFileMode } = this;
        return {
            options,
            singleFileMode
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    restoreState(oldState) {
        this.options = oldState['options'];
        this.options.maxCount = scm_history_constants_1.SCM_HISTORY_MAX_COUNT;
        this.singleFileMode = oldState['singleFileMode'];
        this.setContent(this.options);
    }
    onDataReady() {
        if (this.status.state === 'ready') {
            this.scmNodes = this.status.commits;
        }
        this.update();
    }
    render() {
        let content;
        switch (this.status.state) {
            case 'ready':
                content = React.createElement(React.Fragment, null,
                    this.renderHistoryHeader(),
                    this.renderCommitList());
                break;
            case 'error':
                const reason = this.status.errorMessage;
                let path = '';
                if (this.options.uri) {
                    const relPathEncoded = this.scmLabelProvider.relativePath(this.options.uri);
                    const relPath = relPathEncoded ? `${decodeURIComponent(relPathEncoded)}` : '';
                    const repo = this.scmService.findRepository(new uri_1.default(this.options.uri));
                    const repoName = repo ? `${this.labelProvider.getName(new uri_1.default(repo.provider.rootUri))}` : '';
                    const relPathAndRepo = [relPath, repoName].filter(Boolean).join(` ${nls_1.nls.localize('theia/git/prepositionIn', 'in')} `);
                    path = `${relPathAndRepo}`;
                }
                content = React.createElement(alert_message_1.AlertMessage, { type: 'WARNING', header: nls_1.nls.localize('theia/git/noHistoryForError', 'There is no history available for {0}', `${path}`) }, reason);
                break;
            case 'loading':
                content = React.createElement("div", { className: 'spinnerContainer' },
                    React.createElement("span", { className: `${(0, browser_1.codicon)('loading')} theia-animation-spin large-spinner` }));
                break;
        }
        return React.createElement("div", { className: 'history-container' }, content);
    }
    renderHistoryHeader() {
        if (this.options.uri) {
            const path = this.scmLabelProvider.relativePath(this.options.uri);
            const fileName = path.split('/').pop();
            return React.createElement("div", { className: 'diff-header' },
                this.renderHeaderRow({ name: 'repository', value: this.getRepositoryLabel(this.options.uri) }),
                this.renderHeaderRow({ name: 'file', value: fileName, title: path }),
                React.createElement("div", { className: 'theia-header' }, "Commits"));
        }
    }
    renderCommitList() {
        const list = React.createElement("div", { className: 'listContainer', id: this.scrollContainer },
            React.createElement(ScmHistoryList, { ref: listView => this.listView = (listView || undefined), rows: this.scmNodes, hasMoreRows: this.hasMoreCommits, loadMoreRows: this.loadMoreRows, renderCommit: this.renderCommit, renderFileChangeList: this.renderFileChangeList }));
        this.allowScrollToSelected = true;
        return list;
    }
    doLoadMoreRows(index) {
        let resolver;
        const promise = new Promise(resolve => resolver = resolve);
        const lastRow = this.scmNodes[index - 1];
        if (scm_history_constants_1.ScmCommitNode.is(lastRow)) {
            const toRevision = lastRow.commitDetails.id;
            this.addCommits({
                range: { toRevision },
                maxCount: scm_history_constants_1.SCM_HISTORY_MAX_COUNT,
                uri: this.options.uri
            }).then(() => {
                this.allowScrollToSelected = false;
                this.onDataReady();
                resolver();
            });
        }
        return promise;
    }
    doRenderCommit(commit) {
        let expansionToggleIcon = (0, browser_1.codicon)('chevron-right');
        if (commit && commit.expanded) {
            expansionToggleIcon = (0, browser_1.codicon)('chevron-down');
        }
        return React.createElement("div", { className: `containerHead${commit.selected ? ' ' + browser_1.SELECTED_CLASS : ''}`, onClick: e => {
                if (commit.selected && !this.singleFileMode) {
                    this.addOrRemoveFileChangeNodes(commit);
                }
                else {
                    this.selectNode(commit);
                }
                e.preventDefault();
            }, onDoubleClick: e => {
                if (this.singleFileMode && commit.fileChangeNodes.length > 0) {
                    this.openFile(commit.fileChangeNodes[0].fileChange);
                }
                e.preventDefault();
            } },
            React.createElement("div", { className: 'headContent' },
                React.createElement("div", { className: 'image-container' },
                    React.createElement("img", { className: 'gravatar', src: commit.authorAvatar })),
                React.createElement("div", { className: `headLabelContainer${this.singleFileMode ? ' singleFileMode' : ''}` },
                    React.createElement("div", { className: 'headLabel noWrapInfo noselect' }, commit.commitDetails.summary),
                    React.createElement("div", { className: 'commitTime noWrapInfo noselect' }, commit.commitDetails.authorDateRelative + ' by ' + commit.commitDetails.authorName)),
                React.createElement("div", { className: `${(0, browser_1.codicon)('eye')} detailButton`, onClick: () => this.openDetailWidget(commit) }),
                !this.singleFileMode && React.createElement("div", { className: 'expansionToggle noselect' },
                    React.createElement("div", { className: 'toggle' },
                        React.createElement("div", { className: 'number' }, commit.commitDetails.fileChanges.length.toString()),
                        React.createElement("div", { className: 'icon ' + expansionToggleIcon })))));
    }
    async openDetailWidget(commitNode) {
        const options = {
            ...commitNode.commitDetails.commitDetailOptions,
            mode: 'reveal'
        };
        (0, browser_1.open)(this.openerService, commitNode.commitDetails.commitDetailUri, options);
    }
    doRenderFileChangeList(fileChange) {
        const fileChangeElement = this.renderScmItem(fileChange, fileChange.commitId);
        return fileChangeElement;
    }
    renderScmItem(change, commitSha) {
        return React.createElement(scm_navigable_list_widget_1.ScmItemComponent, { key: change.fileChange.uri.toString(), labelProvider: this.labelProvider,
            scmLabelProvider: this.scmLabelProvider,
            change,
            revealChange: () => this.openFile(change.fileChange),
            selectNode: () => this.selectNode(change) });
    }
    navigateLeft() {
        const selected = this.getSelected();
        if (selected && this.status.state === 'ready') {
            if (scm_history_constants_1.ScmCommitNode.is(selected)) {
                const idx = this.status.commits.findIndex(c => c.commitDetails.id === selected.commitDetails.id);
                if (selected.expanded) {
                    this.addOrRemoveFileChangeNodes(selected);
                }
                else {
                    if (idx > 0) {
                        this.selectNode(this.status.commits[idx - 1]);
                    }
                }
            }
            else if (scm_file_change_node_1.ScmFileChangeNode.is(selected)) {
                const idx = this.status.commits.findIndex(c => c.commitDetails.id === selected.commitId);
                this.selectNode(this.status.commits[idx]);
            }
        }
        this.update();
    }
    navigateRight() {
        const selected = this.getSelected();
        if (selected) {
            if (scm_history_constants_1.ScmCommitNode.is(selected) && !selected.expanded && !this.singleFileMode) {
                this.addOrRemoveFileChangeNodes(selected);
            }
            else {
                this.selectNextNode();
            }
        }
        this.update();
    }
    handleListEnter() {
        const selected = this.getSelected();
        if (selected) {
            if (scm_history_constants_1.ScmCommitNode.is(selected)) {
                if (this.singleFileMode) {
                    this.openFile(selected.fileChangeNodes[0].fileChange);
                }
                else {
                    this.openDetailWidget(selected);
                }
            }
            else if (scm_file_change_node_1.ScmFileChangeNode.is(selected)) {
                this.openFile(selected.fileChange);
            }
        }
        this.update();
    }
    openFile(change) {
        const uriToOpen = change.getUriToOpen();
        (0, browser_1.open)(this.openerService, uriToOpen, { mode: 'reveal' });
    }
};
exports.ScmHistoryWidget = ScmHistoryWidget;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ScmHistoryWidget.prototype, "init", null);
exports.ScmHistoryWidget = ScmHistoryWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.OpenerService)),
    tslib_1.__param(1, (0, inversify_1.inject)(browser_1.ApplicationShell)),
    tslib_1.__param(2, (0, inversify_1.inject)(file_service_1.FileService)),
    tslib_1.__param(3, (0, inversify_1.inject)(scm_avatar_service_1.ScmAvatarService)),
    tslib_1.__param(4, (0, inversify_1.inject)(browser_1.WidgetManager)),
    tslib_1.__metadata("design:paramtypes", [Object, browser_1.ApplicationShell,
        file_service_1.FileService,
        scm_avatar_service_1.ScmAvatarService,
        browser_1.WidgetManager])
], ScmHistoryWidget);
class ScmHistoryList extends React.Component {
    constructor() {
        super(...arguments);
        this.checkIfRowIsLoaded = (opts) => this.doCheckIfRowIsLoaded(opts);
    }
    doCheckIfRowIsLoaded(opts) {
        const row = this.props.rows[opts.index];
        return !!row;
    }
    render() {
        const { hasMoreRows, loadMoreRows, rows } = this.props;
        return React.createElement(react_virtuoso_1.Virtuoso, { ref: list => this.list = (list || undefined), data: rows, itemContent: index => this.renderRow(index), endReached: hasMoreRows ? loadMoreRows : undefined, overscan: 500, style: {
                overflowX: 'hidden'
            } });
    }
    renderRow(index) {
        if (this.checkIfRowIsLoaded({ index })) {
            const row = this.props.rows[index];
            if (scm_history_constants_1.ScmCommitNode.is(row)) {
                const head = this.props.renderCommit(row);
                return React.createElement("div", { className: `commitListElement${index === 0 ? ' first' : ''}` }, head);
            }
            else if (scm_file_change_node_1.ScmFileChangeNode.is(row)) {
                return React.createElement("div", { className: 'fileChangeListElement' }, this.props.renderFileChangeList(row));
            }
        }
        else {
            return React.createElement("div", { className: `commitListElement${index === 0 ? ' first' : ''}` },
                React.createElement("span", { className: `${(0, browser_1.codicon)('loading')} theia-animation-spin` }));
        }
    }
    ;
}
exports.ScmHistoryList = ScmHistoryList;
//# sourceMappingURL=scm-history-widget.js.map