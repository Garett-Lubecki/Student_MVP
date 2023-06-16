document.querySelector('#searchBTN').addEventListener('click', (e) => {
    let searchValue = document.getElementById("searchTXT").value;
    getOneRequest(searchValue)
})

document.querySelector('#showAll').addEventListener('click', (e) => {
    changeDisplay()
    deleteCurrentDisplay()
    createMainContainer()
    getAllRequest()
})

document.querySelector('#homeBTN').addEventListener('click', (e) => {
    deleteCurrentDisplay()
    showHome()
})

document.querySelector('#showPost').addEventListener('click', (e) => {
    changeDisplay()
    deleteCurrentDisplay()
    createMainContainer()
    createPostContainer()
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
   jsonData.forEach(element => {
        createSearchAll(element)
    });
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
    }
    catch(err){
        console.log(err)
    }
    }


    

function changeDisplay() {
    document.getElementById("trackerDiv").style.display = "none"
    document.getElementById("searchContainer").style.display = "none"
}


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

function createSearchAll(element){
        let container = document.createElement("div");
        container.setAttribute("id", `${element.name}`);
        container.setAttribute("class", "divBackground");
      
        let textDiv = document.createElement("div");
        textDiv.setAttribute("id", "textHolder");
      
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        title.textContent += `${element.name}`;
      
        let about = document.createElement("div");
        about.setAttribute("class", "about");
        about.textContent = `${element.breed} | ${element.size} | ${element.age}`;
      
      
        container.appendChild(textDiv);
        textDiv.appendChild(title);
        textDiv.appendChild(about);
        document.getElementById("main").appendChild(container);

        document.querySelector(`#${element.name}`).addEventListener( 'click', (e) => {
            deleteCurrentDisplay()
            createMainContainer()
            createLargePage(element)
        })
}

function deleteCurrentDisplay() {
    let searchResults = document.getElementById("main")
    if(searchResults) {
        searchResults.remove()
    }
    else {
        return
    }
}

function showHome() {
    document.getElementById("trackerDiv").style.display = "flex"
    document.getElementById("searchContainer").style.display = "flex"
}

function createLargePage(element) {
    let container = document.createElement("div");
    container.setAttribute("id", `${element.name}`);
    container.setAttribute("class", "divBackground");
  
    let deleteBtn = document.createElement('button');
    deleteBtn.id = 'deleteBTN'
    deleteBtn.classList = 'BTN'
    let img = document.createElement('img')
    img.src = "./images/trash.png" 
    img.classList = 'Img'
    img.id = 'searchImg'

    deleteBtn.appendChild(img)

    let textDiv = document.createElement("div");
    textDiv.setAttribute("id", "textHolder");
  
    let title = document.createElement("div");
    title.setAttribute("class", "title");
    title.textContent += `${element.name}`;
  
    let demographics = document.createElement("div");
    demographics.setAttribute("class", "demographics");
    demographics.textContent = `${element.gender} | ${element.age} | ${element.size}`

    let location = document.createElement("div");
    location.setAttribute("class", "location");
    location.textContent = `${element.location}`

    let about = document.createElement("div");
    about.setAttribute("class", "about");
    about.textContent = `${element.about}`;

  
    container.appendChild(textDiv);
    textDiv.appendChild(deleteBtn)
    textDiv.appendChild(title);
    textDiv.appendChild(location);
    textDiv.appendChild(demographics);
    textDiv.appendChild(about);
    document.getElementById("main").appendChild(container);

    deleteBtn.addEventListener('click', () => {
        deleteRequest(element.pet_id)

    })
}

function createPostContainer(){
    let container = document.createElement("div");
    container.setAttribute("id", `postContainer`);

    let h3 = document.createElement('h3')
    h3.textContent = 'Please fill in the information to the best of your ability.'
    let form = document.createElement('form')
    form.id = 'postForm'
    //set attribute

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

    let button = document.createElement('button')
    button.type = 'submit'
    button.id = 'submitBtn'
    button.textContent = 'Add'

    form.appendChild(name);
    form.appendChild(breed);
    form.appendChild(age);
    form.appendChild(gender);
    form.appendChild(size);
    form.appendChild(location);
    form.appendChild(about);
    form.append(button)
    
    container.appendChild(h3);
    container.appendChild(form);
    document.getElementById("main").appendChild(container);

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let data = {
            name: name.value,
            breed: breed.value, 
            size: size.value, 
            gender: gender.value, 
            age: age.value, 
            about: about.value, 
            location: location.value
        }
        console.log(data)
        postRequest(data)
    })
}

//name, breed, size, gender, age, about, location
//INSERT INTO pets (name, breed, size, gender, age, about, location) VALUES ('Earl', 'Basset Hound', 'Medium', 'Male', '2 Years', 'Fun loving basset hound who loves to sleep all day.', 'Virginia Beach, VA');

async function postRequest (data) {
    try {
        const response = await fetch(`http://localhost:8000/pets`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }

        }) 
    const jsonData = await response.json()
    resetScreen(jsonData)
    }
    catch(err){
        console.log(err)
    }
    }



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

async function deleteRequest(id) {
    try {
        console.log(id)
        const response = await fetch(`http://localhost:8000/pets/${id}`, {
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