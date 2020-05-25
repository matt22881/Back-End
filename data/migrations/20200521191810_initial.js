
exports.up = async function(knex) {
  await knex.schema.createTable("Users", (table =>{
      table.increments("id")
      table.string("Username").notNull().unique()
      table.string("Password").notNull()
      table.string("Email").notNull().unique()
      table.datetime("Joined").defaultTo(knex.raw("current_timestamp"))
      table.string("Account").notNull()
  }))

  await knex.schema.createTable("Categories", (table =>{
    table.increments("id")
    table.string("Name").notNull()  
  }))

  await knex.schema.createTable("Entries", (table =>{
    table.increments("id")
    table.integer("Users_id")
        .references("id")
        .inTable("Users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    table.string("Title").notNull()
    table.datetime("Created").defaultTo(knex.raw("current_timestamp"))
    table.datetime("Edited")//.defaultTo(knex.raw("current_timestamp"))
    table.integer("Category_id")

  }))

  await knex.schema.createTable("ContentBlocks", (table =>{
    table.increments("id")
    table.integer("Entries_id")
        .references("id")
        .inTable("Entries")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    table.integer("Step").notNull()
    table.string("Heading").notNull()
    table.string("Content").notNull() 
  }))

  await knex.schema.createTable("Ratings", (table =>{
    table.integer("Users_id")
        .references("id")
        .inTable("Users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    table.integer("Entries_id")
        .references("id")
        .inTable("Entries")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    table.integer("Rating")
    table.primary(["Users_id","Entries_id"])
  }))

  
}

exports.down = async function(knex) {

    await knex.schema.dropTableIfExists("Ratings")
    await knex.schema.dropTableIfExists("ContentBlocks")
    await knex.schema.dropTableIfExists("Categories")
    await knex.schema.dropTableIfExists("Entries")
    await knex.schema.dropTableIfExists("Users")
    
}
