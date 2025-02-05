/// <reference types="node" />
import * as net from 'net';
import * as puppeteer from 'puppeteer-core';
import { TestFileOptions } from './test-page';
export interface TestOptions {
    start: () => Promise<net.AddressInfo>;
    launch?: puppeteer.PuppeteerLaunchOptions;
    files?: Partial<TestFileOptions>;
    coverage?: boolean;
}
export default function runTest(options: TestOptions): Promise<void>;
//# sourceMappingURL=run-test.d.ts.map