/**
 * A Keybinding binds a specific key sequence ({@link Keybinding#keybinding}) to trigger a command ({@link Keybinding#command}). A Keybinding optionally may
 * define a "when clause" ({@link Keybinding#when}) to specify in which context it becomes active.
 * @see KeyBindingRegistry
 */
export interface Keybinding {
    /**
     * Unique command identifier of the command to be triggered by this keybinding.
     */
    command: string;
    /**
     * The key sequence for the keybinding as defined in packages/keymaps/README.md.
     */
    keybinding: string;
    /**
     * The optional keybinding context where this binding belongs to.
     * If not specified, then this keybinding context belongs to the NOOP
     * keybinding context.
     *
     * @deprecated use `when` closure instead
     */
    context?: string;
    /**
     * An optional clause defining the condition when the keybinding is active, e.g. based on the current focus.
     * See {@link https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts} for more details.
     */
    when?: string;
    /**
     * Optional arguments that will be passed to the command when it gets triggered via this keybinding.
     * Needs to be specified when the triggered command expects arguments to be passed to the command handler.
     */
    args?: any;
}
export declare namespace Keybinding {
    /**
     * Compares two keybindings for equality.
     * Can optionally ignore the keybinding and/or args property in the comparison.
     * @param a The first Keybinding in the comparison
     * @param b The second Keybinding in the comparison
     * @param ignoreKeybinding Ignore the 'keybinding' property in the comparison
     * @param ignoreArgs Ignore the 'args' property in the comparison
     */
    function equals(a: Keybinding, b: Keybinding, ignoreKeybinding?: boolean, ignoreArgs?: boolean): boolean;
    /**
     * Returns a new object only containing properties which
     * are described on the `Keybinding` API.
     *
     * @param binding the binding to create an API object for.
     */
    function apiObjectify(binding: Keybinding | RawKeybinding): Keybinding;
    function retrieveKeybinding(binding: Partial<Keybinding & RawKeybinding>): string;
    /**
     * Returns with the string representation of the binding.
     * Any additional properties which are not described on
     * the `Keybinding` API will be ignored.
     *
     * @param binding the binding to stringify.
     */
    function stringify(binding: Keybinding): string;
    function is(arg: unknown): arg is Keybinding;
    function replaceKeybinding(keybindings: Keybinding[], oldKeybinding: Keybinding, newKeybinding: Keybinding): boolean;
    function addKeybinding(keybindings: Keybinding[], newKeybinding: Keybinding): void;
}
/**
 * @internal
 *
 * Optional representation of key sequence as found in `keymaps.json` file.
 * Use `keybinding` as the official representation.
 */
export interface RawKeybinding extends Omit<Keybinding, 'keybinding'> {
    key: string;
}
export declare namespace RawKeybinding {
    function is(candidate: unknown): candidate is RawKeybinding;
}
//# sourceMappingURL=keybinding.d.ts.map