export declare class MapDB {
    readonly map: any;
    filename: string;
    readonly db: any;
    options: MapDBOptions;
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
    set(key: string | number, value: any): Promise<any>;
    /**
     *
     * @param key
     */
    get(key: string | number): any;
    /**
     *
     * @param key
     */
    has(key: string | number): any;
    entries(): any;
    keys(): any;
    values(): any;
    /**
     *
     * @param callbackfn
     */
    forEach(callback: (value: any, key: any, map: Map<any, any>) => void): void;
    /**
     *
     * @param key
     */
    delete(key: string | number): Promise<any>;
    clear(): Promise<void>;
    size(): any;
}
export interface MapDBOptions {
    localOnly?: boolean;
    path?: string;
}
