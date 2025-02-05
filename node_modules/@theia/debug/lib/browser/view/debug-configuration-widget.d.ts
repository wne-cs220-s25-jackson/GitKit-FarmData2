/// <reference types="react" />
import { ReactWidget, QuickInputService } from '@theia/core/lib/browser';
import { CommandRegistry, DisposableCollection, MessageService } from '@theia/core/lib/common';
import * as React from '@theia/core/shared/react';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { DebugConsoleContribution } from '../console/debug-console-contribution';
import { DebugConfigurationManager } from '../debug-configuration-manager';
import { DebugSessionManager } from '../debug-session-manager';
import { DebugAction } from './debug-action';
import { DebugViewModel } from './debug-view-model';
export declare class DebugConfigurationWidget extends ReactWidget {
    protected readonly commandRegistry: CommandRegistry;
    protected readonly viewModel: DebugViewModel;
    protected readonly manager: DebugConfigurationManager;
    protected readonly sessionManager: DebugSessionManager;
    protected readonly debugConsole: DebugConsoleContribution;
    protected readonly quickInputService: QuickInputService;
    protected readonly workspaceService: WorkspaceService;
    protected readonly messageService: MessageService;
    protected readonly onRender: DisposableCollection;
    protected init(): void;
    focus(): void;
    protected doFocus(): boolean;
    protected stepRef: DebugAction | undefined;
    protected setStepRef: (stepRef: DebugAction | null) => void;
    render(): React.ReactNode;
    protected readonly start: () => Promise<void>;
    protected readonly openConfiguration: () => Promise<void>;
    protected readonly openConsole: () => Promise<import("@theia/console/lib/browser/console-widget").ConsoleWidget>;
}
//# sourceMappingURL=debug-configuration-widget.d.ts.map