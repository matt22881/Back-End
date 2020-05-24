
exports.seed = async function(knex) {
  await knex("Entries").del()
  await knex("Entries").insert([
    {Users_id: 2, Title: "How2 1", Category_id: 1},
    {Users_id: 3, Title: "How2 2", Category_id: 2}  
  ])
  
};
