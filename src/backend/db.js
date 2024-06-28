import PouchDB from "pouchdb";

const db = new PouchDB("counters");

export async function saveGacha(id, name, img) {
    await db.put({ _id: id, _name: name, _img: img});
}

//obj should include the whole gacha
export async function modifyGacha(obj) {
    await db.put(obj);
}

export async function loadGacha(_id) {
    const gacha = await db.get(_id);
    return gacha;
}

export async function removeGacha(_id) {
    db.remove(_id);
  }