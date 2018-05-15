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
    } = this.props;


    const
      node = d3.select(this.refs.fungraph),
      cumulativeTrades = data['cumulative-grid-trades'],
      areaNames = data.areas,
      width = size[0],
      height = size[1],
      innerRadius = 80,
      outerRadius = Math.min(width, height) / 2.5,
      g = node.append("g").attr("transform", "translate(" + width / 2 + "," + height * 0.69 + ")"),
      xScaleOffset = Math.PI * 75/180,
      stackLayout = d3.stack().keys(areaNames);

      cumulativeTrades.map((area, i) => {
        var t = 0;
        for(var entry in area){
          if(entry !=='Label'){
              t += area[entry];
          }
          area.total = t;
        }
      })

    const xScale = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .align(0)
      .domain(cumulativeTrades.map(d=>{return d.Label}));

    const yScale = d3.scaleLinear()
      .range([innerRadius, outerRadius])
      .domain([0, d3.max(cumulativeTrades, function(d) { return d.total; })]);

    const colorScale = d3.scaleOrdinal()
        .domain(areaNames)
        .range(d3.schemeCategory20);


    g.append("g")
      .selectAll("g")
      .data(stackLayout(cumulativeTrades))
      .enter()
      .append("g")
        .attr("fill", d => colorScale(d.key))
      .selectAll("path")
      .data(function(d) { console.log(d); return d; })
      .enter()
      .append("path")
        .attr("d", d3.arc()
          .innerRadius(function(d) { return yScale(d[0]); })
          .outerRadius(function(d) {return yScale(d[1]); })
          .startAngle(function(d) {return xScale(d.data.Label); })
          .endAngle(function(d) { return xScale(d.data.Label) + xScale.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius));
}

  render() {
    return (
      <div>
        <svg width={this.props.size[0]} height={this.props.size[1]} ref="fungraph"/>
      </div>
    );
  }
}
