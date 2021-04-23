//MAIN APP
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongodb = require("mongoose");
const User = require("./model/user");
const bcrypt = require("bcryptjs");

const PORT = 6969;

//connecting the database, then creating the model itself to inforce the db schema 
mongodb.connect("mongodb://localhost:27017/login-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})

const app = express();

app.get('/', express.static(path.join(__dirname, "static")));

//using the bodyparser with express
app.use(bodyParser.json()); 
//creating a new route to handle the post request of the register form 

app.post('/register', async (req, res) => {

    //showing the body of the resquest , to will return empty since express doesn't parse json 
    //console.log(req.body);

    //extracting the data 
    const email = req.body.email
    const passwordPlainText = req.body.password
    const firstname = req.body.firstname
    const secondname = req.body.secondname

    // Some password handling things 
    if (passwordPlainText.length < 6 ) {
        return res.json({status : "error" , error : "Password is too small"})
    }
    if (typeof passwordPlainText !== "string" || !passwordPlainText) {
        return res.json({status : "error" , error : "Invalid Password"})
    }

    //hashing the password 
    password = await bcrypt.hash(passwordPlainText, 10);

    console.error(req.body);
    //adding to the db
    try {
       const userData = await User.create({
           username : email,
           password : password,
           firstname : firstname,
           lastname : secondname
       });
       console.log("User Created Successuflly : " + userData);
    } catch (err) {
        console.log(err.code);
        //duplicate usernames
        if (err.code === 11000){
            return res.json({status : "error", error : "Username exists"})
        }
        
    }
    return res.json({status : "ok"})
})
app.listen(PORT, (err) => {
    if(!err)
        console.log(`Listening on port: ${PORT}`);
    else
        console.log(err);
})
