import { Emitter, Event } from '@theia/core';
import { TerminalWidget } from './base/terminal-widget';
export declare const TerminalProfileService: unique symbol;
export declare const ContributedTerminalProfileStore: unique symbol;
export declare const UserTerminalProfileStore: unique symbol;
export interface TerminalProfile {
    start(): Promise<TerminalWidget>;
}
export declare const NULL_PROFILE: TerminalProfile;
export interface TerminalProfileService {
    onAdded: Event<string>;
    onRemoved: Event<string>;
    getProfile(id: string): TerminalProfile | undefined;
    readonly all: [string, TerminalProfile][];
    setDefaultProfile(id: string): void;
    readonly onDidChangeDefaultShell: Event<string>;
    readonly defaultProfile: TerminalProfile | undefined;
}
export interface TerminalProfileStore {
    onAdded: Event<[string, TerminalProfile]>;
    onRemoved: Event<string>;
    registerTerminalProfile(id: string, profile: TerminalProfile): void;
    unregisterTerminalProfile(id: string): void;
    hasProfile(id: string): boolean;
    getProfile(id: string): TerminalProfile | undefined;
    readonly all: [string, TerminalProfile][];
}
export declare class DefaultProfileStore implements TerminalProfileStore {
    protected readonly onAddedEmitter: Emitter<[string, TerminalProfile]>;
    protected readonly onRemovedEmitter: Emitter<string>;
    protected readonly profiles: Map<string, TerminalProfile>;
    onAdded: Event<[string, TerminalProfile]>;
    onRemoved: Event<string>;
    registerTerminalProfile(id: string, profile: TerminalProfile): void;
    unregisterTerminalProfile(id: string): void;
    hasProfile(id: string): boolean;
    getProfile(id: string): TerminalProfile | undefined;
    get all(): [string, TerminalProfile][];
}
export declare class DefaultTerminalProfileService implements TerminalProfileService {
    protected defaultProfileIndex: number;
    protected order: string[];
    protected readonly stores: TerminalProfileStore[];
    protected readonly onAddedEmitter: Emitter<string>;
    protected readonly onRemovedEmitter: Emitter<string>;
    protected readonly onDidChangeDefaultShellEmitter: Emitter<string>;
    onAdded: Event<string>;
    onRemoved: Event<string>;
    onDidChangeDefaultShell: Event<string>;
    constructor(...stores: TerminalProfileStore[]);
    handleRemoved(id: string): void;
    handleAdded(id: string): void;
    get defaultProfile(): TerminalProfile | undefined;
    setDefaultProfile(id: string): void;
    getProfile(id: string): TerminalProfile | undefined;
    getId(profile: TerminalProfile): string | undefined;
    get all(): [string, TerminalProfile][];
}
//# sourceMappingURL=terminal-profile-service.d.ts.map