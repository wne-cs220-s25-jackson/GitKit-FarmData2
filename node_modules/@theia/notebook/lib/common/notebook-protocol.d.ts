export interface NotebookTypeDescriptor {
    readonly type: string;
    readonly displayName: string;
    readonly priority?: string | undefined;
    readonly selector?: readonly NotebookFileSelector[];
}
export interface NotebookFileSelector {
    readonly filenamePattern?: string;
    readonly excludeFileNamePattern?: string;
}
export interface NotebookRendererDescriptor {
    readonly id: string;
    readonly displayName: string;
    readonly mimeTypes: string[];
    readonly entrypoint: string | {
        readonly extends: string;
        readonly path: string;
    };
    readonly requiresMessaging?: 'always' | 'optional' | 'never';
}
//# sourceMappingURL=notebook-protocol.d.ts.map