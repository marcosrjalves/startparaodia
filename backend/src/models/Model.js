import objection from 'objection';
import knex from '../config/connection';
// const _ = require('lodash');

objection.Model.knex(knex);

class Model extends objection.Model {
  $beforeInsert() {
    // var data = new Date();
    // var dt = data.getFullYear() + "-" + (data.getUTCMonth()+1) + "-" + data.getDate() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeValidate(jsonSchema, json, opt) {
    return jsonSchema;
  }

  $beforeUpdate() {
    // var data = new Date();
    // var dt = data.getFullYear() + "-" + (data.getUTCMonth()+1) + "-" + data.getDate() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    this.updated_at = new Date();
  }

  //   $formatDatabaseJson(json) {
  //     return _.mapKeys(json, (v, k) => _.snakeCase(k));
  //   }

  //   $parseDatabaseJson(json) {
  //     return _.mapKeys(json, (v, k) => _.camelCase(k));
  //   }
}

export default Model;
