"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
exports.TerminalProcess = exports.NodePtyErrors = exports.TerminalProcessFactory = exports.TerminalProcessOptions = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const common_1 = require("@theia/core/lib/common");
const process_1 = require("./process");
const process_manager_1 = require("./process-manager");
const node_pty_1 = require("node-pty");
const multi_ring_buffer_1 = require("./multi-ring-buffer");
const dev_null_stream_1 = require("./dev-null-stream");
const utils_1 = require("./utils");
const pseudo_pty_1 = require("./pseudo-pty");
const stream_1 = require("stream");
exports.TerminalProcessOptions = Symbol('TerminalProcessOptions');
exports.TerminalProcessFactory = Symbol('TerminalProcessFactory');
var NodePtyErrors;
(function (NodePtyErrors) {
    NodePtyErrors["EACCES"] = "Permission denied";
    NodePtyErrors["ENOENT"] = "No such file or directory";
})(NodePtyErrors || (exports.NodePtyErrors = NodePtyErrors = {}));
/**
 * Run arbitrary processes inside pseudo-terminals (PTY).
 *
 * Note: a PTY is not a shell process (bash/pwsh/cmd...)
 */
let TerminalProcess = class TerminalProcess extends process_1.Process {
    constructor(options, processManager, ringBuffer, logger) {
        super(processManager, logger, process_1.ProcessType.Terminal, options);
        this.options = options;
        this.ringBuffer = ringBuffer;
        this.outputStream = this.createOutputStream();
        this.errorStream = new dev_null_stream_1.DevNullStream({ autoDestroy: true });
        if (options.isPseudo) {
            // do not need to spawn a process, new a pseudo pty instead
            this.terminal = new pseudo_pty_1.PseudoPty();
            this.inputStream = new dev_null_stream_1.DevNullStream({ autoDestroy: true });
            return;
        }
        if (this.isForkOptions(this.options)) {
            throw new Error('terminal processes cannot be forked as of today');
        }
        this.logger.debug('Starting terminal process', JSON.stringify(options, undefined, 2));
        // Delay resizes to avoid conpty not respecting very early resize calls
        // see https://github.com/microsoft/vscode/blob/a1c783c/src/vs/platform/terminal/node/terminalProcess.ts#L177
        if (core_1.isWindows) {
            this._delayedResizer = new DelayedResizer();
            this._delayedResizer.onTrigger(dimensions => {
                var _a;
                (_a = this._delayedResizer) === null || _a === void 0 ? void 0 : _a.dispose();
                this._delayedResizer = undefined;
                if (dimensions.cols && dimensions.rows) {
                    this.resize(dimensions.cols, dimensions.rows);
                }
            });
        }
        const startTerminal = (command) => {
            try {
                return this.createPseudoTerminal(command, options, ringBuffer);
            }
            catch (error) {
                // Normalize the error to make it as close as possible as what
                // node's child_process.spawn would generate in the same
                // situation.
                const message = error.message;
                if (message.startsWith('File not found: ') || message.endsWith(NodePtyErrors.ENOENT)) {
                    if (core_1.isWindows && command && !command.toLowerCase().endsWith('.exe')) {
                        const commandExe = command + '.exe';
                        this.logger.debug(`Trying terminal command '${commandExe}' because '${command}' was not found.`);
                        return startTerminal(commandExe);
                    }
                    // Proceed with failure, reporting the original command because it was
                    // the intended command and it was not found
                    error.errno = 'ENOENT';
                    error.code = 'ENOENT';
                    error.path = options.command;
                }
                else if (message.endsWith(NodePtyErrors.EACCES)) {
                    // The shell program exists but was not accessible, so just fail
                    error.errno = 'EACCES';
                    error.code = 'EACCES';
                    error.path = options.command;
                }
                // node-pty throws exceptions on Windows.
                // Call the client error handler, but first give them a chance to register it.
                this.emitOnErrorAsync(error);
                return { terminal: undefined, inputStream: new dev_null_stream_1.DevNullStream({ autoDestroy: true }) };
            }
        };
        const { terminal, inputStream } = startTerminal(options.command);
        this.terminal = terminal;
        this.inputStream = inputStream;
    }
    /**
     * Helper for the constructor to attempt to create the pseudo-terminal encapsulating the shell process.
     *
     * @param command the shell command to launch
     * @param options options for the shell process
     * @param ringBuffer a ring buffer in which to collect terminal output
     * @returns the terminal PTY and a stream by which it may be sent input
     */
    createPseudoTerminal(command, options, ringBuffer) {
        const terminal = (0, node_pty_1.spawn)(command, (core_1.isWindows && options.commandLine) || options.args || [], options.options || {});
        process.nextTick(() => this.emitOnStarted());
        // node-pty actually wait for the underlying streams to be closed before emitting exit.
        // We should emulate the `exit` and `close` sequence.
        terminal.onExit(({ exitCode, signal }) => {
            // see https://github.com/microsoft/node-pty/issues/751
            if (exitCode === undefined) {
                exitCode = 0;
            }
            // Make sure to only pass either code or signal as !undefined, not
            // both.
            //
            // node-pty quirk: On Linux/macOS, if the process exited through the
            // exit syscall (with an exit code), signal will be 0 (an invalid
            // signal value).  If it was terminated because of a signal, the
            // signal parameter will hold the signal number and code should
            // be ignored.
            this._exitCode = exitCode;
            if (signal === undefined || signal === 0) {
                this.onTerminalExit(exitCode, undefined);
            }
            else {
                this.onTerminalExit(undefined, (0, utils_1.signame)(signal));
            }
            process.nextTick(() => {
                if (signal === undefined || signal === 0) {
                    this.emitOnClose(exitCode, undefined);
                }
                else {
                    this.emitOnClose(undefined, (0, utils_1.signame)(signal));
                }
            });
        });
        terminal.onData((data) => {
            ringBuffer.enq(data);
        });
        const inputStream = new stream_1.Writable({
            write: (chunk) => {
                this.write(chunk);
            },
        });
        return { terminal, inputStream };
    }
    createOutputStream() {
        return this.ringBuffer.getStream();
    }
    get pid() {
        this.checkTerminal();
        return this.terminal.pid;
    }
    get executable() {
        return this.options.command;
    }
    get arguments() {
        return this.options.args || [];
    }
    onTerminalExit(code, signal) {
        this.emitOnExit(code, signal);
        this.unregisterProcess();
    }
    unregisterProcess() {
        this.processManager.unregister(this);
    }
    kill(signal) {
        if (this.terminal && this.killed === false) {
            this.terminal.kill(signal);
        }
    }
    resize(cols, rows) {
        if (typeof cols !== 'number' || typeof rows !== 'number' || isNaN(cols) || isNaN(rows)) {
            return;
        }
        this.checkTerminal();
        try {
            // Ensure that cols and rows are always >= 1, this prevents a native exception in winpty.
            cols = Math.max(cols, 1);
            rows = Math.max(rows, 1);
            // Delay resize if needed
            if (this._delayedResizer) {
                this._delayedResizer.cols = cols;
                this._delayedResizer.rows = rows;
                return;
            }
            this.terminal.resize(cols, rows);
        }
        catch (error) {
            // swallow error if the pty has already exited
            // see also https://github.com/microsoft/vscode/blob/a1c783c/src/vs/platform/terminal/node/terminalProcess.ts#L549
            if (this._exitCode !== undefined &&
                error.message !== 'ioctl(2) failed, EBADF' &&
                error.message !== 'Cannot resize a pty that has already exited') {
                throw error;
            }
        }
    }
    write(data) {
        this.checkTerminal();
        this.terminal.write(data);
    }
    checkTerminal() {
        if (!this.terminal) {
            throw new Error('pty process did not start correctly');
        }
    }
};
exports.TerminalProcess = TerminalProcess;
exports.TerminalProcess = TerminalProcess = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(exports.TerminalProcessOptions)),
    tslib_1.__param(1, (0, inversify_1.inject)(process_manager_1.ProcessManager)),
    tslib_1.__param(2, (0, inversify_1.inject)(multi_ring_buffer_1.MultiRingBuffer)),
    tslib_1.__param(3, (0, inversify_1.inject)(common_1.ILogger)),
    tslib_1.__param(3, (0, inversify_1.named)('process')),
    tslib_1.__metadata("design:paramtypes", [Object, process_manager_1.ProcessManager,
        multi_ring_buffer_1.MultiRingBuffer, Object])
], TerminalProcess);
/**
 * Tracks the latest resize event to be trigger at a later point.
 */
class DelayedResizer extends core_1.DisposableCollection {
    get onTrigger() { return this._onTrigger.event; }
    constructor() {
        super();
        this._onTrigger = new core_1.Emitter();
        this.push(this._onTrigger);
        this._timeout = setTimeout(() => this._onTrigger.fire({ rows: this.rows, cols: this.cols }), 1000);
        this.push(core_1.Disposable.create(() => clearTimeout(this._timeout)));
    }
    dispose() {
        super.dispose();
        clearTimeout(this._timeout);
    }
}
//# sourceMappingURL=terminal-process.js.map