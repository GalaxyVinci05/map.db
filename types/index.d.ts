declare class MapDB {
    readonly map: Map<any, any>;
    filename: string;
    readonly db: string;
    /**
     * @constructor
     * @param filename If not set, MapDB will work just like the built-in Map that only stores data in internal memory
     * @example 'file.db'
     */
    constructor(filename?: string);
    /**
     *
     * @param key
     * @param value
     */
    set(key: string | number, value: any): Promise<Map<any, any>>;
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
    entries(): IterableIterator<[any, any]>;
    keys(): IterableIterator<any>;
    values(): IterableIterator<any>;
    /**
     *
     * @param callbackfn
     */
    forEach(callbackfn: (value: any, key: any, map: Map<any, any>) => void): void;
    /**
     *
     * @param key
     */
    delete(key: string | number): Promise<boolean>;
    clear(): Promise<void>;
    size(): number;
    /**
     * Deletes the db file and clears the Map
     */
    deleteFile(): Promise<undefined>;
}
export = MapDB;
