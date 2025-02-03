import { MarkdownString } from '../../common/markdown-rendering/markdown-string';
import { AccessibilityInformation } from '../../common/accessibility';
export interface StatusBarEntry {
    /**
     * For icons we use Codicons by default, and Font Awesome icons will also be respected.
     * You can find Codicon classnames here: https://microsoft.github.io/vscode-codicons/dist/codicon.html
     * You can find Font Awesome classnames here: http://fontawesome.io/icons/
     *
     *
     * Codicon: $(<codiconClassName>) or $(codicon-<codiconClassName>)
     *
     * Font Awesome: $(fa-<fontAwesomeClassName>)
     *
     * To use animated icons use the following pattern:
     * $(iconClassName~typeOfAnimation)
     * Type of animation can be either spin or pulse.
     * Look here for more information to animated icons:
     * http://fontawesome.io/examples/#animated
     */
    text: string;
    alignment: StatusBarAlignment;
    name?: string;
    color?: string;
    backgroundColor?: string;
    className?: string;
    tooltip?: string | MarkdownString | HTMLElement;
    command?: string;
    arguments?: unknown[];
    priority?: number;
    accessibilityInformation?: AccessibilityInformation;
    affinity?: StatusBarAffinity;
    onclick?: (e: MouseEvent) => void;
}
export declare enum StatusBarAlignment {
    LEFT = 0,
    RIGHT = 1
}
export declare const STATUSBAR_WIDGET_FACTORY_ID = "statusBar";
export declare const StatusBar: unique symbol;
export interface StatusBar {
    setBackgroundColor(color?: string): Promise<void>;
    setColor(color?: string): Promise<void>;
    setElement(id: string, entry: StatusBarEntry): Promise<void>;
    removeElement(id: string): Promise<void>;
}
export interface StatusBarAffinity {
    /**
     * a reference to the {@link StatusBarEntry.id id} of another entry relative to which this item should be positioned.
     */
    id: string;
    /**
     * Where to position this entry relative to the entry referred to in the `id` field.
     */
    alignment: StatusBarAlignment;
    /**
     * Whether to treat this entry and the reference entry as a single entity for positioning and hover highlights
     */
    compact?: boolean;
}
export interface StatusBarViewModelEntry {
    id: string;
    leftChildren: StatusBarViewModelEntry[];
    head: StatusBarEntry;
    rightChildren: StatusBarViewModelEntry[];
}
export interface StatusBarViewEntry {
    id: string;
    entry: StatusBarEntry;
    compact?: boolean;
    /** Only present if compact = true */
    alignment?: StatusBarAlignment;
}
//# sourceMappingURL=status-bar-types.d.ts.map