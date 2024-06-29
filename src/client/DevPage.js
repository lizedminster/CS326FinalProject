const createBtn = document.getElementById("createBtnG");
const readBtn = document.getElementById("readBtnG");
const updateBtn = document.getElementById("updateBtnG");
const deleteBtn = document.getElementById("deleteBtnG");

const gac = document.getElementById("gacha")

const gachaID = document.getElementById("gachaID");
const gachaName = document.getElementById("gachaName");
const gachaImg = document.getElementById("gachaImg");

const URL = "http://localhost:3260";
console.log("x");
async function createGacha() {
    const id = gachaID.value;
    const name = gachaName.value;
    const img = gachaImg.value;
    if (!id || !name || !img) {
        alert("Gacha name is required!")
        return;
    }
    
    const response = await fetch(`${URL}/create?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`, {
        method: "POST"
    });
    const data = await response.text();
    gac.innerHTML = data;

    console.log("Gacha Created");
}
async function readGacha() {

    const id = gachaID.value;
    if (!id) {
        alert("Gacha id is required!")
        return;
    }
    
    const response = await fetch(`${URL}/read?id=${encodeURIComponent(id)}`, {
        method: "GET"
    });
    const data = await response.text();
    gac.innerHTML = data;

    console.log("Gacha Read");

}
async function updateGacha() {
    const id = gachaID.value;
    const name = gachaName.value;
    const img = gachaImg.value;
    if (!id || !name || !img) {
        alert("Gacha name is required!")
        return;
    }
    
    const response = await fetch(`${URL}/update?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`, {
        method: "PUT"
    });
    const data = await response.text();
    gac.innerHTML = data;

    console.log("Gacha Updated");
}
async function deleteGacha() {
    const id = gachaID.value;
    if (!id) {
        alert("Gacha id is required!");
        return;
    }

    try {
        const response = await fetch(`${URL}/delete?id=${encodeURIComponent(id)}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.text();
        gac.innerHTML = data;
        console.log("Gacha Deleted");
    } catch (error) {
        console.error("Delete failed:", error);
        alert("Gacha delete was unsuccessful :(");
    }
}

createBtn.addEventListener("click", createGacha);
readBtn.addEventListener("click", readGacha);
updateBtn.addEventListener("click", updateGacha);
deleteBtn.addEventListener("click", deleteGacha);
