import { ApplicationShellLayoutMigration, WidgetDescription, ApplicationShellLayoutMigrationContext } from '@theia/core/lib/browser/shell/shell-layout-restorer';
export declare class ScmLayoutVersion3Migration implements ApplicationShellLayoutMigration {
    readonly layoutVersion = 3;
    onWillInflateWidget(desc: WidgetDescription, { parent }: ApplicationShellLayoutMigrationContext): WidgetDescription | undefined;
}
export declare class ScmLayoutVersion5Migration implements ApplicationShellLayoutMigration {
    readonly layoutVersion = 5;
    onWillInflateWidget(desc: WidgetDescription): WidgetDescription | undefined;
}
//# sourceMappingURL=scm-layout-migrations.d.ts.map