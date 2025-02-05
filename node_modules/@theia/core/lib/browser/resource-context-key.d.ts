import URI from '../common/uri';
import { ContextKeyService, ContextKey } from './context-key-service';
import { LanguageService } from './language-service';
export declare class ResourceContextKey {
    protected readonly languages: LanguageService;
    protected readonly contextKeyService: ContextKeyService;
    protected resource: ContextKey<string>;
    protected resourceSchemeKey: ContextKey<string>;
    protected resourceFileName: ContextKey<string>;
    protected resourceExtname: ContextKey<string>;
    protected resourceLangId: ContextKey<string>;
    protected resourceDirName: ContextKey<string>;
    protected resourcePath: ContextKey<string>;
    protected resourceSet: ContextKey<boolean>;
    protected init(): void;
    get(): string | undefined;
    set(resourceUri: URI | undefined): void;
    protected getLanguageId(uri: URI | undefined): string | undefined;
}
//# sourceMappingURL=resource-context-key.d.ts.map