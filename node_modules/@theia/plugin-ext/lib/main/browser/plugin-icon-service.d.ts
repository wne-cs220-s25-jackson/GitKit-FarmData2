import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { URI } from '@theia/core/shared/vscode-uri';
import { MonacoIconRegistry } from '@theia/monaco/lib/browser/monaco-icon-registry';
import { IconContribution, DeployedPlugin, IconDefinition } from '../../common/plugin-protocol';
export declare class PluginIconService implements Disposable {
    protected readonly iconRegistry: MonacoIconRegistry;
    protected readonly toDispose: DisposableCollection;
    styleSheet: string;
    styleElement: HTMLStyleElement;
    register(contribution: IconContribution, plugin: DeployedPlugin): Disposable;
    dispose(): void;
    protected registerFontIcon(contribution: IconContribution, defaultIcon: IconDefinition): void;
    protected registerRegularIcon(contribution: IconContribution, defaultIconId: string): void;
    protected toPluginUrl(id: string, relativePath: string): URI;
    protected formatExtensionId(id: string): string;
}
//# sourceMappingURL=plugin-icon-service.d.ts.map