import { ApplicationShellLayoutMigration, WidgetDescription, ApplicationShellLayoutMigrationContext } from '@theia/core/lib/browser/shell/shell-layout-restorer';
export declare class ScmExtraLayoutVersion4Migration implements ApplicationShellLayoutMigration {
    readonly layoutVersion = 4;
    onWillInflateWidget(desc: WidgetDescription, { parent }: ApplicationShellLayoutMigrationContext): WidgetDescription | undefined;
}
//# sourceMappingURL=scm-extra-layout-migrations.d.ts.map