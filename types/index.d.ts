declare class MapDB {
    readonly map: Map<any, any>;
    filename: string;
    readonly db: string;
    options: any;
    /**
     * @constructor
     * @param filename If not set, MapDB will only use internal memory
     * @example 'file.db'
     * @param options Options to pass in the constructor
     * @param options.localOnly When enabled, MapDB will only use local storage, without touching internal memory (requires a filename)
     */
    constructor(filename?: string, options?: {
        localOnly: boolean;
    });
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
export = MapDB;
