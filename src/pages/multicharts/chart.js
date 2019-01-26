import {
  population,
  country_distribution,
  tem_by_cities
} from './data'

export function drawBar(canvas, width, height, F2) {
  const data = population;
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    '人口数量': {
      tickCount: 5
    }
  });
  chart.coord({
    transposed: true
  });
  chart.axis('State', {
    line: F2.Global._defaultAxis.line,
    grid: null
  });
  chart.axis('人口数量', {
    line: null,
    grid: F2.Global._defaultAxis.grid,
    label(text, index, total) {
      const textCfg = {
        text: text / 1000 + ' k'
      };
      if (index === 0) {
        textCfg.textAlign = 'left';
      }
      if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.tooltip({
    custom: true, // 自定义 tooltip 内容框
    onChange(obj) {
      const legend = chart.get('legendController').legends.top[0];
      const tooltipItems = obj.items;
      const legendItems = legend.items;
      const map = {};
      legendItems.map(item => {
        map[item.name] = Object.assign({}, item);
      });
      tooltipItems.map(item => {
        const {
          name,
          value
        } = item;
        if (map[name]) {
          map[name].value = (value);
        }
      });
      legend.setItems(Object.values(map));
    },
    onHide() {
      const legend = chart.get('legendController').legends.top[0];
      legend.setItems(chart.getLegendItems().country);
    }
  });
  chart.interval().position('State*人口数量').color('年龄段').adjust('stack');

  chart.render();

  return chart;
}

export function drawScatter(canvas, width, height, F2) {
  const data = country_distribution;
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data, {
    x: {
      alias: 'Daily fat intake', // 定义别名
      tickInterval: 5, // 自定义刻度间距
      nice: false, // 不对最大最小值优化
      max: 96, // 自定义最大值
      min: 62, // 自定义最小是
    },
    y: {
      alias: 'Daily sugar intake',
      tickInterval: 50,
      nice: false,
      max: 165,
      min: 0,
    },
    z: {
      alias: 'Obesity(adults) %',
    },
  });
  // 开始配置坐标轴
  chart.axis('x', {
    label(text) {
      return {
        text: text + ' gr' // 格式化坐标轴显示文本
      };
    },
    grid: {
      stroke: '#d9d9d9',
      lineWidth: 1,
      lineDash: [2, 2]
    }
  });
  chart.axis('y', {
    line: F2.Util.mix({}, F2.Global._defaultAxis.line, {
      top: false
    }),
    label(text) {
      if (text > 0) {
        return {
          text: text + ' gr'
        };
      }
    }
  });
  chart.tooltip(false);
  chart
    .point()
    .position('x*y')
    .color('#1890ff')
    .size('z', [10, 40])
    .shape('circle')
    .style({
      lineWidth: 1,
      stroke: '#1890ff',
      opacity: 0.3
    });

  // 绘制辅助文本
  data.map(item => {
    chart.guide().text({
      position: [item.x, item.y],
      content: item.name,
      style: {
        textAlign: 'center',
        textBaseline: 'middle',
        fill: '#1890FF'
      }
    });
  });
  chart.render();
  return chart;
}

export function drawRadial(canvas, width, height, F2) {
  const data = tem_by_cities;
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.coord('polar', {
    transposed: true,
    endAngle: Math.PI
  });

  chart.source(data);
  chart.axis('city', {
    grid: null,
    line: null
  });
  chart.axis('tem', false);
  chart.legend({
    position: 'right'
  });
  chart.interval().position('city*tem').
  color('city');
  chart.render();
  return chart;
}