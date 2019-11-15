'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HojaDeParte extends Model {
    mecanico(){
        return this.belongsTo('App/Models/Mecanico')
    }

    repuestos(){
        return this.hasMany('App/Models/Repuesto','id','hoja_id');
    }
}

module.exports = HojaDeParte
