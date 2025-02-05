import { ThemingMain } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
import { ThemeService } from '@theia/core/lib/browser/theming';
export declare class ThemingMainImpl implements ThemingMain {
    private readonly proxy;
    private readonly themeChangeListener;
    constructor(rpc: RPCProtocol, themeService: ThemeService);
    dispose(): void;
}
//# sourceMappingURL=theming-main.d.ts.map