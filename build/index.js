"use strict";
const util_1 = require("util");
const fs = require("fs");
const writeDB = (0, util_1.promisify)(fs.writeFile);
const deleteDB = (0, util_1.promisify)(fs.unlink);
class MapDB {
    map;
    filename;
    db;
    /**
     * @constructor
     * @param filename If not set, MapDB will work just like the built-in Map that only stores data in internal memory
     * @example 'file.db'
     */
    constructor(filename) {
        this.map = new Map();
        this.filename = filename;
        if (!fs.existsSync('./data/'))
            fs.mkdirSync('./data');
        this.db = this.filename ? `./data/${this.filename}` : null;
        try {
            const file = fs.readFileSync(this.db);
            const data = JSON.parse(file.toString());
            for (let i = 0; i < data.length; i++) {
                this.map.set(data[i].key, data[i].value);
            }
        }
        catch { }
    }
    /**
     *
     * @param key
     * @param value
     */
    async set(key, value) {
        if (typeof key !== 'string' && typeof key !== 'number') {
            throw new TypeError('key must be of type string or number');
        }
        try {
            const file = fs.readFileSync(this.db);
            const data = JSON.parse(file.toString());
            const i = data.findIndex(pair => pair.key == key);
            !data[i] ? data.push({ key, value }) : data[i] = { key, value };
            await writeDB(this.db, JSON.stringify(data));
        }
        catch {
            await writeDB(this.db, `[${JSON.stringify({ key, value })}]`).catch(() => { });
        }
        return this.map.set(key, value);
    }
    /**
     *
     * @param key
     */
    get(key) {
        return this.map.get(key);
    }
    /**
     *
     * @param key
     */
    has(key) {
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
    forEach(callbackfn) {
        this.map.forEach(callbackfn);
    }
    /**
     *
     * @param key
     */
    async delete(key) {
        try {
            const file = fs.readFileSync(this.db);
            const data = JSON.parse(file.toString());
            const i = data.findIndex(pair => pair.key == key);
            if (data[i]) {
                data.splice(i, 1);
                await writeDB(this.db, JSON.stringify(data));
            }
        }
        catch { }
        return this.map.delete(key);
    }
    async clear() {
        await writeDB(this.db, JSON.stringify([])).catch(() => { });
        this.map.clear();
    }
    size() {
        return this.map.size;
    }
    /**
     * Deletes the db file and clears the Map
     */
    async deleteFile() {
        await deleteDB(this.db).catch(() => { });
        this.map.clear();
        return undefined;
    }
}
module.exports = MapDB;
