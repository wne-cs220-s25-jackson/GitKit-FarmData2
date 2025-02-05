import { EnvExtImpl } from '../env';
/**
 * Provides machineId using mac address. It's only possible on node side
 * Extending the common class
 */
export declare class EnvNodeExtImpl extends EnvExtImpl {
    private macMachineId;
    private _isNewAppInstall;
    constructor();
    /**
     * override machineID
     */
    get machineId(): string;
    get isNewAppInstall(): boolean;
    private computeIsNewAppInstall;
}
//# sourceMappingURL=env-node-ext.d.ts.map