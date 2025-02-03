export declare const mark: (name: string, markOptions?: {
    startTime?: number;
}) => void;
export interface PerformanceMark {
    readonly name: string;
    readonly startTime: number;
}
/**
 * Returns all marks, sorted by `startTime`.
 */
export declare const getMarks: () => PerformanceMark[];
