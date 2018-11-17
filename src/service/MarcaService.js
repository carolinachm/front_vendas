'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class MarcaService {

  
  static async getAll() {
    try {
      let marcas = await Axios.get(url + "marcas");
      //console.log(JSON.parse(marcas.data.usuario))
      return marcas.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(marca) {
    try {
      let marcaSaved = await Axios.post(url + "marcas", marca);
      return marcaSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(marca) {
    try {
      let marcaUpdated = await Axios.put(url + "marcas", marca);
      return marcaUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(marca) {
    try {
      await Axios.delete(url + "marcas", {
        data: marca
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
