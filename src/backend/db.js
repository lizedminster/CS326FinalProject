import PouchDB from "pouchdb";

const db = new PouchDB("counters");

//This function takes in an Id, name, and Img, and then saves them in a gacha object
export async function saveGacha(id, name, img) {
    await db.put({ _id: id, _name: name, _img: img});
}

//obj in this case is the whole gacha. 
export async function modifyGacha(obj) {
    await db.put(obj);
}

//This function gets the gacha & then returns it. 
export async function loadGacha(_id) {
    const gacha = await db.get(_id);
    return gacha;
}

//This function removes the gacha
export async function removeGacha(_id) {
    db.remove(_id);
  }