
var Highcharts = require('highcharts')
var websocket = require('websocket-stream')
var consoleStream = require('./consoleStream')
var seriesSink = require('./seriesSink')
var $ = require('jquery')

var ws = websocket('ws://localhost:8888')
var cs = consoleStream();

Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });


var options = {
    chart: {
        type: 'line',
        animation: Highcharts.svg, // don't animate in old IE
    },
    title: {
        text: 'Live sine data'
    },
    xAxis: {
        type: 'datetime',
        minRange: 10000,
        ordinal: false
    },
    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
        min: -100.0,
        max: 100.0,
        ordinal: false
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [
        {
            name: 'Sine data',
            data: []
        }
    ]
}


$(document).ready(function () {
  var chartEle = $('#chart')[0]
  console.log(chartEle)
  var chartRef = Highcharts.chart(chartEle, options, function(chart) {
    ss = seriesSink(chart.series[0])
    ws.pipe(ss)
  })

  //ws.pipe(cs)
})
