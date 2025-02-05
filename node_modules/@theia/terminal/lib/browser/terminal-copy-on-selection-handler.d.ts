export declare class TerminalCopyOnSelectionHandler {
    private textToCopy;
    private interceptCopy;
    private copyListener;
    protected init(): void;
    private clipBoardCopyIsGranted;
    private executeCommandCopy;
    private writeToClipBoard;
    copy(text: string): Promise<void>;
}
//# sourceMappingURL=terminal-copy-on-selection-handler.d.ts.map