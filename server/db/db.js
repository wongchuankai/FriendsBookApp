var Pool = require('pg-pool')
require('dotenv').config()

const devConfig = {
    user: process.env.DEV_USER,
    host: process.env.DEV_HOST,
    database: process.env.DEV_DATABASE,
    password: process.env.DEV_PASSWORD,
    port: process.env.DEV_PORT,
}

const productionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }               // for heroku
}

const pool = new Pool(
    process.env.NODE_ENV === "production" ? productionConfig : devConfig
)

module.exports = pool