'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FacturaSchema extends Schema {
  up () {
    this.create('facturas', (table) => {
      table.increments()
      table.date('fecha').notNullable()
      table.integer('imp_pesos').notNullable()
      table.integer('imp_dol').notNullable()
      table.integer('RFC').notNullable()    
      table.integer('hoja_id').notNullable().unsigned().references('id').inTable('hoja_de_partes').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('facturas')
  }
}

module.exports = FacturaSchema
