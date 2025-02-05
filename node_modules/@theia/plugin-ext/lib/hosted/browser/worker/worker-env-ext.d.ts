import { EnvExtImpl } from '../../../plugin/env';
/**
 * Worker specific implementation not returning any FileSystem details
 * Extending the common class
 */
export declare class WorkerEnvExtImpl extends EnvExtImpl {
    constructor();
    get appRoot(): string;
    get isNewAppInstall(): boolean;
}
//# sourceMappingURL=worker-env-ext.d.ts.map