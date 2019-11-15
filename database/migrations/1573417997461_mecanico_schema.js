'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MecanicoSchema extends Schema {
  up () {
    this.create('mecanicos', (table) => {
      table.increments()
      table.string('nombre',45).notNullable();
      table.string('direccion',45).notNullable();
      table.string('telefono',45).notNullable();
      table.float('costoPorHora',4).notNullable();
      table.string('categoria',45).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('mecanicos')
  }
}

module.exports = MecanicoSchema
