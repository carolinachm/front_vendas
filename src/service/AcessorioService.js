'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class AcessorioService {

  
  static async getAll() {
    try {
      let acessorios = await Axios.get(url + "acessorios");
      return acessorios.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(acessorio) {
    try {
      let acessorioSaved = await Axios.post(url + "acessorios", acessorio);
      return acessorioSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(acessorio) {
    try {
      let acessorioUpdated = await Axios.put(url + "acessorios", acessorio);
      return acessorioUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(acessorio) {
    try {
      await Axios.delete(url + "acessorios", {
        data: acessorio
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
