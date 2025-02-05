/// <reference types="lodash" />
import { MimeAssociation, MimeService } from '@theia/core/lib/browser/mime-service';
export declare class MonacoMimeService extends MimeService {
    protected associations: MimeAssociation[];
    protected updatingAssociations: boolean;
    constructor();
    setAssociations(associations: MimeAssociation[]): void;
    protected updateAssociations: import("lodash").DebouncedFunc<() => void>;
    protected getMimeForMode(langId: string): string | undefined;
}
//# sourceMappingURL=monaco-mime-service.d.ts.map