/// <reference types="node" />
import * as cp from 'child_process';
import { AbstractChannel, WriteBuffer } from '../../common';
import { BinaryMessagePipe } from './binary-message-pipe';
/**
 * A {@link Channel} to send messages between two processes using a dedicated pipe/fd for binary messages.
 * This fd is opened as 5th channel in addition to the default stdios (stdin, stdout, stderr, ipc). This means the default channels
 * are not blocked and can be used by the respective process for additional custom message handling.
 */
export declare class IPCChannel extends AbstractChannel {
    protected messagePipe: BinaryMessagePipe;
    protected ipcErrorListener: (error: Error) => void;
    constructor(childProcess?: cp.ChildProcess);
    protected setupChildProcess(childProcess: cp.ChildProcess): void;
    protected setupProcess(): void;
    getWriteBuffer(): WriteBuffer;
}
//# sourceMappingURL=ipc-channel.d.ts.map