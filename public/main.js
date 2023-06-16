document.querySelector('#searchBTN').addEventListener('click', (e) => {
    let searchValue = document.getElementById("searchTXT").value;
    getOneRequest(searchValue)
})



async function getAllRequest () {
    try {
        const response = await fetch(`http://localhost:8000/pets/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const jsonData = await response.json()
    return await jsonData
    }
    catch(err){
        console.log(err)
    }
    }

async function getOneRequest (searchValue) {
    try {
        const response = await fetch(`http://localhost:8000/pets/${searchValue}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const jsonData = await response.json()
    console.log(jsonData);
    }
    catch(err){
        console.log(err)
    }
    }