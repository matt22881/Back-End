
exports.seed = async function(knex) {
  //await knex("Ratings").del()
  await knex("Ratings").insert([
    {Users_id: 1, Entries_id: 1, Rating: 3},
    {Users_id: 1, Entries_id: 2, Rating: 5},
    {Users_id: 2, Entries_id: 1, Rating: 5},
    {Users_id: 2, Entries_id: 2, Rating: 1},
    {Users_id: 3, Entries_id: 1, Rating: 3},
    {Users_id: 3, Entries_id: 2, Rating: 4},
  ])
  
};
