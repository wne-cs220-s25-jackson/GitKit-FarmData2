export declare function toUint32(v: number): number;
export declare class PrefixSumIndexOfResult {
    _prefixSumIndexOfResultBrand: void;
    index: number;
    remainder: number;
    constructor(index: number, remainder: number);
}
export declare class PrefixSumComputer {
    /**
     * values[i] is the value at index i
     */
    private values;
    /**
     * prefixSum[i] = SUM(heights[j]), 0 <= j <= i
     */
    private prefixSum;
    /**
     * prefixSum[i], 0 <= i <= prefixSumValidIndex can be trusted
     */
    private prefixSumValidIndex;
    constructor(values: Uint32Array);
    getCount(): number;
    insertValues(insertIndex: number, insertValues: Uint32Array): boolean;
    changeValue(index: number, value: number): boolean;
    removeValues(startIndex: number, count: number): boolean;
    getTotalValue(): number;
    getAccumulatedValue(index: number): number;
    private _getAccumulatedValue;
    getIndexOf(accumulatedValue: number): PrefixSumIndexOfResult;
}
//# sourceMappingURL=prefix-sum-computer.d.ts.map