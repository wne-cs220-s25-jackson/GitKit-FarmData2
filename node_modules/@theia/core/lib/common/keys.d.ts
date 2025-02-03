export type KeySequence = KeyCode[];
export declare namespace KeySequence {
    function equals(a: KeySequence, b: KeySequence): boolean;
    enum CompareResult {
        NONE = 0,
        PARTIAL = 1,
        SHADOW = 2,
        FULL = 3
    }
    function compare(a: KeySequence, b: KeySequence): CompareResult;
    function parse(keybinding: string): KeySequence;
}
/**
 * The key sequence for this binding. This key sequence should consist of one or more key strokes. Key strokes
 * consist of one or more keys held down at the same time. This should be zero or more modifier keys, and zero or one other key.
 * Since `M2+M3+<Key>` (Alt+Shift+<Key>) is reserved on MacOS X for writing special characters, such bindings are commonly
 * undefined for platform MacOS X and redefined as `M1+M3+<Key>`. The rule applies on the `M3+M2+<Key>` sequence.
 */
export interface Keystroke {
    readonly first?: Key;
    readonly modifiers?: KeyModifier[];
}
export interface KeyCodeSchema {
    key?: Partial<Key>;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
    character?: string;
}
/**
 * Representation of a pressed key combined with key modifiers.
 */
export declare class KeyCode {
    readonly key: Key | undefined;
    readonly ctrl: boolean;
    readonly shift: boolean;
    readonly alt: boolean;
    readonly meta: boolean;
    readonly character: string | undefined;
    constructor(schema: KeyCodeSchema);
    /**
     * Return true if this KeyCode only contains modifiers.
     */
    isModifierOnly(): boolean;
    /**
     * Return true if the given KeyCode is equal to this one.
     */
    equals(other: KeyCode): boolean;
    toString(): string;
    /**
     * Create a KeyCode from one of several input types.
     */
    static createKeyCode(input: KeyboardEvent | Keystroke | KeyCodeSchema | string, eventDispatch?: 'code' | 'keyCode'): KeyCode;
    private static keybindings;
    static resetKeyBindings(): void;
    /**
     * Parses a string and returns a KeyCode object.
     * @param keybinding String representation of a keybinding
     */
    static parse(keybinding: string): KeyCode;
}
export declare namespace KeyCode {
    /**
     * Determines a `true` of `false` value for the key code argument.
     */
    type Predicate = (keyCode: KeyCode) => boolean;
    function isModifierString(key: string): boolean;
    /**
     * Different scopes have different execution environments. This means that they have different built-ins
     * (different global object, different constructors, etc.). This may result in unexpected results. For instance,
     * `[] instanceof window.frames[0].Array` will return `false`, because `Array.prototype !== window.frames[0].Array`
     * and arrays inherit from the former.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
     *
     * Note: just add another check if the current `event.type` checking is insufficient.
     */
    function isKeyboardEvent(event: object & {
        readonly type?: string;
    }): event is KeyboardEvent;
    /**
     * Determine the pressed key of a keyboard event. This key should correspond to the physical key according
     * to a standard US keyboard layout. International keyboard layouts are handled by `KeyboardLayoutService`.
     *
     * `keyIdentifier` is used to access this deprecated field:
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyIdentifier
     */
    function toKey(event: KeyboardEvent, dispatch?: 'code' | 'keyCode'): Key;
    /**
     * Determine the actual printable character that is generated from a pressed key.
     * If the key does not correspond to a printable character, `undefined` is returned.
     * The result may be altered by modifier keys.
     */
    function toCharacter(event: KeyboardEvent): string | undefined;
}
export declare enum KeyModifier {
    /**
     * M1 is the COMMAND key on MacOS X, and the CTRL key on most other platforms.
     */
    CtrlCmd = "M1",
    /**
     * M2 is the SHIFT key.
     */
    Shift = "M2",
    /**
     * M3 is the Option key on MacOS X, and the ALT key on most other platforms.
     */
    Alt = "M3",
    /**
     * M4 is the CTRL key on MacOS X, and is undefined on other platforms.
     */
    MacCtrl = "M4"
}
export declare namespace KeyModifier {
    /**
     * The CTRL key, independently of the platform.
     * _Note:_ In general `KeyModifier.CtrlCmd` should be preferred over this constant.
     */
    const CTRL: KeyModifier.MacCtrl | KeyModifier.CtrlCmd;
    /**
     * An alias for the SHIFT key (`KeyModifier.Shift`).
     */
    const SHIFT: KeyModifier.Shift;
    /**
     * `true` if the argument represents a modifier. Otherwise, `false`.
     */
    function isModifier(key: string | undefined): boolean;
}
export interface Key {
    readonly code: string;
    readonly keyCode: number;
    readonly easyString: string;
}
export declare namespace SpecialCases {
    const META = "meta";
    const CTRLCMD = "ctrlcmd";
}
export declare namespace Key {
    function isKey(arg: unknown): arg is Key;
    function getKey(arg: string | number): Key | undefined;
    function isModifier(arg: string | number): boolean;
    function equals(key: Key, keyCode: KeyCode): boolean;
    const BACKSPACE: Key;
    const TAB: Key;
    const ENTER: Key;
    const ESCAPE: Key;
    const SPACE: Key;
    const PAGE_UP: Key;
    const PAGE_DOWN: Key;
    const END: Key;
    const HOME: Key;
    const ARROW_LEFT: Key;
    const ARROW_UP: Key;
    const ARROW_RIGHT: Key;
    const ARROW_DOWN: Key;
    const INSERT: Key;
    const DELETE: Key;
    const SHIFT_LEFT: Key;
    const SHIFT_RIGHT: Key;
    const CONTROL_LEFT: Key;
    const CONTROL_RIGHT: Key;
    const ALT_LEFT: Key;
    const ALT_RIGHT: Key;
    const CAPS_LOCK: Key;
    const OS_LEFT: Key;
    const OS_RIGHT: Key;
    const DIGIT0: Key;
    const DIGIT1: Key;
    const DIGIT2: Key;
    const DIGIT3: Key;
    const DIGIT4: Key;
    const DIGIT5: Key;
    const DIGIT6: Key;
    const DIGIT7: Key;
    const DIGIT8: Key;
    const DIGIT9: Key;
    const KEY_A: Key;
    const KEY_B: Key;
    const KEY_C: Key;
    const KEY_D: Key;
    const KEY_E: Key;
    const KEY_F: Key;
    const KEY_G: Key;
    const KEY_H: Key;
    const KEY_I: Key;
    const KEY_J: Key;
    const KEY_K: Key;
    const KEY_L: Key;
    const KEY_M: Key;
    const KEY_N: Key;
    const KEY_O: Key;
    const KEY_P: Key;
    const KEY_Q: Key;
    const KEY_R: Key;
    const KEY_S: Key;
    const KEY_T: Key;
    const KEY_U: Key;
    const KEY_V: Key;
    const KEY_W: Key;
    const KEY_X: Key;
    const KEY_Y: Key;
    const KEY_Z: Key;
    const MULTIPLY: Key;
    const ADD: Key;
    const DECIMAL: Key;
    const SUBTRACT: Key;
    const DIVIDE: Key;
    const F1: Key;
    const F2: Key;
    const F3: Key;
    const F4: Key;
    const F5: Key;
    const F6: Key;
    const F7: Key;
    const F8: Key;
    const F9: Key;
    const F10: Key;
    const F11: Key;
    const F12: Key;
    const F13: Key;
    const F14: Key;
    const F15: Key;
    const F16: Key;
    const F17: Key;
    const F18: Key;
    const F19: Key;
    const F20: Key;
    const F21: Key;
    const F22: Key;
    const F23: Key;
    const F24: Key;
    const NUM_LOCK: Key;
    const SEMICOLON: Key;
    const EQUAL: Key;
    const COMMA: Key;
    const MINUS: Key;
    const PERIOD: Key;
    const SLASH: Key;
    const BACKQUOTE: Key;
    const INTL_RO: Key;
    const BRACKET_LEFT: Key;
    const BACKSLASH: Key;
    const BRACKET_RIGHT: Key;
    const QUOTE: Key;
    const INTL_BACKSLASH: Key;
    const INTL_YEN: Key;
    const MAX_KEY_CODE: number;
}
export type KeysOrKeyCodes = Key | KeyCode | (Key | KeyCode)[];
export declare namespace KeysOrKeyCodes {
    const toKeyCode: (keyOrKeyCode: Key | KeyCode) => KeyCode;
    const toKeyCodes: (keysOrKeyCodes: KeysOrKeyCodes) => KeyCode[];
}
//# sourceMappingURL=keys.d.ts.map