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
exports.ApplicationPackageManager = void 0;
const path = require("path");
const fs = require("fs-extra");
const semver = require("semver");
const application_package_1 = require("@theia/application-package");
const generator_1 = require("./generator");
const application_process_1 = require("./application-process");
class AbortError extends Error {
    constructor(...args) {
        super(...args);
        Object.setPrototypeOf(this, AbortError.prototype);
    }
}
class ApplicationPackageManager {
    static defineGeneratorOptions(cli) {
        return cli
            .option('mode', {
            description: 'Generation mode to use',
            choices: ['development', 'production'],
            default: 'production',
        })
            .option('split-frontend', {
            description: 'Split frontend modules into separate chunks. By default enabled in the `development` mode and disabled in the `production` mode.',
            type: 'boolean'
        });
    }
    constructor(options) {
        this.pck = new application_package_1.ApplicationPackage(options);
        this.process = new application_process_1.ApplicationProcess(this.pck, options.projectPath);
        this.__process = new application_process_1.ApplicationProcess(this.pck, path.join(__dirname, '..'));
    }
    async remove(fsPath) {
        if (await fs.pathExists(fsPath)) {
            await fs.remove(fsPath);
        }
    }
    async clean() {
        const webpackGenerator = new generator_1.WebpackGenerator(this.pck);
        await Promise.all([
            this.remove(this.pck.lib()),
            this.remove(this.pck.srcGen()),
            this.remove(webpackGenerator.genConfigPath),
            this.remove(webpackGenerator.genNodeConfigPath)
        ]);
    }
    async prepare() {
        if (this.pck.isElectron()) {
            await this.prepareElectron();
        }
    }
    async generate(options = {}) {
        try {
            await this.prepare();
        }
        catch (error) {
            if (error instanceof AbortError) {
                console.warn(error.message);
                process.exit(1);
            }
            throw error;
        }
        await Promise.all([
            new generator_1.WebpackGenerator(this.pck, options).generate(),
            new generator_1.BackendGenerator(this.pck, options).generate(),
            new generator_1.FrontendGenerator(this.pck, options).generate(),
        ]);
    }
    async copy() {
        await fs.ensureDir(this.pck.lib('frontend'));
        await fs.copy(this.pck.frontend('index.html'), this.pck.lib('frontend', 'index.html'));
    }
    async build(args = [], options = {}) {
        await this.generate(options);
        await this.copy();
        return this.__process.run('webpack', args);
    }
    start(args = []) {
        if (this.pck.isElectron()) {
            return this.startElectron(args);
        }
        else if (this.pck.isBrowserOnly()) {
            return this.startBrowserOnly(args);
        }
        return this.startBrowser(args);
    }
    startBrowserOnly(args) {
        const { command, mainArgs, options } = this.adjustBrowserOnlyArgs(args);
        return this.__process.spawnBin(command, mainArgs, options);
    }
    adjustBrowserOnlyArgs(args) {
        let { mainArgs, options } = this.adjustArgs(args);
        // first parameter: path to generated frontend
        // second parameter: disable cache to support watching
        mainArgs = ['lib/frontend', '-c-1', ...mainArgs];
        const portIndex = mainArgs.findIndex(v => v.startsWith('--port'));
        if (portIndex === -1) {
            mainArgs.push('--port=3000');
        }
        return { command: 'http-server', mainArgs, options };
    }
    startElectron(args) {
        // If possible, pass the project root directory to electron rather than the script file so that Electron
        // can determine the app name. This requires that the package.json has a main field.
        let appPath = this.pck.projectPath;
        if (!this.pck.pck.main) {
            // Try the bundled electron app first
            appPath = this.pck.lib('backend', 'electron-main.js');
            if (!fs.existsSync(appPath)) {
                // Fallback to the generated electron app in src-gen
                appPath = this.pck.backend('electron-main.js');
            }
            console.warn(`WARNING: ${this.pck.packagePath} does not have a "main" entry.\n` +
                'Please add the following line:\n' +
                '    "main": "lib/backend/electron-main.js"');
        }
        const { mainArgs, options } = this.adjustArgs([appPath, ...args]);
        const electronCli = require.resolve('electron/cli.js', { paths: [this.pck.projectPath] });
        return this.__process.fork(electronCli, mainArgs, options);
    }
    startBrowser(args) {
        const { mainArgs, options } = this.adjustArgs(args);
        // The backend must be a process group leader on UNIX in order to kill the tree later.
        // See https://nodejs.org/api/child_process.html#child_process_options_detached
        options.detached = process.platform !== 'win32';
        // Try the bundled backend app first
        let mainPath = this.pck.lib('backend', 'main.js');
        if (!fs.existsSync(mainPath)) {
            // Fallback to the generated backend file in src-gen
            mainPath = this.pck.backend('main.js');
        }
        return this.__process.fork(mainPath, mainArgs, options);
    }
    /**
     * Inject Theia's Electron-specific dependencies into the application's package.json.
     *
     * Only overwrite the Electron range if the current minimum supported version is lower than the recommended one.
     */
    async prepareElectron() {
        let theiaElectron;
        try {
            theiaElectron = await Promise.resolve().then(() => require('@theia/electron'));
        }
        catch (error) {
            if (error.code === 'ERR_MODULE_NOT_FOUND') {
                throw new AbortError('Please install @theia/electron as part of your Theia Electron application');
            }
            throw error;
        }
        const expectedRange = theiaElectron.electronRange;
        const appPackageJsonPath = this.pck.path('package.json');
        const appPackageJson = await fs.readJSON(appPackageJsonPath);
        if (!appPackageJson.devDependencies) {
            appPackageJson.devDependencies = {};
        }
        const currentRange = appPackageJson.devDependencies.electron;
        if (!currentRange || semver.compare(semver.minVersion(currentRange), semver.minVersion(expectedRange)) < 0) {
            // Update the range with the recommended one and write it on disk.
            appPackageJson.devDependencies = this.insertAlphabetically(appPackageJson.devDependencies, 'electron', expectedRange);
            await fs.writeJSON(appPackageJsonPath, appPackageJson, { spaces: 2 });
            throw new AbortError('Updated dependencies, please run "install" again');
        }
        if (!theiaElectron.electronVersion || !semver.satisfies(theiaElectron.electronVersion, currentRange)) {
            throw new AbortError('Dependencies are out of sync, please run "install" again');
        }
        const ffmpeg = await Promise.resolve().then(() => require('@theia/ffmpeg'));
        await ffmpeg.replaceFfmpeg();
        await ffmpeg.checkFfmpeg();
    }
    insertAlphabetically(object, key, value) {
        const updated = {};
        for (const property of Object.keys(object)) {
            if (property.localeCompare(key) > 0) {
                updated[key] = value;
            }
            updated[property] = object[property];
        }
        if (!(key in updated)) {
            updated[key] = value;
        }
        return updated;
    }
    adjustArgs(args, forkOptions = {}) {
        const options = {
            ...this.forkOptions,
            forkOptions
        };
        const mainArgs = [...args];
        const inspectIndex = mainArgs.findIndex(v => v.startsWith('--inspect'));
        if (inspectIndex !== -1) {
            const inspectArg = mainArgs.splice(inspectIndex, 1)[0];
            options.execArgv = ['--nolazy', inspectArg];
        }
        return {
            mainArgs,
            options
        };
    }
    get forkOptions() {
        return {
            stdio: [0, 1, 2, 'ipc'],
            env: {
                ...process.env,
                THEIA_PARENT_PID: String(process.pid)
            }
        };
    }
}
exports.ApplicationPackageManager = ApplicationPackageManager;
//# sourceMappingURL=application-package-manager.js.map