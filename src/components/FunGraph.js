import React, { Component } from 'react';
import { legendColor } from 'd3-svg-legend';
import * as d3 from 'd3';

export default class FunGraph extends Component {
  constructor(props) {
    super(props);

    this.createChart = this.creatChart.bind(this)
  }

  componentDidMount() {
      this.createChart();
  }

  componentDidUpdate(){
    this.createChart();
  }


  creatChart() {
    const {
      data,
      size,
      colorScale,
    } = this.props;


    const
      node = d3.select(this.refs.fungraph),
      cumulativeTrades = data['cumulative-grid-trades'],
      areas = data.areas,
      width = size[0],
      height = size[1],
      innerRadius = 180,
      outerRadius = Math.min(width, height) / 2,
      g = node.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
      xScaleOffset = Math.PI * 75/180;

      cumulativeTrades.map((area, i) => {
        var t = 0;
        for(var entry in area){
          if(entry !=='Label'){
              console.log(area[entry]);
              t += area[entry];
              console.log(t);
          }
          area.total = t;
        }
      })

      console.log(cumulativeTrades);


    const x = d3.scaleBand()
      .range([xScaleOffset, 2 * Math.PI + xScaleOffset])
      .align(0)
      .domain(cumulativeTrades.map(d=>{return d.Label}));

    const y = d3.scaleLinear()
    .range([innerRadius, outerRadius]);

}

  render() {
    return (
      <div>
        <svg ref="fungraph"/>
      </div>
    );
  }
}
