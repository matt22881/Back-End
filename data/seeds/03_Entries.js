
exports.seed = async function(knex) {
  //await knex("Entries").del()
  //await knex.schema.raw('TRUNCATE TABLE "Entries" CASCADE')
  await knex("Entries").insert([
    {Users_id: 2, Title: "How2 1", Content: "This is how you do it.", Category_id: 1},
    {Users_id: 3, Title: "How2 2",Content: "This is how you do it better.", Category_id: 2}  
  ])
  
};
