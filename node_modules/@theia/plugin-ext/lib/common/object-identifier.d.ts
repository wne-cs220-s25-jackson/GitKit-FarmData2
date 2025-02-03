export interface ObjectIdentifier {
    $ident: number;
}
export declare namespace ObjectIdentifier {
    const name = "$ident";
    function mixin<T>(obj: T, id: number): T & ObjectIdentifier;
    function of(obj: any): number;
}
//# sourceMappingURL=object-identifier.d.ts.map