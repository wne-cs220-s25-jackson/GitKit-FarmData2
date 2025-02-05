import { ColorTheme, ColorThemeKind } from './types-impl';
import { Event } from '@theia/core/lib/common/event';
import { ThemingExt } from '../common';
import { RPCProtocol } from '../common/rpc-protocol';
import { ThemeType } from '@theia/core/lib/common/theme';
export declare class ThemingExtImpl implements ThemingExt {
    readonly rpc: RPCProtocol;
    private actual;
    private _onDidChangeActiveColorTheme;
    constructor(rpc: RPCProtocol);
    get activeColorTheme(): ColorTheme;
    $onColorThemeChange(type: ThemeType): void;
    protected convertKind(type: ThemeType): ColorThemeKind;
    get onDidChangeActiveColorTheme(): Event<ColorTheme>;
}
//# sourceMappingURL=theming.d.ts.map