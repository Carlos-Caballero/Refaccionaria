'use strict'
const Repuesto = use('App/Models/Repuesto');
const Mecanico = use('App/Models/Mecanico');
const HojaDeParte = use('App/Models/HojaDeParte');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with repuestos
 */
class repuestoController {
  /**
   * Show a list of all repuestos.
   * GET repuestos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const repuestos = await Repuesto.query().with('hojadeparte').with('mecanico').fetch();


    return view.render('repuestos/index', {
      repuestos: repuestos.toJSON()
    })
    return 'Hola Index';
  }

  /**
   * Render a form to be used for creating a new repuesto.
   * GET repuestos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    let mecanicos = await Mecanico.all();
    let hojadepartes = await HojaDeParte.all();
    return view.render('repuestos/create',{mecanicos:mecanicos.toJSON(),hojaDePartes:hojadepartes.toJSON()})
  }

  /**
   * Create/save a new repuesto.
   * POST repuestos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log(request.all());
    await Repuesto.create(request.all());
    return response.redirect('repuesto')
  }

  /**
   * Display a single repuesto.
   * GET repuestos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing repuesto.
   * GET repuestos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    let repuesto = await Repuesto.find(params.id)
    let mecanicos = await Mecanico.all();
    let hojadepartes = await HojaDeParte.all();

    return view.render('repuestos/edit',{repuesto:repuesto,mecanicos:mecanicos.toJSON(),hojaDePartes:hojadepartes.toJSON()});
  }

  /**
   * Update repuesto details.
   * PUT or PATCH repuestos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let repuesto = await Repuesto.find(params.id)
    const {descripcion, costUnit,precioUnit,impParcial,hoja_id,hoja_mecanico_id} = request.all()
    repuesto.merge({
      descripcion: descripcion,
      costUnit: costUnit,
      precioUnit: precioUnit,
      impParcial : impParcial,
      hoja_id: hoja_id,
      hoja_mecanico_id : hoja_mecanico_id
    })
    await repuesto.save();
    return response.redirect('/repuesto')
  }

  /**
   * Delete a repuesto with id.
   * DELETE repuestos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let repuesto = await Repuesto.find(params.id)
    repuesto.delete();
    return response.redirect('/repuesto')
  }
}

module.exports = repuestoController
