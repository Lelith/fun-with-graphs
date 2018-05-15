import React, { Component } from 'react';
import { legendColor } from 'd3-svg-legend';
import * as d3 from 'd3';

export default class FunGraph extends Component {
  constructor(props) {
    super(props);

    this.createCharts = this.creatCharts.bind(this)
  }

  componentDidMount() {
      this.createCharts();
  }

  componentDidUpdate(){
    this.createCharts();
  }

  creatCharts() {
    const {
      data,
      size,
    } = this.props;


    const
      consumption = d3.select(this.refs.consumption), // svg
      cumulativeTrades = data['cumulative-grid-trades'],
      production = data['production'],
      areaNames = data.areas,
      width = size[0],
      height = size[1],
      innerRadius = 120,
      outerRadius = Math.min(width, height) / 2,
      g = consumption.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
      stackLayout = d3.stack().keys(areaNames);

      // calculate total of each stack
      cumulativeTrades.map((area, i) => {
        var t = 0;
        for(var entry in area){
          if(entry !=='Label'){
              t += area[entry];
          }
          area.total = t;
        }
      })

    // scale functionality for x axis
    const xScale = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .align(0)
      .domain(cumulativeTrades.map(d=>{return d.Label}));

    // scale functionality for y axis
    const yScale = d3.scaleLinear()
      .range([innerRadius, outerRadius])
      .domain([0, d3.max(cumulativeTrades, function(d) { return d.total; })]);

  // category scale for area colors
    const colorScale = d3.scaleOrdinal()
        .domain(areaNames)
        .range(d3.schemeCategory20);


  // drawing the bars
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

          const label = g.append("g")
            .selectAll("g")
            .data(cumulativeTrades)
            .enter()
            .append("g")
            .attr("text-anchor", "middle")
            .attr("transform", (d) => {
              return "rotate(" + ((xScale(d.Label) + xScale.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
            });

    label.append("line")
      .attr("x2", -5)
      .attr("stroke", "#000")

    label.append("text")
      .attr("transform", function(d) { return (xScale(d.Label) + xScale.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-15)"; })
      .text(function(d) { return d.Label; });

    const yAxis = g.append("g")
    .attr("text-anchor", "end");

    const yTick = yAxis
    .selectAll("g")
    .data(yScale.ticks(5).slice(1))
    .enter().append("g");

    yTick.append("circle")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.2)
        .attr("r", yScale);

    yTick.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return -yScale(d); })
        .attr("dy", "0.35em")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 5)
        .text(yScale.tickFormat(10, "s"));

    yTick.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return -yScale(d); })
        .attr("dy", "0.35em")
        .text(yScale.tickFormat(10, "s"));

    yAxis.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return -yScale(yScale.ticks(10).pop()); })
        .attr("dy", "-1em")
        .text("kWh");


  const legend = legendColor()
    .scale(colorScale)
    .labels(areaNames);

    d3.select(this.refs.legend)
    .selectAll("g.legend__item")
    .data([0])
    .enter()
    .append("g")
    .attr("class", "legend__item")
    .call(legend)

}

  render() {
    return (
      <div>
        <svg ref="legend" />
        <svg width={this.props.size[0]} height={this.props.size[1]} ref="consumption"/>
        <svg ref="production" />
      </div>
    );
  }
}
