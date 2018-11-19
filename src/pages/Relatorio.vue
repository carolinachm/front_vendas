<template>
  <div class="container">

     <v-toolbar-title>{{ title }}</v-toolbar-title>
  
      <v-spacer></v-spacer>

    <v-form ref="form" v-model="valid" lazy-validation>
      
    <div>
      <v-checkbox
      v-model="checkbox"
      label="Produto X Vendas"
      required
    ></v-checkbox>
    </div>
    
    <v-checkbox
      v-model="checkbox1"
      label="Item mais pesquisados"
      required
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox2"
      label="Venda x Perfil"
      required
    ></v-checkbox>

     <v-radio-group v-model="row" row>
      <v-radio label="Resumido" value="radio-1"></v-radio>
      <v-radio label="Concluido" value="radio-2"></v-radio>
    </v-radio-group>

    <v-radio-group v-model="row" row>
      <v-radio label="pdf" value="radio-1"></v-radio>
      <v-radio label=".xls" value="radio-2"></v-radio>
       <v-radio label=".txt" value="radio-2"></v-radio>

        <v-btn color="blue darken-1" >Exportar</v-btn>
    </v-radio-group>

   
    
  </v-form>

   <v-layout row wrap>
    <v-flex xs12 sm6 md4>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Data inicial"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs12 sm6 md4>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Data final"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-flex>
   
    <v-spacer></v-spacer>
  </v-layout>

   <div class="Chart">
      <h1 style="text-align:center;">Relatório</h1>
      <bar-example/>
    </div>
    
    
  </div>
</template>

<script>
  import BarExample from '@/components/BarExample'
  

  export default {
    components: {
      BarExample,
     
    },
    data () {
      return {
         title: "Relatorio",
        dataPoints: null,
        height: 20,
        checkbox: false,
        checkbox1: false,
        checkbox2: false,
        gerarRelatorio: false,
        radioGroup: 1,
         valid: true,
         date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      column: null,
        row: null
      }
    },
    mounted () {
      setInterval(() => {
        this.fillData()
      }, 2000)
    },
    methods: {
      increaseHeight () {
        this.height += 10
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData () {
        this.dataPoints = {
          labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
       abrirGerarRelatorio() {
  
        console.log("Abrir dialog")
  
        this.gerarRelatorio = true;
  
      },
    },
    computed: {
      myStyles () {
        return {
          height: `${this.height}px`,
          position: 'relative'
        }
      }
    }
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-family: 'Helvetica', Arial;
    color: #464646;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
  }

  .Chart {
    padding: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
  }
</style>