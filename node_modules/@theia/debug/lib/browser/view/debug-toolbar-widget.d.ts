/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { CommandMenuNode, CommandRegistry, DisposableCollection, MenuModelRegistry, MenuPath } from '@theia/core';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { ReactWidget } from '@theia/core/lib/browser/widgets';
import { DebugViewModel } from './debug-view-model';
import { DebugAction } from './debug-action';
export declare class DebugToolBar extends ReactWidget {
    static readonly MENU: MenuPath;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly menuModelRegistry: MenuModelRegistry;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly model: DebugViewModel;
    protected readonly onRender: DisposableCollection;
    protected init(): void;
    focus(): void;
    protected doFocus(): boolean;
    protected stepRef: DebugAction | undefined;
    protected setStepRef: (stepRef: DebugAction | null) => void;
    protected render(): React.ReactNode;
    protected renderContributedCommands(): React.ReactNode;
    protected matchContext(when?: string): boolean;
    protected debugAction(commandMenuNode: CommandMenuNode): React.ReactNode;
    protected renderStart(): React.ReactNode;
    protected renderContinue(): React.ReactNode;
    protected start: () => Promise<void>;
    protected restart: () => Promise<void>;
    protected stop: () => Promise<void>;
    protected continue: () => Promise<import("@vscode/debugprotocol").DebugProtocol.ContinueResponse> | undefined;
    protected pause: () => Promise<import("@vscode/debugprotocol").DebugProtocol.PauseResponse> | undefined;
    protected stepOver: () => Promise<import("@vscode/debugprotocol").DebugProtocol.NextResponse> | undefined;
    protected stepIn: () => Promise<import("@vscode/debugprotocol").DebugProtocol.StepInResponse> | undefined;
    protected stepOut: () => Promise<import("@vscode/debugprotocol").DebugProtocol.StepOutResponse> | undefined;
}
//# sourceMappingURL=debug-toolbar-widget.d.ts.map