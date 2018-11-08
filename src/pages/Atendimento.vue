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
                <v-flex xs12 sm6 d-flex>
                  <v-select :items="usuarios" label="Selecione a usuario" v-model="atendimento.usuario" item-text="login" return-object></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <v-text-field slot="activator" v-model="date" label="Picker in menu" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <v-text-field slot="activator" v-model="date" label="Picker in menu" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="atendimento.nome" label="Nome"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="atendimento.telefone" label="Telefone"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="atendimento.email" label="E-mail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-select xs12 :items="items" label="Status"></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea solo name="input-7-4" label="Descrição" v-model="atendimento.descricao"></v-textarea>
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
  
    <v-data-table :headers="headers" :items="atendimentos" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.dataAbertura }}</td>
          <td class="text-xs-center">{{ props.item.dataEncerramento }}</td>
          <td class="text-xs-center">{{ props.item.nome }}</td>
           <td class="text-xs-center">{{ props.item.telefone }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
             <td class="text-xs-center">{{ props.item.status }}</td>
          <td class="justify-center layout px-0">
             <v-icon small class="mr-2" @click="description(props.item)" title="Descrição">description</v-icon>
            <v-icon small class="mr-2" @click="edit(props.item)" title="Editar registro">edit</v-icon>
            <v-icon small @click="remove(props.item)" title="Excluir registro">delete</v-icon>
          </td>
</template>

<template slot="footer" v-if="records>
   0">
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
  import AtendimentoService from '../service/AtendimentoService';
  import UsuarioService from '../service/UsuarioService';
  
  
  export default {
    data: () => ({
      title: "Listagem de atendimento",
      buttonTitle: "Novo",
      dialog: false,
      footerText: "Total de registros: ",
      emptyRecordsText: "Nenhum registro encontrado",
      records: 0,
      atendimentos: [{
        usuario: {}
      }],
      atendimento: {},
      usuarios: [],
      usuario: {},
      items: ['Ativo', 'Inativo'],
      date: null,
      menu: false,
      modal: false,
      headers: [{
          text: 'DataAbertura',
          align: "center",
          value: 'dataAbertura'
        },
        {
          text: 'DataEncerramento',
          align: "center",
          value: 'dataEncerramento'
        },
       
        {
          text: 'Nome',
          align: "center",
          value: 'nome'
        },
        {
          text: 'Telefone',
          align: "center",
          value: 'telefone'
        },
        {
          text: 'E-mail',
          align: "center",
          value: 'email'
        },
        {
          text: 'Status',
          align: "center",
          value: 'status'
        },
        {
          text: 'Ações',
          value: 'id',
          sortable: false
        },
        {},
      ],
    }),
  
    computed: {
      formTitle() {
        return this.atendimento._id ? 'Editar atendimento' : 'Novo atendimento'
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
        for (let i = 0; i < this.atendimentos.length; i++) {
          amount++;
        }
        this.records = amount;
      },
  
      async initialize() {
        this.usuarios = await UsuarioService.getAll();
        console.log(this.usuarios)
        this.atendimentos = await AtendimentoService.getAll();
        this.atendimento = {};
        this.dialog = false;
        this.calculateRecords();
      },
  
      edit(p) {
        this.atendimento = p;
        this.dialog = true;
      },
  
      async remove(atendimento) {
        if (confirm('Tem certeza que deseja excluir este registro ?')) await AtendimentoService.remove(atendimento);
        this.initialize();
      },
  
      async save() {
        if (this.atendimento._id) {
          await AtendimentoService.update(this.atendimento);
  
        } else {
          await AtendimentoService.save(this.atendimento);
  
        }
        this.initialize();
        this.clear();
      }, // save()
  
      async clear() {
        this.atendimento = {};
      }
    }
  }
</script>

<style>
  
</style>
