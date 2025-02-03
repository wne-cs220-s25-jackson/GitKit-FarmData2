import { interfaces } from 'inversify';
import { ColorTheme, CssStyleCollector, StylingParticipant } from './styling-service';
export declare function bindCommonStylingParticipants(bind: interfaces.Bind): void;
export declare class ActionLabelStylingParticipant implements StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export declare class TreeStylingParticipant implements StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export declare class BreadcrumbStylingParticipant implements StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export declare class StatusBarStylingParticipant implements StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export declare class MenuStylingParticipant implements StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export declare class BadgeStylingParticipant implements StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export declare class TabbarStylingParticipant implements StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export declare class ButtonStylingParticipant implements StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
//# sourceMappingURL=common-styling-participants.d.ts.map