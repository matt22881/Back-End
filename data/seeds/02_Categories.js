
exports.seed = async function(knex) {
  //await knex("Categories").del()
  await knex("Categories").insert([
    {Name: "Life-Hack"},
    {Name: "DIY"}   
  ])
  
};