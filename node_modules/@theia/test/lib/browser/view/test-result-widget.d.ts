import { BaseWidget, LabelProvider, Message, OpenerService } from '@theia/core/lib/browser';
import { TestOutputUIModel } from './test-output-ui-model';
import { DisposableCollection } from '@theia/core';
import { TestMessage, TestMessageStackFrame } from '../test-service';
import { MarkdownRenderer } from '@theia/core/lib/browser/markdown-rendering/markdown-renderer';
import { URI } from '@theia/core/lib/common/uri';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { NavigationLocationService } from '@theia/editor/lib/browser/navigation/navigation-location-service';
import { Position } from '@theia/editor/lib/browser/navigation/navigation-location';
export declare class TestResultWidget extends BaseWidget {
    static readonly ID = "test-result-widget";
    uiModel: TestOutputUIModel;
    markdownRenderer: MarkdownRenderer;
    openerService: OpenerService;
    fileService: FileService;
    navigationService: NavigationLocationService;
    protected readonly labelProvider: LabelProvider;
    protected toDisposeOnRender: DisposableCollection;
    protected input: TestMessage[];
    protected content: HTMLDivElement;
    constructor();
    init(): void;
    protected onAfterAttach(msg: Message): void;
    setInput(messages: TestMessage[]): void;
    protected onUpdateRequest(msg: Message): void;
    render(): void;
    renderFrame(stackFrame: TestMessageStackFrame, stackTraceElement: HTMLElement): void;
    openUriInWorkspace(uri: URI, position?: Position): Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=test-result-widget.d.ts.map