'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MecanicosVehiculo extends Model {
    mecanico(){
        return this.belongsTo('App/Models/Mecanico')
    }

    vehiculo(){
        return this.belongsTo('App/Models/Vehiculo','vahiculo_id')
    }
}

module.exports = MecanicosVehiculo
