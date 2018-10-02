"use strict";

export default class PersonConverter {

  static getPersonConverterFrom(person = {}) {
    if (person === {} || person === null || person === undefined) {
      return null;
    }

    return {
      activityMain: person.atividade_principal,
      dateSituation: person.data_situacao,
      socialName: person.nome,
      state: person.uf,
      phone: person.telefone,
      email: person.email,
      secondaryEconomicActivity: person.atividades_secundarias,
      qsa: person.qsa,
      situation: person.situacao,
      district: person.bairro,
      address: person.logradouro,
      number: person.numero,
      cep: person.cep,
      city: person.municipio,
      openingDate: person.abertura,
      legalNature: person.natureza_juridica,
      fantasyName: person.fantasia,
      cnpj: person.cnpj,
      lastUpdate: person.ultima_atualizacao,
      status: person.status,
      type: person.tipo,
      complement: person.complemento,
      efr: person.efr,
      situationReason: person.motivo_situacao,
      specialSituation: person.situacao_especial,
      dateSpecialSituation: person.data_situacao_especial,
      shareCapital: person.capital_social,
      extra: person.extra,
      billing: person.billing,
      isLegalPerson: person.isLegalPerson,
    };
  } // getPersonConverterFrom()

} // class
