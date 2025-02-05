/// <reference types="lodash" />
import { IconThemeService, IconTheme, IconThemeDefinition } from '@theia/core/lib/browser/icon-theme-service';
import { IconThemeContribution, DeployedPlugin, UiTheme } from '../../common/plugin-protocol';
import URI from '@theia/core/lib/common/uri';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { Emitter } from '@theia/core/lib/common/event';
import { RecursivePartial } from '@theia/core/lib/common/types';
import { LabelProviderContribution, DidChangeLabelEvent, LabelProvider, URIIconReference } from '@theia/core/lib/browser/label-provider';
import { FileStatNode } from '@theia/filesystem/lib/browser';
import { WorkspaceRootNode } from '@theia/navigator/lib/browser/navigator-tree';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { LanguageService } from '@theia/core/lib/browser/language-service';
export interface PluginIconDefinition {
    iconPath: string;
    fontColor: string;
    fontCharacter: string;
    fontSize: string;
    fontId: string;
}
export interface PluginFontDefinition {
    id: string;
    weight: string;
    style: string;
    size: string;
    src: {
        path: string;
        format: string;
    }[];
}
export interface PluginIconsAssociation {
    folder?: string;
    file?: string;
    folderExpanded?: string;
    rootFolder?: string;
    rootFolderExpanded?: string;
    folderNames?: {
        [folderName: string]: string;
    };
    folderNamesExpanded?: {
        [folderName: string]: string;
    };
    fileExtensions?: {
        [extension: string]: string;
    };
    fileNames?: {
        [fileName: string]: string;
    };
    languageIds?: {
        [languageId: string]: string;
    };
}
export interface PluginIconDefinitions {
    [key: string]: PluginIconDefinition;
}
export interface PluginIconThemeDocument extends PluginIconsAssociation {
    iconDefinitions: PluginIconDefinitions;
    fonts: PluginFontDefinition[];
    light?: PluginIconsAssociation;
    highContrast?: PluginIconsAssociation;
    hidesExplorerArrows?: boolean;
    showLanguageModeIcons?: boolean;
}
export declare const PluginIconThemeFactory: unique symbol;
export type PluginIconThemeFactory = (definition: PluginIconThemeDefinition) => PluginIconTheme;
export declare class PluginIconThemeDefinition implements IconThemeDefinition, IconThemeContribution {
    id: string;
    label: string;
    description?: string;
    uri: string;
    uiTheme?: UiTheme;
    pluginId: string;
    packageUri: string;
    hasFileIcons?: boolean;
    hasFolderIcons?: boolean;
    hidesExplorerArrows?: boolean;
    showLanguageModeIcons?: boolean;
}
declare class PluginLanguageIconInfo {
    hasSpecificFileIcons: boolean;
    coveredLanguages: {
        [languageId: string]: boolean;
    };
}
export declare class PluginIconTheme extends PluginIconThemeDefinition implements IconTheme, Disposable {
    protected readonly fileService: FileService;
    protected readonly labelProvider: LabelProvider;
    protected readonly definition: PluginIconThemeDefinition;
    protected readonly workspaceService: WorkspaceService;
    protected readonly languageService: LanguageService;
    protected readonly onDidChangeEmitter: Emitter<DidChangeLabelEvent>;
    readonly onDidChange: import("@theia/core/lib/common/event").Event<DidChangeLabelEvent>;
    protected readonly toDeactivate: DisposableCollection;
    protected readonly toUnload: DisposableCollection;
    protected readonly toDisposeStyleElement: DisposableCollection;
    protected readonly toDispose: DisposableCollection;
    protected packageRootUri: URI;
    protected locationUri: URI;
    protected styleSheetContent: string | undefined;
    protected readonly icons: Set<string>;
    protected init(): void;
    dispose(): void;
    protected fireDidChange(): void;
    activate(): Disposable;
    protected doActivate(): Promise<void>;
    protected updateStyleElement(): void;
    protected reload: import("lodash").DebouncedFunc<() => void>;
    /**
     * This should be aligned with
     * https://github.com/microsoft/vscode/blob/7cf4cca47aa025a590fc939af54932042302be63/src/vs/workbench/services/themes/browser/fileIconThemeData.ts#L201
     */
    protected load(): Promise<void>;
    protected toCSSUrl(iconPath: string | undefined): string | undefined;
    protected escapeCSS(value: string): string;
    protected readonly fileIcon = "theia-plugin-file-icon";
    protected readonly folderIcon = "theia-plugin-folder-icon";
    protected readonly folderExpandedIcon = "theia-plugin-folder-expanded-icon";
    protected readonly rootFolderIcon = "theia-plugin-root-folder-icon";
    protected readonly rootFolderExpandedIcon = "theia-plugin-root-folder-expanded-icon";
    protected folderNameIcon(folderName: string): string;
    protected expandedFolderNameIcon(folderName: string): string;
    protected fileNameIcon(fileName: string): string[];
    protected fileExtensionIcon(fileExtension: string): string[];
    protected languageIcon(languageId: string): string;
    protected collectSelectors(associations: RecursivePartial<PluginIconsAssociation>, accept: (definitionId: string, ...icons: string[]) => void): PluginLanguageIconInfo;
    /**
     * This should be aligned with
     * https://github.com/microsoft/vscode/blob/7cf4cca47aa025a590fc939af54932042302be63/src/vs/editor/common/services/getIconClasses.ts#L5
     */
    getIcon(element: URI | URIIconReference | FileStat | FileStatNode | WorkspaceRootNode): string;
    protected getClassNames(element: URI | URIIconReference | FileStat | FileStatNode | WorkspaceRootNode): string[];
    protected getFolderClassNames(element: object): string[];
    protected getFileClassNames(element: object, uri?: string): string[];
}
export declare class PluginIconThemeService implements LabelProviderContribution {
    protected readonly iconThemeService: IconThemeService;
    protected readonly iconThemeFactory: PluginIconThemeFactory;
    protected readonly onDidChangeEmitter: Emitter<DidChangeLabelEvent>;
    readonly onDidChange: import("@theia/core/lib/common/event").Event<DidChangeLabelEvent>;
    protected fireDidChange(): void;
    register(contribution: IconThemeContribution, plugin: DeployedPlugin): Disposable;
    canHandle(element: object): number;
    getIcon(element: URI | URIIconReference | FileStat | FileStatNode | WorkspaceRootNode): string | undefined;
}
export {};
//# sourceMappingURL=plugin-icon-theme-service.d.ts.map