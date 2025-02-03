import { ApplicationShellLayoutMigration, WidgetDescription, ApplicationShellLayoutMigrationContext } from '@theia/core/lib/browser/shell/shell-layout-restorer';
export declare class SearchLayoutVersion3Migration implements ApplicationShellLayoutMigration {
    readonly layoutVersion = 6;
    onWillInflateWidget(desc: WidgetDescription, { parent }: ApplicationShellLayoutMigrationContext): WidgetDescription | undefined;
}
//# sourceMappingURL=search-layout-migrations.d.ts.map