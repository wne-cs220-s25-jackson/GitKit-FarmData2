import { FileServiceContribution, FileService } from './file-service';
import { RemoteFileSystemProvider } from '../common/remote-file-system-provider';
export declare class RemoteFileServiceContribution implements FileServiceContribution {
    protected readonly provider: RemoteFileSystemProvider;
    registerFileSystemProviders(service: FileService): void;
}
//# sourceMappingURL=remote-file-service-contribution.d.ts.map