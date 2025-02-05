import URI from '@theia/core/lib/common/uri';
import { Reference } from '@theia/core/lib/common/reference';
import { CustomEditorModel } from './custom-editors-main';
export declare class CustomEditorService {
    protected _models: CustomEditorModelManager;
    get models(): CustomEditorModelManager;
}
export declare class CustomEditorModelManager {
    private readonly references;
    add(resource: URI, viewType: string, model: Promise<CustomEditorModel>): Promise<Reference<CustomEditorModel>>;
    get(resource: URI, viewType: string): Promise<CustomEditorModel | undefined>;
    tryRetain(resource: URI, viewType: string): Promise<Reference<CustomEditorModel>> | undefined;
    disposeAllModelsForView(viewType: string): void;
    private key;
}
export declare function once<T extends Function>(this: unknown, fn: T): T;
//# sourceMappingURL=custom-editor-service.d.ts.map