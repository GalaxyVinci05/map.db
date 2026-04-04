export declare class MapDB {
    readonly map: Map<string | number, any> | null;
    filename: string | null;
    readonly db: string | null;
    options: MapDBOptions | null;
    private path;
    /**
     * @constructor
     * @param filename If not set, MapDB will only use internal memory
     * @example 'file.db'
     * @param options Options to pass in the constructor
     * @param options.localOnly Disable internal memory
     * @param options.path Optional existing path to save the MapDB data directory
     */
    constructor(filename?: string, options?: MapDBOptions);
    /**
     *
     * @param key
     * @param value
     */
    set(key: string | number, value: any): Promise<any[] | Map<string | number, any> | undefined>;
    /**
     *
     * @param key
     */
    get(key: string | number): any;
    /**
     *
     * @param key
     */
    has(key: string | number): boolean | undefined;
    entries(): MapIterator<[string | number, any]> | any[][] | undefined;
    keys(): any[] | MapIterator<string | number> | undefined;
    values(): any[] | MapIterator<any> | undefined;
    /**
     *
     * @param callbackfn
     */
    forEach(callback: (value: any, key: any, map?: Map<any, any>) => void): void;
    /**
     *
     * @param key
     */
    delete(key: string | number): Promise<boolean | undefined>;
    clear(): Promise<void>;
    size(): number | undefined;
}
export interface MapDBOptions {
    localOnly?: boolean;
    path?: string;
}
