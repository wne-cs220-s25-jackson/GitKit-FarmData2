"use strict";
// *****************************************************************************
// Copyright (C) 2019 Arm and others.
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
exports.ScmAmendComponent = void 0;
require("../../src/browser/style/scm-amend-component.css");
const React = require("@theia/core/shared/react");
const browser_1 = require("@theia/core/lib/browser");
const core_1 = require("@theia/core");
const nls_1 = require("@theia/core/lib/common/nls");
const TRANSITION_TIME_MS = 300;
const REPOSITORY_STORAGE_KEY = 'scmRepository';
class ScmAmendComponent extends React.Component {
    constructor(props) {
        super(props);
        /**
         * a hint on how to animate an update, set by certain user action handlers
         * and used when updating the view based on a repository change
         */
        this.transitionHint = 'none';
        this.lastCommitHeight = 0;
        this.lastCommitScrollRef = (instance) => {
            if (instance && this.lastCommitHeight === 0) {
                this.lastCommitHeight = instance.getBoundingClientRect().height;
            }
        };
        this.toDisposeOnUnmount = new core_1.DisposableCollection();
        /**
         * This function will update the 'model' (lastCommit, amendingCommits) only
         * when the repository sees the last commit change.
         * 'render' can be called at any time, so be sure we don't update any 'model'
         * fields until we actually start the transition.
         */
        this.amend = async () => {
            if (this.state.transition.state !== 'none' && this.transitionHint !== 'none') {
                return;
            }
            this.transitionHint = 'amend';
            await this.resetAndSetMessage('HEAD~', 'HEAD');
        };
        this.unamend = async () => {
            if (this.state.transition.state !== 'none' && this.transitionHint !== 'none') {
                return;
            }
            const commitToRestore = (this.state.amendingCommits.length >= 1)
                ? this.state.amendingCommits[this.state.amendingCommits.length - 1]
                : undefined;
            const oldestAmendCommit = (this.state.amendingCommits.length >= 2)
                ? this.state.amendingCommits[this.state.amendingCommits.length - 2]
                : undefined;
            if (commitToRestore) {
                const commitToUseForMessage = oldestAmendCommit
                    ? oldestAmendCommit.commit.id
                    : undefined;
                this.transitionHint = 'unamend';
                await this.resetAndSetMessage(commitToRestore.commit.id, commitToUseForMessage);
            }
        };
        this.unamendAll = () => this.doUnamendAll();
        this.clearAmending = () => this.doClearAmending();
        this.state = {
            transition: { state: 'none' },
            amendingCommits: [],
            lastCommit: undefined
        };
        const setState = this.setState.bind(this);
        this.setState = newState => {
            if (!this.toDisposeOnUnmount.disposed) {
                setState(newState);
            }
        };
    }
    async componentDidMount() {
        this.toDisposeOnUnmount.push(core_1.Disposable.create(() => { }));
        const lastCommit = await this.getLastCommit();
        this.setState({ amendingCommits: await this.buildAmendingList(lastCommit ? lastCommit.commit : undefined), lastCommit });
        if (this.toDisposeOnUnmount.disposed) {
            return;
        }
        this.toDisposeOnUnmount.push(this.props.repository.provider.onDidChange(() => this.fetchStatusAndSetState()));
    }
    componentWillUnmount() {
        this.toDisposeOnUnmount.dispose();
    }
    async fetchStatusAndSetState() {
        const storageKey = this.getStorageKey();
        const nextCommit = await this.getLastCommit();
        if (nextCommit && this.state.lastCommit && nextCommit.commit.id === this.state.lastCommit.commit.id) {
            // No change here
        }
        else if (nextCommit === undefined && this.state.lastCommit === undefined) {
            // No change here
        }
        else if (this.transitionHint === 'none') {
            // If the 'last' commit changes, but we are not expecting an 'amend'
            // or 'unamend' to occur, then we clear out the list of amended commits.
            // This is because an unexpected change has happened to the repository,
            // perhaps the user committed, merged, or something.  The amended commits
            // will no longer be valid.
            // Note that there may or may not have been a previous lastCommit (if the
            // repository was previously empty with no initial commit then lastCommit
            // will be undefined).  Either way we clear the amending commits.
            await this.clearAmendingCommits();
            // There is a change to the last commit, but no transition hint so
            // the view just updates without transition.
            this.setState({ amendingCommits: [], lastCommit: nextCommit });
        }
        else {
            const amendingCommits = this.state.amendingCommits.concat([]); // copy the array
            const direction = this.transitionHint === 'amend' ? 'up' : 'down';
            switch (this.transitionHint) {
                case 'amend':
                    if (this.state.lastCommit) {
                        amendingCommits.push(this.state.lastCommit);
                        const serializedState = JSON.stringify({
                            amendingHeadCommitSha: amendingCommits[0].commit.id,
                            latestCommitSha: nextCommit ? nextCommit.commit.id : undefined
                        });
                        this.props.storageService.setData(storageKey, serializedState);
                    }
                    break;
                case 'unamend':
                    amendingCommits.pop();
                    if (amendingCommits.length === 0) {
                        this.props.storageService.setData(storageKey, undefined);
                    }
                    else {
                        const serializedState = JSON.stringify({
                            amendingHeadCommitSha: amendingCommits[0].commit.id,
                            latestCommitSha: nextCommit ? nextCommit.commit.id : undefined
                        });
                        this.props.storageService.setData(storageKey, serializedState);
                    }
                    break;
            }
            if (this.state.lastCommit && nextCommit) {
                const transitionData = { direction, previousLastCommit: this.state.lastCommit };
                this.setState({ lastCommit: nextCommit, amendingCommits, transition: { ...transitionData, state: 'start' } });
                this.onNextFrame(() => {
                    this.setState({ transition: { ...transitionData, state: 'transitioning' } });
                });
                setTimeout(() => {
                    this.setState({ transition: { state: 'none' } });
                }, TRANSITION_TIME_MS);
            }
            else {
                // No previous last commit so no transition
                this.setState({ transition: { state: 'none' }, amendingCommits, lastCommit: nextCommit });
            }
        }
        this.transitionHint = 'none';
    }
    async clearAmendingCommits() {
        const storageKey = this.getStorageKey();
        await this.props.storageService.setData(storageKey, undefined);
    }
    async buildAmendingList(lastCommit) {
        const storageKey = this.getStorageKey();
        const storedState = await this.props.storageService.getData(storageKey, undefined);
        // Restore list of commits from saved amending head commit up through parents until the
        // current commit.  (If we don't reach the current commit, the repository has been changed in such
        // a way then unamending commits can no longer be done).
        if (storedState) {
            const { amendingHeadCommitSha, latestCommitSha } = JSON.parse(storedState);
            if (!this.commitsAreEqual(lastCommit, latestCommitSha)) {
                // The head commit in the repository has changed.  It is not the same commit that was the
                // head commit after the last 'amend'.
                return [];
            }
            const commits = await this.props.scmAmendSupport.getInitialAmendingCommits(amendingHeadCommitSha, lastCommit ? lastCommit.id : undefined);
            const amendingCommitPromises = commits.map(async (commit) => {
                const avatar = await this.props.avatarService.getAvatar(commit.authorEmail);
                return { commit, avatar };
            });
            return Promise.all(amendingCommitPromises);
        }
        else {
            return [];
        }
    }
    getStorageKey() {
        return REPOSITORY_STORAGE_KEY + ':' + this.props.repository.provider.rootUri;
    }
    /**
     * Commits are equal if the ids are equal or if both are undefined.
     * (If a commit is undefined, it represents the initial empty state of a repository,
     * before the initial commit).
     */
    commitsAreEqual(lastCommit, savedLastCommitId) {
        return lastCommit
            ? lastCommit.id === savedLastCommitId
            : savedLastCommitId === undefined;
    }
    async resetAndSetMessage(commitToRestore, commitToUseForMessage) {
        const message = commitToUseForMessage
            ? await this.props.scmAmendSupport.getMessage(commitToUseForMessage)
            : '';
        await this.props.scmAmendSupport.reset(commitToRestore);
        this.props.setCommitMessage(message);
    }
    render() {
        const neverShrink = this.state.amendingCommits.length <= 3;
        const style = neverShrink
            ? {
                ...this.props.style,
                flexShrink: 0,
            }
            : {
                ...this.props.style,
                flexShrink: 1,
                minHeight: 240 // height with three commits
            };
        return (React.createElement("div", { className: ScmAmendComponent.Styles.COMMIT_CONTAINER + ' no-select', style: style },
            this.state.amendingCommits.length > 0 || (this.state.lastCommit && this.state.transition.state !== 'none' && this.state.transition.direction === 'down')
                ? this.renderAmendingCommits()
                : '',
            this.state.lastCommit ?
                React.createElement("div", null,
                    React.createElement("div", { id: 'lastCommit', className: 'theia-scm-amend' },
                        React.createElement("div", { className: 'theia-header scm-theia-header' }, nls_1.nls.localize('theia/scm/amendHeadCommit', 'HEAD Commit')),
                        this.renderLastCommit()))
                : ''));
    }
    async getLastCommit() {
        const commit = await this.props.scmAmendSupport.getLastCommit();
        if (commit) {
            const avatar = await this.props.avatarService.getAvatar(commit.authorEmail);
            return { commit, avatar };
        }
        return undefined;
    }
    renderAmendingCommits() {
        const neverShrink = this.state.amendingCommits.length <= 3;
        const style = neverShrink
            ? {
                flexShrink: 0,
            }
            : {
                flexShrink: 1,
                // parent minHeight controls height, we just need any value smaller than
                // what the height would be when the parent is at its minHeight
                minHeight: 0
            };
        return React.createElement("div", { id: 'amendedCommits', className: 'theia-scm-amend-outer-container', style: style },
            React.createElement("div", { className: 'theia-header scm-theia-header' },
                React.createElement("div", { className: 'noWrapInfo' }, "Commits being Amended"),
                this.renderAmendCommitListButtons(),
                this.renderCommitCount(this.state.amendingCommits.length)),
            React.createElement("div", { style: this.styleAmendedCommits() },
                this.state.amendingCommits.map((commitData, index, array) => this.renderCommitBeingAmended(commitData, index === array.length - 1)),
                this.state.lastCommit && this.state.transition.state !== 'none' && this.state.transition.direction === 'down'
                    ? this.renderCommitBeingAmended(this.state.lastCommit, false)
                    : ''));
    }
    renderAmendCommitListButtons() {
        return React.createElement("div", { className: 'theia-scm-inline-actions-container' },
            React.createElement("div", { className: 'theia-scm-inline-actions' },
                React.createElement("div", { className: 'theia-scm-inline-action' },
                    React.createElement("a", { className: (0, browser_1.codicon)('dash'), title: 'Unamend All Commits', onClick: this.unamendAll })),
                React.createElement("div", { className: 'theia-scm-inline-action' },
                    React.createElement("a", { className: (0, browser_1.codicon)('close'), title: 'Clear Amending Commits', onClick: this.clearAmending }))));
    }
    renderLastCommit() {
        if (!this.state.lastCommit) {
            return '';
        }
        const canAmend = true;
        return React.createElement("div", { className: ScmAmendComponent.Styles.COMMIT_AND_BUTTON, style: { flexGrow: 0, flexShrink: 0 }, key: this.state.lastCommit.commit.id },
            this.renderLastCommitNoButton(this.state.lastCommit),
            canAmend
                ? React.createElement("div", { className: ScmAmendComponent.Styles.FLEX_CENTER },
                    React.createElement("button", { className: 'theia-button', title: nls_1.nls.localize('theia/scm/amendLastCommit', 'Amend last commit'), onClick: this.amend }, nls_1.nls.localize('theia/scm/amend', 'Amend')))
                : '');
    }
    renderLastCommitNoButton(lastCommit) {
        switch (this.state.transition.state) {
            case 'none':
                return React.createElement("div", { ref: this.lastCommitScrollRef, className: 'theia-scm-scrolling-container' }, this.renderCommitAvatarAndDetail(lastCommit));
            case 'start':
            case 'transitioning':
                switch (this.state.transition.direction) {
                    case 'up':
                        return React.createElement("div", { style: this.styleLastCommitMovingUp(this.state.transition.state) },
                            this.renderCommitAvatarAndDetail(this.state.transition.previousLastCommit),
                            this.renderCommitAvatarAndDetail(lastCommit));
                    case 'down':
                        return React.createElement("div", { style: this.styleLastCommitMovingDown(this.state.transition.state) },
                            this.renderCommitAvatarAndDetail(lastCommit),
                            this.renderCommitAvatarAndDetail(this.state.transition.previousLastCommit));
                }
        }
    }
    /**
     * See https://stackoverflow.com/questions/26556436/react-after-render-code
     *
     * @param callback
     */
    onNextFrame(callback) {
        setTimeout(() => window.requestAnimationFrame(callback), 0);
    }
    renderCommitAvatarAndDetail(commitData) {
        const { commit, avatar } = commitData;
        return React.createElement("div", { className: ScmAmendComponent.Styles.COMMIT_AVATAR_AND_TEXT, key: commit.id },
            React.createElement("div", { className: ScmAmendComponent.Styles.COMMIT_MESSAGE_AVATAR },
                React.createElement("img", { src: avatar })),
            React.createElement("div", { className: ScmAmendComponent.Styles.COMMIT_DETAILS },
                React.createElement("div", { className: ScmAmendComponent.Styles.COMMIT_MESSAGE_SUMMARY }, commit.summary),
                React.createElement("div", { className: ScmAmendComponent.Styles.LAST_COMMIT_MESSAGE_TIME }, `${commit.authorDateRelative} by ${commit.authorName}`)));
    }
    renderCommitCount(commits) {
        return React.createElement("div", { className: 'notification-count-container scm-change-count' },
            React.createElement("span", { className: 'notification-count' }, commits));
    }
    renderCommitBeingAmended(commitData, isOldestAmendCommit) {
        if (isOldestAmendCommit && this.state.transition.state !== 'none' && this.state.transition.direction === 'up') {
            return React.createElement("div", { className: ScmAmendComponent.Styles.COMMIT_AVATAR_AND_TEXT, style: { flexGrow: 0, flexShrink: 0 }, key: commitData.commit.id },
                React.createElement("div", { className: 'fixed-height-commit-container' }, this.renderCommitAvatarAndDetail(commitData)));
        }
        else {
            return React.createElement("div", { className: ScmAmendComponent.Styles.COMMIT_AVATAR_AND_TEXT, style: { flexGrow: 0, flexShrink: 0 }, key: commitData.commit.id },
                this.renderCommitAvatarAndDetail(commitData),
                isOldestAmendCommit
                    ? React.createElement("div", { className: ScmAmendComponent.Styles.FLEX_CENTER },
                        React.createElement("button", { className: 'theia-button', title: nls_1.nls.localize('theia/scm/unamendCommit', 'Unamend commit'), onClick: this.unamend }, nls_1.nls.localize('theia/scm/unamend', 'Unamend')))
                    : '');
        }
    }
    /*
     * The style for the <div> containing the list of commits being amended.
     * This div is scrollable.
     */
    styleAmendedCommits() {
        const base = {
            display: 'flex',
            whitespace: 'nowrap',
            width: '100%',
            minHeight: 0,
            flexShrink: 1,
            paddingTop: '2px',
        };
        switch (this.state.transition.state) {
            case 'none':
                return {
                    ...base,
                    flexDirection: 'column',
                    overflowY: 'auto',
                    marginBottom: '0',
                };
            case 'start':
            case 'transitioning':
                let startingMargin = 0;
                let endingMargin = 0;
                switch (this.state.transition.direction) {
                    case 'down':
                        startingMargin = 0;
                        endingMargin = -32;
                        break;
                    case 'up':
                        startingMargin = -32;
                        endingMargin = 0;
                        break;
                }
                switch (this.state.transition.state) {
                    case 'start':
                        return {
                            ...base,
                            flexDirection: 'column',
                            overflowY: 'hidden',
                            marginBottom: `${startingMargin}px`,
                        };
                    case 'transitioning':
                        return {
                            ...base,
                            flexDirection: 'column',
                            overflowY: 'hidden',
                            marginBottom: `${endingMargin}px`,
                            transitionProperty: 'margin-bottom',
                            transitionDuration: `${TRANSITION_TIME_MS}ms`,
                            transitionTimingFunction: 'linear'
                        };
                }
        }
    }
    styleLastCommitMovingUp(transitionState) {
        return this.styleLastCommit(transitionState, 0, -28);
    }
    styleLastCommitMovingDown(transitionState) {
        return this.styleLastCommit(transitionState, -28, 0);
    }
    styleLastCommit(transitionState, startingMarginTop, startingMarginBottom) {
        const base = {
            display: 'flex',
            width: '100%',
            overflow: 'hidden',
            paddingTop: 0,
            paddingBottom: 0,
            borderTop: 0,
            borderBottom: 0,
            height: this.lastCommitHeight * 2
        };
        // We end with top and bottom margins switched
        const endingMarginTop = startingMarginBottom;
        const endingMarginBottom = startingMarginTop;
        switch (transitionState) {
            case 'start':
                return {
                    ...base,
                    position: 'relative',
                    flexDirection: 'column',
                    marginTop: startingMarginTop,
                    marginBottom: startingMarginBottom,
                };
            case 'transitioning':
                return {
                    ...base,
                    position: 'relative',
                    flexDirection: 'column',
                    marginTop: endingMarginTop,
                    marginBottom: endingMarginBottom,
                    transitionProperty: 'margin-top margin-bottom',
                    transitionDuration: `${TRANSITION_TIME_MS}ms`,
                    transitionTimingFunction: 'linear'
                };
        }
    }
    async doUnamendAll() {
        while (this.state.amendingCommits.length > 0) {
            this.unamend();
            await new Promise(resolve => setTimeout(resolve, TRANSITION_TIME_MS));
        }
    }
    async doClearAmending() {
        await this.clearAmendingCommits();
        this.setState({ amendingCommits: [] });
    }
}
exports.ScmAmendComponent = ScmAmendComponent;
(function (ScmAmendComponent) {
    let Styles;
    (function (Styles) {
        Styles.COMMIT_CONTAINER = 'theia-scm-commit-container';
        Styles.COMMIT_AND_BUTTON = 'theia-scm-commit-and-button';
        Styles.COMMIT_AVATAR_AND_TEXT = 'theia-scm-commit-avatar-and-text';
        Styles.COMMIT_DETAILS = 'theia-scm-commit-details';
        Styles.COMMIT_MESSAGE_AVATAR = 'theia-scm-commit-message-avatar';
        Styles.COMMIT_MESSAGE_SUMMARY = 'theia-scm-commit-message-summary';
        Styles.LAST_COMMIT_MESSAGE_TIME = 'theia-scm-commit-message-time';
        Styles.FLEX_CENTER = 'theia-scm-flex-container-center';
    })(Styles = ScmAmendComponent.Styles || (ScmAmendComponent.Styles = {}));
})(ScmAmendComponent || (exports.ScmAmendComponent = ScmAmendComponent = {}));
//# sourceMappingURL=scm-amend-component.js.map