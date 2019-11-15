'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepuestoSchema extends Schema {
  up () {
    this.create('repuestos', (table) => {
      table.increments()
      table.string('descripcion',45).notNullable();
      table.integer('costUnit').notNullable()
      table.integer('precioUnit').notNullable()
      table.integer('impParcial').notNullable()    
      table.integer('hoja_id').notNullable().unsigned().references('id').inTable('hoja_de_partes').notNullable()
      table.integer('hoja_mecanico_id').notNullable().unsigned().references('mecanico_id').inTable('hoja_de_partes').notNullable()      
      table.timestamps()
    })
  }

  down () {
    this.drop('repuestos')
  }
}

module.exports = RepuestoSchema
