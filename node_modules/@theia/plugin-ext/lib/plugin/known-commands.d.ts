export declare namespace KnownCommands {
    function map<T>(id: string, args: any[] | undefined, toDo: (mappedId: string, mappedArgs: any[] | undefined, mappedResult: ConversionFunction | undefined) => T): T;
    function mapped(id: string): boolean;
    type ConversionFunction = ((parameter: any) => any) | undefined;
}
//# sourceMappingURL=known-commands.d.ts.map