import type { FrontendApplication } from './frontend-application';
import { MaybePromise } from '../common/types';
import { StopReason } from '../common/frontend-application-state';
/**
 * Clients can implement to get a callback for contributing widgets to a shell on start.
 */
export declare const FrontendApplicationContribution: unique symbol;
export interface FrontendApplicationContribution {
    /**
     * Called on application startup before configure is called.
     */
    initialize?(): void;
    /**
     * Called before commands, key bindings and menus are initialized.
     * Should return a promise if it runs asynchronously.
     */
    configure?(app: FrontendApplication): MaybePromise<void>;
    /**
     * Called when the application is started. The application shell is not attached yet when this method runs.
     * Should return a promise if it runs asynchronously.
     */
    onStart?(app: FrontendApplication): MaybePromise<void>;
    /**
     * Called on `beforeunload` event, right before the window closes.
     * Return `true` or an OnWillStopAction in order to prevent exit.
     * Note: No async code allowed, this function has to run on one tick.
     */
    onWillStop?(app: FrontendApplication): boolean | undefined | OnWillStopAction<unknown>;
    /**
     * Called when an application is stopped or unloaded.
     *
     * Note that this is implemented using `window.beforeunload` which doesn't allow any asynchronous code anymore.
     * I.e. this is the last tick.
     */
    onStop?(app: FrontendApplication): void;
    /**
     * Called after the application shell has been attached in case there is no previous workbench layout state.
     * Should return a promise if it runs asynchronously.
     */
    initializeLayout?(app: FrontendApplication): MaybePromise<void>;
    /**
     * An event is emitted when a layout is initialized, but before the shell is attached.
     */
    onDidInitializeLayout?(app: FrontendApplication): MaybePromise<void>;
}
export interface OnWillStopAction<T = unknown> {
    /**
     * @resolves to a prepared value to be passed into the `action` function.
     */
    prepare?: (stopReason?: StopReason) => MaybePromise<T>;
    /**
     * @resolves to `true` if it is safe to close the application; `false` otherwise.
     */
    action: (prepared: T, stopReason?: StopReason) => MaybePromise<boolean>;
    /**
     * A descriptive string for the reason preventing close.
     */
    reason: string;
    /**
     * A number representing priority. Higher priority items are run later.
     * High priority implies that some options of this check will have negative impacts if
     * the user subsequently cancels the shutdown.
     */
    priority?: number;
}
export declare namespace OnWillStopAction {
    function is(candidate: unknown): candidate is OnWillStopAction;
}
/**
 * Default frontend contribution that can be extended by clients if they do not want to implement any of the
 * methods from the interface but still want to contribute to the frontend application.
 */
export declare abstract class DefaultFrontendApplicationContribution implements FrontendApplicationContribution {
    initialize(): void;
}
//# sourceMappingURL=frontend-application-contribution.d.ts.map