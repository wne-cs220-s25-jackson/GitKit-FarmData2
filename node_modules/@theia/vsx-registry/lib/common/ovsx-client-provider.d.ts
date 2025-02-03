import { MaybePromise } from '@theia/core/lib/common';
import { RequestService } from '@theia/core/shared/@theia/request';
import type { interfaces } from '@theia/core/shared/inversify';
import { OVSXClient } from '@theia/ovsx-client';
import { VSXEnvironment } from './vsx-environment';
export declare const OVSXUrlResolver: symbol & interfaces.Abstract<OVSXUrlResolver>;
export type OVSXUrlResolver = (value: string) => MaybePromise<string>;
export declare const OVSXClientProvider: symbol & interfaces.Abstract<OVSXClientProvider>;
export type OVSXClientProvider = () => MaybePromise<OVSXClient>;
/**
 * @deprecated since 1.32.0
 */
export declare function createOVSXClient(vsxEnvironment: VSXEnvironment, requestService: RequestService): Promise<OVSXClient>;
//# sourceMappingURL=ovsx-client-provider.d.ts.map