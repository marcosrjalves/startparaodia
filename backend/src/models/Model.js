import objection from 'objection';
import knex from '../config/connection';
// const _ = require('lodash');

objection.Model.knex(knex);

class Model extends objection.Model {
  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeValidate(jsonSchema, json, opt) {
    return jsonSchema;
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

}

export default Model;
