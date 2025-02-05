/// <reference types="node" />
import stream = require('stream');
/**
 * A Node stream like `/dev/null`.
 *
 * Writing goes to a black hole, reading returns `EOF`.
 */
export declare class DevNullStream extends stream.Duplex {
    constructor(options?: {
        /**
         * Makes this stream call `destroy` on itself, emitting the `close` event.
         */
        autoDestroy?: boolean;
    });
    _write(chunk: any, encoding: string, callback: (err?: Error) => void): void;
    _read(size: number): void;
}
//# sourceMappingURL=dev-null-stream.d.ts.map