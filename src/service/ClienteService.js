'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class ClienteService {

  
  static async getAll() {
    try {
      let clientes = await Axios.get(url + "clientes");
      return clientes.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(cliente) {
    try {
      let clienteSaved = await Axios.post(url + "clientes", cliente);
      return clienteSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(cliente) {
    try {
      let clienteUpdated = await Axios.put(url + "clientes", cliente);
      return clienteUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(cliente) {
    try {
      await Axios.delete(url + "clientes", {
        data: cliente
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
