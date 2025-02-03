export declare class ConsoleHistory {
    static limit: number;
    protected values: string[];
    protected index: number;
    push(value: string): void;
    protected delete(value: string): void;
    protected trim(): void;
    get current(): string | undefined;
    get previous(): string | undefined;
    get next(): string | undefined;
    store(): ConsoleHistory.Data;
    restore(object: ConsoleHistory): void;
}
export declare namespace ConsoleHistory {
    interface Data {
        values: string[];
        index: number;
    }
}
//# sourceMappingURL=console-history.d.ts.map