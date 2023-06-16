const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL
})

const app = express();
app.use(express.static('public'))
app.use(cors({
    origin: "*", 
}))
app.use(express.json());

app
    .get("/pets", async (req, res) => {
        try {
            let result = await pool.query('SELECT * FROM pets')
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
            let result = await pool.query('SELECT * FROM pets WHERE pet_id = $1', [id])
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
            let {name, breed, size, gender, age, about, location} = req.body
            let result = await pool.query('INSERT INTO pets (name, breed, size, gender, age, about, location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, breed, size, gender, age, about, location])
            res.send(result.rows)
        }
        catch(err) {
            console.log(err.message) 
            res.status(404).send('Error during post.')
        }
        
    })
    .put('/pets/:id', async (req, res) => {
        try{
            let { id } = req.params;
            let {name, breed, size, gender, age, about, location} = req.body
            let result = await pool.query('SELECT * FROM pets WHERE pet_id = $1', [id])
            let currentPet = result.rows[0]
            let updatedPet = {
                name: name || currentPet.name,
                breed: breed || currentPet.breed,
                size: size || currentPet.size,
                gender: gender || currentPet.gender,
                age: age || currentPet.age,
                about: about || currentPet.about,
                location: location || currentPet.location
            }
            let newResult = await pool.query('UPDATE pets set name = $1, breed = $2, size = $3, gender = $4, age = $5, about = $6, location = $7 WHERE pet_id = $8', [updatedPet.name, updatedPet.breed, updatedPet.size, updatedPet.gender, updatedPet.age, updatedPet.about, updatedPet.location, id])
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