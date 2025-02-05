import * as idb from 'idb';
import { Disposable } from '@theia/core/lib/common/disposable';
import { ThemeService } from '@theia/core/lib/browser/theming';
import * as monaco from '@theia/monaco-editor-core';
import type { ThemeMix } from './textmate/monaco-theme-types';
import { Theme } from '@theia/core/lib/common/theme';
import { Emitter, Event } from '@theia/core';
export declare const monacoDB: Promise<idb.IDBPDatabase<unknown>> | undefined;
export interface MonacoThemeState {
    id: string;
    label: string;
    description?: string;
    uiTheme: monaco.editor.BuiltinTheme;
    data: ThemeMix;
}
export declare namespace MonacoThemeState {
    function is(state: unknown): state is MonacoThemeState;
}
export declare function getThemes(): Promise<MonacoThemeState[]>;
export declare function putTheme(state: MonacoThemeState): Disposable;
export declare function deleteTheme(id: string): Promise<void>;
export declare function stateToTheme(state: MonacoThemeState): Theme;
export declare class ThemeServiceWithDB extends ThemeService {
    protected onDidRetrieveThemeEmitter: Emitter<MonacoThemeState>;
    get onDidRetrieveTheme(): Event<MonacoThemeState>;
    loadUserTheme(): void;
    protected loadUserThemeWithDB(): Promise<void>;
}
//# sourceMappingURL=monaco-indexed-db.d.ts.map