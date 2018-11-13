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
  
                <v-text-field v-model="produto" label="Vendedor" disabled></v-text-field>
  
              </v-flex>
  
              <v-flex xs12 sm6>
  
                <v-text-field v-model="produto" label="ID Produto" disabled></v-text-field>
  
              </v-flex>
  
              <!--
  
                <div>
  
                <h1>{{title}}</h1>
  
                <img src="/static/img/palio.jpg">
  
                </div>
  
                -->
  
              <!--
  
                <div>
  
                <h1>Produto Ideal</h1>
  
                <img src="/static/img/palio.jpg">
  
                </div>
  
                -->
  
              <!--
  
                </div> 
  
                <h1>{{title}}</h1>
  
                <img src="/static/img/meriva.jpg">
  
                </div> 
  
                -->
  
              <!--
  
                </div> 
  
                <h1>{{title}}</h1>
  
                <img src="/static/img/fiesta.jpg">
  
                </div>              
  
                -->
  
            </v-layout>
  
          </v-container>
  
        </v-card-text>
  
        <v-card-actions>
  
          <v-spacer></v-spacer>
  
          <v-btn color="blue darken-1" flat @click.native.stop.prevent="abrirDialogPerfilAgendamento();">Gerar Atendimento</v-btn>
  
          <v-btn color="blue darken-1" flat @click.native.stop.prevent="closeDialogPerfilCliente();">Fechar</v-btn>
  
        </v-card-actions>
  
      </v-card>
  
    </v-dialog>

    <!-- DIALOG DO AGENDAMENTO -->
  
    <v-dialog v-model="dialogPerfilAgendamento" max-width="700px">
       <v-card>
          <v-card-title>
            <h3>AGENDAMENTO</h3>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-xl>
              <v-layout wrap row>
                <v-flex xs12 sm6 d-flex>
                  <v-select :items="usuarios" label="Selecione a usuario"  item-text="login" return-object></v-select>
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
              </v-layout>
            </v-container>
          </v-card-text>
       </v-card>
       </v-dialog>
    </div>
</template>

<script>
  import PerfilService from "../service/PerfilService";
  
  import AcessorioService from "../service/AcessorioService";
  
  import ClienteService from "../service/ClienteService";
  
  
  
  export default {
  
    data: () => ({
  
      title: "Perfil",
  
      buttonTitle: "Novo",
  
      dialog: false,
  
      dialogPerfilCliente: false,
  
      dialogPerfilAgendamento: false,
  
      footerText: "Total de registros: ",
  
      emptyRecordsText: "Nenhum registro encontrado",
  
      records: 0,
  
      perfis: [{
  
        cliente: {},
  
        produto: {}
  
      }],
  
      perfil: {
  
        cliente: {},
  
        produto: [{
  
          vendedor: {
  
            nomeVendedor: ""
  
          }
  
        }]
  
  
  
      },
  
      clientes: [],
  
      cliente: {},
  
      produtos: [],
  
      produto: {},
  
  
  
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
  
        this.produtos = await AcessorioService.getAll();
  
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
  
        this.produto = this.perfil.produto;
  
        this.dialog = false;
  
        this.dialogPerfilCliente = true;
  
        console.log(this.cliente)
  
        console.log(this.produto);
  
      },
  
      closeDialogPerfilCliente() {
  
        this.dialogPerfilCliente = false;
  
  
  
      },
  
      abrirDialogPerfilAgendamento() {
  
        console.log("Abrir dialog")
  
        this.dialogPerfilAgendamento = true;
  
      }
  
    }
  
  };
</script>

<style>
  
</style>
