import { ApplicationShellLayoutMigration, WidgetDescription } from '@theia/core/lib/browser/shell/shell-layout-restorer';
export declare class ProblemLayoutVersion3Migration implements ApplicationShellLayoutMigration {
    readonly layoutVersion = 3;
    onWillInflateWidget(desc: WidgetDescription): WidgetDescription | undefined;
}
//# sourceMappingURL=problem-layout-migrations.d.ts.map