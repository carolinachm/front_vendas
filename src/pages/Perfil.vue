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
  
                  <v-select :items="clientes" name="cliente" label="Selecione o cliente" v-model="perfil.cliente" @change="setarDados" item-text="cpf" return-object>
  
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
  
                <v-text-field v-model="nomeVendedor" label="Vendedor" disabled></v-text-field>
  
              </v-flex>
  
              <v-flex xs12 sm6>
  
                <v-text-field v-model="codigoProduto" label="Codigo" disabled></v-text-field>
  
              </v-flex>
              <v-flex  xs12>
                <div class="title mb-1">Imagem</div>
                <v-layout column>
                  <div class="subheading"></div>
                  <v-img src="data:image/jpeg;base64,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" aspect-ratio="1.7"></v-img>
                 
                </v-layout>
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
  
          <v-btn color="blue darken-1" flat @click.native.stop.prevent="gerarAgendamento();">Gerar Atendimento</v-btn>
  
          <v-btn color="blue darken-1" flat @click.native.stop.prevent="closeDialogPerfilCliente();">Fechar</v-btn>
  
        </v-card-actions>
  
      </v-card>
  
    </v-dialog>
  
    <!-- DIALOG DO AGENDAMENTO    -->
  
    <v-dialog v-model="dialogPerfilAgendamento" max-width="700px">
      <v-card>
        <v-card-title>
          <h3>AGENDAMENTO</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-layout wrap row>
  
  
              <v-flex xs12 sm6>
                  <v-select :items="clientes" label="Selecione o Cliente" v-model="atendimento.cliente" item-text="nome" return-object></v-select>
                </v-flex>
                 <v-flex xs12 sm6>
                  <v-select :items="produtos" label="Selecione o produto" v-model="atendimento.produto" item-text="marca" return-object></v-select>
                </v-flex>
                 <v-flex xs12 sm6>
                  <v-select :items="perfis" label="Selecione o perfil" v-model="atendimento.perfil" item-text="cliente" return-object></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select :items="vendedor" label="Selecione o vendedor" v-model="atendimento.vendedor" item-text="nomeVendedor" return-object></v-select>
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
  
  </div>
</template>

<script>
  import PerfilService from "../service/PerfilService";
  import ProdutoService from "../service/ProdutoService";
  import ClienteService from "../service/ClienteService";
  import AtendimentoService from "../service/AtendimentoService";
  
  
  
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
  
        produto: {},
  
  
      }],
  
      perfil: {
  
        cliente: {
          produto:{
            vendedor:{}
          }
        },
  
        atendimento: {
           cliente:{},
           produto:{},
           prefil:{},
           vendedor:{}
  
        }
  
  
  
      },
  
      clientes: [],
  
      cliente: {},
  
      produtos: [],
  
      produto: {},
      atendimentos: [],
      atendimento: {},
      nomeVendedor: "",
      codigoProduto: "",
  
  
      items: ['Ativo', 'Inativo'],
  
      showDetails: false,
  
      date: null,
      menu: false,
      modal: false,
  
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
        
        this.atendimentos = await AtendimentoService.getAll();
  
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
  
        this.produto = this.perfil.produto;
  
        this.dialog = false;
  
        this.dialogPerfilCliente = true;
  
        console.log(this.cliente)
  
        console.log(this.produto);
  
      },
      async gerarAgendamento() {
        if (this.atendimento._id) {
          await AtendimentoService.update(this.atendimento);
  
        } else {
          await AtendimentoService.save(this.atendimento);
  
        }
        this.initialize();
        this.abrirDialogPerfilAgendamento();
        this.clear = {};
      }, // save()
  
      async clear() {
        this.atendimento = {};
      },
  
      closeDialogPerfilCliente() {
  
        this.dialogPerfilCliente = false;
  
  
  
      },
  
      abrirDialogPerfilAgendamento() {
  
        console.log("Abrir dialog")
  
        this.dialogPerfilAgendamento = true;
  
      },
      setarDados(){
        this.nomeVendedor = this.cliente.produto.vendedor.nomeVendedor;
        this.codigoProduto = this.cliente.produto.id;
      }
  
    }
  
  };
</script>

<style>
  
</style>
