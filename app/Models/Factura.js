'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Factura extends Model {
    hojadeparte(){
        return this.belongsTo('App/Models/HojaDeParte','hoja_id');
    }
}

module.exports = Factura
