# Map.db

###### A Map that stores data locally and loads it at startup

### How does it work?
Map.db works just like the NodeJS built-in **Map**, with the same methods and functionalities, and in fact it uses itself a Map, but while the built-in Map only stores data in internal memory, this module **stores data locally in a file and loads it back in the Map at startup**.

The purpose of this module is to make the NodeJS built-in Map an actual **database**, and there comes the name `map.db`: a Map that can be used as a database.

### Differences
Although this module works in fact the same way as a Map, there are still some little differences between them, which are listed below:
> - `MapDB#set()` and `MapDB#delete()` return **promises**
> - `Map#size` in map.db is a **method** (`MapDB#size()`)
> - There is an additional method, `MapDB#deleteFile()`, which deletes the save file and clears the Map (returns a promise)
> - When a value is reassigned to a key, it is only saved in the Map but not in the actual save file, so you always have to **set the key/value pair with the new value**.

> Example:

```js
const MapDB = require('@galaxy05/map.db');
const mapdb = new MapDB('file.db'); // this is the save file's name + extension

async function sample() {
    // assuming 'somekey' exists in the Map and has a value { cool: false }
    const data = mapdb.get('somekey');
    // reassigning the 'cool' property a new value
    data.cool = true;

    await mapdb.set('somekey', data);
    // now 'somekey' has a new value { cool: true }
}
```

### Installation
With **npm**:

`npm i @galaxy05/map.db`

With **yarn**:

`yarn add @galaxy05/map.db`