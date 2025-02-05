interface CheckDependenciesOptions {
    workspaces: string[] | undefined;
    include: string[];
    exclude: string[];
    skipHoisted: boolean;
    skipUniqueness: boolean;
    skipSingleTheiaVersion: boolean;
    onlyTheiaExtensions: boolean;
    suppress: boolean;
}
export default function checkDependencies(options: CheckDependenciesOptions): void;
export {};
//# sourceMappingURL=check-dependencies.d.ts.map