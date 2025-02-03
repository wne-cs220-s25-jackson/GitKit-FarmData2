export interface FileFilter {
    name: string;
    extensions: string[];
}
export interface OpenDialogOptions {
    title?: string;
    maxWidth?: number;
    path: string;
    buttonLabel?: string;
    modal?: boolean;
    openFiles?: boolean;
    openFolders?: boolean;
    selectMany?: boolean;
    filters?: FileFilter[];
}
export interface SaveDialogOptions {
    title?: string;
    maxWidth?: number;
    path: string;
    buttonLabel?: string;
    modal?: boolean;
    filters?: FileFilter[];
}
export interface TheiaFilesystemAPI {
    showOpenDialog(options: OpenDialogOptions): Promise<string[] | undefined>;
    showSaveDialog(options: SaveDialogOptions): Promise<string | undefined>;
}
declare global {
    interface Window {
        electronTheiaFilesystem: TheiaFilesystemAPI;
    }
}
export declare const CHANNEL_SHOW_OPEN = "ShowOpenDialog";
export declare const CHANNEL_SHOW_SAVE = "ShowSaveDialog";
//# sourceMappingURL=electron-api.d.ts.map