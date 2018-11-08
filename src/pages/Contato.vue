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
                  <v-text-field v-model="contato.dataContato" label="Data contato"></v-text-field>
                </v-flex>
                  <v-flex xs6>
                  <v-flex xs12 >
                    <v-select :items="clientes" name="cliente" label="Selecione o cliente" v-model="contato.cliente" item-text="nome" return-object></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-select :items="atendimentos" name="atendimento" label="Selecione o atendimento" v-model="contato.atendimento" item-text="nome" return-object></v-select>
  
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
  
    <v-data-table :headers="headers" :items="contatos" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.dataContato }}</td>
          <td class="text-xs-center">{{ props.item.cliente.nome}}</td>
          <td class="text-xs-center">{{ props.item.atendimento.nome}}</td>
          <td class="justify-center layout px-0">
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
  import ContatoService from '../service/ContatoService';
  import ClienteService from '../service/ClienteService';
  import AtendimentoService from '../service/AtendimentoService';
  
  export default {
    data: () => ({
      title: "Listagem de contato",
      buttonTitle: "Novo",
      dialog: false,
      footerText: "Total de registros: ",
      emptyRecordsText: "Nenhum registro encontrado",
      records: 0,
      contatos: [{cliente:{}, atendimento:{}}],
      contato: {},
      clientes: [],
      cliente: {},
      atendimentos: [],
      atendimento: {},
      items: ['clientes', 'atendimentos'],
      headers: [{
          text: 'Descricao',
          align: "center",
          value: 'descricao'
        },
        {
          text: 'Cliente',
          align: "center",
          value: 'cliente'
        },
        {
          text: 'Atendimento',
          align: "center",
          value: 'atendimento'
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
        return this.contato._id ? 'Editar contato' : 'Novo contato'
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
        for (let i = 0; i < this.contatos.length; i++) {
          amount++;
        }
        this.records = amount;
      },
  
      async initialize() {
         this.clientes = await ClienteService.getAll();
        this.atendimentos = await AtendimentoService.getAll();
        this.contatos = await ContatoService.getAll();
        this.contato = {};
        this.dialog = false;
        this.calculateRecords();
      },
  
      edit(p) {
        this.contato = p;
        this.dialog = true;
      },
  
      async remove(contato) {
        if (confirm('Tem certeza que deseja excluir este registro ?')) await ContatoService.remove(acessorio);
        this.initialize();
      },
  
      async save() {
        if (this.contato._id) {
          await ContatoService.update(this.contato);
  
        } else {
          await ContatoService.save(this.contato);
  
        }
        this.initialize();
        this.clear();
      }, // save()
  
      async clear() {
        this.contato = {};
      }
    }
  }
</script>

<style>
  
</style>
