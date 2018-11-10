'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class ProdutoService {

  
  static async getAll() {
    try {
      let produtos = await Axios.get(url + "produtos");
      return produtos.data;
    } catch (error) {
      throw error;
    }
  } // getAll()
// remove()
} // class
