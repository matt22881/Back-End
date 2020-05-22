
exports.seed = async function(knex) {
  await knex("ContentBlocks").del()
  await knex("ContentBlocks").insert([
    {Entries_id: 1, Step: 1, Heading: "Step 1", Content: "This is how you do it"},
    {Entries_id: 1, Step: 2, Heading: "Step 2", Content: "Next you do this"},
    {Entries_id: 2, Step: 1, Heading: "First Step", Content: "This is how you do it better"},
    {Entries_id: 2, Step: 2, Heading: "Second Step", Content: "Next you do this and it's better"},
  ])
  
};