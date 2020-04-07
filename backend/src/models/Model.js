import objection from 'objection';
import knex from '../config/connection';
// const _ = require('lodash');

objection.Model.knex(knex);

class Model extends objection.Model {
  $beforeInsert() {
    // this.id = uuid();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeValidate(jsonSchema, json, opt) {
    return jsonSchema;
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  //   $formatDatabaseJson(json) {
  //     return _.mapKeys(json, (v, k) => _.snakeCase(k));
  //   }

  //   $parseDatabaseJson(json) {
  //     return _.mapKeys(json, (v, k) => _.camelCase(k));
  //   }
}

export default Model;
