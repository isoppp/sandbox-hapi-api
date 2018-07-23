const env = process.env.NODE_ENV || 'development'
const knexConfig = require('./knexfile')
const Knex = require('knex')(knexConfig[env])

module.exports = Knex
