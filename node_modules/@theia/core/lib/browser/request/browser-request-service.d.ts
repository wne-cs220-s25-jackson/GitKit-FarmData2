/********************************************************************************
 * Copyright (C) 2022 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
import { RequestConfiguration, RequestContext, RequestOptions, RequestService, CancellationToken } from '@theia/request';
import { PreferenceService } from '../preferences/preference-service';
export declare abstract class AbstractBrowserRequestService implements RequestService {
    protected readonly preferenceService: PreferenceService;
    protected configurePromise: Promise<void>;
    protected init(): void;
    abstract configure(config: RequestConfiguration): Promise<void>;
    abstract request(options: RequestOptions, token?: CancellationToken): Promise<RequestContext>;
    abstract resolveProxy(url: string): Promise<string | undefined>;
}
export declare class ProxyingBrowserRequestService extends AbstractBrowserRequestService {
    protected readonly backendRequestService: RequestService;
    configure(config: RequestConfiguration): Promise<void>;
    resolveProxy(url: string): Promise<string | undefined>;
    request(options: RequestOptions): Promise<RequestContext>;
}
export declare class XHRBrowserRequestService extends ProxyingBrowserRequestService {
    protected authorization?: string;
    configure(config: RequestConfiguration): Promise<void>;
    request(options: RequestOptions, token?: CancellationToken): Promise<RequestContext>;
    protected xhrRequest(options: RequestOptions, token?: CancellationToken): Promise<RequestContext>;
    protected setRequestHeaders(xhr: XMLHttpRequest, options: RequestOptions): void;
    protected getResponseHeaders(xhr: XMLHttpRequest): {
        [name: string]: string;
    };
}
//# sourceMappingURL=browser-request-service.d.ts.map