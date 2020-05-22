
<template>

 <div>
    <div id="chart" class="column">
          <div class="toolbar">
            <button id="one_month"
                @click="updateData('one_month')"
                >
              1M
            </button>
            
            <button id="six_months"
                @click="updateData('six_months')"
                >
              6M
            </button>
            
            <button id="one_year"
                @click="updateData('one_year')"
            >
              1Y
            </button>
          </div>
           <div id="chart-timeline">
            <chart ref="chart" :coinChartData="coinChartData" />
          </div> 
        </div>
 </div>
</template>

<script>
import chart from './chart.vue';
export default {
  name:'chartItem',
  props:['slug','coinChartData'],
    components: {
      'chart' :  chart
  },
  methods: {
      updateData: function(timeline) {
      switch (timeline) {
          case 'one_month':
          this.$refs.chart.$refs.chart.zoomX(
        
              Date.now() - (86400000 * 30),
              Date.now()
          )
          break
          case 'six_months':
          this.$refs.chart.$refs.chart.zoomX(
              Date.now() - (86400000 * 180),
              Date.now()
          )
          break
          case 'one_year':
          this.$refs.chart.$refs.chart.zoomX(
              Date.now() - (86400000 * 365),
              Date.now()
          )
          break
          default:
      }
    }
  }
}
</script>