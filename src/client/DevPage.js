const createBtn = document.getElementById("createBtnG");
const readBtn = document.getElementById("readBtnG");
const updateBtn = document.getElementById("updateBtnG");
const deleteBtn = document.getElementById("deleteBtnG");

const gac = document.getElementById("gacha")

const gachaID = document.getElementById("gachaID");
const gachaName = document.getElementById("gachaName");
const gachaImg = document.getElementById("gachaImg");

const URL = "http://localhost:3260";

async function createGacha() {
    console.log("x")
    const id = gachaID.value;
    const name = gachaName.value;
    const img = gachaImg.value;
    if (!id || !name || !img) {
        alert("Gacha name is required!")
        return;
    }
    //something about this does not work. This is the error:
    //DevPage.js:28
    //Uncaught (in promise) 
    //TypeError: Failed to fetch
    // at HTMLButtonElement.createGacha (DevPage.js:28:30)
    console.log("x2")
    const response = await fetch(`${URL}/create?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`, {
        method: "POST"
    });
    console.log("x3")
    const data = await response.text();
    console.log("x4")
    gac.innerHTML = data;

    console.log("Gacha Created");
}
async function readGacha() {

    //don't worry about these. I'll implement them once create is fixed.

}
async function updateGacha() {

}
async function deleteGacha() {

}

createBtn.addEventListener("click", createGacha);
readBtn.addEventListener("click", readGacha);
updateBtn.addEventListener("click", updateGacha);
deleteBtn.addEventListener("click", deleteGacha);
