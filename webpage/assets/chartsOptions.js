export default {
  create: function () {
    let options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'rgba(0,0,0,0)',
      },
      credits: { 
        enabled: false // 不显示LOGO 
      },
      title: {
        text: ''
      },
      tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              fontSize: '14'
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: '全队输出比',
        data: []
      }]
    }

    return options
  }
}
