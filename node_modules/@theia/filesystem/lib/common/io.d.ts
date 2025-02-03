import URI from '@theia/core/lib/common/uri';
import { BinaryBuffer } from '@theia/core/lib/common//buffer';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { FileSystemProviderWithOpenReadWriteCloseCapability, FileReadStreamOptions } from './files';
import { WriteableStream, ErrorTransformer, DataTransformer } from '@theia/core/lib/common/stream';
export interface CreateReadStreamOptions extends FileReadStreamOptions {
    /**
     * The size of the buffer to use before sending to the stream.
     */
    bufferSize: number;
    /**
     * Allows to massage any possibly error that happens during reading.
     */
    errorTransformer?: ErrorTransformer;
}
/**
 * A helper to read a file from a provider with open/read/close capability into a stream.
 */
export declare function readFileIntoStream<T>(provider: FileSystemProviderWithOpenReadWriteCloseCapability, resource: URI, target: WriteableStream<T>, transformer: DataTransformer<BinaryBuffer, T>, options: CreateReadStreamOptions, token: CancellationToken): Promise<void>;
//# sourceMappingURL=io.d.ts.map