'use strict'

const Model = require('objection').Model
const Joi = require('joi')
const convert = require('joi-to-json-schema')


class User extends Model {

  // table name
  static get tableName() {
    return 'user'
  }

  // validate
  static get jsonSchema() {
    const joiSchema = Joi.object({
      name: Joi.string().min(4).max(50).required(),
      email: Joi.string().email().max(100).required(),
      password: Joi.string().min(6).max(200).required(),
    })
    return convert(joiSchema)
  }
}

module.exports = User
