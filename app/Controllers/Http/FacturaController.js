'use strict'
const Factura = use('App/Models/factura');
const HojaDeParte = use('App/Models/HojaDeParte');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with facturas
 */
class FacturaController {
  /**
   * Show a list of all facturas.
   * GET facturas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const facturas = await Factura.query().with('hojadeparte').fetch();

    console.log(facturas.toJSON())

    return view.render('facturas/index', {
      facturas: facturas.toJSON()
    })
  }

  /**
   * Render a form to be used for creating a new factura.
   * GET facturas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    let HojaDePartes = await HojaDeParte.all();
    return view.render('facturas/create',{HojaDePartes:HojaDePartes.toJSON()})
  }

  /**
   * Create/save a new factura.
   * POST facturas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log(request.all());
    await Factura.create(request.all());
    return response.redirect('factura')
  }

  /**
   * Display a single factura.
   * GET facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing factura.
   * GET facturas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    let factura = await Factura.find(params.id)
    let HojaDePartes = await HojaDeParte.all();

    return view.render('facturas/edit',{factura:factura,HojaDePartes:HojaDePartes.toJSON()});
  }

  /**
   * Update factura details.
   * PUT or PATCH facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let factura = await Factura.find(params.id)
    const {fecha, imp_pesos,imp_dol,RFC,hoja_id} = request.all()
    factura.merge({
      fecha: fecha,
      imp_pesos: imp_pesos,
      imp_dol: imp_dol,
      RFC : RFC,
      hoja_id: hoja_id
    })
    await factura.save();
    return response.redirect('/factura')
  }

  /**
   * Delete a factura with id.
   * DELETE facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let factura = await Factura.find(params.id)
    factura.delete();
    return response.redirect('/factura')
  }
}

module.exports = FacturaController
