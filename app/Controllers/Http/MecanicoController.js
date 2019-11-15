'use strict'
const Mecanico = use('App/Models/Mecanico');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with mecanicos
 */
class MecanicoController {
  /**
   * Show a list of all mecanicos.
   * GET mecanicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const mecanicos = await Mecanico.query().with('vehiculos').fetch();

    return view.render('mecanicos/index', {
      mecanicos: mecanicos.toJSON()
    })
    return 'Hola Index';
  }

  /**
   * Render a form to be used for creating a new mecanico.
   * GET mecanicos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('mecanicos/create',{})
  }

  /**
   * Create/save a new mecanico.
   * POST mecanicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log(request.all());
    await Mecanico.create(request.all());
    return response.redirect('mecanico')
  }

  /**
   * Display a single mecanico.
   * GET mecanicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing mecanico.
   * GET mecanicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    let mecanico = await Mecanico.find(params.id)
    return view.render('mecanicos/edit',{mecanico:mecanico});
  }

  /**
   * Update mecanico details.
   * PUT or PATCH mecanicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let mecanico = await Mecanico.find(params.id)
    const {nombre, direccion, telefono,costoPorHora,categoria} = request.all()
    mecanico.merge({
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      costoPorHora : costoPorHora,
      categoria: categoria
    })
    await mecanico.save();
    return response.redirect('/mecanico')
  }

  /**
   * Delete a mecanico with id.
   * DELETE mecanicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let mecanico = await Mecanico.find(params.id)
    mecanico.delete();
    return response.redirect('/mecanico')
  }
}

module.exports = MecanicoController
