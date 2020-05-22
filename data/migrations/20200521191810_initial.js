
exports.up = async function(knex) {
  await knex.schema.createTable("Users", (table =>{
      table.increments("id")
      table.string("Username").notNull().unique()
      table.string("Password").notNull()
      table.string("Email").notNull().unique()
      table.date("Joined").defaultTo(knex.raw("current_timestamp"))
      table.string("Account").notNull()
  }))

  await knex.schema.createTable("Entries", (table =>{
    table.increments("id")
    table.integer("Users_id")
        .references("id")
        .inTable("Users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    table.string("Title").notNull()
    table.date("Created").defaultTo(knex.raw("current_timestamp"))
    table.date("Edited").defaultTo(knex.raw("current_timestamp"))
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

  await knex.schema.createTable("Categories", (table =>{
    table.increments("id")
    table.string("Name").notNull()  
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
    table.integer("Rating").defaultTo(0)
    table.primary(["Users_id","Entries_id"])
  }))

  await knex.schema.createTable("Entries_Categories", (table =>{
    table.integer("Entries_id")
        .references("id")
        .inTable("Entries")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    table.integer("Categories_id")
        .references("id")
        .inTable("Categories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    table.primary(["Entries_id","Categories_id"])
  }))
  

}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("Entries_Categories")
    await knex.schema.dropTableIfExists("Ratings")
    await knex.schema.dropTableIfExists("Categories")
    await knex.schema.dropTableIfExists("ContentBlocks")
    await knex.schema.dropTableIfExists("Entries")
    await knex.schema.dropTableIfExists("Users")
}