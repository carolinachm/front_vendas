// <script>

//   import {Line, mixins} from 'vue-chartjs' // We specify what type of chart we want from vue-chartjs and the mixins module
//   const { reactiveProp } = mixins

//   export default Line.extend({ //We are extending the base chart class as mentioned above
//     mixins: [reactiveProp],
//     data () {
//       return {
//         options: { //Chart.js options
//           scales: {
//             yAxes: [{
//               ticks: {
//                 beginAtZero: true
//               },
//               gridLines: {
//                 display: true
//               }
//             }],
//             xAxes: [ {
//               gridLines: {
//                 display: false
//               }
//             }]
//           },
//           legend: {
//             display: true
//           },
//           responsive: true,
//           maintainAspectRatio: false
//         }
//       }
//     },
//     mounted () {
//       // this.chartData is created in the mixin
//       this.renderChart(this.chartData, this.options)
//     }
//   })
// </script>
import { Line } from 'vue-chartjs';

export default {
   extends: Line,
   data() {
      return {
         datacollection: {
            //Data to be represented on x-axis
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
               label: 'Data One',
               backgroundColor: '#f87979',
               pointBackgroundColor: 'white',
               borderWidth: 1,
               pointBorderColor: '#249EBF',
               //Data to be represented on y-axis
               data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            }]
         },
         //Chart.js options that controls the appearance of the chart
         options: {
            scales: {
               yAxes: [{
                  ticks: {
                     beginAtZero: true
                  },
                  gridLines: {
                     display: true
                  }
               }],
               xAxes: [{
                  gridLines: {
                     display: false
                  }
               }]
            },
            legend: {
               display: true
            },
            responsive: true,
            maintainAspectRatio: false
         }
      }
   },
   mounted() {
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
   }
}