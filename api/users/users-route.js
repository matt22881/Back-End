const router = require('express').Router()
const db = require("../db-modal")
const bc = require("bcryptjs")


//get all users
router.get("/", async(req, res, next) => {
    const users = await db.getUsers()

    res.json(users)
})

//get all users that are editors
router.get("/editors", async(req, res, next) => {
    const users = await db.findUsersByAccount("Editor")

    res.json(users)
})

//get all users that are subscribers
router.get("/subscribers", async(req, res, next) => {
    const users = await db.findUsersByAccount("Subscriber")

    res.json(users)
})

//get all users that are admins
router.get("/admins", async(req, res, next) => {
    const users = await db.findUsersByAccount("Admin")

    res.json(users)
})

//get a user by id
router.get("/:id", async(req, res, next) => {
    const [users] = await db.findById(req.params.id)

    res.json(users)
})

//edit a user
router.put("/:id", async (req, res, next) => {
    try{
        if(req.body.Username){
            const { Username } = req.body
            const username = await db.findBy({ Username }).first()
            if(username){
                return res.status(409).json({Error: "Username is already taken"})
            }
        }
        if(req.body.Email){
            const { Email } = req.body
            const email = await db.findBy({ Email }).first()
            if(email){
                return res.status(409).json({Error: "Email is already taken"})
            }
        }
        if(req.body.Password){
            req.body.Password = await bc.hashSync(req.body.Password, 10)
        }
        await db.editUser(req.params.id, req.body)
        res.status(202).json({message: "User has been updated"})
    }catch(err){
        next(err)
    }
})

//delete a user
router.delete("/:id", async (req, res, next) => {
    try{
        await db.deleteUser(req.params.id)
        res.status(200).json({message: "User has been deleted"})
    }catch(err){
        next(err)
    }
})


module.exports = router
