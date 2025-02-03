import { Disposable } from '../common/disposable';
import { Emitter } from '../common/event';
import { ColorDefinition, ColorCssVariable } from '../common/color';
export declare class ColorRegistry {
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: import("../common/event").Event<void>;
    protected fireDidChange(): void;
    getColors(): IterableIterator<string>;
    getCurrentCssVariable(id: string): ColorCssVariable | undefined;
    toCssVariableName(id: string, prefix?: string): string;
    getCurrentColor(id: string): string | undefined;
    register(...definitions: ColorDefinition[]): Disposable;
    protected doRegister(definition: ColorDefinition): Disposable;
}
//# sourceMappingURL=color-registry.d.ts.map