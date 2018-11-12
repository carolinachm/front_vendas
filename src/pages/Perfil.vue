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
                  <v-select :items="clientes" name="cliente" label="Selecione o cliente" v-model="perfil.cliente" item-text="cpf" return-object>
                  </v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="findByCPF();">Gerar Perfil</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <!-- DIALOG DO PERFIL DO CLIENTE -->
    <v-dialog v-model="dialogPerfilCliente" max-width="700px">
      <v-card>
        <v-card-title>
          <h3>Perfil de Cliente</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-layout wrap row>
              <v-flex xs12 sm6>
                <v-text-field v-model="cliente.nome" label="Nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="cliente.produto" label="NomeVendedor" disabled></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="cliente.produto" label="Codigo" disabled></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="cliente.produto" label="Imagem" disabled></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native.stop.prevent="closeDialogPerfilCliente();">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import PerfilService from "../service/PerfilService";
  import ProdutoService from "../service/ProdutoService";
  import ClienteService from "../service/ClienteService";
  
  export default {
    data: () => ({
      title: "Perfil",
      buttonTitle: "Novo",
      dialog: false,
      dialogPerfilCliente: false,
      footerText: "Total de registros: ",
      emptyRecordsText: "Nenhum registro encontrado",
      records: 0,
      perfis: [{
        cliente: {},
        produto:{}
      }],
      perfil: {
        cliente: {},
        produto:{
          vendedor:{}
        },
        

      },
      clientes: [],
      cliente: {},
      produtos: [],
      produto:{},

      items: ['clientes', 'produtos'],
      showDetails: false,
      headers: [{
          text: "Cliente",
          align: "center",
          value: "cliente"
        },
        {
          text: "Ações",
          value: "id",
          sortable: false
        },
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
        this.produtos = await ProdutoService.getAll();
        this.clientes = await ClienteService.getAll();
        this.perfis = await PerfilService.getAll();
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
      async findByCPF() {
        this.cliente = this.perfil.cliente;
        this.dialog = false;
        this.dialogPerfilCliente = true;
        console.log(this.cliente)
      },
      closeDialogPerfilCliente() {
        this.dialogPerfilCliente = false;
  
      }
    }
  };
</script>

<style>
  
</style>
