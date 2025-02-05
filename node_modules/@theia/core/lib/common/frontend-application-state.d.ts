export type FrontendApplicationState = 'init' | 'started_contributions' | 'attached_shell' | 'initialized_layout' | 'ready' | 'closing_window';
export declare enum StopReason {
    /**
     * Closing the window with no prospect of restart.
     */
    Close = 0,
    /**
     * Reload without closing the window.
     */
    Reload = 1,
    /**
     * Reload that includes closing the window.
     */
    Restart = 2
}
//# sourceMappingURL=frontend-application-state.d.ts.map