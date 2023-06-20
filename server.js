const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path')


dotenv.config();

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL
})
const app = express();

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static('public'))
app.use(cors({
    origin: "*", 
}))
app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
            //work on getting type to work
            let { id } = req.params
            let result = await pool.query(
                'SELECT * FROM pets WHERE breed = $1', [id.toLocaleLowerCase()])
            res.send(result.rows)
        }
        catch(err) {
            console.log(err.message) 
            //look at rephrasing the message for the error code
            res.status(404).send('No pets at that location.')
        }
    })
    .post("/pets", async (req, res) => {
        try {
            const { name, breed, size, gender, age, about, location } = req.body;
            if(!req.files){
                imageFileName = 'noimage.png'
            }
            else{
                const image = req.files.image;
                const imageFileName = Date.now() + '_' + image.name;
                console.log(__dirname)
                let newPath = path.join(__dirname, '../public/images', imageFileName)
                console.log(path)
                image.mv(path.join(__dirname, '../public/images', imageFileName));
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
            const image = req.files.image;
            const imageFileName = Date.now() + '_' + image.name;

            let result = await pool.query('SELECT * FROM pets WHERE pet_id = $1', [id])
            let currentPet = result.rows[0]
            let updatedPet = {
                name: name || currentPet.name,
                breed: breed || currentPet.breed,
                size: size || currentPet.size,
                gender: gender || currentPet.gender,
                age: age || currentPet.age,
                about: about || currentPet.about,
                location: location || currentPet.location,
                image_path: `${imageFileName}` || currentPet.image_path
            }
            //removed public
            image.mv(path.join(__dirname, '/images', updatedPet.image_path));
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