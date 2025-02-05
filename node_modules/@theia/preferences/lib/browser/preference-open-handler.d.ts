import { OpenHandler } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { PreferencesContribution } from './preferences-contribution';
export declare class PreferenceOpenHandler implements OpenHandler {
    readonly id = "preference";
    protected readonly preferencesContribution: PreferencesContribution;
    canHandle(uri: URI): number;
    open(uri: URI): Promise<boolean>;
}
//# sourceMappingURL=preference-open-handler.d.ts.map