//MAIN APP
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongodb = require("mongoose");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const PORT = 6969;

//Top secret key
const SECRET_KEY = "ThisIsVerySecretJWT 696969696969696969696969";

//connecting the database, then creating the model itself to inforce the db schema 
mongodb.connect("mongodb://localhost:27017/login-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})

const app = express();

app.use('/', express.static(path.join(__dirname, "static")));

//using the bodyparser with express
app.use(bodyParser.json()); 
//creating a new route to handle the post request of the register form 

app.get("/profile", async (req, res) => {
    // checks if user is logged in by checking the jwt and display thier info


    res.json({status:"ok"});
})
//change user's account info 
app.post("/change-info", async (req, res) => {

    //getting the token 
    const token = req.body.token;
    const firstname = req.body.firstname;
    const lastname = req.body.secondname;
    const password = req.body.password;

    //password validation Here>>>


    try {
        const userTokenCheck = jwt.verify(token, SECRET_KEY);
        // used to insert in the database
        const userId = userTokenCheck._id;

        //gettin user's info to be changed 

        const newPassword = await bcrypt.hash(password, 10);

        await User.updateOne(
            { userId },
            {
                $set : {
                    password : newPassword,
                    firstname : firstname,
                    secondname : lastname
                }
            }
        );
        res.json({status: "ok"})

    } catch (error) {
       return res.json({status: "error", error : "Failed to login"}) 
    }
    
    res.json({status : "ok"})

})

//login route
app.post("/login", async (req, res) => {

    //check if the username and password are correct or not 

    const username = req.body.email
    const password = req.body.password
    
    // lean returns simple json 

    const user = await User.findOne({username}).lean()

    //since the password is encrepted we have to compare the hash code of the given password 

    if (!user){
        return res.json({status : "error", error: "Invalid username or password"})
    }

    // if the username exists in the database and that username's password matches the exact one in the database it's a valid one
    if (await bcrypt.compare(password, user.password)){

        //vaild 

        //creating the jwt token for that user
        //use bare mini info here
        const userToken = jwt.sign({ 
            id: user._id, 
            username: user.email
        }, SECRET_KEY)
        return res.json({status: "ok", data: userToken})
    }

        //res.json({status : "ok", data : "hello world" })
        return res.json({status : "error", error: "Invalide username or password"})
})


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
