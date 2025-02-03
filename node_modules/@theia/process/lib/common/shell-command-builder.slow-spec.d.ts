/// <reference types="node" />
/**
 * This test suite assumes that we run in a NodeJS environment!
 */
import { ChildProcess } from 'child_process';
import { ProcessInfo } from './shell-command-builder';
export interface TestProcessInfo extends ProcessInfo {
    shell: ChildProcess;
}
//# sourceMappingURL=shell-command-builder.slow-spec.d.ts.map