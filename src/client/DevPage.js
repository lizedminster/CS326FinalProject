const createBtn = document.getElementById("createBtnG");
const readBtn = document.getElementById("readBtnG");
const updateBtn = document.getElementById("updateBtnG");
const deleteBtn = document.getElementById("deleteBtnG");

const gachaID = document.getElementById("gachaID");
const gachaName = document.getElementById("gachaName");
const gachaImg = document.getElementById("gachaImg");

const URL = "http://localhost:3260";

async function createGacha(){
    console.log("x");
    const id = gachaID.value;
    const name = gachaName.value;
    const img = gachaImg.value;
    if(!name){
        alert("Gacha name is required!")
        return;
    }
    console.log("x2");
    //something about this does not work. This is the error:
    //DevPage.js:28
    //Uncaught (in promise) 
    //TypeError: Failed to fetch
    // at HTMLButtonElement.createGacha (DevPage.js:28:30)

    const response = await fetch(`${URL}/create?_id=${id}&_name=${name}&_img=${img}`,{
        method:"POST"
    });

    console.log("x3");
    const data = await response.text();
    console.log("x4");
    console.log(data);
    const gacha = {_id: data._id, name: data._name, img: data._img}

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
