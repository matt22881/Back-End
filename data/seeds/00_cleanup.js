
exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE TABLE "Users", "Entries", "Ratings", "Categories" ')
  
  // await knex("ContentBlocks").truncate()
  // await knex("Categories").truncate()
  // await knex("Ratings").truncate()
  // await knex("Entries").truncate()
  // await knex("Users").truncate()  
}
