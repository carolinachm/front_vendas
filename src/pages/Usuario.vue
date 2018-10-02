<template>

  <div>
    <v-toolbar flat>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">

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
                  <v-text-field v-model="usuario.login" label="Login"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="usuario.senha" label="Senha"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="usuario.vendedor" label="Vendedor"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="usuario.status" label="Status"></v-text-field>
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

    <v-data-table :headers="headers" :items="usuarios" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.login }}</td>
        <td class="text-xs-center">{{ props.item.vendedor }}</td>
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
  import UsuarioService from '../service/UsuarioService';

  export default {
    data: () => ({
      title: "Listagem de usuarios",
      buttonTitle: "Novo",
      dialog: false,
      footerText: "Total de registros: ",
      emptyRecordsText: "Nenhum registro encontrado",
      records: 0,
      usuarios: [],
      usuario: {},
      headers: [{
          text: 'Login',
          align: "center",
          value: 'login'
        },
        {
          text: 'Vendedor',
          align: "center",
          value: 'vendedor'
        },
        {
          text: 'Status',
          align: "center",
          value: 'status'
        },{ text: 'Ações', value: 'id', sortable: false },
        {},
      ],
    }),

    computed: {
      formTitle() {
        return this.usuario._id ? 'Alterar usuario' : 'Criar usuario'
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
        for (let i = 0; i < this.usuarios.length; i++) {
          amount++;
        }
        this.records = amount;
      },

      async initialize() {
        this.usuarios = await UsuarioService.getAll();
        this.usuario = {};
        this.dialog = false;
        this.calculateRecords();
      },

      edit(p) {
        this.usuario = p;
        this.dialog = true;
      },

      async remove(usuario) {
        if (confirm('Tem certeza que deseja excluir este registro ?')) await UsuarioService.remove(usuario);
        this.initialize();
      },

      async save() {
        if (this.usuario._id) {
          await UsuarioService.update(this.usuario);
        } else {
          await UsuarioService.save(this.usuario);
        }
        this.initialize();
      }, // save()
    }
  }

</script>

<style>

</style>
