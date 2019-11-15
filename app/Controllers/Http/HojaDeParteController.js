'use strict'
const HojaDeParte = use('App/Models/HojaDeParte');
const Mecanico = use('App/Models/Mecanico');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with HojaDePartes
 */
class HojaDeParteController {
  /**
   * Show a list of all HojaDePartes.
   * GET HojaDePartes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const HojaDePartes = await HojaDeParte.query().with('mecanico').with('repuestos').fetch();

    console.log(HojaDePartes.toJSON())
    return view.render('HojaDePartes/index', {
      HojaDePartes: HojaDePartes.toJSON()
    })
    return 'Hola Index';
  }

  /**
   * Render a form to be used for creating a new HojaDeParte.
   * GET HojaDePartes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    let mecanicos = await Mecanico.all();
    return view.render('HojaDePartes/create',{mecanicos:mecanicos.toJSON()})
  }

  /**
   * Create/save a new HojaDeParte.
   * POST HojaDePartes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log(request.all());
    await HojaDeParte.create(request.all());
    return response.redirect('HojaDeParte')
  }

  /**
   * Display a single HojaDeParte.
   * GET HojaDePartes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing HojaDeParte.
   * GET HojaDePartes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    let hojaDeParte = await HojaDeParte.find(params.id)
    let mecanicos = await Mecanico.all();

    return view.render('HojaDePartes/edit',{hojaDeParte:hojaDeParte,mecanicos:mecanicos.toJSON()});
  }

  /**
   * Update HojaDeParte details.
   * PUT or PATCH HojaDePartes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let hojaDeParte = await HojaDeParte.find(params.id)
    const {nombre,cantidad,reparacion,mecanico_id} = request.all()
    hojaDeParte.merge({
      nombre: nombre,
      cantidad: cantidad,
      reparacion: reparacion,
      mecanico_id: mecanico_id
    })
    await hojaDeParte.save();
    return response.redirect('/HojaDeParte')
  }

  /**
   * Delete a HojaDeParte with id.
   * DELETE HojaDePartes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let hojaDeParte = await HojaDeParte.find(params.id);
    hojaDeParte.delete();
    return response.redirect('/HojaDeParte');
  }
}

module.exports = HojaDeParteController
