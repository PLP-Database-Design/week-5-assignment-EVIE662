//import dependencies
const express = require('express')
   const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

//configure environment variables
dotenv.config();

//create a connection object
const db = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USERNAME,
password: process.env. DB_PASSWORD,
database: process.env.DB_NAME
})

console.log(db)

//test the connection
db.connect((err) =>{
    // if connection is not successful
    if(err) {
    return console.log('Error connecting to the database:', err)
    }

    //if connection is successful
    console.log('Successfully connected to mysql:',db.threadId) 
})

//retrieve all patients

app.get('', (req, res) =>{
   const getPatients = "SELECT * FROM patients"
   db.query(getPatients, (err, data))
   if(err) {
    return res.status(400).send("Failed to get patients", err)
   }

   res.status(200).send.data
})

//retrieve all providers
app.get('', (req, res) =>{
    const getProviders = "SELECT * FROM providers"
    db.query(getProviders, (err, data))
    if(err){
        return res.status(400).send("Failed to get providers", err)
    }  
    
    res.status(200).send.data
    })

    // 3. Filter patients by First Name
    app.get('/patients', (req, res) => {
        const { first_name } = req.query;
    
        if (!first_name) {
            return res.status(400).send("Please provide a first name.");
        }
    
        const getPatients = "SELECT * FROM patients WHERE first_name = ?";
        db.query(getPatients, [first_name], (err, data) => {
            if (err) {
                return res.status(400).send("Failed to get patients: " + err.message);
            }
    
            if (data.length === 0) {
                return res.status(404).send("No patients found with that first name.");
            }
    
            res.status(200).send(data);
        });
    });

    //Retrieve all providers by their specialty
    app.get('/providers', (req, res) => {
        const { provider_specialty } = req.query;
    
        if (!provider_specialty) {
            return res.status(400).send("Please provide a provider specialty.");
        }
    
        const getProviders = "SELECT * FROM providers WHERE provider_specialty = ?";
        db.query(getProviders, [provider_specialty], (err, data) => {
            if (err) {
                return res.status(400).send("Failed to get providers: " + err.message);
            }
    
            if (data.length === 0) {
                return res.status(404).send("No providers found with that specialty.");
            }
    
            res.status(200).send(data);
        });
    });
    
    



//start and lsten to the server
app.listen(3300, () => {
    console.log('server is running on port 3300...')
})
 

  