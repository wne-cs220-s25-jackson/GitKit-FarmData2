import URI from '@theia/core/lib/common/uri';
import { SelectionService } from '@theia/core/lib/common';
import { OpenerService } from '@theia/core/lib/browser/opener-service';
import { MessageService } from '@theia/core/lib/common/message-service';
import { Command } from '@theia/core/lib/common/command';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare namespace NavigatorDiffCommands {
    const COMPARE_FIRST: Command;
    const COMPARE_SECOND: Command;
}
export declare class NavigatorDiff {
    protected readonly fileService: FileService;
    protected openerService: OpenerService;
    protected readonly notifications: MessageService;
    protected readonly selectionService: SelectionService;
    constructor();
    protected _firstCompareFile: URI | undefined;
    protected get firstCompareFile(): URI | undefined;
    protected set firstCompareFile(uri: URI | undefined);
    protected _isFirstFileSelected: boolean;
    get isFirstFileSelected(): boolean;
    protected isDirectory(uri: URI): Promise<boolean>;
    protected getURISelection(): Promise<URI | undefined>;
    /**
     * Adds the initial file for comparison
     * @see SelectionService
     * @see compareFiles
     * @returns Promise<boolean> indicating whether the uri is valid
     */
    addFirstComparisonFile(): Promise<boolean>;
    /**
     * Compare selected files.  First file is selected through addFirstComparisonFile
     * @see SelectionService
     * @see addFirstComparisonFile
     * @returns Promise<boolean> indicating whether the comparison was completed successfully
     */
    compareFiles(): Promise<boolean>;
}
//# sourceMappingURL=navigator-diff.d.ts.map