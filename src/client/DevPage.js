const createBtn = document.getElementById("createBtnG");
const readBtn = document.getElementById("readBtnG");
const updateBtn = document.getElementById("updateBtnG");
const deleteBtn = document.getElementById("deleteBtnG");

const gachaID = document.getElementById("gachaID");
const gachaName = document.getElementById("gachaName");
const gachaImg = document.getElementById("gachaImg");

const URL = "http://localhost:3260";

async function createGacha(){
    const id = gachaID.value;
    const name = gachaName.value;
    const img = gachaImg.value;
    if(!name){
        alert("Gacha name is required!")
        return;
    }

    const response = await fetch(`${URL}/create?_id=${id}&_name=${name}&_img=${img}`,{
        method:"POST"
    });

    const data = await response.text();
    const gacha = {name: data}

    db.put(gacha);
    console.log("Gacha Created")
}
async function readGacha(){
    
}
async function updateGacha(){
    
}
async function deleteGacha(){
    
}

createBtn.addEventListener("click", createGacha);
readBtn.addEventListener("click", readGacha);
updateBtn.addEventListener("click", updateGacha);
deleteBtn.addEventListener("click", deleteGacha);
