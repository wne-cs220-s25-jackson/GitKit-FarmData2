"use strict";
// *****************************************************************************
// Copyright (C) 2022 EclipseSource and others.
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
const files_1 = require("./files");
const chai_1 = require("chai");
const filesystem_utils_1 = require("./filesystem-utils");
describe('generateUniqueResourceURI', () => {
    describe('Target is file', () => {
        describe('file without extension', () => {
            it('appends index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('source 1');
            });
            it('appends first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source');
                parent.children = [source, files_1.FileStat.file('source 1'), files_1.FileStat.file('source 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('source 2');
            });
            it('appends suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy');
            });
            it('appends suffix and index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source');
                parent.children = [source, files_1.FileStat.file('source copy')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 1');
            });
            it('appends suffix and first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source');
                parent.children = [source, files_1.FileStat.file('source copy'), files_1.FileStat.file('source copy 1'), files_1.FileStat.file('source copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 2');
            });
            it('appends only index when source name already contains suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source copy 1');
                parent.children = [files_1.FileStat.file('source'), source, files_1.FileStat.file('source copy 2'), files_1.FileStat.file('source copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 4');
            });
        });
        describe('file with extension', () => {
            it('appends index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source.txt');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('source 1.txt');
            });
            it('appends first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source.txt');
                parent.children = [source, files_1.FileStat.file('source 1.txt'), files_1.FileStat.file('source 3.txt')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('source 2.txt');
            });
            it('appends suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source.txt');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy.txt');
            });
            it('appends suffix and index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source.txt');
                parent.children = [source, files_1.FileStat.file('source copy.txt')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 1.txt');
            });
            it('appends suffix and first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source.txt');
                parent.children = [source, files_1.FileStat.file('source copy.txt'), files_1.FileStat.file('source copy 1.txt'), files_1.FileStat.file('source copy 3.txt')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 2.txt');
            });
            it('appends only index when source name already contains suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('source copy 1.txt');
                parent.children = [files_1.FileStat.file('source.txt'), source, files_1.FileStat.file('source copy 2.txt'), files_1.FileStat.file('source copy 3.txt')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 4.txt');
            });
        });
        describe('dotfile without extension', () => {
            it('appends index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('.source 1');
            });
            it('appends first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source');
                parent.children = [source, files_1.FileStat.file('.source 1'), files_1.FileStat.file('.source 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('.source 2');
            });
            it('appends suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy');
            });
            it('appends suffix and index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source');
                parent.children = [source, files_1.FileStat.file('.source copy')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 1');
            });
            it('appends suffix and first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source');
                parent.children = [source, files_1.FileStat.file('.source copy'), files_1.FileStat.file('.source copy 1'), files_1.FileStat.file('.source copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 2');
            });
            it('appends only index when source name already contains suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source copy 1');
                parent.children = [files_1.FileStat.file('.source'), source, files_1.FileStat.file('.source copy 2'), files_1.FileStat.file('.source copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 4');
            });
        });
        describe('dotfile with extension', () => {
            it('appends index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source.txt');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('.source 1.txt');
            });
            it('appends first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source.txt');
                parent.children = [source, files_1.FileStat.file('.source 1.txt'), files_1.FileStat.file('.source 3.txt')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('.source 2.txt');
            });
            it('appends suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source.txt');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy.txt');
            });
            it('appends suffix and index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source.txt');
                parent.children = [source, files_1.FileStat.file('.source copy.txt')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 1.txt');
            });
            it('appends suffix and first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source.txt');
                parent.children = [source, files_1.FileStat.file('.source copy.txt'), files_1.FileStat.file('.source copy 1.txt'), files_1.FileStat.file('.source copy 3.txt')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 2.txt');
            });
            it('appends only index when source name already contains suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.file('.source copy 1.txt');
                parent.children = [files_1.FileStat.file('.source.txt'), source, files_1.FileStat.file('.source copy 2.txt'), files_1.FileStat.file('.source copy 3.txt')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 4.txt');
            });
        });
    });
    describe('Target is directory', () => {
        describe('directory with path without extension', () => {
            it('appends index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('source 1');
            });
            it('appends first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source');
                parent.children = [source, files_1.FileStat.dir('source 1'), files_1.FileStat.dir('source 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('source 2');
            });
            it('appends suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy');
            });
            it('appends suffix and index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source');
                parent.children = [source, files_1.FileStat.dir('source copy')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 1');
            });
            it('appends suffix and first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source');
                parent.children = [source, files_1.FileStat.dir('source copy'), files_1.FileStat.dir('source copy 1'), files_1.FileStat.dir('source copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 2');
            });
            it('appends only index when source name already contains suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source copy 1');
                parent.children = [files_1.FileStat.dir('source'), source, files_1.FileStat.dir('source copy 2'), files_1.FileStat.dir('source copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source copy 4');
            });
        });
        describe('directory with path with extension', () => {
            it('appends index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source.test');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('source.test 1');
            });
            it('appends first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source.test');
                parent.children = [source, files_1.FileStat.dir('source.test 1'), files_1.FileStat.dir('source.test 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('source.test 2');
            });
            it('appends suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source.test');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source.test copy');
            });
            it('appends suffix and index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source.test');
                parent.children = [source, files_1.FileStat.dir('source.test copy')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source.test copy 1');
            });
            it('appends suffix and first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source.test');
                parent.children = [source, files_1.FileStat.dir('source.test copy'), files_1.FileStat.dir('source.test copy 1'), files_1.FileStat.dir('source.test copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source.test copy 2');
            });
            it('appends only index when source name already contains suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('source.test copy 1');
                parent.children = [files_1.FileStat.dir('source.test'), source, files_1.FileStat.dir('source.test copy 2'), files_1.FileStat.dir('source.test copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('source.test copy 4');
            });
        });
        describe('name starts with . and has path without extension', () => {
            it('appends index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('.source 1');
            });
            it('appends first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source');
                parent.children = [source, files_1.FileStat.dir('.source 1'), files_1.FileStat.dir('.source 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('.source 2');
            });
            it('appends suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy');
            });
            it('appends suffix and index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source');
                parent.children = [source, files_1.FileStat.dir('.source copy')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 1');
            });
            it('appends suffix and first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source');
                parent.children = [source, files_1.FileStat.dir('.source copy'), files_1.FileStat.dir('.source copy 1'), files_1.FileStat.dir('.source copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 2');
            });
            it('appends only index when source name already contains suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source copy 1');
                parent.children = [files_1.FileStat.dir('.source'), source, files_1.FileStat.dir('.source copy 2'), files_1.FileStat.dir('.source copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source copy 4');
            });
        });
        describe('name starts with . and has path with extension', () => {
            it('appends index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source.test');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('.source.test 1');
            });
            it('appends first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source.test');
                parent.children = [source, files_1.FileStat.dir('.source.test 1'), files_1.FileStat.dir('.source.test 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory);
                (0, chai_1.expect)(result.path.base).to.eq('.source.test 2');
            });
            it('appends suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source.test');
                parent.children = [source];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source.test copy');
            });
            it('appends suffix and index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source.test');
                parent.children = [source, files_1.FileStat.dir('.source.test copy')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source.test copy 1');
            });
            it('appends suffix and first available index', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source.test');
                parent.children = [source, files_1.FileStat.dir('.source.test copy'), files_1.FileStat.dir('.source.test copy 1'), files_1.FileStat.dir('.source.test copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source.test copy 2');
            });
            it('appends only index when source name already contains suffix', () => {
                const parent = files_1.FileStat.dir('parent');
                const source = files_1.FileStat.dir('.source.test copy 1');
                parent.children = [files_1.FileStat.dir('.source.test'), source, files_1.FileStat.dir('.source.test copy 2'), files_1.FileStat.dir('.source.test copy 3')];
                const result = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, source.resource, source.isDirectory, 'copy');
                (0, chai_1.expect)(result.path.base).to.eq('.source.test copy 4');
            });
        });
    });
});
//# sourceMappingURL=filesystem-utils.spec.js.map