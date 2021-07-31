export = MapDB;
declare class MapDB {
    /**
     * @constructor
     * @param {string} [filename] If not set, MapDB will work just like a native Map that only stores data in internal memory
     * @example 'file.db'
     */
    constructor(filename?: string);
    filename: string;
    /**
     *
     * @param {string | number} key
     * @param {*} value
     */
    set(key: string | number, value: any): Promise<Map<any, any>>;
    /**
     *
     * @param {string | number} key
     */
    get(key: string | number): any;
    /**
     *
     * @param {string | number} key
     */
    has(key: string | number): boolean;
    entries(): IterableIterator<[any, any]>;
    keys(): IterableIterator<any>;
    values(): IterableIterator<any>;
    /**
     *
     * @param {function} fn
     */
    forEach(fn: Function): void;
    /**
     *
     * @param {string | number} key
     */
    delete(key: string | number): Promise<boolean>;
    clear(): Promise<void>;
    size(): number;
    /**
     * Deletes the db file and clears the Map
     */
    deleteFile(): Promise<any>;
    #private;
}