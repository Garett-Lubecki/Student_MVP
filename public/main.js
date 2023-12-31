///////Student MVP ---Garett Lubecki///////

const url = 'http://localhost:8000/'
//If running on render https://pets-8gj1.onrender.com/

/////Event Listeners///////////////

//Show all currently in the database 
document.querySelector('#showAll').addEventListener('click', (e) => {
    changeDisplay()
    deleteCurrentDisplay()
    createMainContainer()
    getAllRequest(url)
})


//Go to home page
document.querySelector('#homeBTN').addEventListener('click', (e) => {
    deleteCurrentDisplay()
    showHome()
})


//Go to post page
document.querySelector('#showPost').addEventListener('click', (e) => {
    changeDisplay()
    deleteCurrentDisplay()
    createsinglePgMainContainer()
    createPostContainer()
})

//Search One/Multiple in Search Bar
document.querySelector('#searchBTN').addEventListener('click', () => {
    let searchValue = document.querySelector('#searchTXT').value
    document.querySelector('#searchTXT').value = " "
    changeDisplay()
    deleteCurrentDisplay()
    createMainContainer()
    getOneRequest(searchValue)

})



///////Creation of Containers base off of data/////////


//Create Main containers for search one/all

function createMainContainer() {
    let main = document.createElement("div");
    main.setAttribute("id", "main");
    main.style.display = "flex";
    main.style.alignItems = "center";
    main.style.justifyItems = "center";
    main.style.flex = "wrap";
    main.style.padding = "10px";
    main.style.justifyContent = "space-around";
    main.style.flexWrap = "wrap";
    document.querySelector("body").appendChild(main);
  }

//Create pet boxes
function createSearchAll(element, url) {
    let container = document.createElement("div");
    container.setAttribute("id", `${element.name}`);
    container.setAttribute("class", "divBackground");

    /////important change url here/////
    let petImage = document.createElement('img');
    //Change SRC to local host if operating in local environment
    petImage.setAttribute('src', `${url}images/${element.image_path}`);
    petImage.classList = 'petImages';

    let textDiv = document.createElement("div");
    textDiv.setAttribute("class", "textHolder");

    let title = document.createElement("div");
    title.setAttribute("class", "title");
    title.textContent += `${element.name}`;

    let about = document.createElement("div");
    about.setAttribute("class", "about");
    about.textContent = `${element.breed || 'No Breed'} | ${element.size || 'No Size'} | ${element.age || 'No Age'}`;

    let imageDiv = document.createElement('div')
    imageDiv.setAttribute('class', "information")

    container.appendChild(imageDiv);
    container.appendChild(textDiv);
    imageDiv.appendChild(petImage)
    textDiv.appendChild(title);
    textDiv.appendChild(about);
    document.getElementById("main").appendChild(container);

    //Create single page here 
    document.getElementById(`${element.name}`).addEventListener('click', (e) => {
        deleteCurrentDisplay()
        createsinglePgMainContainer()
        createLargePage(element, url)
    })
}

//Create Main container for the show a single pet
function createsinglePgMainContainer() {
    let main = document.createElement("div");
    main.setAttribute("id", "singePgmain");
    main.style.display = "flex";
    document.querySelector("body").appendChild(main);
}

//Create Information in Large Page
function createLargePage(element, url) {
    let container = document.createElement("div");
    container.setAttribute("id", `${element.name}`);
    container.setAttribute("class", "singePage");
  
    let deleteBtn = document.createElement('button');
    deleteBtn.id = 'deleteBTN'
    deleteBtn.classList = 'deleteBTN'
    let deleteImg = document.createElement('img')
    deleteImg.src = "./images/trash.png" 
    deleteImg.classList = 'largePgEditDeleteImg'
    deleteImg.id = 'deleteImg'

    let editBtn = document.createElement('button');
    editBtn.id = 'editBTN'
    editBtn.classList = 'deleteBTN'
    let editImg = document.createElement('img')
    editImg.src = "./images/edit.png" 
    editImg.classList = 'largePgEditDeleteImg'
    editImg.id = 'editImg'

    deleteBtn.appendChild(deleteImg)
    editBtn.appendChild(editImg)

    //////import change url here/////
    let petImage = document.createElement('img');
    //Change SRC to local host if operating in local environment
    petImage.setAttribute('src', `${url}images/${element.image_path}`);
    petImage.classList = 'singePetImage';

    let textDiv = document.createElement("div");
    textDiv.setAttribute("class", "singleTextHolder");
  
    let title = document.createElement("div");
    title.setAttribute("class", "singeTitle");
    title.textContent += `${element.name}`;
  
    let demographics = document.createElement("div");
    demographics.setAttribute("class", "singleDemographics");
    demographics.textContent = `${element.gender} | ${element.age} | ${element.size}`

    let location = document.createElement("div");
    location.setAttribute("class", "singleLocation");
    location.textContent = `${element.location}`

    let imageDiv = document.createElement('div')
    imageDiv.setAttribute('class', "singlePgImage")

    let titlelocdemDiv = document.createElement('div')
    titlelocdemDiv.setAttribute('class', "titlelocdemDiv")

    let aboutDiv = document.createElement('div')
    aboutDiv.setAttribute('class', "aboutDiv")

    let aboutTitle = document.createElement('div')
    aboutTitle.className = 'aboutTitle'
    aboutTitle.textContent = 'About:'
    
    let about = document.createElement("div");
    about.setAttribute("class", "singleAbout");
    about.textContent = `${element.about}`;

    container.appendChild(imageDiv);
    container.appendChild(textDiv);

    imageDiv.appendChild(deleteBtn);
    imageDiv.appendChild(editBtn);
    imageDiv.appendChild(petImage);

    textDiv.appendChild(titlelocdemDiv);
    textDiv.appendChild(aboutDiv);

    titlelocdemDiv.appendChild(title);
    titlelocdemDiv.appendChild(location);
    titlelocdemDiv.appendChild(demographics);

    aboutDiv.appendChild(aboutTitle);
    aboutDiv.appendChild(about);
    document.getElementById("singePgmain").appendChild(container);

    deleteBtn.addEventListener('click', () => {
        deleteRequest(element.pet_id)
    })

    editBtn.addEventListener('click', () => {
        changeDisplay()
        deleteCurrentDisplay()
        createMainContainer()
        createPutData(element, url)
    })
}

//Create post container and form
function createPostContainer(){
    let container = document.createElement("div");
    container.setAttribute("id", `postContainer`);

    let h3 = document.createElement('h3')
    h3.id = 'inputTitle'
    h3.textContent = 'Abandon Dog'
    let form = document.createElement('form')
    form.id = 'postForm'

    let name = document.createElement('input')  
    name.placeholder = 'Name'
    name.className = 'input'
    let breed = document.createElement('input')
    breed.placeholder = 'Breed'
    breed.className = 'input'
    let size = document.createElement('input')
    size.placeholder = 'Size (Small, Medium, or Large)'
    size.className = 'input'
    let gender = document.createElement('input')
    gender.placeholder = 'Gender'
    gender.className = 'input'
    let about = document.createElement('input')
    about.placeholder = 'Descripton of you pet and what he/she is like.'
    about.className = 'input'
    let age = document.createElement('input')
    age.placeholder = 'Age in years'
    age.className = 'input'
    let location = document.createElement('input')
    location.placeholder = 'City/Town'
    location.className = 'input'

    let imageInput = document.createElement('input');
    imageInput.type = 'file'
    imageInput.id = 'image_file';
    imageInput.className = 'image_input'

    let button = document.createElement('button')
    button.type = 'submit'
    button.id = 'submitBtn'
    button.className = 'formSubmitBtn'
    button.textContent = 'Submit Dog'
 
    form.appendChild(name);
    form.appendChild(breed);
    form.appendChild(age);
    form.appendChild(gender);
    form.appendChild(size);
    form.appendChild(location);
    form.appendChild(about);
    form.appendChild(imageInput);
    form.append(button)
    
    container.appendChild(h3);
    container.appendChild(form);
    document.getElementById("singePgmain").appendChild(container);

    form.addEventListener('submit', (e) => {
        //prevents page from reflecting
        e.preventDefault()
        //creating a new Form and appending the information like an object/ array of arrays
        //Forms allow you to bundle data in forms
        let formData = new FormData(form);
        formData.append('name', name.value);
        formData.append('breed', breed.value);
        formData.append('size', size.value);
        formData.append('gender', gender.value);
        formData.append('age', age.value);
        formData.append('about', about.value);
        formData.append('location', location.value);
        formData.append('image', imageInput.files[0])
        //sending the form to the post request
        postRequest(formData)
    })
}

//Create put container
function createPutData (element, url){
    let container = document.createElement("div");
    container.setAttribute("id", `postContainer`);

    let h3 = document.createElement('h3')
    h3.textContent = 'Please fill in the information to the best of your ability.'
    let form = document.createElement('form')
    form.id = 'postForm'

    let name = document.createElement('input')  
    name.placeholder = 'Name'
    name.className = 'input'
    name.value = element.name
    let breed = document.createElement('input')
    breed.placeholder = 'Breed'
    breed.className = 'input'
    breed.value = element.breed
    let size = document.createElement('input')
    size.placeholder = 'Size (Small, Medium, or Large)'
    size.className = 'input'
    size.value = element.size
    let gender = document.createElement('input')
    gender.placeholder = 'Gender'
    gender.className = 'input'
    gender.value = element.size
    let about = document.createElement('input')
    about.placeholder = 'Descripton of you pet and what he/she is like.'
    about.className = 'input'
    about.value = element.about
    let age = document.createElement('input')
    age.placeholder = 'Age in years'
    age.className = 'input'
    age.value = element.age
    let location = document.createElement('input')
    location.placeholder = 'City/Town'
    location.className = 'input'
    location.value = element.location

    let imageInput = document.createElement('input');
    imageInput.type = 'file'
    imageInput.id = 'image_file';
    imageInput.className = 'image_input'

    let button = document.createElement('button')
    button.type = 'submit'
    button.id = 'submitBtn'
    button.className = 'formSubmitBtn'
    button.textContent = 'Submit Dog'

    form.appendChild(name);
    form.appendChild(breed);
    form.appendChild(age);
    form.appendChild(gender);
    form.appendChild(size);
    form.appendChild(location);
    form.appendChild(about);
    form.append(imageInput);
    form.append(button)
    
    container.appendChild(h3);
    container.appendChild(form);
    document.getElementById("main").appendChild(container);

    form.addEventListener('submit', (e) => {
        //Prevents the page from refreshing upon submit
        e.preventDefault()
        //creating a new Form and appending the information like an object/ array of arrays
        //Forms allow you to bundle data in forms
        let formData = new FormData(form);

        formData.append('name', name.value);
        formData.append('breed', breed.value);
        formData.append('size', size.value);
        formData.append('gender', gender.value);
        formData.append('age', age.value);
        formData.append('about', about.value);
        formData.append('location', location.value);
        formData.append('image', imageInput.files[0]);

        //Send data to put route
        putRequest(formData, element.pet_id, url);
    })
}

///////Routes/////////

async function postRequest (formData) {
    try {
        const response = await fetch(`${url}pets`, {
            //https://pets-8gj1.onrender.com/pets
            //http://localhost:8000/pets
            method: 'POST',
            body: formData
        }) 
    const jsonData = await response.json()
    resetScreen(jsonData)
    }
    catch(err){
        console.log(err)
    }
}

async function deleteRequest(id) {
    try {
        console.log(id)
        const response = await fetch(`https://pets-8gj1.onrender.com/pets/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        }) 
    const jsonData = await response.json()
    console.log(jsonData)
    changeDisplay()
    deleteCurrentDisplay()
    createMainContainer()
    getAllRequest()
    }
    catch(err){
        console.log(err)
    }
}

async function getAllRequest () {
    try {
        const response = await fetch(`${url}pets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const jsonData = await response.json()
   jsonData.forEach(element => {
        createSearchAll(element, url)
    });
    }
    catch(err){
        console.log(err)
    }
}

async function getOneRequest (searchValue) {
    try {
        const response = await fetch(`${url}pets/${searchValue}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const jsonData = await response.json()
    console.log(jsonData)
    jsonData.forEach(element => {
        createSearchAll(element, url)
    });
    }
    catch(err){
        console.log(err)
    }
} 

async function putRequest(formData, id, url){
    try {
        const response = await fetch(`${url}pets/${id}`, {
            method: 'PUT',
            body: formData,
        }) 

        const jsonData = await response.json()
        alert('Success')
        deleteCurrentDisplay()
        showHome()
    }
    catch(err){
        console.log(err)
    }
}

////////Screen changes///////////
function resetScreen(boolean) {
    if(boolean){
        alert('Success!')
        deleteCurrentDisplay()
        showHome()
    }
    else {
        alert('Error during additon. Please try again.')
    }
}

function changeDisplay() {
    document.getElementById("mainHome").style.display = "none"
}

function showHome() {
    document.getElementById("mainHome").style.display = "block"
}

function deleteCurrentDisplay() {
    let searchResults1 = document.getElementById("main")
    let searchResults2 = document.getElementById('singePgmain')
    if(searchResults1) {
        searchResults1.remove()
    }
    else if (searchResults2){
        searchResults2.remove()
    }
    else {
        return
    }
}