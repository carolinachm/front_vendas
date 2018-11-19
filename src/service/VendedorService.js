'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class VendedorService {

  
  static async getAll() {
    try {
      let vendedores = await Axios.get(url + "vendedores");
      //console.log(JSON.parse(vendedores.data.usuario))
      return vendedores.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(vendedor) {
    try {
      let vendedoreSaved = await Axios.post(url + "vendedores", vendedor);
      return vendedorSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(vendedor) {
    try {
      let vendedoreUpdated = await Axios.put(url + "vendedores", vendedor);
      return vendedorUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(vendedor) {
    try {
      await Axios.delete(url + "vendedores", {
        data: vendedor
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
