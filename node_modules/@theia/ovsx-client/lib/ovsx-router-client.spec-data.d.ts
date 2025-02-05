import { OVSXMockClient } from './ovsx-mock-client';
import { OVSXClient } from './ovsx-types';
export declare const registries: {
    internal: string;
    public: string;
    third: string;
};
export declare const clients: Record<string, OVSXMockClient>;
export declare const filterFactories: import("./ovsx-router-client").OVSXRouterFilterFactory[];
export declare function testClientProvider(uri: string): OVSXClient;
//# sourceMappingURL=ovsx-router-client.spec-data.d.ts.map