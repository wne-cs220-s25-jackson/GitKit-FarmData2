export interface ResourceLabelFormatter {
    scheme: string;
    authority?: string;
    priority?: boolean;
    formatting: ResourceLabelFormatting;
}
export interface ResourceLabelFormatting {
    label: string;
    separator: '/' | '\\' | '';
    tildify?: boolean;
    normalizeDriveLetter?: boolean;
    authorityPrefix?: string;
}
//# sourceMappingURL=label-protocol.d.ts.map