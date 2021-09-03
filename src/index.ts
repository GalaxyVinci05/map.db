import { promisify } from 'util';
import * as fs from 'fs';

const writeDB = promisify(fs.writeFile);
const deleteDB = promisify(fs.unlink);

class MapDB {
    readonly map;
    filename: string;
    readonly db;

    /**
     * @constructor
     * @param filename If not set, MapDB will work just like the built-in Map that only stores data in internal memory
     * @example 'file.db'
     */
    constructor(filename?: string) {
        this.map = new Map();
        this.filename = filename;
        
        if (!fs.existsSync('./data/')) fs.mkdirSync('./data');

        this.db = this.filename ? `./data/${this.filename}` : null;
        
        try {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            for (let i = 0; i < data.length; i++) {
                this.map.set(data[i].key, data[i].value);
            }
        } catch {}
    }

    /**
     * 
     * @param key 
     * @param value 
     */
    async set(key: string | number, value: any) {
        if (typeof key !== 'string' && typeof key !== 'number') {
            throw new TypeError('key must be of type string or number');
        }

        try {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            const i = data.findIndex(pair => pair.key == key);

            !data[i] ? data.push({ key, value }) : data[i] = { key, value };

            await writeDB(this.db, JSON.stringify(data));
        } catch {
            await writeDB(this.db, `[${JSON.stringify({ key, value })}]`).catch(() => {});
        }

        return this.map.set(key, value);
    }

    /**
     * 
     * @param key 
     */

    get(key: string | number) {
        return this.map.get(key);
    }

    /**
     * 
     * @param key 
     */
    has(key: string | number) {
        return this.map.has(key);
    }

    entries() {
        return this.map.entries();
    }

    keys() {
        return this.map.keys();
    }

    values() {
        return this.map.values();
    }

    /**
     * 
     * @param callbackfn 
     */
    forEach(callbackfn: (value: any, key: any, map: Map<any, any>) => void) {
        this.map.forEach(callbackfn);
    }

    /**
     * 
     * @param key 
     */
    async delete(key: string | number) {
        try {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            const i = data.findIndex(pair => pair.key == key);

            if (data[i]) {
                data.splice(i, 1);
                await writeDB(this.db, JSON.stringify(data));
            }
        } catch {}

        return this.map.delete(key);
    }

    async clear() {
        await writeDB(this.db, JSON.stringify([])).catch(() => {});

        this.map.clear();
    }

    size() {
        return this.map.size;
    }

    /**
     * Deletes the db file and clears the Map
     */
    async deleteFile(): Promise<undefined> {
        await deleteDB(this.db).catch(() => {});
        this.map.clear();

        return undefined;
    }
}

export = MapDB;