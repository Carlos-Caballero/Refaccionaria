'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VehiculoSchema extends Schema {
  up () {
    this.create('vehiculos', (table) => {
      table.increments()
      table.string('modelo',45).notNullable()
      table.string('color',45).notNullable();
      table.datetime('Fecha_entrada')
      table.time('Hora_ent')
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('vehiculos')
  }
}

module.exports = VehiculoSchema
