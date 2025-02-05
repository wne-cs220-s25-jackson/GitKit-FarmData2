import { DirectoryArchiver } from '../directory-archiver';
import URI from '@theia/core/lib/common/uri';
export declare class MockDirectoryArchiver extends DirectoryArchiver {
    private folders?;
    constructor(folders?: URI[] | undefined);
    protected isDir(uri: URI): Promise<boolean>;
}
//# sourceMappingURL=mock-directory-archiver.d.ts.map