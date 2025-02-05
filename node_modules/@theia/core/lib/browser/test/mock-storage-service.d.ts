import { StorageService } from '../storage-service';
/**
 * A StorageService suitable to use during tests.
 */
export declare class MockStorageService implements StorageService {
    readonly data: Map<string, unknown>;
    onSetDataCallback?: (key: string, data?: any) => void;
    onSetData(callback: (key: string, data?: any) => void): void;
    setData<T>(key: string, data?: T): Promise<void>;
    getData<T>(key: string, defaultValue?: T): Promise<T | undefined>;
}
//# sourceMappingURL=mock-storage-service.d.ts.map