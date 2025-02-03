/**
 * Sent to initiate termination of the counterpart process.
 */
export interface ProcessTerminateMessage {
    type: typeof ProcessTerminateMessage.TYPE;
    stopTimeout?: number;
}
export declare namespace ProcessTerminateMessage {
    const TYPE = 0;
    function is(object: any): object is ProcessTerminateMessage;
}
/**
 * Sent to inform the counter part process that the process termination has been completed.
 */
export interface ProcessTerminatedMessage {
    type: typeof ProcessTerminateMessage.TYPE;
}
export declare namespace ProcessTerminatedMessage {
    const TYPE = 1;
    function is(object: any): object is ProcessTerminateMessage;
}
//# sourceMappingURL=hosted-plugin-protocol.d.ts.map