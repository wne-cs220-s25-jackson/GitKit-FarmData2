import { IGrammar, StateStack } from 'vscode-textmate';
import * as monaco from '@theia/monaco-editor-core';
export declare class TokenizerState implements monaco.languages.IState {
    readonly stateStack: StateStack;
    constructor(stateStack: StateStack);
    clone(): monaco.languages.IState;
    equals(other: monaco.languages.IState): boolean;
}
/**
 * Options for the TextMate tokenizer.
 */
export interface TokenizerOption {
    /**
     * Maximum line length that will be handled by the TextMate tokenizer. If the length of the actual line exceeds this
     * limit, the tokenizer terminates and the tokenization of any subsequent lines might be broken.
     *
     * If the `lineLimit` is not defined, it means, there are no line length limits. Otherwise, it must be a positive
     * integer or an error will be thrown.
     */
    lineLimit?: number;
}
export declare function createTextmateTokenizer(grammar: IGrammar, options: TokenizerOption): monaco.languages.EncodedTokensProvider & monaco.languages.TokensProvider;
//# sourceMappingURL=textmate-tokenizer.d.ts.map