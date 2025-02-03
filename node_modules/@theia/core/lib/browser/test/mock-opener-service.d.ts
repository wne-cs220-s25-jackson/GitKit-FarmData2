import { OpenerService, OpenHandler } from '../opener-service';
/**
 * Mock opener service implementation for testing. Never provides handlers, but always rejects :)
 */
export declare class MockOpenerService implements OpenerService {
    getOpeners(): Promise<OpenHandler[]>;
    getOpener(): Promise<OpenHandler>;
}
//# sourceMappingURL=mock-opener-service.d.ts.map