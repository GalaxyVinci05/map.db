import { promisify } from 'util';
import * as fs from 'fs';

const writeDB = promisify(fs.writeFile);
const deleteDB = promisify(fs.unlink);

class MapDB {
    readonly map;
    filename: string;
    readonly db;
    options: any;

    /**
     * @constructor
     * @param filename If not set, MapDB will only use internal memory
     * @example 'file.db'
     * @param options Options to pass in the constructor
     * @param options.localOnly When enabled, MapDB will only use local storage, without touching internal memory (requires a filename)
     */
    constructor(filename?: string, options?: { localOnly: boolean }) {
        if (!filename && options?.localOnly) throw new Error('Cannot use local storage without a filename');

        this.map = !options?.localOnly ? new Map() : null;
        this.filename = filename;
        
        if (!fs.existsSync('./data/')) fs.mkdirSync('./data');

        this.db = this.filename ? `./data/${this.filename}` : null;
        
        if (this.map && this.db) {
            try {
                const file = fs.readFileSync(this.db);
                const data: any[] = JSON.parse(file.toString());
    
                for (let i = 0; i < data.length; i++) {
                    this.map.set(data[i].key, data[i].value);
                }
            } catch {}
        }
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

        if (this.db) {
            try {
                const file = fs.readFileSync(this.db);
                const data: any[] = JSON.parse(file.toString());
    
                const i = data.findIndex(pair => pair.key == key);
    
                !data[i] ? data.push({ key, value }) : data[i] = { key, value };
    
                await writeDB(this.db, JSON.stringify(data));
                if (!this.map) return data;
            } catch {
                await writeDB(this.db, `[${JSON.stringify({ key, value })}]`).then(() => {
                    if (!this.map) return JSON.parse(fs.readFileSync(this.db).toString());
                });
            }
        }

        return this.map.set(key, value);
    }

    /**
     * 
     * @param key 
     */

    get(key: string | number) {
        if (this.map) {
            return this.map.get(key);
        } else {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            return data.find(pair => pair.key == key)?.value || undefined;
        }
    }

    /**
     * 
     * @param key 
     */
    has(key: string | number) {
        if (this.map) {
            return this.map.has(key);
        } else {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            return data.find(pair => pair.key == key) ? true : false;
        }
    }

    entries() {
        if (this.map) {
            return this.map.entries();
        } else {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            return data.map(pair => [pair.key, pair.value]);
        }
    }

    keys() {
        if (this.map) {
            return this.map.keys();
        } else {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            return data.map(pair => pair.key);
        }
    }

    values() {
        if (this.map) {
            return this.map.values();
        } else {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            return data.map(pair => pair.value);
        }
    }

    /**
     * 
     * @param callbackfn 
     */
    forEach(callback: (value: any, key: any, map: Map<any, any>) => void) {
        if (this.map) {
            this.map.forEach(callback);
        } else {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            data.forEach(pair => callback(pair.value, pair.key, this.map));
        }
    }

    /**
     * 
     * @param key 
     */
    async delete(key: string | number) {
        if (this.db) {
            try {
                const file = fs.readFileSync(this.db);
                const data: any[] = JSON.parse(file.toString());
    
                const i = data.findIndex(pair => pair.key == key);
    
                if (data[i]) {
                    data.splice(i, 1);
                    await writeDB(this.db, JSON.stringify(data));

                    if (!this.map) return true;
                } else if (!this.map) {
                    return false;
                }
            } catch {}
        }

        if (this.map) {
            return this.map.delete(key);
        }
    }

    async clear() {
        await writeDB(this.db, JSON.stringify([])).catch(() => {});

        if (this.map) {
            this.map.clear();
        }
    }

    size() {
        if (this.map) {
            return this.map.size;
        } else {
            const file = fs.readFileSync(this.db);
            const data: any[] = JSON.parse(file.toString());

            return data.length;
        }
    }
}

export = MapDB;