<template>

  <div>
    <v-toolbar flat>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="700px">

        <v-btn slot="activator" color="primary" dark flat fab title="Inserir um novo registro"> {{ buttonTitle }}
        </v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-xl>
              <v-layout wrap row>
             <v-flex xs12>
        <v-select
  :items="clientes"
  name="cliente"
  label="Selecione o cliente"
  v-model="perfil.cliente"
  item-text="nome"
 
  >
  </v-select>
             </v-flex>
             <v-flex xs12>
      <v-select
  :items="atendimentos"
  name="atendimento"
  label="Selecione o atendimento"
  v-model="perfil.atendimento"
  item-text="nome"
 
  ></v-select>
             </v-flex>
             <v-flex xs12>
  <v-select
    :items="acessorios"
    name= "acessorio"
    v-model="perfil.acessorio"
    label="Selecione os acessorios"
    multiple
    item-text="descricao"
  item-value="descricao"
  >
    <template
      slot="selecione"
      slot-scope="{ item, index }"
    >
      <v-chip v-if="index === 0">
        <span>{{ item }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >(+{{ acessorios.length - 1 }} others)</span>
    </template>
  </v-select>
             </v-flex>
     
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="initialize();">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save();">Salvar</v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="perfis" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
       
        <td class="text-xs-center">{{ props.item.cliente}}</td>
         <td class="text-xs-center">{{ props.item.atendimento}}</td>
        <td class="text-xs-center">{{ props.item.acessorios}}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="edit(props.item)" title="Editar registro">edit</v-icon>
          <v-icon small @click="remove(props.item)" title="Excluir registro">delete</v-icon>
        </td>


      </template>

      <template slot="footer" v-if="records > 0">
        <td colspan="100%">
          <strong> {{ footerText }} {{ records }} </strong>
        </td>
      </template>

      <template slot="no-data" v-else>
        <strong> {{ emptyRecordsText }} </strong>
      </template>
    </v-data-table>
  </div>

</template>

<script>
import PerfilService from "../service/PerfilService";
import ClienteService from "../service/ClienteService";
import AtendimentoService from "../service/AtendimentoService";
import AcessorioService from "../service/AcessorioService";

export default {
  data: () => ({
    title: "Listagem de Perfil",
    buttonTitle: "Novo",
    dialog: false,
    footerText: "Total de registros: ",
    emptyRecordsText: "Nenhum registro encontrado",
    records: 0,
    perfis: [],
    perfil: {},
    clientes: [],
    cliente:{},
    atendimentos: [],
    atendimento: {},
    acessorios: [],
    acessorio:{},
     items:['clientes', 'atendimentos', 'acessorios'],
     showDetails: false,

    headers: [
      {
        text: "Cliente",
        align: "center",
        value: "cliente"
      },
      {
        text: "Antendimento",
        align: "center",
        value: "atendimento"
      },
      {
        text: "Acessorios",
        align: "center",
        value: "acessorio"
      },
      { text: "Ações", value: "id", sortable: false },
      {}
    ]
  }),

  computed: {
    formTitle() {
      return this.perfil._id ? "Editar Perfil" : "Novo Perfil";
    }
  },

  watch: {
    dialog(val) {
      val || this.initialize();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    calculateRecords() {
      let amount = 0;
      for (let i = 0; i < this.perfis.length; i++) {
        amount++;
      }
      this.records = amount;
    },

    async initialize() {
      this.perfis = await PerfilService.getAll();
      this.clientes = await ClienteService.getAll();
      this.atendimentos = await AtendimentoService.getAll();
      this.acessorios = await AcessorioService.getAll();
      this.perfil = {};
      this.dialog = false;
      this.calculateRecords();
    },
    description(item) {
      if (item.perfil) {
        this.legalDetails = item;
      } else {
        this.physicalDetails = item;
        this.isPhysical = true;
      }
      this.showDetails = true;
    },


    edit(p) {
      this.perfil = p;
      this.dialog = true;
    },

    async remove(perfil) {
      if (confirm("Tem certeza que deseja excluir este registro ?"))
        await PerfilService.remove(perfil);
      this.initialize();
    },

    async save() {
      if (this.perfil._id) {
        await PerfilService.update(this.perfil);
      
      } else {
        await PerfilService.save(this.perfil);
      
      }
      this.initialize();
      this.clear();
    }, // save()

    async clear() {
      this.perfil = {};
    }
  }
};
</script>

<style>
</style>
