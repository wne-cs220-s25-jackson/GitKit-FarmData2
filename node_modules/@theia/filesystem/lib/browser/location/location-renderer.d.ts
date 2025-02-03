/// <reference types="react" />
import URI from '@theia/core/lib/common/uri';
import { LocationService } from './location-service';
import * as React from '@theia/core/shared/react';
import { FileService } from '../file-service';
import { DisposableCollection, Emitter } from '@theia/core/lib/common';
import { FileDialogModel } from '../file-dialog/file-dialog-model';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { ReactRenderer } from '@theia/core/lib/browser/widgets/react-renderer';
interface AutoSuggestDataEvent {
    parent: string;
    children: string[];
}
declare class ResolvedDirectoryCache {
    protected readonly fileService: FileService;
    protected pendingResolvedDirectories: Map<string, Promise<void>>;
    protected cachedDirectories: Map<string, string[]>;
    protected directoryResolvedEmitter: Emitter<AutoSuggestDataEvent>;
    readonly onDirectoryDidResolve: import("@theia/core/lib/common").Event<AutoSuggestDataEvent>;
    constructor(fileService: FileService);
    tryResolveChildDirectories(inputAsURI: URI): string[] | undefined;
    protected createResolutionPromise(directoryToResolve: string): Promise<void>;
}
export declare const LocationListRendererFactory: unique symbol;
export interface LocationListRendererFactory {
    (options: LocationListRendererOptions): LocationListRenderer;
}
export declare const LocationListRendererOptions: unique symbol;
export interface LocationListRendererOptions {
    model: FileDialogModel;
    host?: HTMLElement;
}
export declare class LocationListRenderer extends ReactRenderer {
    readonly options: LocationListRendererOptions;
    protected readonly fileService: FileService;
    protected readonly variablesServer: EnvVariablesServer;
    protected directoryCache: ResolvedDirectoryCache;
    protected service: LocationService;
    protected toDisposeOnNewCache: DisposableCollection;
    protected _drives: URI[] | undefined;
    protected _doShowTextInput: boolean;
    protected homeDir: string;
    get doShowTextInput(): boolean;
    set doShowTextInput(doShow: boolean);
    protected lastUniqueTextInputLocation: URI | undefined;
    protected previousAutocompleteMatch: string;
    protected doAttemptAutocomplete: boolean;
    constructor(options: LocationListRendererOptions);
    protected init(): void;
    protected doInit(): Promise<void>;
    render(): void;
    protected initResolveDirectoryCache(): void;
    protected doAfterRender: () => void;
    protected readonly handleLocationChanged: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    protected readonly handleTextInputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    protected readonly handleTextInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    protected readonly handleIconKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>) => void;
    protected readonly handleTextInputOnBlur: () => void;
    protected readonly handleTextInputMouseDown: (e: React.MouseEvent<HTMLSpanElement>) => void;
    protected doRender(): React.ReactElement;
    protected renderInputIcon(): React.ReactNode;
    protected renderTextInput(): React.ReactNode;
    protected renderSelectInput(): React.ReactNode;
    protected toggleInputOnKeyDown(e: React.KeyboardEvent<HTMLSpanElement>): void;
    protected toggleToTextInputOnMouseDown(e: React.MouseEvent<HTMLSpanElement>): void;
    protected toggleToSelectInput(): void;
    /**
     * Collects the available locations based on the currently selected, and appends the available drives to it.
     */
    protected collectLocations(): LocationListRenderer.Location[];
    /**
     * Asynchronously loads the drives (if not yet available) and triggers a UI update on success with the new values.
     */
    protected doLoadDrives(): void;
    protected renderLocation(location: LocationListRenderer.Location): React.ReactNode;
    protected onLocationChanged(e: React.ChangeEvent<HTMLSelectElement>): void;
    protected trySetNewLocation(newLocation: URI): void;
    protected trySuggestDirectory(e: React.ChangeEvent<HTMLInputElement>): void;
    protected tryRenderFirstMatch(inputElement: HTMLInputElement, children: string[]): void;
    protected handleControlKeys(e: React.KeyboardEvent<HTMLInputElement>): void;
    get locationList(): HTMLSelectElement | undefined;
    get locationTextInput(): HTMLInputElement | undefined;
    dispose(): void;
}
export declare namespace LocationListRenderer {
    namespace Styles {
        const LOCATION_LIST_CLASS = "theia-LocationList";
        const LOCATION_INPUT_TOGGLE_CLASS = "theia-LocationInputToggle";
        const LOCATION_TEXT_INPUT_CLASS = "theia-LocationTextInput";
    }
    namespace Tooltips {
        const TOGGLE_TEXT_INPUT = "Switch to text-based input";
        const TOGGLE_SELECT_INPUT = "Switch to location list";
    }
    interface Location {
        uri: URI;
        isDrive?: boolean;
    }
}
export {};
//# sourceMappingURL=location-renderer.d.ts.map