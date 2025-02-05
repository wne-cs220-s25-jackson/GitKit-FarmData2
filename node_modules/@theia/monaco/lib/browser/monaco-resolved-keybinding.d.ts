import { ResolvedKeybinding, ResolvedChord, SingleModifierChord, Chord } from '@theia/monaco-editor-core/esm/vs/base/common/keybindings';
import { KeybindingRegistry } from '@theia/core/lib/browser/keybinding';
import { KeyCode, KeySequence } from '@theia/core/lib/browser/keys';
export declare class MonacoResolvedKeybinding extends ResolvedKeybinding {
    protected readonly keySequence: KeySequence;
    protected readonly chords: ResolvedChord[];
    constructor(keySequence: KeySequence, keybindingService: KeybindingRegistry);
    getLabel(): string | null;
    getAriaLabel(): string | null;
    getElectronAccelerator(): string | null;
    getUserSettingsLabel(): string | null;
    isWYSIWYG(): boolean;
    hasMultipleChords(): boolean;
    getDispatchChords(): (string | null)[];
    getSingleModifierDispatchChords(): (SingleModifierChord | null)[];
    protected getSingleModifierDispatchPart(code: KeyCode): SingleModifierChord | null;
    private toKeybinding;
    getChords(): ResolvedChord[];
    static toKeybinding(keybindings: Array<Chord>): string;
    static keyCode(keybinding: Chord): KeyCode;
    static keySequence(keybinding: Chord[]): KeySequence;
    private static monaco2BrowserKeyCode;
}
//# sourceMappingURL=monaco-resolved-keybinding.d.ts.map