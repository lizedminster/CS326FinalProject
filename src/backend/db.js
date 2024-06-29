import PouchDB from "pouchdb";

const db = new PouchDB("gachas");

//This function takes in an Id, name, and Img, and then saves them in a gacha object
export async function saveGacha(id, name, img) {
    console.log('MADE IT TO DB')
    try{
    await db.put({_id: id, name, img});
    } catch (error){
        console.log(error)
    }
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
    const gacha = await db.get(id);
    await db.remove(gacha);
  }

export async function destroyDatabase() {
    try {
        await db.destroy();

        const newDB = new PouchDB("gachas");
        console.log(`Database emptied.`);
        return newDB;
    } catch (error) {
        console.error(`Error emptying the database: `, error);
        throw error;
    }
}

export { db };