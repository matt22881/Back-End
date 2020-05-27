exports.seed = async function(knex) {
    await knex("Ratings").truncate()
    await knex("ContentBlocks").truncate()
    await knex("Categories").truncate()
    await knex("Entries").truncate()
    await knex("Users").truncate()
  }