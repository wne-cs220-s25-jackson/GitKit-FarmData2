export declare const MiniBrowserServicePath = "/services/mini-browser-service";
export declare const MiniBrowserService: unique symbol;
export interface MiniBrowserService {
    /**
     * Resolves to an array of file extensions - priority pairs supported by the `Mini Browser`.
     *
     * The file extensions start without the leading dot (`.`) and should be treated in a case-insensitive way. This means,
     * if the `Mini Browser` supports `['jpg']`, then it can open the `MyPicture.JPG` file.
     */
    supportedFileExtensions(): Promise<Readonly<{
        extension: string;
        priority: number;
    }>[]>;
}
//# sourceMappingURL=mini-browser-service.d.ts.map