const bc = require("bcryptjs")

exports.seed = async function(knex) {

  const hashedpass = bc.hashSync("Password1!", 12)
  //await knex("Users").del()
  await knex("Users").insert([
    {Username: "User1", Password: hashedpass, Email: "user1@email.com", Account:"Admin"},
    {Username: "User2", Password: hashedpass, Email: "user2@email.com", Account:"Editor"},
    {Username: "User3", Password: hashedpass, Email: "user3@email.com", Account:"Subscriber"}
  ])
  
};
