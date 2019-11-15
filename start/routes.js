'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.resource('cliente','ClienteController')
Route.delete('cliente/eliminar/:id','ClienteController.destroy');

Route.resource('factura','FacturaController')
Route.resource('hojaDeParte','HojaDeParteController')
Route.resource('mecanico','MecanicoController')
Route.resource('mecanicos_vehiculo','MecanicosVehiculoController')
Route.resource('repuesto','RepuestoController')
Route.resource('vehiculo','VehiculoController')