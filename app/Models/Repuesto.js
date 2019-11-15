'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Repuesto extends Model {
    hojadeparte(){
        return this.belongsTo('App/Models/HojaDeParte','hoja_id');
    }

    mecanico(){
        return this.belongsTo('App/Models/Mecanico','hoja_mecanico_id')
    }

}

module.exports = Repuesto
