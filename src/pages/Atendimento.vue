<template>
  <div>
    <v-toolbar flat>
  
      <v-toolbar-title>{{ title }}</v-toolbar-title>
  
      <v-spacer></v-spacer>
  
      <v-dialog v-model="dialog" max-width="700px">
  
       
  
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
  
          <v-card-text>
            <v-container grid-list-xl>
              <v-layout wrap row>
                                
                <v-flex xs12 sm6>
                  <v-select :items="clientes" label="Selecione o cliente" v-model="atendimento.cliente" item-text="nome" return-object></v-select>
                </v-flex>
                 <v-flex xs12 sm6>
                  <v-select :items="produtos" label="Selecione o produto" v-model="atendimento.produto" item-text="marca" return-object></v-select>
                </v-flex>
                 <v-flex xs12 sm6>
                  <v-select :items="vendedores" label="Selecione o Vendedor" v-model="nomeVendedor" item-text="nomeVendedor" return-object></v-select>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-select xs12 :items="items" label="Situação"></v-select>
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
            <td class="text-xs-center">{{ props.item.cliente }}</td>
            <td class="text-xs-center">{{ props.item.produto }}</td>
            <td class="text-xs-center">{{ props.item.vendedor }}</td>
             <td class="text-xs-center">{{ props.item.status }}</td>
          <td class="justify-center layout px-0">
            
            <v-icon small class="mr-2" @click="edit(props.item)" title="Editar registro">edit</v-icon>
           
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
  import ClienteService from '../service/ClienteService'
  import ProdutoService from '../service/ProdutoService'
 import VendedorService from '../service/VendedorService'
 
  
  
  export default {
    data: () => ({
      title: "Listagem de atendimento",
      buttonTitle: "Novo",
      dialog: false,
      footerText: "Total de registros: ",
      emptyRecordsText: "Nenhum registro encontrado",
      records: 0,
      atendimentos: [{
        cliente:{},
        produto: {},
        vendedor:{}
      }],
      atendimento: {},
      clientes:[],
      cliente:{},
      produtos:[],
      produto:{},
      vendedores:[],
      vendedor:{},
      nomeVendedor:"",
      items: ['Ativo', 'Inativo'],
      date: null,
      menu: false,
      modal: false,
      headers: [{
          text: 'Cliente',
          align: "center",
          value: 'cliente'
        },
        {
          text: 'Produto',
          align: "center",
          value: 'produto'
        },
       
        {
          text: 'Perfil',
          align: "center",
          value: 'perfil'
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
        this.clientes = await ClienteService.getAll();
        this.produtos = await ProdutoService.getAll();
        this.vendedores = await VendedorService.getAll();
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
      },
      setarDados(){
        this.nomeVendedor = this.atendimento.vendedor;
        console.log = (this.nomeVendedor)
      }
    }
  }
</script>

<style>
  
</style>
