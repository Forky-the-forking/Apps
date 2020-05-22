<template>
  <div>
    <apexchart type="area" height="1000" width="2000" ref="chart" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'chart',
  props: ['coinChartData'],
  data: function() {
    return {
      series: [{
        name: 'Price',
        data : this.coinChartData.data
      }],
      chartOptions: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 1000,
          zoom: {
            autoScaleYaxis: true
          }
        },
        annotations: {
          yaxis: [{ 
            y: this.coinChartData.label,
            borderColor: '#999',
            decimalsInFloat: 1,
            label: {
              show: true,
              text: 'Limit',
              style: {
                color: "#fff",
                background: '#00E396',
                fontSize: '20px',
                fontWeight: 'bold',
              },
            }
          }],
          xaxis: [{
            x: Date.now(),
            borderColor: '#999',
            label: {
              show: true,
              text: 'Rally',
              style: {
                color: "#fff",
                background: '#775DD0',
                fontSize: '20px',
                fontWeight: 'bold',
              }
            }
          }]
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: Date.now() - (86400000 * 365),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        selection: "test"
      }
    }
  }
}
</script>