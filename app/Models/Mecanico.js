'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Mecanico extends Model {
    vehiculos(){
        return this.belongsToMany('App/Models/Vehiculo','mecanico_id','vahiculo_id').pivotTable('mecanicos_vehiculos');
    }

    HojaDeParte(){
        return this.hasMany('App/Models/HojaDeParte')
    }
}

module.exports = Mecanico
