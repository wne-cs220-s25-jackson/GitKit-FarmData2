export interface VariablePromptStringInput {
    id: string;
    type: 'promptString';
    description: string;
    default?: string;
}
export interface VariablePickStringInput {
    id: string;
    type: 'pickString';
    description: string;
    options: string[];
    default?: string;
}
export interface VariableCommandInput {
    id: string;
    type: 'command';
    command: string;
    args?: any;
}
export type VariableInput = VariablePromptStringInput | VariablePickStringInput | VariableCommandInput;
//# sourceMappingURL=variable-input.d.ts.map