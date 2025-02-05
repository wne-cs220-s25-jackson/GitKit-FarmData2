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
const assert = require("assert");
const path_1 = require("./path");
const chai_1 = require("chai");
describe('Path', () => {
    it('new from /foo/bar/file.txt', () => {
        const path = new path_1.Path('/foo/bar/file.txt');
        assert.deepStrictEqual(path.isRoot, false);
        assert.deepStrictEqual(path.isAbsolute, true);
        assert.deepStrictEqual(path.root.toString(), '/');
        assert.deepStrictEqual(path.dir.toString(), '/foo/bar');
        assert.deepStrictEqual(path.hasDir, true);
        assert.deepStrictEqual(path.base, 'file.txt');
        assert.deepStrictEqual(path.name, 'file');
        assert.deepStrictEqual(path.ext, '.txt');
    });
    it('new from foo/bar/file.txt', () => {
        const path = new path_1.Path('foo/bar/file.txt');
        assert.deepStrictEqual(path.isRoot, false);
        assert.deepStrictEqual(path.isAbsolute, false);
        assert.deepStrictEqual(path.root, undefined);
        assert.deepStrictEqual(path.dir.toString(), 'foo/bar');
        assert.deepStrictEqual(path.hasDir, true);
        assert.deepStrictEqual(path.base, 'file.txt');
        assert.deepStrictEqual(path.name, 'file');
        assert.deepStrictEqual(path.ext, '.txt');
    });
    it('new from /foo', () => {
        const path = new path_1.Path('/foo');
        assert.deepStrictEqual(path.isRoot, false);
        assert.deepStrictEqual(path.isAbsolute, true);
        assert.deepStrictEqual(path.root.toString(), '/');
        assert.deepStrictEqual(path.dir.toString(), '/');
        assert.deepStrictEqual(path.hasDir, true);
        assert.deepStrictEqual(path.base, 'foo');
        assert.deepStrictEqual(path.name, 'foo');
        assert.deepStrictEqual(path.ext, '');
    });
    it('new from foo', () => {
        const path = new path_1.Path('foo');
        assert.deepStrictEqual(path.isRoot, false);
        assert.deepStrictEqual(path.isAbsolute, false);
        assert.deepStrictEqual(path.root, undefined);
        assert.deepStrictEqual(path.dir.toString(), 'foo');
        assert.deepStrictEqual(path.hasDir, false);
        assert.deepStrictEqual(path.base, 'foo');
        assert.deepStrictEqual(path.name, 'foo');
        assert.deepStrictEqual(path.ext, '');
    });
    it('new from /', () => {
        const path = new path_1.Path('/');
        assert.deepStrictEqual(path.isRoot, true);
        assert.deepStrictEqual(path.isAbsolute, true);
        assert.deepStrictEqual(path.root.toString(), '/');
        assert.deepStrictEqual(path.dir.toString(), '/');
        assert.deepStrictEqual(path.hasDir, false);
        assert.deepStrictEqual(path.base, '');
        assert.deepStrictEqual(path.name, '');
        assert.deepStrictEqual(path.ext, '');
    });
    it('new from /c:/foo/bar/file.txt', () => {
        const path = new path_1.Path('/c:/foo/bar/file.txt');
        assert.deepStrictEqual(path.isRoot, false);
        assert.deepStrictEqual(path.isAbsolute, true);
        assert.deepStrictEqual(path.root.toString(), '/c:');
        assert.deepStrictEqual(path.dir.toString(), '/c:/foo/bar');
        assert.deepStrictEqual(path.hasDir, true);
        assert.deepStrictEqual(path.base, 'file.txt');
        assert.deepStrictEqual(path.name, 'file');
        assert.deepStrictEqual(path.ext, '.txt');
    });
    it('new from /c:/foo', () => {
        const path = new path_1.Path('/c:/foo');
        assert.deepStrictEqual(path.isRoot, false);
        assert.deepStrictEqual(path.isAbsolute, true);
        assert.deepStrictEqual(path.root.toString(), '/c:');
        assert.deepStrictEqual(path.dir.toString(), '/c:');
        assert.deepStrictEqual(path.hasDir, true);
        assert.deepStrictEqual(path.base, 'foo');
        assert.deepStrictEqual(path.name, 'foo');
        assert.deepStrictEqual(path.ext, '');
    });
    it('new from /c:/', () => {
        const path = new path_1.Path('/c:/');
        assert.deepStrictEqual(path.isRoot, false);
        assert.deepStrictEqual(path.isAbsolute, true);
        assert.deepStrictEqual(path.root.toString(), '/c:');
        assert.deepStrictEqual(path.dir.toString(), '/c:');
        assert.deepStrictEqual(path.hasDir, true);
        assert.deepStrictEqual(path.base, '');
        assert.deepStrictEqual(path.name, '');
        assert.deepStrictEqual(path.ext, '');
    });
    it('new from /c:', () => {
        const path = new path_1.Path('/c:');
        assert.deepStrictEqual(path.isRoot, true);
        assert.deepStrictEqual(path.isAbsolute, true);
        assert.deepStrictEqual(path.root.toString(), '/c:');
        assert.deepStrictEqual(path.dir.toString(), '/c:');
        assert.deepStrictEqual(path.hasDir, false);
        assert.deepStrictEqual(path.base, 'c:');
        assert.deepStrictEqual(path.name, 'c:');
        assert.deepStrictEqual(path.ext, '');
    });
    assertRelative({
        from: '/foo',
        to: '/foo',
        expectation: ''
    });
    assertRelative({
        from: '/foo',
        to: '/foo/bar',
        expectation: 'bar'
    });
    assertRelative({
        from: '/foo/',
        to: '/foo/bar',
        expectation: 'bar'
    });
    assertRelative({
        from: '/f',
        to: '/foo/bar',
        expectation: undefined
    });
    function assertRelative({ from, to, expectation }) {
        it(`the relative path from '${from}' to '${to}' should be '${expectation}'`, () => {
            const path = new path_1.Path(from).relative(new path_1.Path(to));
            assert.deepStrictEqual(expectation, path && path.toString());
        });
    }
    assertNormalize({
        from: '/',
        expectation: '/'
    });
    assertNormalize({
        from: '/c://',
        expectation: '/c:/'
    });
    assertNormalize({
        from: '/foo',
        expectation: '/foo'
    });
    assertNormalize({
        from: '/foo/',
        expectation: '/foo/'
    });
    assertNormalize({
        from: '/foo/bar',
        expectation: '/foo/bar'
    });
    assertNormalize({
        from: '/foo/../file.txt',
        expectation: '/file.txt'
    });
    assertNormalize({
        from: '/foo/bar/../file.txt',
        expectation: '/foo/file.txt'
    });
    assertNormalize({
        from: '/foo/../../file.txt',
        expectation: '/file.txt'
    });
    assertNormalize({
        from: '',
        expectation: '.'
    });
    assertNormalize({
        from: '.',
        expectation: '.'
    });
    assertNormalize({
        from: '..',
        expectation: '..'
    });
    assertNormalize({
        from: './foo',
        expectation: 'foo'
    });
    assertNormalize({
        from: './foo/./.',
        expectation: 'foo'
    });
    assertNormalize({
        from: './foo/',
        expectation: 'foo/'
    });
    assertNormalize({
        from: '../foo',
        expectation: '../foo'
    });
    assertNormalize({
        from: 'foo/..',
        expectation: '.'
    });
    assertNormalize({
        from: 'foo/bar/../../../',
        expectation: '../'
    });
    function assertNormalize({ from, expectation }) {
        it(`path ${from} should be normalized as ${expectation}`, () => {
            assert.deepStrictEqual(new path_1.Path(from).normalize().toString(), expectation);
        });
    }
    describe('Normalize path separator', () => {
        it('should handle windows styled paths', async () => {
            const path = 'C:\\a\\b\\c';
            const expected = '/c:/a/b/c';
            (0, chai_1.expect)(new path_1.Path(path).toString()).eq(expected);
        });
        it('should prefix drive letter with /', async () => {
            const path = 'c:/a/b/c';
            const expected = '/c:/a/b/c';
            (0, chai_1.expect)(new path_1.Path(path).toString()).eq(expected);
        });
    });
    const linuxHome = '/home/test-user';
    const windowsHome = '/C:/Users/test-user';
    describe('Linux', () => {
        it('should shorten path on Linux, path starting with home', async () => {
            const path = `${linuxHome}/a/b/theia`;
            const expected = '~/a/b/theia';
            (0, chai_1.expect)(path_1.Path.tildify(path, linuxHome)).eq(expected);
        });
        it('should shorten path on Linux, path starting with home with duplication', async () => {
            const path = `${linuxHome}/${linuxHome}/a/b/theia`;
            const expected = `~/${linuxHome}/a/b/theia`;
            (0, chai_1.expect)(path_1.Path.tildify(path, linuxHome)).eq(expected);
        });
        it('should not shorten path on Linux, path not starting with home', async () => {
            const path = `/test/${linuxHome}/a/b/theia`;
            const expected = `/test/${linuxHome}/a/b/theia`;
            (0, chai_1.expect)(path_1.Path.tildify(path, linuxHome)).eq(expected);
        });
        it('should not shorten path on Linux, path not starting with correct home', async () => {
            const path = `/test/${linuxHome}123/a/b/theia`;
            const expected = `/test/${linuxHome}123/a/b/theia`;
            (0, chai_1.expect)(path_1.Path.tildify(path, linuxHome)).eq(expected);
        });
        it('should not shorten path on Linux when home is empty', async () => {
            const path = `${linuxHome}/a/b/theia`;
            const expected = `${linuxHome}/a/b/theia`;
            (0, chai_1.expect)(path_1.Path.tildify(path, '')).eq(expected);
        });
        it('should expand ~ on Linux when path begins with ~', async () => {
            const path = '~/a/b/theia';
            const expected = `${linuxHome}/a/b/theia`;
            (0, chai_1.expect)(path_1.Path.untildify(path, linuxHome)).eq(expected);
        });
        it('should expand ~ on Linux when path starts with ~ duplication', async () => {
            const path = '~/~/a/b/theia';
            const expected = `${linuxHome}/~/a/b/theia`;
            (0, chai_1.expect)(path_1.Path.untildify(path, linuxHome)).eq(expected);
        });
        it('should not expand ~ on Linux when path does not start with ~', async () => {
            const path = '/test/~/a/b/theia';
            const expected = '/test/~/a/b/theia';
            (0, chai_1.expect)(path_1.Path.untildify(path, linuxHome)).eq(expected);
        });
        it('should not expand ~ on Linux when home is empty', async () => {
            const path = '~/a/b/theia';
            const expected = '~/a/b/theia';
            (0, chai_1.expect)(path_1.Path.untildify(path, '')).eq(expected);
        });
    });
    describe('Windows', () => {
        it('should not shorten path on Windows', async () => {
            const path = `${windowsHome}/a/b/theia`;
            const expected = `${windowsHome}/a/b/theia`;
            (0, chai_1.expect)(path_1.Path.tildify(path, windowsHome)).eq(expected);
        });
        it('should not shorten path on Windows when home is empty', async () => {
            const path = `${windowsHome}/a/b/theia`;
            const expected = `${windowsHome}/a/b/theia`;
            (0, chai_1.expect)(path_1.Path.tildify(path, '')).eq(expected);
        });
        it('should not expand ~ on Windows', async () => {
            const path = '~/a/b/theia';
            const expected = '~/a/b/theia';
            (0, chai_1.expect)(path_1.Path.untildify(path, windowsHome)).eq(expected);
        });
        it('should not expand ~ on Windows when home is empty', async () => {
            const path = '~/a/b/theia';
            const expected = '~/a/b/theia';
            (0, chai_1.expect)(path_1.Path.untildify(path, '')).eq(expected);
        });
    });
    describe('fsPath#windows', () => {
        it('should retain windows style path', () => {
            const path = 'C:\\path\\to\\file.txt';
            (0, chai_1.expect)(new path_1.Path(path).fsPath(path_1.Path.Format.Windows)).eq(path);
        });
        it('should create windows style path with slashes', () => {
            const path = 'C:/path/to/file.txt';
            const expected = 'C:\\path\\to\\file.txt';
            (0, chai_1.expect)(new path_1.Path(path).fsPath(path_1.Path.Format.Windows)).eq(expected);
        });
        it('should append slashes to drive letter', () => {
            const path = 'C:';
            const expected = 'C:\\';
            (0, chai_1.expect)(new path_1.Path(path).fsPath(path_1.Path.Format.Windows)).eq(expected);
        });
        it('should create windows style path from posix', () => {
            const path = '/path/to/file.txt';
            const expected = '\\path\\to\\file.txt';
            (0, chai_1.expect)(new path_1.Path(path).fsPath(path_1.Path.Format.Windows)).eq(expected);
        });
    });
    describe('fsPath#posix', () => {
        it('should retain posix style path', () => {
            const path = '/path/to/file.txt';
            (0, chai_1.expect)(new path_1.Path(path).fsPath(path_1.Path.Format.Posix)).eq(path);
        });
        it('should create posix style path from windows with slashes', () => {
            const path = 'C:/path/to/file.txt';
            const expected = '/c:/path/to/file.txt';
            (0, chai_1.expect)(new path_1.Path(path).fsPath(path_1.Path.Format.Posix)).eq(expected);
        });
        it('should create posix style path from windows', () => {
            const path = 'C:\\path\\to\\file.txt';
            const expected = '/c:/path/to/file.txt';
            (0, chai_1.expect)(new path_1.Path(path).fsPath(path_1.Path.Format.Posix)).eq(expected);
        });
    });
    function checkResolution(original, segments, expected) {
        it(`should resolve ${original} and ${segments.join(', ')} to ${expected}`, () => {
            const start = new path_1.Path(original);
            const result = start.resolve(...segments);
            (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.toString()).eq(expected);
        });
    }
    checkResolution('a/b/c', ['/d/e/f'], '/d/e/f');
    checkResolution('a/b/c', ['../d/e/f'], undefined);
    checkResolution('/a/b/c', ['../d', 'e', './f'], '/a/b/d/e/f');
});
//# sourceMappingURL=path.spec.js.map