/// <reference types="lodash" />
import * as React from 'react';
import { CommandService } from '../../common';
import { ReactWidget } from '../widgets/react-widget';
import { FrontendApplicationStateService } from '../frontend-application-state';
import { LabelParser } from '../label-parser';
import { PreferenceService } from '../preferences';
import { StatusBar, StatusBarEntry, StatusBarAlignment, StatusBarViewEntry } from './status-bar-types';
import { StatusBarViewModel } from './status-bar-view-model';
import { HoverService } from '../hover-service';
export { StatusBar, StatusBarAlignment, StatusBarEntry };
export declare class StatusBarImpl extends ReactWidget implements StatusBar {
    protected readonly commands: CommandService;
    protected readonly entryService: LabelParser;
    protected readonly applicationStateService: FrontendApplicationStateService;
    protected readonly preferences: PreferenceService;
    protected readonly viewModel: StatusBarViewModel;
    protected readonly hoverService: HoverService;
    protected backgroundColor: string | undefined;
    protected color: string | undefined;
    constructor(commands: CommandService, entryService: LabelParser, applicationStateService: FrontendApplicationStateService, preferences: PreferenceService, viewModel: StatusBarViewModel, hoverService: HoverService);
    protected debouncedUpdate: import("lodash").DebouncedFunc<() => void>;
    protected get ready(): Promise<void>;
    setElement(id: string, entry: StatusBarEntry): Promise<void>;
    removeElement(id: string): Promise<void>;
    setBackgroundColor(color?: string): Promise<void>;
    protected internalSetBackgroundColor(color?: string): void;
    setColor(color?: string): Promise<void>;
    protected internalSetColor(color?: string): void;
    protected render(): JSX.Element;
    protected onclick(entry: StatusBarEntry): () => void;
    protected createAttributes(viewEntry: StatusBarViewEntry): React.Attributes & React.HTMLAttributes<HTMLElement>;
    protected renderElement(entry: StatusBarViewEntry): JSX.Element;
}
//# sourceMappingURL=status-bar.d.ts.map