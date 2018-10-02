'use strict'

//import config from './../../configuration'
import Axios from 'axios'
import configuration from '../../configuration';
const url = configuration.apiHost;

export default class AtendimentoService {

  
  static async getAll() {
    try {
      let atendimentos = await Axios.get(url + "atendimentos");
      return atendimentos.data;
    } catch (error) {
      throw error;
    }
  } // getAll()

  static async save(atendimento) {
    try {
      let atendimentoSaved = await Axios.post(url + "atendimentos", atendimento);
      return atendimentoSaved.data;
    } catch (error) {
      throw error;
    }
  } // save()

  static async update(atendimento) {
    try {
      let atendimentoUpdated = await Axios.put(url + "atendimentos", atendimento);
      return atendimentoUpdated.data;
    } catch (error) {
      throw error;
    }
  } // update()

  static async remove(atendimento) {
    try {
      await Axios.delete(url + "atendimentos", {
        data: atendimento
      });
    } catch (error) {
      throw error;
    }
  } // remove()
} // class
