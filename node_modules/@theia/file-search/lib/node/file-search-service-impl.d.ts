import URI from '@theia/core/lib/common/uri';
import { CancellationToken, ILogger } from '@theia/core';
import { RawProcessFactory } from '@theia/process/lib/node';
import { FileSearchService } from '../common/file-search-service';
export declare class FileSearchServiceImpl implements FileSearchService {
    protected readonly logger: ILogger;
    /** @deprecated since 1.7.0 */
    protected readonly rawProcessFactory: RawProcessFactory;
    constructor(logger: ILogger, 
    /** @deprecated since 1.7.0 */
    rawProcessFactory: RawProcessFactory);
    find(searchPattern: string, options: FileSearchService.Options, clientToken?: CancellationToken): Promise<string[]>;
    protected doFind(rootUri: URI, options: FileSearchService.BaseOptions, accept: (fileUri: string) => void, token: CancellationToken): Promise<void>;
    protected getSearchArgs(options: FileSearchService.BaseOptions): string[];
}
//# sourceMappingURL=file-search-service-impl.d.ts.map