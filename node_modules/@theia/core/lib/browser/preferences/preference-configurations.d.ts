import { interfaces } from 'inversify';
import URI from '../../common/uri';
import { ContributionProvider } from '../../common/contribution-provider';
export declare const PreferenceConfiguration: unique symbol;
export interface PreferenceConfiguration {
    name: string;
}
export declare function bindPreferenceConfigurations(bind: interfaces.Bind): void;
export declare class PreferenceConfigurations {
    protected readonly provider: ContributionProvider<PreferenceConfiguration>;
    getPaths(): string[];
    getConfigName(): string;
    protected sectionNames: string[] | undefined;
    getSectionNames(): string[];
    isSectionName(name: string): boolean;
    isAnyConfig(name: string): boolean;
    isSectionUri(configUri: URI | undefined): boolean;
    isConfigUri(configUri: URI | undefined): boolean;
    getName(configUri: URI): string;
    getPath(configUri: URI): string;
    createUri(folder: URI, configPath?: string, configName?: string): URI;
}
//# sourceMappingURL=preference-configurations.d.ts.map