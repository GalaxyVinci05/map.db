declare class MapDB {
    readonly map: Map<any, any>;
    filename: string;
    readonly db: string;
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
    set(key: string | number, value: any): Promise<any[] | Map<any, any>>;
    /**
     *
     * @param key
     */
    get(key: string | number): any;
    /**
     *
     * @param key
     */
    has(key: string | number): boolean;
    entries(): MapIterator<[any, any]> | any[][];
    keys(): any[] | MapIterator<any>;
    values(): any[] | MapIterator<any>;
    /**
     *
     * @param callbackfn
     */
    forEach(callback: (value: any, key: any, map: Map<any, any>) => void): void;
    /**
     *
     * @param key
     */
    delete(key: string | number): Promise<boolean>;
    clear(): Promise<void>;
    size(): number;
}
interface MapDBOptions {
    localOnly?: boolean;
    path?: string;
}
export = MapDB;
