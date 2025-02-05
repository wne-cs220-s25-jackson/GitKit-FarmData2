export declare namespace PluginIdentifiers {
    interface Components {
        publisher?: string;
        name: string;
        version: string;
    }
    interface IdAndVersion {
        id: UnversionedId;
        version: string;
    }
    type VersionedId = `${string}.${string}@${string}`;
    type UnversionedId = `${string}.${string}`;
    /** Unpublished plugins (not from Open VSX or VSCode plugin store) may not have a `publisher` field. */
    const UNPUBLISHED = "<unpublished>";
    /**
     * @returns a string in the format `<publisher>.<name>`
     */
    function componentsToUnversionedId({ publisher, name }: Components): UnversionedId;
    /**
     * @returns a string in the format `<publisher>.<name>@<version>`.
     */
    function componentsToVersionedId({ publisher, name, version }: Components): VersionedId;
    function componentsToVersionWithId(components: Components): IdAndVersion;
    /**
     * @returns a string in the format `<id>@<version>`.
     */
    function idAndVersionToVersionedId({ id, version }: IdAndVersion): VersionedId;
    /**
     * @returns a string in the format `<publisher>.<name>`.
     */
    function unversionedFromVersioned(id: VersionedId): UnversionedId;
    /**
     * @returns `undefined` if it looks like the string passed in does not have the format of {@link PluginIdentifiers.VersionedId}.
     */
    function identifiersFromVersionedId(probablyId: string): Components | undefined;
    /**
     * @returns `undefined` if it looks like the string passed in does not have the format of {@link PluginIdentifiers.VersionedId}.
     */
    function idAndVersionFromVersionedId(probablyId: string): IdAndVersion | undefined;
}
//# sourceMappingURL=plugin-identifiers.d.ts.map