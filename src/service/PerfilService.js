'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class PerfilService {

  
  static async getAll() {
    try {
      let perfis = await Axios.get(url + "perfis");
      return perfis.data;
    } catch (error) {
      throw error;
    }
  } // getAll()
  static async findByCPF(perfil){
    try {
      await Axios.get(url  + "perfis" , perfil)
    } catch (error) {
      throw error;
    }
  }

  static async save(perfil) {
    try {
      let perfilSaved = await Axios.post(url + "perfis", perfil);
      return perfilSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(perfil) {
    try {
      let perfilUpdated = await Axios.put(url + "perfis", perfil);
      return perfilUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(perfil) {
    try {
      await Axios.delete(url + "perfis", {
        data: perfil
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
