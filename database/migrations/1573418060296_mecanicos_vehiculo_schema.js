'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MecanicosVehiculoSchema extends Schema {
  up () {
    this.create('mecanicos_vehiculos', (table) => {
      table.increments()
      table.integer('mecanico_id').unsigned().references('id').inTable('mecanicos').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('vahiculo_id').unsigned().references('id').inTable('vehiculos').notNullable().onDelete('CASCADE').onUpdate('CASCADE');      
      table.timestamps()
    })
  }

  down () {
    this.drop('mecanicos_vehiculos')
  }
}

module.exports = MecanicosVehiculoSchema
