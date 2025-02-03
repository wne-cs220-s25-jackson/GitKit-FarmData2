import { FileServiceContribution, FileService } from '@theia/filesystem/lib/browser/file-service';
export declare class PluginVSCodeContribution implements FileServiceContribution {
    registerFileSystemProviders(service: FileService): void;
    protected mapSchemas(service: FileService, from: string, to: string): void;
}
//# sourceMappingURL=plugin-vscode-contribution.d.ts.map