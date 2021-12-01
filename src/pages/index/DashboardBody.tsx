import { Select, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import * as G2 from '@antv/g2'
import DataSet from '@antv/data-set';

interface visitI {
  company: string,
  num: number,
  type: string
}

interface evaluateI {
  item: string,
  percent: number,
  count: number,
}
const DashboardBody: React.FC<any> = (props) => {
  const { Option } = Select;
  const [evaluateData, setEvaluateData] = useState<evaluateI[]>([{
    item: '五星',
    percent: 0.23,
    count: 40
  }, {
    item: '四星',
    percent: 0.27,
    count: 40
  }, {
    item: '三星',
    percent: 0.30,
    count: 40
  }, {
    item: '二星',
    percent: 0.19,
    count: 40
  }, {
    item: '一星',
    percent: 0.19,
    count: 40
  }])
  const [visitData, setVisitData] = useState<visitI[]>([
    { company: '用户数', num: 26, type: 'Jan' },
    { company: '访问人数', num: 54, type: 'Jan' },
    { company: '用户数', num: 67, type: 'Feb' },
    { company: '访问人数', num: 12, type: 'Feb' },
    { company: '用户数', num: 64, type: 'Mar' },
    { company: '访问人数', num: 23, type: 'Mar' },
    { company: '用户数', num: 26, type: 'Apr' },
    { company: '访问人数', num: 54, type: 'Apr' },
    { company: '用户数', num: 67, type: 'May' },
    { company: '访问人数', num: 12, type: 'May' },
    { company: '用户数', num: 64, type: 'Jun' },
    { company: '访问人数', num: 23, type: 'Jun' },
    { company: '用户数', num: 26, type: 'Jul' },
    { company: '访问人数', num: 54, type: 'Jul' },
    { company: '用户数', num: 67, type: 'Aug' },
    { company: '访问人数', num: 12, type: 'Aug' },
    { company: '用户数', num: 64, type: 'Sep' },
    { company: '访问人数', num: 23, type: 'Sep' },
    { company: '用户数', num: 26, type: 'Oct' },
    { company: '访问人数', num: 54, type: 'Oct' },
    { company: '用户数', num: 67, type: 'Dec' },
    { company: '访问人数', num: 12, type: 'Dec' }
  ])// G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
  // Step 1: 创建 Chart 对象
  let visitChart: any = ''
  let evaluateChart: any = ''
  //  /* 图标显示访问人数 和用户数量 */
  // const e = document.createEvent('Event')
  // e.initEvent('resize', true, true)
  // window.dispatchEvent(e)

  useEffect(() => {
    visitChart = new G2.Chart({
      container: 'visit', // 指定图表容器 ID
      autoFit: true,
      // width: 520, // 指定图表宽度
      height: 260 // 指定图表高度
    });
    // Step 2: 载入数据源
    visitChart.source(visitData);
    visitChart.scale('num', {
      alias: '人数',
      max: 100,
      min: 0,
      tickCount: 10
    });
    visitChart.axis('type', {
      label: {
        style: {
          fill: '#aaaaaa'
        }
      },
      tickLine: {
        alignTick: false,
        length: 0
      }
    });
    visitChart.legend({
      position: 'top-left',
    });
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    visitChart.interval().position('type*num').color('company').adjust([{
      type: 'dodge',
      marginRatio: 1 / 12
    }]).style({
      // lineCap:'round',
    });
    // Step 4: 渲染图表
    visitChart.render();
  }, [])
  // /* 评价比例 图表初始化
  useEffect(() => {
    // var sum:number = 500;
    // var ds:any  = new DataSet();
    // var dv = ds.createView().source(evaluateData);
    // dv.transform({
    //   type: 'map',
    //   callback: function callback(row:any) {
    //     row.value = sum * parseInt(row.percent);
    //     return row;
    //   }
    // });
    evaluateChart = new G2.Chart({
      container: 'evaluate',
      autoFit: true,
      height: 260,
      padding: 'auto'
    });
    evaluateChart.data(evaluateData);
    evaluateChart.scale('percent', {
      formatter: (val: any) => {
        val = val * 100 + '%';
        return val;
      },
    });
    evaluateChart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.6,
    });
    evaluateChart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    // 辅助文本
    evaluateChart
      .annotation()
      .text({
        position: ['50%', '50%'],
        content: '总评价人数',
        style: {
          fontSize: 14,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetY: -10,
      })
      .text({
        position: ['50%', '50%'],
        content: '600',
        style: {
          fontSize: 20,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetX: 0,
        offsetY: 20,
      })
      // .text({
      //   position: ['50%', '50%'],
      //   content: '台',
      //   style: {
      //     fontSize: 14,
      //     fill: '#8c8c8c',
      //     textAlign: 'center',
      //   },
      //   offsetY: 20,
      //   offsetX: 20,
      // });
    evaluateChart
      .interval()
      .adjust('stack')
      .position('percent')
      .color('item')
      .label('percent', (percent: any) => {
        return {
          content: (data: any) => {
            return `${data.item}: ${percent * 100}%`;
          },
        };
      })
      .tooltip('item*percent', (item: any, percent: any) => {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent,
        };
      });

    evaluateChart.interaction('element-active');
    evaluateChart.theme({ "styleSheet": { "brandColor": "#FF4500", "paletteQualitative10": ["#FF4500", "#1AAF8B", "#406C85", "#F6BD16", "#B40F0F", "#2FB8FC", "#4435FF", "#FF5CA2", "#BBE800", "#FE8A26"], "paletteQualitative20": ["#FF4500", "#1AAF8B", "#406C85", "#F6BD16", "#B40F0F", "#2FB8FC", "#4435FF", "#FF5CA2", "#BBE800", "#FE8A26", "#946DFF", "#6C3E00", "#6193FF", "#FF988E", "#36BCCB", "#004988", "#FFCF9D", "#CCDC8A", "#8D00A1", "#1CC25E"] } });
    // evaluateChart.source(dv);
    // evaluateChart.tooltip(false);
    // evaluateChart.legend({
    //   position: 'right',
    //   offsetX: -100
    // });
    // evaluateChart.coord('theta', {
    //   radius: 0.75,
    //   innerRadius: 0.6
    // });
    // evaluateChart.interaction().position('percent').color('type', ['#0a7aca', '#0a9afe', '#4cb9ff', '#8ed1ff']).opacity(1).label('percent', {
    //   offset: -18,
    //   textStyle: {
    //     fill: 'white',
    //     fontSize: 12,
    //     shadowBlur: 2,
    //     shadowColor: 'rgba(0, 0, 0, .45)'
    //   },
    //   rotate: 0,
    //   autoRotate: false,
    //   formatter: function formatter(text:any, item:any) {
    //     return String(parseInt(item.point.percent) * 100) + '%';
    //   }
    // });
    // evaluateChart.guide().html({ 
    //   position: ['50%', '50%'],
    //   html: '<div class="g2-guide-html"><p class="title">项目总计</p><p class="value">500</p></div>'
    //  });
    // evaluateChart.on('interval:mouseenter', function(ev:any) {
    //   var data = ev.data._origin;
    // //   document.querySelectorAll(".g2-guide-html")[0].style.opacity =  1;
    //   document.querySelectorAll(".g2-guide-html .title")[0].textContent = data.type;
    //   document.querySelectorAll(".g2-guide-html .value")[0].textContent = data.value;
    // });

    // evaluateChart.on('interval:mouseleave', function() {
    //     document.querySelectorAll(".g2-guide-html .title")[0].textContent="项目总计";
    //     document.querySelectorAll(".g2-guide-html .value")[0].textContent = "500";
    // });
    // // Step 4: 渲染图表
    evaluateChart.render();

  }, [])
  //监听窗口变化
  // const getWindowSize = () => ({
  //     innerHeight: window.innerHeight,
  //     innerWidth: window.innerWidth,
  //   });
  //   const [windowSize, setWindowSize] = useState(getWindowSize());
  //   const handleResize = () => {
  //     setWindowSize(getWindowSize());
  //   };
  //   useEffect(() => {
  //     // 监听
  //     window.addEventListener("resize", handleResize);
  //     // 销毁
  //     return () => window.removeEventListener("resize", handleResize);
  //   });
  const handleChange = (value: any) => {
    if (visitChart !== '') {
      visitChart.changeData([//数据更新
        { company: '用户数', num: 26, type: 'Jan' },
        { company: '访问人数', num: 54, type: 'Jan' }])
    }
  }
  return (
    <Space className='dashboard_body'>
      {/* 图标显示访问人数 和用户数量 */}
      <Space className='dashboard_body_visit' direction="vertical" >
        <Select size='small' bordered={false} defaultValue="2021" style={{ width: 70 }} onChange={handleChange}>
          <Option value="2021" disabled>2021</Option>
          <Option value="2020">2020</Option>
          <Option value="2019">2019</Option>
          <Option value="2018">2018</Option>
        </Select>
        <div id='visit'></div>
      </Space>
      {/* 评价比例 */}
      <Space className='dashboard_body_evaluate' direction="vertical" >
        <div id='evaluate'></div>
      </Space>
    </Space>
  )
}
export default DashboardBody