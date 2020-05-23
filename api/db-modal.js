const db = require("../data/config")
const bc = require("bcryptjs")

//find users by filter
function findBy(filter){
    return db("Users").where(filter)
}

//find users by id
function findById(id){
    return db("Users").where("id", id).select("id", "Username", "Account")
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
    return db("Users")
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
        .join("Entries_Categories as ec", "e.id", "ec.Entries_id" )
        .join("Users as u", "u.id", "e.Users_id" )
        .join("Categories as c", "c.id", "ec.Categories_id")
        .join("Ratings as r", "r.Entries_id", "e.id")
        .select("e.id", "u.Username as Author", "e.Title", "e.Created", "c.Name as Category")
        .avg("r.Rating as AverageRating")
        .groupBy("e.id", "u.Username", "c.Name")
}

//get entries by id
function getEntryById(id){
    return db("Entries as e")
        .join("Entries_Categories as ec", "e.id", "ec.Entries_id" )
        .join("Users as u", "u.id", "e.Users_id" )
        .join("Categories as c", "c.id", "ec.Categories_id")
        .join("Ratings as r", "r.Entries_id", "e.id")
        .where("e.id", id)
        .select("e.id", "u.Username as Author", "e.Title", "e.Created", "c.Name as Category")
        .avg("r.Rating as AverageRating")
        .groupBy("e.id", "u.Username", "c.Name")
}

//get entries by author

//add an entry

//edit an entry

//delete an entry

//get content by entry id
function getContentBlocks(id){
    return db("Entries as e")
        .join("ContentBlocks as cb", "e.id", "cb.Entries_id")
        .where("e.id", id)
        .select("cb.Step", "cb.Heading", "cb.Content")
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

//add a category

//edit a category

//delete a category





module.exports = {
    findBy,
    findById,
    add,
    getUsers,
    editUser,
    deleteUser,
    getAllEntries,
    getEntryById,
    getContentBlocks,
    getUserRatingEntry,
    addRating,

}