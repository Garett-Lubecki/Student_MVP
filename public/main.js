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
    main.style.width = "100vh";
    main.style.height = "100vh";
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
    textDiv.appendChild(title);
    textDiv.appendChild(location);
    textDiv.appendChild(demographics);
    textDiv.appendChild(about);
    document.getElementById("main").appendChild(container);
}

function createPostContainer(){
    let container = document.createElement("div");
    container.setAttribute("id", `postContainer`);

    let h3 = document.createElement('h3')
    h3.textContent = 'Please fill in the information to the best of your ability.'
    let form = document.createElement('form')
    //set attribute

    let name = document.createElement('input')  
    name.placeholder = 'Name'
    let breed = document.createElement('input')
    breed.placeholder = 'Breed'
    let size = document.createElement('input')
    size.placeholder = 'Size (Small, Medium, or Large)'
    let gender = document.createElement('input')
    gender.placeholder = 'Gender'
    let about = document.createElement('input')
    about. placeholder = 'Descripton of you pet and what he/she is like.'
    let age = document.createElement('input')
    age.placeholder = 'Age in years'
    let location = document.createElement('input')
    location.placeholder = 'City/Town'

    form.appendChild(name);
    form.appendChild(breed);
    form.appendChild(age);
    form.appendChild(gender);
    form.appendChild(size);
    form.appendChild(location);
    form.appendChild(about);

    container.appendChild(h3);
    container.appendChild(form);
    document.getElementById("main").appendChild(container);
}

//name, breed, size, gender, age, about, location
//INSERT INTO pets (name, breed, size, gender, age, about, location) VALUES ('Earl', 'Basset Hound', 'Medium', 'Male', '2 Years', 'Fun loving basset hound who loves to sleep all day.', 'Virginia Beach, VA');