<template>
  <div class="container">
      <h1 style="text-align:center;">Relatório</h1>
      <bar-example/>
      <router-link></router-link>
    </div>
 </template>

 <script>
  import BarExample from '@/components/BarExample'
  
  
  export default {
    components: {
      BarExample,
  
    },
    data() {
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
    mounted() {
      setInterval(() => {
        this.fillData()
      }, 2000)
    },
    methods: {
      increaseHeight() {
        this.height += 10
      },
      getRandomInt() {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData() {
        this.dataPoints = {
          labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }]
        }
      },     
    },
    computed: {
      myStyles() {
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


