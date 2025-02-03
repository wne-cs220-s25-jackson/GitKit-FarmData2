export declare namespace FileAccess {
    namespace Constants {
        /**
         * Flag indicating that the file is visible to the calling process.
         * This is useful for determining if a file exists, but says nothing about rwx permissions. Default if no mode is specified.
         */
        const F_OK: number;
        /**
         * Flag indicating that the file can be read by the calling process.
         */
        const R_OK: number;
        /**
         * Flag indicating that the file can be written by the calling process.
         */
        const W_OK: number;
        /**
         * Flag indicating that the file can be executed by the calling process.
         * This has no effect on Windows (will behave like `FileAccess.F_OK`).
         */
        const X_OK: number;
    }
}
//# sourceMappingURL=filesystem.d.ts.map