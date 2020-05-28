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

router.get("/entries/content/:id", async (req, res, next) => {
    try{
        const content = await db.getContentById(req.params.id)
        res.json(content)
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

//get all entries by category id
router.get("/entries/category/:id", async (req, res, next) => {
    try{
        const entry = await db.getEntryByCategory(req.params.id)
        res.json(entry)
    }catch(err){
        next(err)
    }
})

//get highest rated entries
router.get("/topentries", async (req, res, next) => {
    try{
        let limit = 1
        if(req.query.limit){
            const entry = await db.getTopEntries(req.query.limit)
            res.json(entry)    
        }else{
            const [entry] = await db.getTopEntries(limit)
            res.json(entry)  
        }        
    }catch(err){
        next(err)
    }
})

//add an entry 
//takes in {User_id: data, Title: data, Category: data}
router.post("/entries", async (req, res, next) => {
    try{

        const [category] = await db.getCategoryByName(req.body.Category)
        const entryToEnter = {
            Users_id: req.body.Users_id,
            Title: req.body.Title,
            Content: req.body.Content,
            Category_id: category.id
        }
        
        const [newEntry] = await db.addEntry(entryToEnter)

        const initalRating = {
            Users_id: req.body.Users_id,
            Entries_id: newEntry,
            Rating: 0
        }

        await db.addRating(initalRating)
        const [returningEntry] = await db.getEntryById(newEntry)

        res.status(201).json(returningEntry)
    }catch(err){
        next(err)
    }
})

//edit an entry
router.put("/entries/:id", async (req, res, next) => {
    try{
    
        if(req.body.Category){
            const [category] = await db.getCategoryByName(req.body.Category)
            req.body.Category_id = category.id

            delete req.body.Category
        }
        req.body.Edited = new Date()
        
        await db.editEntry(req.params.id, req.body)
        res.status(202).json({message: "Entry has been edited"})
    }catch(err){
        next(err)
    }
})

//delete an entry
router.delete("/entries/:id", async (req, res, next) =>{
    try{
        await db.deleteEntry(req.params.id)
        res.status(200).json({message: "Entry deleted."})
    }catch(err){
        next(err)
    }
})

//add content block to an entry
router.post("/entries/content", async (req, res, next) =>{
    try{
        const [newBlockId] = await db.addContent(req.body)
        const newBlock = await db.getContentById(newBlockId)
        res.status(201).json(newBlock)
    }catch(err){
        next(err)
    }
})

//edit a content block
router.put("/entries/content/:id", async (req, res, next) =>{
    try{
        await db.editContent(req.params.id, req.body)
       
        res.status(202).json({message: "Content Block has been edited."})
    }catch(err){
        next(err)
    }
})

//delete content block
router.delete("/entries/content/:id", async (req, res, next) =>{
    try{
        await db.deleteContent(req.params.id)
       
        res.json({message: "Content Block has been deleted."})
    }catch(err){
        next(err)
    }
})

//get a users rating for a entry
router.get("/entries/:id/rating", async (req, res, next) =>{
    const userId = req.query.user
    try{
        const rating = await db.getUserRatingEntry(userId, req.params.id)
        res.json(rating)
    }catch(err){
        next(err)
    }
})

//add a rating to entries
//takes object {Users_id: data, Entries_id: data, Rating: rating}
router.post("/entries/rating", async (req, res, next) => {
    try{
        const rating = req.body
        await db.addRating(rating)
        res.status(201).json({message: "rating submitted", Rating: req.body.Rating})
    }catch(err){
        next(err)
    }
})

//edit a users rating for a specific entry
//Takes in an object  {Rating: data} w/ query string of user which = user id
router.put("/entries/:id/rating", async (req, res, next) => {
    const userId = req.query.user
    try{
        const rating = await db.editRating(userId, req.params.id, req.body)
        res.status(202).json({message: "Entry has been edited"})
    }catch(err){
        next(err)
    }
})

//delete a rating for a specific entry
router.delete("/entries/:id/rating", async (req, res, next) => {
    const userId = req.query.user
    try{
        await db.deleteRating(userId, req.params.id)
        res.json({message: "Entry has been deleted"})
    }catch(err){
        next(err)
    }
})

module.exports = router