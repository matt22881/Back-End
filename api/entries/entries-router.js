const router = require('express').Router()
const db = require("../db-modal")

router.get("/entries", async (req, res, next) => {
    try{
        const entries = await db.getAllEntries()

        res.json(entries)
    }catch(err){
        next(err)
    }
})

router.get("/entries/:id", async (req, res, next) => {
    try{
        const entry = await db.getEntryById(req.params.id)
        res.json(entry)
    }catch(err){
        next(err)
    }
})

router.get("/entries/:id/content", async (req, res, next) => {
    try{
        const id = req.params.id
        const content = await db.getContentBlocks(id)
        res.json(content)
    }catch(err){
        next(err)
    }
})

module.exports = router