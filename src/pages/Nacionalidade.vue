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
                  <v-text-field v-model="nacionalidade.descricao" label="Descrição"></v-text-field>
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

    <v-data-table :headers="headers" :items="nacionalidades" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.descricao }}</td>
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
  import NacionalidadeService from '../service/NacionalidadeService';

  export default {
    data: () => ({
      title: "Listagem de nacionalidade",
      buttonTitle: "Novo",
      dialog: false,
      footerText: "Total de registros: ",
      emptyRecordsText: "Nenhum registro encontrado",
      records: 0,
        nacionalidades: [],
      nacionalidade: {},
      headers: [{
          text: 'Descricao',
          align: "center",
          value: 'descricao'
        },
       
        { text: 'Ações', value: 'id', sortable: false },
        {},
      ],
    }),

    computed: {
      formTitle() {
        return this.nacionalidade._id ? 'Editar nacionalidade' : 'Novo nacionalidade'
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
        for (let i = 0; i < this.nacionalidades.length; i++) {
          amount++;
        }
        this.records = amount;
      },

      async initialize() {
        this.nacionalidades = await NacionalidadeService.getAll();
        this.nacionalidade = {};
        this.dialog = false;
        this.calculateRecords();
      },

      edit(p) {
        this.nacionalidade = p;
        this.dialog = true;
      },

      async remove(nacionalidade) {
        if (confirm('Tem certeza que deseja excluir este registro ?')) await NacionalidadeService.remove(nacionalidade);
        this.initialize();
      },

      async save() {
        if (this.nacionalidade._id) {
          await NacionalidadeService.update(this.nacionalidade);
        } else {
          await NacionalidadeService.save(this.nacionalidade);
        }
        this.initialize();
        this.clear();
      }, // save()

      async clear(){
          this.nacionalidade = {};
      }
    }
  }

</script>

<style>

</style>
