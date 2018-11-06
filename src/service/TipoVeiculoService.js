'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class TipoVeiculoService {

  
  static async getAll() {
    try {
      let tipoVeiculos = await Axios.get(url + "tipoVeiculos");
      return tipoVeiculos.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(tipoVeiculo) {
    try {
      let tipoVeiculoSaved = await Axios.post(url + "tipoVeiculos", tipoVeiculo);
      return tipoVeiculoSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(tipoVeiculo) {
    try {
      let tipoVeiculoUpdated = await Axios.put(url + "tipoVeiculos", tipoVeiculo);
      return tipoVeiculoUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(tipoVeiculo) {
    try {
      await Axios.delete(url + "tipoVeiculos", {
        data: tipoVeiculo
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
