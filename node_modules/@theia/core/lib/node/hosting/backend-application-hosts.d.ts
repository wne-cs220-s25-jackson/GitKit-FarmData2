/**
 * **Important: This component is not bound on Electron.**
 *
 * Component handling the different hosts the Theia backend should be reachable at.
 *
 * Hosts should be set through the `THEIA_HOSTS` environment variable as a comma-separated list of hosts.
 *
 * If you do not set this variable, we'll consider that we don't know where the application is hosted at.
 */
export declare class BackendApplicationHosts {
    protected readonly _hosts: Set<string>;
    /**
     * Set of domains that the application is supposed to be reachable at.
     * If the set is empty it means that we don't know where we are hosted.
     * You can check for this with `.hasKnownHosts()`.
     */
    get hosts(): ReadonlySet<string>;
    protected init(): void;
    /**
     * Do we know where we are hosted?
     */
    hasKnownHosts(): boolean;
}
//# sourceMappingURL=backend-application-hosts.d.ts.map