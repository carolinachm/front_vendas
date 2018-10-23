'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class ContatoService {

  
  static async getAll() {
    try {
      let contatos = await Axios.get(url + "contatos");
      console.log(contatos.data)
      return contatos.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(contato) {
    try {
      let contatoSaved = await Axios.post(url + "contatos", contato);
      return contatoSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(contato) {
    try {
      let contatoUpdated = await Axios.put(url + "contatos", contato);
      return contatoUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(contato) {
    try {
      await Axios.delete(url + "contatos", {
        data: contato
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
