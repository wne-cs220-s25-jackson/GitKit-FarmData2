import * as React from 'react';
import '../../../src/browser/style/select-component.css';
export interface SelectOption {
    value?: string;
    label?: string;
    separator?: boolean;
    disabled?: boolean;
    detail?: string;
    description?: string;
    markdown?: boolean;
    userData?: string;
}
export interface SelectComponentProps {
    options: readonly SelectOption[];
    defaultValue?: string | number;
    onChange?: (option: SelectOption, index: number) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    alignment?: 'left' | 'right';
}
export interface SelectComponentState {
    dimensions?: DOMRect;
    selected: number;
    original: number;
    hover: number;
}
export declare const SELECT_COMPONENT_CONTAINER = "select-component-container";
export declare class SelectComponent extends React.Component<SelectComponentProps, SelectComponentState> {
    protected dropdownElement: HTMLElement;
    protected fieldRef: React.RefObject<HTMLDivElement>;
    protected dropdownRef: React.RefObject<HTMLDivElement>;
    protected mountedListeners: Map<string, EventListenerOrEventListenerObject>;
    protected optimalWidth: number;
    protected optimalHeight: number;
    constructor(props: SelectComponentProps);
    get options(): readonly SelectOption[];
    get value(): string | number | undefined;
    set value(value: string | number | undefined);
    protected get alignLeft(): boolean;
    protected getOptimalWidth(): number;
    protected getOptimalHeight(maxWidth?: number): number;
    protected attachListeners(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
    protected nextNotSeparator(direction: 'forwards' | 'backwards'): number;
    protected handleKeypress(ev: React.KeyboardEvent<HTMLDivElement>): void;
    protected handleClickEvent(event: React.MouseEvent<HTMLElement>): void;
    protected toggleVisibility(): void;
    protected hide(index?: number): void;
    protected renderDropdown(): React.ReactNode;
    protected renderOption(index: number, option: SelectOption): React.ReactNode;
    protected selectOption(index: number, option: SelectOption): void;
}
//# sourceMappingURL=select-component.d.ts.map