
exports.seed = async function(knex) {
  await knex("Entries_Categories").del()
  await knex("Entries_Categories").insert([  
    {Entries_id: 1, Categories_id: 1},
    {Entries_id: 2, Categories_id: 2}  
  ])
  
};
