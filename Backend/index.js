import express from 'express'
import mysql from 'mysql2'
import bodyParser  from 'body-parser'
import bcrypt from 'bcryptjs'
import cors from 'cors'

// express & body-parser setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

// DB connection setup with error message
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Anasrahman@00',
    database:'user_auth'
});

db.connect((err) => {
    if(err) throw err;
    console.log('connected to mysql database...!')
})

// Registration setup
app.post('/register',(req, res) => {

   const {firstName, lastName, phoneNumber, email, password, confirmPassword} = req.body;

    // Hashing password
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = `INSERT INTO users(first_name, last_name, phone_number, 
                   email, password, confirm_password) 
                   VALUES(?,?,?,?,?,?);`;

    db.execute(query, [firstName, lastName, phoneNumber, email, hashedPassword, confirmPassword], (err, results) => {
        if(err) {
            console.log('Database Error: ',err) // log the error.
            res.status(500).send('Error registering user')
        } else {
            console.log(res.status)
            res.status(200).send('User registered successfully')
        }
    })
})

// Login setup
app.post('/login',(req, res) => {

   const {email, password} = req.body;

   const query = `SELECT * FROM users WHERE email = ?`;

   db.execute(query, [email], (err, results) => {
    if(err) {
        console.log('DB Error: ', err)
        return res.status(500).send('Error fetching User')
    } 
    if(results.length === 0) {
        console.log('User Error: ', err)
        return res.status(404).send('User not found')
    }

    const user = results[0]
    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if(!isPasswordValid) {
        res.status(401).send('Invalid Credentials');
    }

    res.status(200).send('User Logged in successfully')
    
   })
})

// Starting server:
app.listen(port, () => {
    console.log(`app is running under port: ${port}`)
})