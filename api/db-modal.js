const db = require("../data/config")
const bc = require("bcryptjs")
const knex = require("knex")

//find users by filter
function findBy(filter){
    return db("Users").where(filter)
}

function findUsersByAccount(account){
    return db("Users")
        .where("Account", account)
        .select("id", "Username", "Email", "Joined", "Account")
}


//find users by id
function findById(id){
    return db("Users").where("id", id).select("id", "Username", "Joined", "Account")
}

//add a user
async function add(user){
    user.Password = await bc.hashSync(user.Password, 10)
    await db("Users").insert(user)

    newUser ={
        Username: user.Username,
        Account: user.Account
    }
    
    return newUser
}

//get all users
function getUsers(){
    return db("Users").select("id", "Username", "Email", "Joined", "Account")
}

//edit user by id
function editUser(id, changes){
    return db("Users").where("id", id).update(changes)

}

//delete user by id
function deleteUser(id){
    return db("Users").where("id", id).del()
}

//get all entries
function getAllEntries(){
    return db("Entries as e")
        .join("Users as u", "u.id", "e.Users_id" )
        .join("Categories as c", "c.id", "e.Category_id")
        .join("Ratings as r", "r.Entries_id", "e.id")
        .select(
            "e.id", 
            "u.Username as Author", 
            "u.id as Author_id", 
            "e.Title", 
            "e.Created",
            "e.Edited", 
            "c.Name as Category",
            knex.raw('(SELECT jsonb_agg("ContentBlocks") as "Content" FROM "ContentBlocks" WHERE "Entries_id" = e.id )')
        )  
        .avg("r.Rating as AverageRating")
        .groupBy("e.id", "u.Username", "u.id", "c.Name")
        .orderBy("e.id")
}


//get entries by id
function getEntryById(id){
    return db("Entries as e")
        .join("Users as u", "u.id", "e.Users_id" )
        .join("Categories as c", "c.id", "e.Category_id")
        .join("Ratings as r", "r.Entries_id", "e.id")
        .where("e.id", id)
        .select(
            "e.id", 
            "u.Username as Author", 
            "u.id as Author_id", 
            "e.Title", "e.Created",
            "e.Edited",
            "c.Name as Category",
            knex.raw('(SELECT jsonb_agg("ContentBlocks") as "Content" FROM "ContentBlocks" WHERE "Entries_id" = e.id )')
        )
        .avg("r.Rating as AverageRating")
        .groupBy("e.id", "u.Username", "u.id", "c.Name")

}

//get entries by author
function getEntryByAuthor(id){
    return db("Users as u")
        .join("Entries as e", "e.Users_id", "u.id")
        .join("Categories as c", "c.id", "e.Category_id")
        .join("Ratings as r", "r.Entries_id", "e.id")
        .where("u.id", id)
        .select(
            "e.id", 
            "u.Username as Author", 
            "u.id as Author_id", 
            "e.Title", "e.Created", 
            "e.Edited", 
            "c.Name as Category",
            knex.raw('(SELECT jsonb_agg("ContentBlocks") as "Content" FROM "ContentBlocks" WHERE "Entries_id" = e.id )')
        )
        .avg("r.Rating as AverageRating")
        .groupBy("e.id", "u.Username", "u.id", "c.Name")
        .orderBy("e.id")
}

function getEntryByCategory(id){
    return db("Users as u")
        .join("Entries as e", "e.Users_id", "u.id")
        .join("Categories as c", "c.id", "e.Category_id")
        .join("Ratings as r", "r.Entries_id", "e.id")
        .where("c.id", id)
        .select(
            "e.id", 
            "u.Username as Author", 
            "u.id as Author_id", 
            "e.Title", "e.Created", 
            "e.Edited", 
            "c.Name as Category",
            knex.raw('(SELECT jsonb_agg("ContentBlocks") as "Content" FROM "ContentBlocks" WHERE "Entries_id" = e.id )')
        )
        .avg("r.Rating as AverageRating")
        .groupBy("e.id", "u.Username", "u.id", "c.Name")
        .orderBy("e.id")
}

function getTopEntries(limit){
    return db("Entries as e")
        .join("Users as u", "u.id", "e.Users_id" )
        .join("Categories as c", "c.id", "e.Category_id")
        .join("Ratings as r", "r.Entries_id", "e.id")
        .select(
            "e.id", 
            "u.Username as Author", 
            "u.id as Author_id", 
            "e.Title", 
            "e.Created",
            "e.Edited", 
            "c.Name as Category",
            knex.raw('(SELECT jsonb_agg("ContentBlocks") as "Content" FROM "ContentBlocks" WHERE "Entries_id" = e.id )')
        )  
        .avg("r.Rating as AverageRating")
        .groupBy("e.id", "u.Username", "u.id", "c.Name")
        .orderBy("AverageRating", "desc")
        .limit(limit)
        
}

//add an entry
 function addEntry(entry){
    return db("Entries").insert(entry).returning("id")
}

//edit an entry
function editEntry(id, entry){
    return db("Entries")
    .where("id", id)
    .update(entry)
}

//delete an entry
function deleteEntry(id){
    return db("Entries")
    .where("id", id)
    .del()
}

//get content by entry id
function getContentBlocks(id){
    return db("Entries as e")
        .join("ContentBlocks as cb", "e.id", "cb.Entries_id")
        .where("e.id", id)
        .select("cb.id as Content_id", "cb.Step", "cb.Heading", "cb.Content")
}

//get content block by id
function getContentById(id){
    return db("ContentBlocks").where("id", id).first()
}

//Add a content block
function addContent(content){
    return db("ContentBlocks").insert(content).returning("id")
}

//edit content block
function editContent(id, edit){
    return db("ContentBlocks").where("id", id).update(edit)
}

//delete content block
function deleteContent(id){
    return db("ContentBlocks").where("id", id).del()
}

//get users rating for a entry
function getUserRatingEntry(uId, eId){
    return db("Ratings as r")
        .where("r.Users_id", uId)
        .andWhere("r.Entries_id", eId)
}

//add a rating
function addRating(rating){
    return db("Ratings").insert(rating)
}

//edit a rating
function editRating(uId, eId,rating){
    return db("Ratings")
    .where("Users_id", uId)
    .andWhere("Entries_id", eId)
    .update(rating)
}

//delete a rating
function deleteRating(uId, eId){
    return db("Ratings as r")
        .where("r.Users_id", uId)
        .andWhere("r.Entries_id", eId)
        .del()
    }

// get all categories
function categories(){
    return db("Categories")
}

//get Category by name
function getCategoryByName(name){
    return db("Categories").where("Name", name)
}

//get category by id
function getCategoryById(id){
    return db("Categories").where("id", id)
}

//add a category
function addCategory(category){
    return db("Categories").insert(category).returning("id")
}

//edit a category
function editCategory(id, edit){
    return db("Categories")
        .where("id", id)
        .update(edit)
        .returning("id")
}

//delete a category
function deleteCategory(id){
    return db("Categories")
        .where("id", id)
        .del()
}




module.exports = {
    findBy,
    findById,
    findUsersByAccount,
    add,
    getUsers,
    editUser,
    deleteUser,
    getAllEntries,
    getEntryById,
    getEntryByAuthor,
    getTopEntries,
    getEntryByCategory,
    addEntry,
    editEntry,
    deleteEntry,
    getContentBlocks,
    getContentById,
    addContent,
    editContent,
    deleteContent,
    getUserRatingEntry,
    addRating,
    editRating,
    deleteRating,
    categories,
    getCategoryByName,
    getCategoryById,
    addCategory,
    editCategory,
    deleteCategory,
}