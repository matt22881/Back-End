const db = require("../data/config")
const bc = require("bcryptjs")

function findBy(filter){
    return db("Users").where(filter)
}

function findById(id){
    return db("Users").where("id", id).select("id", "Username", "Account")
}

async function add(user){
    user.Password = await bc.hashSync(user.Password, 10)
    await db("Users").insert(user)

    newUser ={
        Username: user.Username,
        Account: user.Account
    }
    
    return newUser
}

function getUsers(){
    return db("Users")
}



module.exports = {
    findBy,
    findById,
    add,
    getUsers,


}