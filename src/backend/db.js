import PouchDB from "pouchdb";

const db = new PouchDB("gacha");

//This function takes in an Id, name, and Img, and then saves them in a gacha object
export async function saveGacha(id, name, img) {
    console.log('MADE IT TO DB')
    await db.put({_id: id, name, img});
    console.log('MADE IT FROM DB')
}

//obj in this case is the whole gacha. 
export async function modifyGacha(obj) {
    await db.put(obj);
}

//This function gets the gacha & then returns it. 
export async function loadGacha(id) {
    const gacha = await db.get(id);
    return gacha;
}

//This function removes the gacha
export async function removeGacha(id) {
    db.remove(id);
  }