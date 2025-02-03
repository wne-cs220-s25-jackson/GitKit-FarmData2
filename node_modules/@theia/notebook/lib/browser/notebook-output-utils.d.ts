import { BinaryBuffer } from '@theia/core/lib/common/buffer';
/**
 * Given a stream of individual stdout outputs, this function will return the compressed lines, escaping some of the common terminal escape codes.
 * E.g. some terminal escape codes would result in the previous line getting cleared, such if we had 3 lines and
 * last line contained such a code, then the result string would be just the first two lines.
 * @returns a single VSBuffer with the concatenated and compressed data, and whether any compression was done.
 */
export declare function compressOutputItemStreams(outputs: Uint8Array[]): {
    data: BinaryBuffer;
    didCompression: boolean;
};
export declare const MOVE_CURSOR_1_LINE_COMMAND: string;
//# sourceMappingURL=notebook-output-utils.d.ts.map