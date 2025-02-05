"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.ShellCommandBuilder = void 0;
const tslib_1 = require("tslib");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable no-null/no-null */
const inversify_1 = require("@theia/core/shared/inversify");
const shell_quoting_1 = require("../common/shell-quoting");
/**
 * Create command lines ready to be sent to a shell's stdin for evaluation.
 */
let ShellCommandBuilder = class ShellCommandBuilder {
    /**
     * Constructs a command line to run in a shell. The shell could be
     * re-used/long-lived, this means we cannot spawn a new process with a nice
     * and fresh environment, we need to encode environment modifications into
     * the returned command.
     *
     * Inspired by VS Code implementation, see:
     * https://github.com/microsoft/vscode/blob/f395cac4fff0721a8099126172c01411812bcb4a/src/vs/workbench/contrib/debug/node/terminals.ts#L79
     *
     * @param hostProcessInfo the host terminal process infos
     * @param commandOptions program to execute in the host terminal
     */
    buildCommand(hostProcessInfo, commandOptions) {
        const host = hostProcessInfo && hostProcessInfo.executable;
        const cwd = commandOptions.cwd;
        const args = commandOptions.args.map(value => ({
            value, quoting: "strong" /* ShellQuoting.Strong */,
        }));
        const env = [];
        if (commandOptions.env) {
            for (const key of Object.keys(commandOptions.env)) {
                env.push([key, commandOptions.env[key]]);
            }
        }
        if (host) {
            if (/(bash|wsl)(.exe)?$/.test(host)) {
                return this.buildForBash(args, cwd, env);
            }
            else if (/(ps|pwsh|powershell)(.exe)?$/i.test(host)) {
                return this.buildForPowershell(args, cwd, env);
            }
            else if (/cmd(.exe)?$/i.test(host)) {
                return this.buildForCmd(args, cwd, env);
            }
        }
        return this.buildForDefault(args, cwd, env);
    }
    buildForBash(args, cwd, env) {
        let command = '';
        if (cwd) {
            command += `cd ${shell_quoting_1.BashQuotingFunctions.strong(cwd)} && `;
        }
        if (env === null || env === void 0 ? void 0 : env.length) {
            command += 'env';
            for (const [key, value] of env) {
                if (value === null) {
                    command += ` -u ${shell_quoting_1.BashQuotingFunctions.strong(key)}`;
                }
                else {
                    command += ` ${shell_quoting_1.BashQuotingFunctions.strong(`${key}=${value}`)}`;
                }
            }
            command += ' ';
        }
        command += this.createShellCommandLine(args, shell_quoting_1.BashQuotingFunctions);
        return command;
    }
    buildForPowershell(args, cwd, env) {
        let command = '';
        if (cwd) {
            command += `cd ${shell_quoting_1.PowershellQuotingFunctions.strong(cwd)}; `;
        }
        if (env === null || env === void 0 ? void 0 : env.length) {
            for (const [key, value] of env) {
                // Powershell requires special quoting when dealing with
                // environment variable names.
                const quotedKey = key
                    .replace(/`/g, '````')
                    .replace(/\?/g, '``?');
                if (value === null) {
                    command += `Remove-Item \${env:${quotedKey}}; `;
                }
                else {
                    command += `\${env:${quotedKey}}=${shell_quoting_1.PowershellQuotingFunctions.strong(value)}; `;
                }
            }
        }
        command += '& ' + this.createShellCommandLine(args, shell_quoting_1.PowershellQuotingFunctions);
        return command;
    }
    buildForCmd(args, cwd, env) {
        let command = '';
        if (cwd) {
            command += `cd ${shell_quoting_1.CmdQuotingFunctions.strong(cwd)} && `;
        }
        // Current quoting mechanism only works within a nested `cmd` call:
        command += 'cmd /C "';
        if (env === null || env === void 0 ? void 0 : env.length) {
            for (const [key, value] of env) {
                if (value === null) {
                    command += `set ${shell_quoting_1.CmdQuotingFunctions.strong(key)}="" && `;
                }
                else {
                    command += `set ${shell_quoting_1.CmdQuotingFunctions.strong(`${key}=${value}`)} && `;
                }
            }
        }
        command += this.createShellCommandLine(args, shell_quoting_1.CmdQuotingFunctions);
        command += '"';
        return command;
    }
    buildForDefault(args, cwd, env) {
        return this.buildForBash(args, cwd, env);
    }
    /**
     * This method will try to leave `arg[0]` unescaped if possible. The reason
     * is that shells like `cmd` expect their own commands like `dir` to be
     * unescaped.
     *
     * @returns empty string if `args` is empty, otherwise an escaped command.
     */
    createShellCommandLine(args, quotingFunctions) {
        let command = '';
        if (args.length > 0) {
            const [exec, ...execArgs] = args;
            // Some commands like `dir` should not be quoted for `cmd` to understand:
            command += this.quoteExecutableIfNecessary(exec, quotingFunctions);
            if (execArgs.length > 0) {
                command += ' ' + (0, shell_quoting_1.createShellCommandLine)(execArgs, quotingFunctions);
            }
        }
        return command;
    }
    quoteExecutableIfNecessary(exec, quotingFunctions) {
        return typeof exec === 'string' && !this.needsQuoting(exec) ? exec : (0, shell_quoting_1.escapeForShell)(exec, quotingFunctions);
    }
    /**
     * If this method returns `false` then we definitely need quoting.
     *
     * May return false positives.
     */
    needsQuoting(arg) {
        return /\W/.test(arg);
    }
};
exports.ShellCommandBuilder = ShellCommandBuilder;
exports.ShellCommandBuilder = ShellCommandBuilder = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ShellCommandBuilder);
//# sourceMappingURL=shell-command-builder.js.map