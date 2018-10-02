'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class UsuarioService {

 

  static async getAll() {
    try {
      let usuarios = await Axios.get(url + "usuarios");
      return usuarios.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(usuario) {
    try {
      let usuarioSaved = await Axios.post(url + "usuarios", usuario);
      return usuarioSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(usuario) {
    try {
      let usuarioUpdated = await Axios.put(url + "usuarios", usuario);
      return usuarioUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(usuario) {
    try {
      await Axios.delete(url + "usuarios", {
        data: usuario
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
