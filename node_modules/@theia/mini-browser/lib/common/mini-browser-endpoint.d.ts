/**
 * The mini-browser can now serve content on its own host/origin.
 *
 * The virtual host can be configured with this `THEIA_MINI_BROWSER_HOST_PATTERN`
 * environment variable. `{{hostname}}` represents the current host, and `{{uuid}}`
 * will be replace by a random uuid value.
 */
export declare namespace MiniBrowserEndpoint {
    const PATH = "/mini-browser";
    const HOST_PATTERN_ENV = "THEIA_MINI_BROWSER_HOST_PATTERN";
    const HOST_PATTERN_DEFAULT = "{{uuid}}.mini-browser.{{hostname}}";
}
//# sourceMappingURL=mini-browser-endpoint.d.ts.map