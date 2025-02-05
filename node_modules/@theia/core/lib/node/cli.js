"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.CliManager = exports.CliContribution = void 0;
const tslib_1 = require("tslib");
const yargs = require("yargs");
const inversify_1 = require("inversify");
const contribution_provider_1 = require("../common/contribution-provider");
exports.CliContribution = Symbol('CliContribution');
let CliManager = class CliManager {
    constructor(contributionsProvider) {
        this.contributionsProvider = contributionsProvider;
    }
    async initializeCli(argv, postSetArguments, defaultCommand) {
        const pack = require('../../package.json');
        const version = pack.version;
        const command = yargs(argv, process.cwd()).version(version);
        command.exitProcess(this.isExit());
        for (const contrib of this.contributionsProvider.getContributions()) {
            contrib.configure(command);
        }
        await command
            .detectLocale(false)
            .showHelpOnFail(false, 'Specify --help for available options')
            .help('help')
            .middleware(async (args) => {
            for (const contrib of this.contributionsProvider.getContributions()) {
                await contrib.setArguments(args);
            }
            await postSetArguments();
        })
            .command('$0', false, () => { }, defaultCommand)
            .parse();
    }
    isExit() {
        return true;
    }
};
exports.CliManager = CliManager;
exports.CliManager = CliManager = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(contribution_provider_1.ContributionProvider)),
    tslib_1.__param(0, (0, inversify_1.named)(exports.CliContribution)),
    tslib_1.__metadata("design:paramtypes", [Object])
], CliManager);
//# sourceMappingURL=cli.js.map