import { TaskIdentifier } from '@theia/task/lib/common';
export declare const defaultCompound: DebugCompound;
export interface DebugCompound {
    name: string;
    stopAll?: boolean;
    preLaunchTask?: string | TaskIdentifier;
    configurations: (string | {
        name: string;
        folder: string;
    })[];
}
export declare namespace DebugCompound {
    function is(arg: unknown): arg is DebugCompound;
}
//# sourceMappingURL=debug-compound.d.ts.map