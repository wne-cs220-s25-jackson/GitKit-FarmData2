import URI from '../common/uri';
import { MaybePromise, SelectionService } from '../common';
import { EnvVariablesServer } from '../common/env-variables';
import { FrontendApplication } from './frontend-application';
import { FrontendApplicationContribution } from './frontend-application-contribution';
import { Widget } from './widgets';
export declare class UserWorkingDirectoryProvider implements FrontendApplicationContribution {
    protected readonly selectionService: SelectionService;
    protected readonly envVariables: EnvVariablesServer;
    protected lastOpenResource: URI | undefined;
    configure(app: FrontendApplication): void;
    protected setLastOpenResource(widget?: Widget): void;
    /**
     * @returns A {@link URI} that represents a good guess about the directory in which the user is currently operating.
     *
     * Factors considered may include the current widget, current selection, user home directory, or other application state.
     */
    getUserWorkingDir(): Promise<URI>;
    protected getFromSelection(): MaybePromise<URI | undefined>;
    protected getFromLastOpenResource(): MaybePromise<URI | undefined>;
    protected getFromUserHome(): MaybePromise<URI>;
    protected ensureIsDirectory(uri?: URI): MaybePromise<URI | undefined>;
}
//# sourceMappingURL=user-working-directory-provider.d.ts.map