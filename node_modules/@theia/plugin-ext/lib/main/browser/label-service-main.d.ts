import { LabelServiceMain } from '../../common/plugin-api-rpc';
import { interfaces } from '@theia/core/shared/inversify';
import { ResourceLabelFormatter } from '@theia/core/lib/common/label-protocol';
export declare class LabelServiceMainImpl implements LabelServiceMain {
    private readonly resourceLabelFormatters;
    private readonly contributionProvider;
    constructor(container: interfaces.Container);
    $registerResourceLabelFormatter(handle: number, formatter: ResourceLabelFormatter): void;
    $unregisterResourceLabelFormatter(handle: number): void;
}
//# sourceMappingURL=label-service-main.d.ts.map