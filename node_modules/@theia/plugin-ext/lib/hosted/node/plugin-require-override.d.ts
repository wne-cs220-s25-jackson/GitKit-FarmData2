/********************************************************************************
 * Copyright (C) 2024 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
/**
 * Some plugins attempt to require some packages from VSCode's node_modules.
 * Since we don't have node_modules usually, we need to override the require function to return the expected package.
 *
 * See also:
 * https://github.com/eclipse-theia/theia/issues/14714
 * https://github.com/eclipse-theia/theia/issues/13779
 */
export declare function overridePluginDependencies(): void;
//# sourceMappingURL=plugin-require-override.d.ts.map