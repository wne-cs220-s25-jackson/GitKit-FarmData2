import { interfaces } from '@theia/core/shared/inversify';
import { LocalizationMain } from '../../common/plugin-api-rpc';
import { LanguagePackBundle } from '../../common/language-pack-service';
export declare class LocalizationMainImpl implements LocalizationMain {
    private readonly languagePackService;
    constructor(container: interfaces.Container);
    $fetchBundle(id: string): Promise<LanguagePackBundle | undefined>;
}
//# sourceMappingURL=localization-main.d.ts.map