const up = knex => {
  return knex.schema.hasTable('users').then(exists => {
    if (!exists) {
      return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('email', 50).notNullable()
        table.string('fullName', 50).notNullable()
        table.string('authUid', 35)
        table.string('phone', 15)
        table.string('contactPhone', 15)

        table.unique('email')
        table.unique('authUid')
      })
    }
  })
}

const down = knex => {
  return knex.schema.dropTable('users')
}

module.exports = {
  up,
  down
}
