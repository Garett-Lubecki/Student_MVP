//import express
const express = require('express');
//import pool
const { Pool } = require('pg');
//import dotenv
const dotenv = require('dotenv');
//import cors
const cors = require('cors');
//imports fileupload
const fileUpload = require('express-fileupload');
//Imports body parser
const bodyParser = require('body-parser');
//Imports path
const path = require('path')

//Confingures Database
dotenv.config();

//Creates new pool instance
const pool = new Pool ({
    connectionString: process.env.DATABASE_URL
})

//Allows access to express properties and methods
const app = express();

//Allows me to access images when going to a url/images/filename.jpeg
//It tells it to look at my public folder for another folder called images
//Connected to my SRC values in the main.js
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

//So the client can access my stuff
app.use(express.static('public'))

//Allows all CORS routes to pass
app.use(cors({
    origin: "*", 
}))

//Allows me to read if there are any files in my routes
//Allows access to req.files
app.use(fileUpload())

//Parses the JSON data passed through
app.use(bodyParser.json());

app
    .get("/pets", async (req, res) => {
        try {
            let result = await pool.query(
                'SELECT * FROM pets')
            res.status(200).send(result.rows)
        }
        catch(err) {
            console.log(err.message)
            res.status(404).send('Error during get request.')
        }    
    })

    .get("/pets/:id", async (req, res) => {
        try {
            let { id } = req.params
            let result = await pool.query(
                'SELECT * FROM pets WHERE breed = $1', [id.toLocaleLowerCase()])
            res.send(result.rows)
        }
        catch(err) {
            console.log(err.message) 
            res.status(500).send('Server Error.')
        }
    })
    .post("/pets", async (req, res) => {
        try {
            const { name, breed, size, gender, age, about, location } = req.body;
            let imageFileName;
            if(!req.files){
                //If there is no image attached, give the no image, image
                imageFileName = 'noimage.png'
            }
            else{
                //Access image obj
                const image = req.files.image;
                //assign unique name
                imageFileName = Date.now() + '_' + image.name;
                //Move the image to the public/images folder via the fileupload import (.mv is apat of express-fileupload)
                image.mv(path.join(__dirname, '/public/images', imageFileName));
                console.log(`File Name ${imageFileName}`)
            }
            const result = await pool.query(
              'INSERT INTO pets (name, breed, size, gender, age, about, location, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
              [name, breed.toLocaleLowerCase(), size, gender, age, about, location, `/${imageFileName}`])
            res.status(200).send(result.rows[0])
        }
        catch(err) {
            console.log(err) 
            res.status(500).send(err.message)
        }
        
    })
    .put('/pets/:id', async (req, res) => {
        try{
            let { id } = req.params;
            const { name, breed, size, gender, age, about, location } = req.body;
            let result = await pool.query('SELECT * FROM pets WHERE pet_id = $1', [id])
            let currentPet = result.rows[0]
            let imageFileName = null
            let correctImage;
            if(req.files){
                //Access image obj if the files exist
                const image = req.files.image;
                //Assigne unique name
                imageFileName = Date.now() + '_' + image.name;
                //move image
                image.mv(path.join(__dirname, '/public/images', imageFileName));
            }
            //This is for solving issue with upload images or not if there were previously there for the put
            if(imageFileName) {
                correctImage = `${imageFileName}`
            }
            else if (currentPet.image_path){
                correctImage = currentPet.image_path
            }
            else{
                correctImage = 'noimage.png'
            }

            //create updated pet
            let updatedPet = {
                name: name || currentPet.name,
                breed: breed || currentPet.breed,
                size: size || currentPet.size,
                gender: gender || currentPet.gender,
                age: age || currentPet.age,
                about: about || currentPet.about,
                location: location || currentPet.location,
                image_path: correctImage
            }
            
            let newResult = await pool.query('UPDATE pets set name = $1, breed = $2, size = $3, gender = $4, age = $5, about = $6, location = $7, image_path = $8 WHERE pet_id = $9', [updatedPet.name, updatedPet.breed.toLocaleLowerCase(), updatedPet.size, updatedPet.gender, updatedPet.age, updatedPet.about, updatedPet.location, updatedPet.image_path, id])
           
            res.status(200).send(updatedPet)
        }
        catch(err) {
            console.log(err.message) 
            res.status(404).send('Error during update.')
        }
    })

    .delete('/pets/:id', async (req, res) => {
        try {
            let { id } = req.params
            let result = await pool.query('DELETE FROM pets WHERE pet_id = $1 RETURNING *', [id])
            res.status(200).send(result.rows)
        }
        catch(err) {
            console.log(err.message) 
            res.status(404).send('Error during delete.')
        }
    })

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})