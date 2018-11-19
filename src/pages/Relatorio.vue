<template>
  <div class="container">

    

    <v-form ref="form" v-model="valid" lazy-validation>

     <v-list-tile v-for="(job, index) in items" :key="job.title">
    <v-list-tile-content>
        <v-checkbox :value="job.title" 
                    :key="job.title"
                    :label="job.title"
                    v-model="checkboxes[index].checked">
        </v-checkbox>
    </v-list-tile-content>
</v-list-tile>
   
    <!-- <v-btn color="blue darken-1" flat @click.native.stop.prevent="abrirGerarRelatorio();">Gerar Relatório</v-btn> -->
    
  </v-form>

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
        dataPoints: null,
        height: 20,
        checkboxes: [],
    jobs:[],
        gerarRelatorio: false,
         valid: true
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
      },
      items () {
  this.checkboxes = this.jobs.map(job => {
    return {
      checked:false
    }
  })
    return this.jobs
},
jobs () {
  return this.jobs
}
    },
     created() {
    this.$nextTick(() => {
      this.jobs = [
      {
        ProdutoxVendas: {
          title: "job 1"
        }
      },
      {
        L9cWVNxnQMfumDkUxp: {
          title: "job 2"
        }
      },
      {
        L9cWVNxnQMfumDkxxp: {
          title: "job 3"
        }
      }]
    })
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