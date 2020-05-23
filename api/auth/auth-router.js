const bc = require("bcryptjs")
const router = require('express').Router()
const db = require("../db-modal")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res, next) => {
    try{
        const { Username, Email } = req.body
        const username = await db.findBy({ Username }).first()
        const useremail = await db.findBy({ Email }).first()
       
        if(username || useremail){
            return res.status(409).json({Error: "Username and/or Email are already taken"})
        }

        const newUser = await db.add(req.body)

        res.status(201).json(newUser)

    }catch(err){
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    const authErr = {
        Error: "Login Credentails do not match"
    }
    try{
        const { Email, Password } = req.body
        const user = await db.findBy({ Email }).first()

        if(!user){
            return res.status(401).json(authErr)
        }

        const validPass = await bc.compareSync(Password, user.Password)

        if(!validPass){
            return res.status(401).json(authErr)
        }

        const payload = {
            subject: user.id,
            Username: user.Username,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.json({
            id: user.id, 
            Username: user.Username, 
            Account: user.Account, 
            token: token
        })

    }catch(err){
        next(err)
    }
})

router.get("/users", async(req, res, next) => {
    const users = await db.getUsers()

    res.json(users)
})

module.exports = router