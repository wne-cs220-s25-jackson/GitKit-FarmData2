import { StatusBar, StatusBarEntry } from '@theia/core/lib/browser';
import { LanguageService } from '@theia/core/lib/browser/language-service';
import { CommandRegistry } from '@theia/core';
import { TextEditor } from '../editor';
import { LanguageSelector } from '../../common/language-selector';
import { AccessibilityInformation } from '@theia/core/lib/common/accessibility';
import { CurrentEditorAccess } from '../editor-manager';
import { Severity } from '@theia/core/lib/common/severity';
import { LabelParser } from '@theia/core/lib/browser/label-parser';
/**
 * Represents the severity of a language status item.
 */
export declare enum LanguageStatusSeverity {
    Information = 0,
    Warning = 1,
    Error = 2
}
/**
 * Command represents a particular invocation of a registered command.
 */
export interface Command {
    /**
     * The identifier of the actual command handler.
     */
    id: string;
    /**
     * Title of the command invocation, like "Add local variable 'foo'".
     */
    title?: string;
    /**
     * A tooltip for for command, when represented in the UI.
     */
    tooltip?: string;
    /**
     * Arguments that the command handler should be
     * invoked with.
     */
    arguments?: unknown[];
}
/**
 * A language status item is the preferred way to present language status reports for the active text editors,
 * such as selected linter or notifying about a configuration problem.
 */
export interface LanguageStatus {
    readonly id: string;
    readonly name: string;
    readonly selector: LanguageSelector;
    readonly severity: Severity;
    readonly label: string;
    readonly detail: string;
    readonly busy: boolean;
    readonly source: string;
    readonly command: Command | undefined;
    readonly accessibilityInfo: AccessibilityInformation | undefined;
}
export declare class EditorLanguageStatusService {
    protected readonly statusBar: StatusBar;
    protected readonly languages: LanguageService;
    protected readonly editorAccess: CurrentEditorAccess;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly labelParser: LabelParser;
    protected static LANGUAGE_MODE_ID: string;
    protected static LANGUAGE_STATUS_ID: string;
    protected readonly status: Map<number, LanguageStatus>;
    protected pinnedCommands: Set<string>;
    setLanguageStatusItem(handle: number, item: LanguageStatus): void;
    removeLanguageStatusItem(handle: number): void;
    updateLanguageStatus(editor: TextEditor | undefined): void;
    protected updateLanguageStatusItems(editor?: TextEditor | undefined): void;
    protected updatePinnedItems(items?: LanguageStatus[]): void;
    protected toPinnedItem(item: LanguageStatus): StatusBarEntry;
    protected createTooltip(items: LanguageStatus[]): HTMLElement;
    protected setPinProperties(pin: HTMLElement, id: string): void;
    protected togglePinned(item: LanguageStatus): void;
    protected getSeverityIconClasses(severity: Severity): string;
    protected renderWithIcons(host: HTMLElement, text?: string): void;
}
//# sourceMappingURL=editor-language-status-service.d.ts.map