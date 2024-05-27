const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const USER = mongoose.model("USER")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {jwt_key} = require('../keys');
const login = require('../middleware/login');


router.get('/',(req,res) => {
    res.send("Hello")
})

router.get('/create', login,(req, res) => {
    console.log("Hello auth")
})

router.post("/signup", (req, res) => {
    const{name, userName, email, password} = req.body;

    if(!name || !email || !userName || !password) {
        return res.status(422).json({error:"Please add all fields"})
    }

    USER.findOne({$or: [{email:email},{userName:userName}]}).then((savedUser)=> {
        if(savedUser) {
            return res.status(422).json({Error:"User already exists"})
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new USER({
                name,
                userName,
                email,
                password: hashedPassword
            })
        
            user.save()
            .then(user => {res.json({message:"Registered successfully! Please log in to explore"})})
            .catch(err => console.log(err))

        })
        
    })

})

router.post("/signin", (req, res) => {
    const  {email, password} = req.body;

    if(!email || !password) {
        return res.status(422).json({error:"Please enter all fields"})
    }

    USER.findOne({email:email}).then((savedUser) => {
        if(!savedUser) {
            return res.status(422).json({error:"Invalid Email"})
        }
        bcrypt.compare(password, savedUser.password).then((match) => {
            if(match) {
                const token = jwt.sign({_id:savedUser.id},jwt_key)
                res.json(token)
                // return res.status(200).json({message:"Signed in successfully"})
            } else {
                return res.status(422).json({error:"Incorrect Password"})
            }

        })
        .catch(err => console.log(err))
    } )
})

module.exports = router;