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
const fs = require("@theia/core/shared/fs-extra");
const path = require("path");
const temp = require("temp");
const tar_fs_1 = require("tar-fs");
const chai_1 = require("chai");
const uri_1 = require("@theia/core/lib/common/uri");
const mock_directory_archiver_1 = require("./test/mock-directory-archiver");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
const track = temp.track();
describe('directory-archiver', () => {
    after(() => {
        track.cleanupSync();
    });
    it('should archive a directory', async function () {
        this.timeout(20000);
        const fromPath = track.mkdirSync('from');
        fs.writeFileSync(path.join(fromPath, 'A.txt'), 'A');
        fs.writeFileSync(path.join(fromPath, 'B.txt'), 'B');
        (0, chai_1.expect)(fs.readFileSync(path.join(fromPath, 'A.txt'), { encoding: 'utf8' })).to.be.equal('A');
        (0, chai_1.expect)(fs.readFileSync(path.join(fromPath, 'B.txt'), { encoding: 'utf8' })).to.be.equal('B');
        const toPath = track.mkdirSync('to');
        const archiver = new mock_directory_archiver_1.MockDirectoryArchiver();
        await archiver.archive(fromPath, path.join(toPath, 'output.tar'));
        (0, chai_1.expect)(fs.existsSync(path.join(toPath, 'output.tar'))).to.be.true;
        const assertPath = track.mkdirSync('assertPath');
        return new Promise(resolve => {
            fs.createReadStream(path.join(toPath, 'output.tar')).pipe((0, tar_fs_1.extract)(assertPath)).on('finish', () => {
                (0, chai_1.expect)(fs.readdirSync(assertPath).sort()).to.be.deep.equal(['A.txt', 'B.txt']);
                (0, chai_1.expect)(fs.readFileSync(path.join(assertPath, 'A.txt'), { encoding: 'utf8' })).to.be.equal(fs.readFileSync(path.join(fromPath, 'A.txt'), { encoding: 'utf8' }));
                (0, chai_1.expect)(fs.readFileSync(path.join(assertPath, 'B.txt'), { encoding: 'utf8' })).to.be.equal(fs.readFileSync(path.join(fromPath, 'B.txt'), { encoding: 'utf8' }));
                resolve();
            });
        });
    });
    describe('findCommonParents', () => {
        [
            {
                input: ['/A/B/C/D.txt', '/X/Y/Z.txt'],
                expected: new Map([['/A/B/C', ['/A/B/C/D.txt']], ['/X/Y', ['/X/Y/Z.txt']]]),
                folders: ['/A', '/A/B', '/A/B/C', '/X', '/X/Y']
            },
            {
                input: ['/A/B/C/D.txt', '/A/B/C/E.txt'],
                expected: new Map([['/A/B/C', ['/A/B/C/D.txt', '/A/B/C/E.txt']]]),
                folders: ['/A', '/A/B', '/A/B/C']
            },
            {
                input: ['/A', '/A/B/C/D.txt', '/A/B/C/E.txt'],
                expected: new Map([['/A', ['/A', '/A/B/C/D.txt', '/A/B/C/E.txt']]]),
                folders: ['/A', '/A/B', '/A/B/C']
            },
            {
                input: ['/A/B/C/D.txt', '/A/B/C/E.txt', '/A'],
                expected: new Map([['/A', ['/A', '/A/B/C/D.txt', '/A/B/C/E.txt']]]),
                folders: ['/A', '/A/B', '/A/B/C']
            },
            {
                input: ['/A/B/C/D.txt', '/A/B/X/E.txt'],
                expected: new Map([['/A/B', ['/A/B/C/D.txt', '/A/B/X/E.txt']]]),
                folders: ['/A', '/A/B', '/A/B/C', '/A/B/X']
            }
        ].forEach(test => {
            const { input, expected, folders } = test;
            it(`should find the common parent URIs among [${input.join(', ')}] => [${Array.from(expected.keys()).join(', ')}]`, async () => {
                const archiver = new mock_directory_archiver_1.MockDirectoryArchiver(folders ? folders.map(file_uri_1.FileUri.create) : []);
                const actual = await archiver.findCommonParents(input.map(file_uri_1.FileUri.create));
                (0, chai_1.expect)(asString(actual)).to.be.equal(asString(expected));
            });
        });
        function asString(map) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const obj = {};
            for (const key of Array.from(map.keys()).sort()) {
                const values = (map.get(key) || []).sort();
                obj[new uri_1.default(key).withScheme('file').toString()] = `[${values.map(v => new uri_1.default(v).withScheme('file').toString()).join(', ')}]`;
            }
            return JSON.stringify(obj);
        }
    });
});
//# sourceMappingURL=directory-archiver.spec.js.map