import type { IBufferRange, IBufferLine, Terminal } from 'xterm';
export declare const LinkContext: unique symbol;
export interface LinkContext {
    text: string;
    startLine: number;
    lines: IBufferLine[];
}
/**
 * Mimics VS Code IRange
 */
interface TerminalRange {
    readonly startLineNumber: number;
    readonly startColumn: number;
    readonly endLineNumber: number;
    readonly endColumn: number;
}
export declare function getLinkContext(terminal: Terminal, line: number, maxLinkLength?: number): LinkContext;
/**
 * Converts a possibly wrapped link's range (comprised of string indices) into a buffer range that plays nicely with xterm.js
 *
 * @param lines A single line (not the entire buffer)
 * @param bufferWidth The number of columns in the terminal
 * @param range The link range - string indices
 * @param startLine The absolute y position (on the buffer) of the line
 */
export declare function convertLinkRangeToBuffer(lines: IBufferLine[], bufferWidth: number, range: TerminalRange, startLine: number): IBufferRange;
export {};
//# sourceMappingURL=terminal-link-helpers.d.ts.map