

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/howtodb',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }, 
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:  'postgres://localhost/howtodb_test',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }, 
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }, 
    useNullAsDefault: true
  }

};
