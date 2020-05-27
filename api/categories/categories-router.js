const router = require('express').Router()
const db = require("../db-modal")

router.get("/", async (req, res, next) =>{
    try{
       const categories = await db.categories()
       res.json(categories)
    }catch(err){
        next(err)
    }
})

router.get("/:id", async (req, res, next) =>{
    try{
       const [categories] = await db.getCategoryById(req.params.id)
       res.json(categories)
    }catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next) =>{
    try{
        const [id] = await db.addCategory(req.body)
        const [category] = await db.getCategoryById(id)
        res.status(201).json(category)
    }catch(err){
        next(err)
    }
})

router.put("/:id", async (req, res, next) =>{
    try{
        const [id] = await db.editCategory(req.params.id, req.body)
        const [category] = await db.getCategoryById(id)
        res.status(202).json(category)
    }catch(err){
        next(err)
    }
})

router.delete("/:id", async (req, res, next) =>{
    try{
        await db.deleteCategory(req.params.id)
       
        res.json({message: "Category was deleted."})
    }catch(err){
        next(err)
    }
})

module.exports = router