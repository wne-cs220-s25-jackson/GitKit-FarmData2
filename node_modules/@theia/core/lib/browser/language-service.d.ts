import { Disposable, Emitter, Event } from '../common';
export interface Language {
    readonly id: string;
    readonly name: string;
    readonly extensions: Set<string>;
    readonly filenames: Set<string>;
    readonly iconClass?: string;
}
export declare class LanguageService {
    protected readonly onDidChangeIconEmitter: Emitter<DidChangeIconEvent>;
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    get languages(): Language[];
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    getLanguage(languageId: string): Language | undefined;
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    detectLanguage(obj: unknown): Language | undefined;
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    registerIcon(languageId: string, iconClass: string): Disposable;
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    getIcon(obj: unknown): string | undefined;
    /**
     * Emit when the icon of a particular language was changed.
     */
    get onDidChangeIcon(): Event<DidChangeIconEvent>;
}
export interface DidChangeIconEvent {
    languageId: string;
}
//# sourceMappingURL=language-service.d.ts.map