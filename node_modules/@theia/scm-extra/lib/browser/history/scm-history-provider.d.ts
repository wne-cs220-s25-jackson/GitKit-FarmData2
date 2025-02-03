import { ScmProvider } from '@theia/scm/lib/browser/scm-provider';
import { ScmHistorySupport } from './scm-history-constants';
export interface ScmHistoryProvider extends ScmProvider {
    historySupport?: ScmHistorySupport;
}
export declare namespace ScmHistoryProvider {
    function is(scmProvider: ScmProvider | undefined): scmProvider is ScmHistoryProvider;
}
//# sourceMappingURL=scm-history-provider.d.ts.map