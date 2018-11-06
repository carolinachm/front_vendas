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
                  <v-text-field v-model="acessorio.descricao" label="Descrição"></v-text-field>
                </v-flex>
               <v-flex xs6>
        <v-flex xs12 sm6 d-flex>
        <v-select
          :items="status"
          label="Status"
        ></v-select>
      </v-flex>
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

    <v-data-table :headers="headers" :items="acessorios" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.descricao }}</td>
        <td class="text-xs-center">{{ props.item.valor }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
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
  import AcessorioService from '../service/AcessorioService';

  export default {
    data: () => ({
      title: "Listagem de acessorio",
      buttonTitle: "Novo",
      dialog: false,
      footerText: "Total de registros: ",
      emptyRecordsText: "Nenhum registro encontrado",
      records: 0,
      acessorios: [],
      acessorio: {},
     status: ['Ativo', 'Inativo'],
      headers: [{
          text: 'Descricao',
          align: "center",
          value: 'descricao'
        },
        {
          text: 'Valor',
          align: "center",
          value: 'valor'
        },
        {
          text: 'Status',
          align: "center",
          value: 'status'
        },
        { text: 'Ações', value: 'id', sortable: false },
        {},
      ],
    }),

    computed: {
      formTitle() {
        return this.acessorio._id ? 'Editar acessorio' : 'Novo acessorio'
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
        for (let i = 0; i < this.acessorios.length; i++) {
          amount++;
        }
        this.records = amount;
      },

      async initialize() {
        this.acessorios = await AcessorioService.getAll();
        this.acessorio = {};
        this.dialog = false;
        this.calculateRecords();
      },

      edit(p) {
        this.acessorio = p;
        this.dialog = true;
      },

      async remove(acessorio) {
        if (confirm('Tem certeza que deseja excluir este registro ?')) await AcessorioService.remove(acessorio);
        this.initialize();
      },

      async save() {
        if (this.acessorio._id) {
          await AcessorioService.update(this.acessorio);
          this.initialize();
        } else {
          await AcessorioService.save(this.acessorio);
          this.initialize();
        }
        this.initialize();
        this.clear();
      }, // save()

      async clear(){
          this.acessorio = {};
      }
    }
  }

</script>

<style>

</style>
