const router = require('express').Router()
const db = require("../db-modal")

//get all entries
router.get("/entries", async (req, res, next) => {
    try{
        const entries = await db.getAllEntries()

        res.json(entries)
    }catch(err){
        next(err)
    }
})

router.get("/entries/raw", async (req, res, next) => {
    try{
        const entries = await db.getRawEntries()

        res.json(entries)
    }catch(err){
        next(err)
    }
})

//get entry by id
router.get("/entries/:id", async (req, res, next) => {
    try{
        const [entry] = await db.getEntryById(req.params.id)
        res.json(entry)
    }catch(err){
        next(err)
    }
})

//get content for a single entry
router.get("/entries/:id/content", async (req, res, next) => {
    try{
        const content = await db.getContentBlocks(req.params.id)
        res.json(content)
    }catch(err){
        next(err)
    }
})


//get entry and its content by entry id
router.get("/entries/:id/full", async (req, res, next) => {
    try{
        const [entry] = await db.getEntryById(req.params.id)
        const content = await db.getContentBlocks(req.params.id)
        const fullEntry = {
            ...entry,
            ContentBlocks: [...content]
        }
        res.json(fullEntry)
    }catch(err){
        next(err)
    }
})

//get all entries by an author 
router.get("/entries/author/:id", async (req, res, next) => {
    try{
        const entry = await db.getEntryByAuthor(req.params.id)
        res.json(entry)
    }catch(err){
        next(err)
    }
})

//add an entry
//takes in {User_id: data, Title: data, Category: data}
router.post("/entries", async (req, res, next) => {
    try{
        const entryToEnter = {
            Users_id: req.body.Users_id,
            Title: req.body.Title
        }
        
        const [newEntry] = await db.addEntry(entryToEnter)
        const [category] = await db.getCategoryByName(req.body.Category)

        console.log(newEntry,category)

        const categoryToEnter = {
            Entries_id: newEntry,
            Categories_id: category.id
        }

        const initalRating = {
            Users_id: req.body.Users_id,
            Entries_id: newEntry,
            Rating: 0
        }

        await db.addEntCat(categoryToEnter)
        await db.addRating(initalRating)
        //const returningEntry = await db.getEntryById(newEntry)

        res.json(category)
    }catch(err){
        next(err)
    }
})

//edit an entry

//delete an entry

//add content to an entry

//edit a content block

//delete content block

//get a users rating for a entry

//add a rating to entries
//takes object {Users_id: data, Entries_id: data, Rating: rating}
router.post("/entries/rating", async (req, res, next) => {
    try{
        const rating = req.body
        await db.addRating(rating)
        res.json({message: "rating submitted", Rating: req.body.Rating})
    }catch(err){
        next(err)
    }
})

//edit a rating for a specific entry

//delete a rating for a specific entry

module.exports = router