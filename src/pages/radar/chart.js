import { data } from './data'

export function drawChart(canvas, width, height, F2) {
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  
  chart.coord('polar');
  chart.source(data, {
    score: {
      min: 0,
      max: 120,
      nice: false,
      tickCount: 4
    }
  });

  chart.tooltip({
    custom: true, // 自定义 tooltip 内容框
    onChange: function onChange(obj) {
      var legend = chart.get('legendController').legends.top[0];
      var tooltipItems = obj.items;
      var legendItems = legend.items;
      var map = {};
      legendItems.map(function(item) {
        map[item.name] =  Object.assign({}, item);
      });
      tooltipItems.map(function(item) {
        var name = item.name;
        var value = item.value;
        if (map[name]) {
          map[name].value = value;
        }
      });
      legend.setItems(Object.values(map));
    },
    onHide: function onHide() {
      var legend = chart.get('legendController').legends.top[0];
      legend.setItems(chart.getLegendItems().country);
    }
  });
  chart.axis('score', {
    label: function label(text, index, total) {
      if (index === total - 1) {
        return null;
      }
      return {
        top: true
      };
    },
    grid: {
      lineDash: null,
      type: 'arc' // 弧线网格
    }
  });
  chart.axis('item', {
    grid: {
      lineDash: null
    }
  });
  
  chart.line().position('item*score').color('user');
  chart.point().position('item*score').color('user').style({
    stroke: '#fff',
    lineWidth: 1
  });

  chart.render();

  return chart
}