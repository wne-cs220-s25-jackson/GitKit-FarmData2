import { Root } from '@theia/core/shared/react-dom/client';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { MonacoEditorZoneWidget } from '@theia/monaco/lib/browser/monaco-editor-zone-widget';
import { DebugEditor } from './debug-editor';
import { DebugExceptionInfo } from '../model/debug-thread';
export interface ShowDebugExceptionParams {
    info: DebugExceptionInfo;
    lineNumber: number;
    column: number;
}
export declare class DebugExceptionMonacoEditorZoneWidget extends MonacoEditorZoneWidget {
    protected computeContainerHeight(zoneHeight: number): {
        height: number;
        frameWidth: number;
    };
}
export declare class DebugExceptionWidget implements Disposable {
    readonly editor: DebugEditor;
    protected zone: MonacoEditorZoneWidget;
    protected containerNodeRoot: Root;
    protected readonly toDispose: DisposableCollection;
    protected init(): void;
    protected doInit(): Promise<void>;
    dispose(): void;
    show({ info, lineNumber, column }: ShowDebugExceptionParams): void;
    hide(): void;
    protected render(info: DebugExceptionInfo, cb: () => void): void;
    protected layout(): void;
}
//# sourceMappingURL=debug-exception-widget.d.ts.map