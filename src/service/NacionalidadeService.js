'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class NacionalidadeService {

  
  static async getAll() {
    try {
      let nacionalidades = await Axios.get(url + "nacionalidades");
      return nacionalidades.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(nacionalidade) {
    try {
      let nacionalidadeSaved = await Axios.post(url + "nacionalidades", nacionalidade);
      return nacionalidadeSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(nacionalidade) {
    try {
      let nacionalidadeUpdated = await Axios.put(url + "nacionalidades", nacionalidade);
      return nacionalidadeUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(nacionalidade) {
    try {
      await Axios.delete(url + "nacionalidades", {
        data: nacionalidade
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
